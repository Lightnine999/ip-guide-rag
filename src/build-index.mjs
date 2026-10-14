// data/chunks.json을 임베딩해 data/vectors.json으로 저장한다
// 실행: node src/build-index.mjs
import { readFile, writeFile } from "node:fs/promises";
import { embedDocument, MODEL, DTYPE, DIM } from "./embedder.mjs";
import { validateChunks } from "./validate-chunks.mjs";

const CHUNKS_PATH = new URL("../data/chunks.json", import.meta.url);
const VECTORS_PATH = new URL("../data/vectors.json", import.meta.url);
// 검색·답변·근거 표시에 쓰는 필드만 저장소로 옮긴다
const KEEP_FIELDS = ["id", "text", "url", "section", "category", "source_type", "license", "claim_type",
  "checked_at", "published_at", "publisher", "location", "evidence_group", "review", "url_extra"];

const norm = (v) => Math.sqrt(v.reduce((s, x) => s + x * x, 0));

async function main() {
  const chunks = JSON.parse(await readFile(CHUNKS_PATH, "utf-8"));
  const { keep, skipped, errors, missingLicenseOrUrl } = validateChunks(chunks);
  console.log(`license·url 누락 ${missingLicenseOrUrl}건`);
  if (skipped.length) {
    console.log(`언론사·URL·발행일이 없어 건너뛴 기사 ${skipped.length}건:`);
    skipped.forEach((s) => console.log(`  - ${s}`));
  } else {
    console.log("건너뛴 기사 0건");
  }
  if (errors.length) throw new Error(`청크 검사 실패:\n- ${errors.join("\n- ")}`);

  const out = [];
  for (const [i, chunk] of keep.entries()) {
    const vector = await embedDocument(chunk);
    if (vector.length !== DIM) throw new Error(`${chunk.id}: ${vector.length}차원 (기대 ${DIM})`);
    const row = {};
    for (const f of KEEP_FIELDS) if (chunk[f] !== undefined && chunk[f] !== null) row[f] = chunk[f];
    row.vector = vector;
    out.push(row);
    console.log(`✓ [${i + 1}/${keep.length}] ${chunk.id} ${chunk.section}`);
  }

  const store = { model: MODEL, dtype: DTYPE, dim: DIM, createdAt: new Date().toISOString(), count: out.length, chunks: out };
  await writeFile(VECTORS_PATH, JSON.stringify(store) + "\n", "utf-8");
  console.log(`\n저장: data/vectors.json — ${out.length}청크 × ${DIM}차원`);

  const first = out[0];
  console.log(`[학습용] ${first.id} 벡터 앞 5개: [${first.vector.slice(0, 5).map((v) => v.toFixed(6)).join(", ")}]`);
  console.log(`[학습용] ${first.id} 벡터 노름: ${norm(first.vector).toFixed(6)} (1.0이어야 함)`);
}

main().catch((error) => {
  console.error(`✗ ${error.message}`);
  process.exitCode = 1;
});
