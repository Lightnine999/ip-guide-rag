// [2단계] 질문 종류 관문 → 검색 → 판정 → 프롬프트 조립 → Ollama 답변(스트리밍) → 근거 목록
// 실행: node src/ask.mjs "질문" [--k 3] [--show-prompt] [--no-rag]
import { fileURLToPath } from "node:url";
import { search, DEFAULT_K, WEAK_THRESHOLD } from "./search.mjs";
import { buildMessages, SAMPLE_ID } from "./prompt.mjs";
import { checkScope, SCOPE_MESSAGE } from "./scope-guard.mjs";
import { pingOllama, chatStream, OLLAMA_URL } from "./ollama.mjs";
import { REPLY } from "./messages.mjs";

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
    return { action: "stop", message: `${REPLY.NOT_FOUND}\n(1위 점수 ${topScore.toFixed(3)} < 기준 ${WEAK_THRESHOLD})` };
  }
  if (top.claim_type === "copyright-blocked") {
    return { action: "stop", message: `${REPLY.COPYRIGHT}\n출처: [${top.id}] ${top.section} · ${top.url}` };
  }
  return { action: "llm" };
}

// 1위가 기준을 넘어도 2·3위 중 기준 미달 자료는 LLM에 넘기지 않는다 (관련 없는 자료가 섞이는 것을 막음)
export function usableHits(hits) {
  return hits.filter((h) => h.score >= WEAK_THRESHOLD);
}

export function formatMessages(messages) {
  return messages.map((m) => `[${m.role}]\n${m.content}`).join("\n\n");
}

export function formatHits({ hits, weak }) {
  return [
    "🔎 검색 결과",
    ...hits.map((h) => `  ${h.id}  ${h.score.toFixed(3)}  ${h.section}${!weak && h.score < WEAK_THRESHOLD ? "  (기준 미달 → LLM에 넘기지 않음)" : ""}`),
    ...(weak ? ["  ⚠ 관련 자료가 약함"] : []),
  ].join("\n");
}

const hasId = (text, id) => new RegExp(`(^|[^A-Z0-9-])${id}(?![0-9])`).test(text);

// 근거 목록은 LLM이 아니라 프로그램이 만든다: 답변에 ID 글자가 있으면 ✓ (괄호 모양과 상관없이)
export function formatSources(hits, answer) {
  const lines = ["📚 근거 (LLM에게 넘긴 자료 · ✓ = 답변에 ID가 표시된 자료)"];
  let checked = 0;
  for (const h of hits) {
    const used = hasId(answer, h.id);
    if (used) checked++;
    lines.push(`  ${used ? "✓" : " "} ${h.id}  ${h.section}  ${h.url}${h.url_extra ? ` (+ ${h.url_extra})` : ""}`);
    // F9: 출처 종류·라이선스·주장 종류·확인일·위치
    lines.push(`      ${h.source_type}/${h.license} · ${h.claim_type} · 확인일 ${h.checked_at}${h.location ? ` · ${h.location}` : ""}${h.review ? ` · ${h.review}` : ""}`);
  }
  if (hasId(answer, SAMPLE_ID)) lines.push(`  ⚠ 견본 ID(${SAMPLE_ID})를 그대로 베꼈습니다. 근거 표시를 믿지 마세요`);
  if (!checked) lines.push("  (답변에 ID 표시가 없습니다. 위 자료와 답변을 비교해 확인하세요)");
  return lines.join("\n");
}

const sec = (ms) => (ms / 1000).toFixed(1);

// 질문 하나를 처리해 결과를 돌려준다 (화면 출력은 하지 않음). STEP 8 비교 스크립트도 이 함수를 쓴다.
// kind: "scope"(질문 종류 관문) | "stop"(기준 미달·저작권) | "answer"(RAG 답변) | "norag"(RAG 없음)
export async function runAsk(question, { k = DEFAULT_K, noRag = false, onToken = () => {}, onSearched = () => {} } = {}) {
  if (noRag) {
    const t = Date.now();
    const answer = await chatStream([{ role: "user", content: question }], onToken);
    return { kind: "norag", answer, answerMs: Date.now() - t };
  }
  const scope = checkScope(question);
  if (scope.blocked) return { kind: "scope", message: `${SCOPE_MESSAGE}\n(${scope.type}: "${scope.matched}")` };
  const t0 = Date.now();
  const result = await search(question, { k });
  const searchMs = Date.now() - t0;
  const verdict = decide(result);
  onSearched(result, verdict);
  if (verdict.action === "stop") return { kind: "stop", message: verdict.message, result, searchMs };
  const passed = usableHits(result.hits);
  const t1 = Date.now();
  const answer = await chatStream(buildMessages(question, passed), onToken);
  return { kind: "answer", answer, result, passed, searchMs, answerMs: Date.now() - t1 };
}

async function main() {
  const opts = parseAskArgs(process.argv.slice(2));
  if (!opts.question) throw new Error('질문을 입력하세요. 예: node src/ask.mjs "영웅의 여정은 어떤 단계야?"');

  if (opts.showPrompt) {
    if (opts.noRag) { console.log("(RAG 없음: 시스템 메시지·자료 없이 질문만 보냄)\n\n" + formatMessages([{ role: "user", content: opts.question }])); return; }
    const scope = checkScope(opts.question);
    if (scope.blocked) { console.log(`${SCOPE_MESSAGE}\n(${scope.type}: "${scope.matched}" · 검색·LLM 모두 하지 않음)`); return; }
    const result = await search(opts.question, { k: opts.k });
    const verdict = decide(result);
    if (verdict.action === "stop") console.log(verdict.message + "\n(LLM에 넘기지 않음)");
    else console.log(`(1위 점수 ${result.topScore.toFixed(3)}, LLM에 넘기는 자료 ${usableHits(result.hits).length}/${result.hits.length}개)\n\n` + formatMessages(buildMessages(opts.question, usableHits(result.hits))));
    return;
  }

  // 관문에서 멈출 질문은 Ollama 확인 없이 바로 답한다
  if (!opts.noRag && checkScope(opts.question).blocked) {
    const r = await runAsk(opts.question, opts);
    console.log(`💬 ${r.message.replace(/\)$/, " · 검색·LLM 모두 하지 않음)")}`);
    return;
  }
  const ollamaOk = await pingOllama();
  if (opts.noRag && !ollamaOk) return reportOllamaDown();
  let started = false;
  const r = await runAsk(opts.question, {
    k: opts.k,
    noRag: opts.noRag,
    onSearched: (result, verdict) => {
      console.log(formatHits(result));
      if (verdict.action === "llm" && !ollamaOk) throw new OllamaDown();
    },
    onToken: (token) => { if (!started) { console.log("💬 답변"); started = true; } process.stdout.write(token); },
  }).catch((e) => { if (e instanceof OllamaDown) return null; throw e; });
  if (r === null) return reportOllamaDown();
  if (r.kind === "stop") {
    console.log(`💬 ${r.message}\n(LLM에 넘기지 않음)\n⏱ 검색 ${sec(r.searchMs)}초`);
    return;
  }
  if (!started) console.log("💬 답변");
  process.stdout.write("\n");
  if (r.kind === "norag") { console.log(`⏱ 답변 ${sec(r.answerMs)}초 (RAG 없음)`); return; }
  console.log(formatSources(r.passed, r.answer));
  console.log(`⏱ 검색 ${sec(r.searchMs)}초 · 답변 ${sec(r.answerMs)}초`);
}

class OllamaDown extends Error {}
function reportOllamaDown() {
  console.error(`✗ Ollama에 연결할 수 없습니다. Ollama 앱을 켜거나 \`ollama serve\` 실행 후 다시 시도하세요 (확인: curl ${OLLAMA_URL}/api/tags)`);
  process.exitCode = 1;
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  main().catch((error) => {
    console.error(`✗ ${error.message}`);
    process.exitCode = 1;
  });
}
