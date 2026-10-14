// CLAUDE.md "데이터 계약" 검사. 단독 실행: node src/validate-chunks.mjs
import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";

export const REQUIRED = ["id", "text", "url", "section", "category", "source_type", "license", "claim_type", "checked_at"];
export const ALLOWED = {
  category: ["ST", "MK", "WK", "CS", "IP", "TH"],
  source_type: ["wikipedia", "public-domain", "gov-open", "official", "article", "source-summary", "my-doc"],
  license: ["CC BY-SA", "PD", "KOGL-4", "own"],
  claim_type: ["fact", "interpretation", "unverifiable", "copyright-blocked"],
};
const ORIGINAL_OK = ["CC BY-SA", "PD", "KOGL-4"];
export const MIN_TEXT = 120;

const filled = (v) => typeof v === "string" ? v.trim() !== "" : v !== undefined && v !== null;

// 반환: { keep: 인덱스에 넣을 청크, skipped: 뺀 기사, errors: 중단 사유, missingLicenseOrUrl: 개수 }
export function validateChunks(chunks) {
  if (!Array.isArray(chunks)) throw new Error("data/chunks.json은 배열이어야 합니다.");
  const errors = [], skipped = [], keep = [], seen = new Set();
  let missingLicenseOrUrl = 0;

  chunks.forEach((c, i) => {
    const label = c?.id ?? `${i + 1}번째 항목`;
    if (!filled(c?.license) || !filled(c?.url)) missingLicenseOrUrl++;

    // 기사: 언론사·url·발행일 중 하나라도 없으면 오류가 아니라 '건너뜀'
    if (c?.source_type === "article") {
      const lack = ["publisher", "url", "published_at"].filter((f) => !filled(c[f]));
      if (lack.length) { skipped.push(`${label} (없음: ${lack.join(", ")})`); return; }
    }

    const missing = REQUIRED.filter((f) => !filled(c?.[f]));
    if (missing.length) errors.push(`${label}: 필수 필드 누락 (${missing.join(", ")})`);
    for (const [f, allowed] of Object.entries(ALLOWED)) {
      if (filled(c?.[f]) && !allowed.includes(c[f])) errors.push(`${label}: ${f} 값 "${c[f]}"는 허용되지 않음`);
    }
    if (filled(c?.id)) {
      if (seen.has(c.id)) errors.push(`${c.id}: 중복 id`);
      seen.add(c.id);
      if (filled(c?.category) && !c.id.startsWith(c.category + "-")) errors.push(`${c.id}: id 접두어가 category(${c.category})와 다름`);
    }
    // copyright-blocked 청크는 제목·주제만 담으므로 120자 규칙의 예외
    if (c?.claim_type !== "copyright-blocked" && typeof c?.text === "string" && c.text.length < MIN_TEXT) {
      errors.push(`${label}: text ${c.text.length}자 (최소 ${MIN_TEXT}자)`);
    }
    if (filled(c?.license) && !ORIGINAL_OK.includes(c.license) && !["source-summary", "my-doc", "article"].includes(c?.source_type)) {
      errors.push(`${label}: license ${c.license}인데 source_type이 source-summary/my-doc/article이 아님 (원문 수록 금지)`);
    }
    keep.push(c);
  });
  return { keep, skipped, errors, missingLicenseOrUrl };
}

// 단독 실행 시 결과만 보여 준다
if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const chunks = JSON.parse(await readFile(new URL("../data/chunks.json", import.meta.url), "utf-8"));
  const r = validateChunks(chunks);
  console.log(`청크 ${chunks.length}개 검사 — 통과 ${r.keep.length}, 건너뛴 기사 ${r.skipped.length}, 오류 ${r.errors.length}`);
  console.log(`license·url 누락 ${r.missingLicenseOrUrl}건`);
  r.skipped.forEach((s) => console.log(`  건너뜀: ${s}`));
  r.errors.forEach((e) => console.log(`  ✗ ${e}`));
  if (r.errors.length) process.exitCode = 1;
}
