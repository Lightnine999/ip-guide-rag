// 임베딩 계약(CLAUDE.md "임베딩 계약")을 정의하는 유일한 곳
import { pipeline } from "@huggingface/transformers";

export const MODEL = "onnx-community/embeddinggemma-300m-ONNX";
export const DTYPE = "q8";
export const DIM = 768;

const DOCUMENT_PREFIX = "title: ";
const QUERY_PREFIX = "task: search result | query: ";

// 파이프라인은 한 번만 만들어 재사용한다
let extractorPromise = null;

function getExtractor() {
  if (!extractorPromise) {
    console.log("임베딩 모델 불러오는 중…(첫 실행은 약 300MB 다운로드)");
    extractorPromise = pipeline("feature-extraction", MODEL, { dtype: DTYPE }).catch((error) => {
      extractorPromise = null; // 실패한 Promise를 들고 있지 않는다
      throw error;
    });
  }
  return extractorPromise;
}

async function embed(input) {
  const extractor = await getExtractor();
  const output = await extractor(input, { pooling: "mean", normalize: true });
  return Array.from(output.data);
}

// 문서: "title: 섹션명 | text: 본문"
export function documentInput(chunk) {
  return DOCUMENT_PREFIX + chunk.section + " | text: " + chunk.text;
}

export function embedDocument(chunk) {
  return embed(documentInput(chunk));
}

// 질문: "task: search result | query: 질문"
export function embedQuery(question) {
  return embed(QUERY_PREFIX + question);
}
