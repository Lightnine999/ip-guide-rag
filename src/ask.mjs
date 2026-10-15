// [2단계] 질문 종류 관문 → 검색 → 판정 → 프롬프트 조립 (→ STEP 7에서 LLM 답변)
// 실행: node src/ask.mjs "질문" --show-prompt [--k 3]
import { fileURLToPath } from "node:url";
import { search, DEFAULT_K, WEAK_THRESHOLD } from "./search.mjs";
import { buildMessages } from "./prompt.mjs";
import { checkScope, SCOPE_MESSAGE } from "./scope-guard.mjs";

export function parseAskArgs(argv) {
  const opts = { k: DEFAULT_K, showPrompt: false }, words = [];
  for (let i = 0; i < argv.length; i++) {
    if (argv[i] === "--k") opts.k = Number(argv[++i]);
    else if (argv[i] === "--show-prompt") opts.showPrompt = true;
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

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  try {
    const opts = parseAskArgs(process.argv.slice(2));
    if (!opts.question) throw new Error('질문을 입력하세요. 예: node src/ask.mjs "영웅의 여정은 어떤 단계야?" --show-prompt');
    // 관문 1: 비목표 질문(성공 예측·작품 평가·아이디어 생성)은 검색·LLM 전에 멈춘다
    const scope = checkScope(opts.question);
    if (scope.blocked) {
      console.log(`${SCOPE_MESSAGE} (${scope.type}: "${scope.matched}")\n(검색·LLM 모두 하지 않음)`);
      process.exit(0);
    }
    // 관문 2: 검색 결과로 판정 (기준 점수·저작권 차단)
    const result = await search(opts.question, { k: opts.k });
    const verdict = decide(result);
    if (verdict.action === "stop") {
      console.log(verdict.message + "\n(LLM에 넘기지 않음)");
    } else {
      const messages = buildMessages(opts.question, result.hits);
      if (opts.showPrompt) {
        console.log(`(1위 점수 ${result.topScore.toFixed(3)})\n`);
        console.log(formatMessages(messages));
      } else {
        console.log("LLM 답변은 STEP 7에서 연결합니다. 지금은 --show-prompt로 조립된 프롬프트를 확인하세요.");
      }
    }
  } catch (error) {
    console.error(`✗ ${error.message}`);
    process.exitCode = 1;
  }
}
