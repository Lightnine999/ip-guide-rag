// STEP 6: 시스템 메시지와 프롬프트 조립 (CLAUDE.md 생성 계약)
import { REPLY } from "./messages.mjs";
// 기준 점수 미만·저작권 차단 질문은 ask.mjs의 decide()에서 먼저 걸러지므로, 여기에는 기준 이상인 질문만 들어온다

export const SYSTEM_MESSAGE =
  "당신은 IP 기획 가이드 도우미입니다. 주어진 자료(스토리텔링 이론, 스튜디오 제작 기법과 작품, IP 확장 전략, 국내 캐릭터 사례)에 근거한 내용만 답합니다. " +
  `자료가 직접 뒷받침하지 않는 내용, 특히 수치·연도·매출·성공 원인은 추측하지 말고 그 부분에 '${REPLY.PARTIAL}'라고 답합니다. ` +
  `자료가 질문과 전혀 관련이 없으면 '${REPLY.NOT_FOUND}'라고만 답합니다. ` +
  "수치·연도·날짜는 자료에 적힌 그대로 옮기고, 자료 문장에 출처를 밝힌 표현이 있으면 빼지 않습니다. " +
  `작품 평가, 아이디어 생성, 성공 예측을 묻는 질문에는 '${REPLY.OUT_OF_SCOPE}'라고 답합니다. ` +
  `저작권 때문에 내용이 수록되지 않은 자료는 '${REPLY.COPYRIGHT}'라고 답합니다. ` +
  "근거 조각의 ID만 [MK-000]처럼 대괄호로 감싸 해당 문장 끝에 표시합니다.";

const INTRO = "다음 자료는 IP 기획에 관한 위키백과, 저작권이 끝난 원전, 논문 초록 정리에서 뽑은 조각입니다.";
const GROUND_OK = `자료에 근거한 내용만 답하고, 자료에 없는 부분은 '${REPLY.PARTIAL}'라고 말합니다.`;
const CITE = "근거가 된 조각의 ID만 [MK-000]처럼 대괄호로 감싸 해당 문장 끝에 표시합니다.";
const CITE_AGAIN = "(답할 때 근거로 쓴 자료의 ID를 [MK-000]처럼 문장 끝에 붙입니다.)";
export const SAMPLE_ID = "MK-000"; // 출처 규칙의 표기 견본. 실제 청크 id가 아님 (STEP 7: 답변에 나오면 ⚠ 표시)
export const BLOCKED_TEXT = "저작권 침해 요소가 있어 내용 미수록";

export function nowKST(date = new Date()) {
  return new Intl.DateTimeFormat("ko-KR", {
    timeZone: "Asia/Seoul", year: "numeric", month: "long", day: "numeric",
    weekday: "long", hour: "numeric", minute: "2-digit",
  }).format(date);
}

function materialLine(h) {
  const text = h.claim_type === "copyright-blocked" ? BLOCKED_TEXT : h.text;
  return `[${h.id}] (${h.section}) ${text}`; // 대괄호 안에는 ID만
}

export function buildPrompt(question, hits, { now = new Date() } = {}) {
  return [
    INTRO,                                                     // ①
    GROUND_OK,                                                 // ②
    CITE,                                                      // ③
    `현재 시각은 ${nowKST(now)}(KST)입니다. '지금', '올해', '다음 주' 같은 상대 표현은 이 시각을 기준으로 해석합니다.`, // ④
    "",
    "[자료]",                                                  // ⑤
    hits.map(materialLine).join("\n\n"),
    "",
    "[질문]",                                                  // ⑥
    question,
    "",
    CITE_AGAIN,                                                // ⑦
  ].join("\n");
}

export function buildMessages(question, hits, opts) {
  return [
    { role: "system", content: SYSTEM_MESSAGE },
    { role: "user", content: buildPrompt(question, hits, opts) },
  ];
}
