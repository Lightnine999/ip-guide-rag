// STEP 8 비교 실험: 같은 질문을 RAG 없이 / RAG로 물어 eval/compare-results.md에 그대로 남긴다
// 실행: node src/compare.mjs [--only A,B]   (Ollama가 켜져 있어야 함)
import { readFile, writeFile } from "node:fs/promises";
import { runAsk, usableHits } from "./ask.mjs";
import { pingOllama, LLM_MODEL } from "./ollama.mjs";
import { SAMPLE_ID } from "./prompt.mjs";
import { WEAK_THRESHOLD } from "./search.mjs";

const all = JSON.parse(await readFile(new URL("../eval/compare-questions.json", import.meta.url), "utf-8"));
const onlyArg = process.argv.indexOf("--only");
const only = onlyArg > 0 ? process.argv[onlyArg + 1].split(",") : null;
const qs = only ? all.filter((q) => only.includes(q.id)) : all;

if (!(await pingOllama())) {
  console.error("✗ Ollama에 연결할 수 없습니다. Ollama 앱을 켜거나 `ollama serve` 실행 후 다시 시도하세요");
  process.exit(1);
}

const hasId = (text, id) => new RegExp(`(^|[^A-Z0-9-])${id}(?![0-9])`).test(text);
// 근거 표기율(참고용): 문장을 나눠 [ID]가 붙은 문장 비율. 2B 모델은 ID를 끝에 몰아 적으므로 낮게 나올 수 있다
function citeRate(answer) {
  const sentences = answer.split(/(?<=[.!?。])\s+|\n+/).map((s) => s.trim()).filter((s) => s.replace(/\[[A-Z]{2}-\d{3}\]/g, "").trim().length > 5);
  const cited = sentences.filter((s) => /[A-Z]{2}-\d{3}/.test(s)).length;
  return { cited, total: sentences.length };
}
const sec = (ms) => (ms / 1000).toFixed(1);
const quote = (text) => text.trim().split("\n").map((l) => `> ${l}`).join("\n");

const md = [`# STEP 8 비교 결과 (${new Date().toISOString().slice(0, 16).replace("T", " ")} UTC, ${LLM_MODEL}, 기준 ${WEAK_THRESHOLD})`, ""];
const summary = [];
for (const q of qs) {
  console.log(`\n=== ${q.id}. ${q.question}`);
  const none = await runAsk(q.question, { noRag: true });
  console.log(`  RAG 없음 ${sec(none.answerMs)}초`);
  const rag = await runAsk(q.question);
  md.push(`## ${q.id}. ${q.question}`, "", `볼 것: ${q.look}`, "", `### RAG 없이 (${sec(none.answerMs)}초)`, "", quote(none.answer), "");
  let ragCell;
  if (rag.kind === "answer") {
    const { cited, total } = citeRate(rag.answer);
    const checked = rag.passed.filter((h) => hasId(rag.answer, h.id)).map((h) => h.id);
    md.push(`### RAG (검색 ${sec(rag.searchMs)}초 · 답변 ${sec(rag.answerMs)}초)`, "", quote(rag.answer), "",
      "LLM에 넘긴 자료 (✓ = 답변에 ID 표시):", "",
      ...rag.passed.map((h) => `- ${checked.includes(h.id) ? "✓" : "·"} ${h.id} (${h.score.toFixed(3)}) ${h.section} — ${h.url}`),
      ...rag.result.hits.filter((h) => !usableHits([h]).length).map((h) => `- ✗ ${h.id} (${h.score.toFixed(3)}) 기준 미달로 넘기지 않음`),
      ...(hasId(rag.answer, SAMPLE_ID) ? ["- ⚠ 견본 ID(MK-000)를 베낌"] : []),
      "", `근거 표기: ID가 붙은 문장 ${cited}/${total}`, "");
    ragCell = `답변 · ✓ ${checked.join(",") || "없음"} · 표기 ${cited}/${total}`;
    console.log(`  RAG 답변 ${sec(rag.answerMs)}초, ✓ ${checked.join(",") || "없음"}`);
  } else {
    md.push(`### RAG`, "", `${rag.message}  (LLM에 넘기지 않음)`, "");
    ragCell = rag.kind === "scope" ? "범위 차단 (정해진 거절 문구)" : "LLM 미호출 " + rag.message.split("\n").slice(1).join(" ");
    console.log(`  RAG: ${rag.message}`);
  }
  summary.push(`| ${q.id} | ${q.question} | ${ragCell} | ${sec(none.answerMs)}초 |`);
}
md.splice(2, 0, "| # | 질문 | RAG 결과 | RAG 없이 답변 시간 |", "| --- | --- | --- | --- |", ...summary, "",
  "환각(자료에 없는 수치·연도·사실) 판정은 아래 답변 원문을 청크와 대조해 README 비교표에 적는다.", "");
await writeFile(new URL("../eval/compare-results.md", import.meta.url), md.join("\n"), "utf-8");
console.log("\n저장: eval/compare-results.md");
