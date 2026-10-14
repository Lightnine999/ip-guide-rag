// [1단계] 질문 → 비슷한 청크 top-k
// 실행: node src/search.mjs "질문" [--k 3] [--category ST|MK|WK|CS|IP|TH]
import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { embedQuery, MODEL, DTYPE, DIM } from "./embedder.mjs";

export const DEFAULT_K = 3;
export const WEAK_THRESHOLD = 0.55; // 출발값. STEP 5 측정 후 확정하고 CLAUDE.md에 이유를 남긴다
export const CATEGORIES = ["ST", "MK", "WK", "CS", "IP", "TH"];
const VECTORS_PATH = new URL("../data/vectors.json", import.meta.url);

export async function loadStore() {
  let store;
  try {
    store = JSON.parse(await readFile(VECTORS_PATH, "utf-8"));
  } catch {
    throw new Error("data/vectors.json이 없습니다. 인덱스를 먼저 만드세요(node src/build-index.mjs)");
  }
  // 계약: 저장소의 모델·설정이 지금 embedder와 다르면 검색 거부
  if (store.model !== MODEL || store.dtype !== DTYPE || store.dim !== DIM) {
    throw new Error(`임베딩 설정이 달라졌습니다(저장소 ${store.model}/${store.dtype}/${store.dim}, 현재 ${MODEL}/${DTYPE}/${DIM}). 인덱스를 다시 만드세요(node src/build-index.mjs)`);
  }
  return store;
}

// 벡터가 정규화되어 있으므로 내적 = 코사인 유사도
const dot = (a, b) => { let s = 0; for (let i = 0; i < a.length; i++) s += a[i] * b[i]; return s; };

export function searchByVector(store, queryVector, { k = DEFAULT_K, category } = {}) {
  if (queryVector.length !== store.dim) throw new Error(`질문 벡터 ${queryVector.length}차원, 저장소 ${store.dim}차원`);
  const pool = category ? store.chunks.filter((c) => c.category === category) : store.chunks;
  const hits = pool
    .map((c) => ({ ...c, score: dot(queryVector, c.vector) }))
    .sort((a, b) => b.score - a.score)
    .slice(0, k)
    .map(({ vector, ...rest }) => rest);
  const top = hits[0]?.score ?? 0;
  return { hits, topScore: top, weak: top < WEAK_THRESHOLD };
}

export async function search(question, options = {}) {
  const store = await loadStore();
  const qv = await embedQuery(question);
  return searchByVector(store, qv, options);
}

export function parseArgs(argv) {
  const opts = { k: DEFAULT_K, category: undefined }, words = [];
  for (let i = 0; i < argv.length; i++) {
    if (argv[i] === "--k") opts.k = Number(argv[++i]);
    else if (argv[i] === "--category") opts.category = String(argv[++i] ?? "").toUpperCase();
    else words.push(argv[i]);
  }
  if (!Number.isInteger(opts.k) || opts.k < 1) throw new Error("--k는 1 이상의 정수여야 합니다");
  if (opts.category && !CATEGORIES.includes(opts.category)) throw new Error(`--category는 ${CATEGORIES.join("/")} 중 하나`);
  return { question: words.join(" ").trim(), ...opts };
}

export function formatResult(question, { hits, topScore, weak }, { category } = {}) {
  const lines = [`질문: ${question}${category ? `  [범위: ${category}]` : ""}`, ""];
  hits.forEach((h, i) => {
    lines.push(`${i + 1}. [${h.id}] 점수 ${h.score.toFixed(3)} · ${h.section}`);
    if (h.claim_type === "copyright-blocked") {
      lines.push("   저작권 침해 요소가 있어 내용 확인 불가");
    } else {
      lines.push(`   ${h.text.length > 140 ? h.text.slice(0, 140) + "…" : h.text}`);
    }
    lines.push(`   출처: ${h.url}${h.url_extra ? ` (+ ${h.url_extra})` : ""} · ${h.source_type}/${h.license} · 확인일 ${h.checked_at}`);
  });
  if (weak) lines.push("", `⚠ 관련 자료가 약함: 1위 점수 ${topScore.toFixed(3)} < 기준 ${WEAK_THRESHOLD}`);
  return lines.join("\n");
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  try {
    const opts = parseArgs(process.argv.slice(2));
    if (!opts.question) throw new Error('질문을 입력하세요. 예: node src/search.mjs "영웅의 여정은 어떤 단계야?"');
    const result = await search(opts.question, opts);
    console.log(formatResult(opts.question, result, opts));
  } catch (error) {
    console.error(`✗ ${error.message}`);
    process.exitCode = 1;
  }
}
