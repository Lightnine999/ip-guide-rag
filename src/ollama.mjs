// STEP 7: Ollama와 주고받기 (CLAUDE.md 생성 계약)
// ① 켜져 있나 확인  ② 질문 보내기  ③ 조각(NDJSON)으로 받기  ④ done 신호
export const OLLAMA_URL = "http://localhost:11434";
export const LLM_MODEL = "qwen3.5:2b";

export async function pingOllama() {
  try {
    const res = await fetch(`${OLLAMA_URL}/api/tags`, { signal: AbortSignal.timeout(3000) });
    return res.ok;
  } catch {
    return false;
  }
}

// messages를 보내고 토큰이 올 때마다 onToken(토큰) 호출, 전체 답변 문자열 반환
export async function chatStream(messages, onToken = () => {}) {
  const res = await fetch(`${OLLAMA_URL}/api/chat`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ model: LLM_MODEL, messages, stream: true, think: false, options: { temperature: 0 } }),
  });
  if (!res.ok) throw new Error(`Ollama 응답 오류 ${res.status}: ${await res.text()}`);

  const decoder = new TextDecoder("utf-8"); // { stream: true }로 써야 한글이 조각 경계에서 깨지지 않는다
  let buffer = "", answer = "";
  const handleLine = (line) => {
    if (!line.trim()) return false;
    const data = JSON.parse(line);
    if (data.error) throw new Error(`Ollama 오류: ${data.error}`);
    const token = data.message?.content ?? "";
    if (token) { answer += token; onToken(token); }
    return data.done === true;
  };
  for await (const chunk of res.body) {
    buffer += decoder.decode(chunk, { stream: true });
    const lines = buffer.split("\n");
    buffer = lines.pop(); // 덜 받은 줄은 남겨 다음 조각과 합친다
    for (const line of lines) if (handleLine(line)) return answer;
  }
  buffer += decoder.decode();
  handleLine(buffer);
  return answer;
}
