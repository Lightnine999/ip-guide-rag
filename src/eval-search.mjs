// STEP 5 관찰 실습: eval/questions.json을 검색해 점수를 표로 남긴다
// 실행: node src/eval-search.mjs  → 화면 출력 + eval/search-results.md 저장
import { readFile, writeFile } from "node:fs/promises";
import { loadStore, searchByVector, WEAK_THRESHOLD } from "./search.mjs";
import { embedQuery } from "./embedder.mjs";
import { checkScope } from "./scope-guard.mjs";

const qs = JSON.parse(await readFile(new URL("../eval/questions.json", import.meta.url), "utf-8"));
const store = await loadStore();
const rows = [];
for (const q of qs) {
  const r = searchByVector(store, await embedQuery(q.question), { k: 3 });
  const top3 = r.hits.map((h) => h.id);
  const inDomain = q.expected.length > 0;
  const hit = inDomain ? top3.some((id) => q.expected.includes(id)) : null;
  const scope = checkScope(q.question); // 질문 종류 관문에 막히는 질문은 점수와 상관없이 LLM에 가지 않는다
  rows.push({ ...q, top3, scores: r.hits.map((h) => h.score), hit, weak: r.weak, scopeBlocked: scope.blocked });
  console.log(`${q.no}. ${q.question} → ${r.hits.map((h) => `${h.id}(${h.score.toFixed(3)})`).join(", ")}${hit === false ? "  ✗ 정답 없음" : ""}${r.weak ? "  ⚠약함" : ""}${scope.blocked ? "  ⛔범위 차단" : ""}`);
}

// 범위 차단 질문은 기준 점수 계산에서 뺀다 (점수로 거를 대상이 아님)
const inRows = rows.filter((r) => r.expected.length), outRows = rows.filter((r) => !r.expected.length && !r.scopeBlocked);
const blockedRows = rows.filter((r) => r.scopeBlocked);
const hits = inRows.filter((r) => r.hit).length;
const minIn = Math.min(...inRows.map((r) => r.scores[0])), maxOut = Math.max(...outRows.map((r) => r.scores[0]));
const summary = [
  `Hit@3: ${hits}/${inRows.length}`,
  `자료 안 질문의 1위 점수 최솟값: ${minIn.toFixed(3)}`,
  `자료 밖 질문의 1위 점수 최댓값: ${maxOut.toFixed(3)} (범위 차단 ${blockedRows.length}개 제외: ${blockedRows.map((r) => `${r.no}번`).join(", ") || "없음"})`,
  `현재 기준 ${WEAK_THRESHOLD}: 자료 밖 ${outRows.filter((r) => r.weak).length}/${outRows.length}개를 '약함'으로 잡음, 자료 안 ${inRows.filter((r) => r.weak).length}/${inRows.length}개를 잘못 '약함'으로 표시`,
  minIn > maxOut ? `두 그룹이 갈림 → ${maxOut.toFixed(3)}~${minIn.toFixed(3)} 사이 어느 값이든 판정이 같음 (중간값 ${((minIn + maxOut) / 2).toFixed(3)}, 현재 기준 ${WEAK_THRESHOLD}${WEAK_THRESHOLD > maxOut && WEAK_THRESHOLD < minIn ? " 안에 있음" : " 밖에 있음 → 재검토"})` : `두 그룹 점수가 겹침 → 점수 기준만으로는 완전히 가를 수 없음 (STEP 6 규칙으로 보완)`,
];
// 기준 점수 후보 비교: 점수는 그대로이고 '약함' 판정만 달라진다
const CANDIDATES = [0.55, 0.58];
const cmp = CANDIDATES.map((t) => {
  const outCaught = outRows.filter((r) => r.scores[0] < t).length;
  const inFlagged = inRows.filter((r) => r.scores[0] < t).length;
  const outMargin = Math.min(...outRows.filter((r) => r.scores[0] < t).map((r) => t - r.scores[0]));
  const inMargin = Math.min(...inRows.map((r) => r.scores[0] - t));
  return { t, outCaught, inFlagged, outMargin, inMargin };
});
summary.push(...cmp.map((c) => `기준 ${c.t.toFixed(2)}: 자료 밖 ${c.outCaught}/${outRows.length} 걸러냄 · 자료 안 오탐 ${c.inFlagged}/${inRows.length} · 여유(걸러낸 자료 밖 최고점과의 차 ${c.outMargin.toFixed(3)}, 자료 안 최저점과의 차 ${c.inMargin.toFixed(3)})`));
console.log("\n" + summary.join("\n"));

const md = [
  `# STEP 5 검색 관찰 결과 (${new Date().toISOString().slice(0, 10)}, 청크 ${store.count}개)`, "",
  "| # | 분류 | 유형 | 질문 | 1위 | 점수 | 2위 | 3위 | 정답 포함 / 판정 |", "| --- | --- | --- | --- | --- | --- | --- | --- | --- |",
  ...rows.map((r) => `| ${r.no} | ${r.group} | ${r.type} | ${r.question} | ${r.top3[0]} | ${r.scores[0].toFixed(3)}${r.weak ? " ⚠" : ""} | ${r.top3[1]} (${r.scores[1].toFixed(3)}) | ${r.top3[2]} (${r.scores[2].toFixed(3)}) | ${r.scopeBlocked ? "⛔ 범위 차단" : r.hit === null ? "—" : r.hit ? "✅" : "❌"} |`),
  "", "## 요약", "", ...summary.map((s) => `- ${s}`), "",
];
await writeFile(new URL("../eval/search-results.md", import.meta.url), md.join("\n"), "utf-8");
console.log("저장: eval/search-results.md");
