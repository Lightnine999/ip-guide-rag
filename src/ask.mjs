// [2단계] 질문 종류 관문 → 검색 → 판정 → 프롬프트 조립 → Ollama 답변(스트리밍) → 근거 목록
// 실행: node src/ask.mjs "질문" [--k 3] [--show-prompt] [--no-rag]
import { fileURLToPath } from "node:url";
import { search, DEFAULT_K, WEAK_THRESHOLD } from "./search.mjs";
import { buildMessages, SAMPLE_ID } from "./prompt.mjs";
import { checkScope, SCOPE_MESSAGE } from "./scope-guard.mjs";
import { pingOllama, chatStream, OLLAMA_URL } from "./ollama.mjs";

export function parseAskArgs(argv) {
  const opts = { k: DEFAULT_K, showPrompt: false, noRag: false }, words = [];
  for (let i = 0; i < argv.length; i++) {
    if (argv[i] === "--k") opts.k = Number(argv[++i]);
    else if (argv[i] === "--show-prompt") opts.showPrompt = true;
    else if (argv[i] === "--no-rag") opts.noRag = true;
    else if (argv[i].trim()) words.push(argv[i].trim());
  }
  if (!Number.isInteger(opts.k) || opts.k < 1) throw new Error("--k는 1 이상의 정수여야 합니다");
  return { question: words.join(" "), ...opts };
}

// 계약: 기준 미만·저작권 차단이면 프롬프트를 만들지 않고 LLM도 부르지 않는다
export function decide({ hits, topScore }) {
  const top = hits[0];
  if (!top || topScore < WEAK_THRESHOLD) {
    return { action: "stop", message: `관련 자료가 약함, 확인 불가 (1위 점수 ${topScore.toFixed(3)} < 기준 ${WEAK_THRESHOLD})` };
  }
  if (top.claim_type === "copyright-blocked") {
    return { action: "stop", message: `저작권 침해 요소가 있어 내용 확인 불가\n출처: [${top.id}] ${top.section} · ${top.url}` };
  }
  return { action: "llm" };
}

export function formatMessages(messages) {
  return messages.map((m) => `[${m.role}]\n${m.content}`).join("\n\n");
}

export function formatHits({ hits, weak }) {
  return ["🔎 검색 결과", ...hits.map((h) => `  ${h.id}  ${h.score.toFixed(3)}  ${h.section}`), ...(weak ? ["  ⚠ 관련 자료가 약함"] : [])].join("\n");
}

// 근거 목록은 LLM이 아니라 프로그램이 만든다: 답변에 ID 글자가 있으면 ✓ (괄호 모양과 상관없이)
export function formatSources(hits, answer) {
  const lines = ["📚 근거 (LLM에게 넘긴 자료 · ✓ = 답변에 ID가 표시된 자료)"];
  let checked = 0;
  for (const h of hits) {
    const used = answer.includes(h.id);
    if (used) checked++;
    lines.push(`  ${used ? "✓" : " "} ${h.id}  ${h.section}  ${h.url}${h.url_extra ? ` (+ ${h.url_extra})` : ""}`);
  }
  if (answer.includes(SAMPLE_ID)) lines.push(`  ⚠ 견본 ID(${SAMPLE_ID})를 그대로 베꼈습니다. 근거 표시를 믿지 마세요`);
  if (!checked) lines.push("  (답변에 ID 표시가 없습니다. 위 자료와 답변을 비교해 확인하세요)");
  return lines.join("\n");
}

const sec = (ms) => (ms / 1000).toFixed(1);

async function requireOllama() {
  if (await pingOllama()) return true;
  console.error(`✗ Ollama가 실행 중인지 확인하세요 (확인: curl ${OLLAMA_URL}/api/tags)`);
  process.exitCode = 1;
  return false;
}

async function streamAnswer(messages) {
  console.log("💬 답변");
  const t = Date.now();
  const answer = await chatStream(messages, (token) => process.stdout.write(token));
  process.stdout.write("\n");
  return { answer, ms: Date.now() - t };
}

async function main() {
  const opts = parseAskArgs(process.argv.slice(2));
  if (!opts.question) throw new Error('질문을 입력하세요. 예: node src/ask.mjs "영웅의 여정은 어떤 단계야?"');

  // 비교 실험용: 검색·규칙 없이 질문만 LLM에 보낸다
  if (opts.noRag) {
    if (!(await requireOllama())) return;
    const { ms } = await streamAnswer([{ role: "user", content: opts.question }]);
    console.log(`⏱ 답변 ${sec(ms)}초 (RAG 없음)`);
    return;
  }

  // 관문 1: 비목표 질문(성공 예측·작품 평가·아이디어 생성)은 검색·LLM 전에 멈춘다
  const scope = checkScope(opts.question);
  if (scope.blocked) {
    console.log(`${SCOPE_MESSAGE} (${scope.type}: "${scope.matched}")\n(검색·LLM 모두 하지 않음)`);
    return;
  }

  // 관문 2: 검색 결과로 판정 (기준 점수·저작권 차단)
  const t0 = Date.now();
  const result = await search(opts.question, { k: opts.k });
  const searchMs = Date.now() - t0;
  const verdict = decide(result);

  if (opts.showPrompt) {
    if (verdict.action === "stop") console.log(verdict.message + "\n(LLM에 넘기지 않음)");
    else console.log(`(1위 점수 ${result.topScore.toFixed(3)})\n\n` + formatMessages(buildMessages(opts.question, result.hits)));
    return;
  }

  console.log(formatHits(result));
  if (verdict.action === "stop") {
    console.log(`💬 ${verdict.message}\n(LLM에 넘기지 않음)`);
    console.log(`⏱ 검색 ${sec(searchMs)}초`);
    return;
  }
  if (!(await requireOllama())) return;
  const { answer, ms } = await streamAnswer(buildMessages(opts.question, result.hits));
  console.log(formatSources(result.hits, answer));
  console.log(`⏱ 검색 ${sec(searchMs)}초 · 답변 ${sec(ms)}초`);
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  main().catch((error) => {
    console.error(`✗ ${error.message}`);
    process.exitCode = 1;
  });
}
