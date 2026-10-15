# IP 기획 가이드 챗봇

요구사항 원본은 `PRD.md`입니다. PRD와 다르게 만들어야 할 것 같으면 먼저 물어봅니다.

## 제품
- IP 기획을 처음 하는 애니메이터(나)가 스토리텔링 기법, IP 확장 전략, 국내 캐릭터 사례를 매번 따로 찾아야 해서 불편하다. 일반 LLM에 물으면 사례·연도·수치를 지어낸다.
- 질문하면 출처가 확인된 자료만 근거로 안내하는 챗봇을 만든다.
- 1단계: 질문과 비슷한 청크를 점수·출처와 함께 보여 준다.
- 2단계: 찾은 청크만으로 LLM이 답하고, 문장마다 근거 ID를 단다.

## 비목표
- 웹 화면, 서버, 배포, 로그인은 만들지 않는다.
- 아이디어 생성, 작품 평가, 성공 예측은 하지 않는다. 방법론과 사례 안내만 한다.
- 이미지·영상 자료 분석, 최신 매출·팔로워 수치 갱신은 하지 않는다.
- 저작권이 있는 책·논문·기사 원문은 저장하지 않는다.

## 환경
- 내 Mac에서만 돌린다. Node.js로 만들고 터미널에서 실행한다.
- LLM은 Ollama의 qwen3.5:2b (2단계에서만).

## 작업 규칙
- 내가 요청한 것만 만든다. 요청하지 않은 파일은 고치지 않는다.
- 모르는 사실이나 URL은 지어내지 않는다. 자료에 없으면 "확인 불가"로 둔다.
- 저작권 침해 소지가 있는 자료는 내용을 넣지 않는다.
- 만들고 나면 직접 실행해 보고 결과를 같이 보여 준다.

## 데이터 계약 (STEP 2에서 결정)
- 청크 원본은 `data/chunks.json`, 배열이고 각 항목의 필수 필드는 { id, text, url, section, category, source_type, license, claim_type, checked_at }.
- 선택 필드: license_note, published_at, location, data_year, evidence_group, review, publisher(기사 필수), wiki_title, paper.
- id는 분류 접두어 + 번호(ST- / MK- / WK- / CS- / TH-). 한 번 붙인 id의 뜻은 바꾸지 않는다.
- text는 최소 120자, 주장 하나, 혼자 읽어도 뜻이 통해야 한다. 원문에 없는 말을 보태지 않는다. 내 개인 생각, Claude의 추측·예측·해석은 넣지 않는다.
- category: ST(스튜디오 기법) / MK(확장·마케팅) / WK(스튜디오 작품) / CS(국내 사례) / TH(스토리텔링 이론). IP(내 작업 기준)는 2026-10-15에 없앴고 IP-001~003은 폐기 id.
- 비슷한 내용을 여러 청크로 쪼개지 않는다. 목록(원칙·단계·비트)은 한 청크에 담고, 같은 사실은 한 청크에만 둔다. 폐기한 id는 다시 쓰지 않는다.
- source_type: wikipedia / public-domain / gov-open / official / article / paper-abstract(논문 초록 정리).
- license: CC BY-SA / PD / KOGL-4 / link-only(원문 미수록, 출처 링크만). 원문을 넣을 수 있는 건 CC BY-SA·PD·(조건 기록한) KOGL-4뿐, 나머지는 원문 문장 없이 출처에 적힌 사실만 정리한다.
- claim_type: fact / unverifiable / copyright-blocked. 자료가 없으면 unverifiable, 추정값을 채우지 않는다.
- url은 확인 가능한 출처. 위키백과는 문서 주소, 논문은 KCI 주소.
- 기사(article)는 publisher·url·published_at이 모두 있어야 하며, 하나라도 없으면 인덱스에서 뺀다.

## 임베딩 계약 (STEP 3에서 결정)
- 모델은 `onnx-community/embeddinggemma-300m-ONNX`. transformers.js `pipeline("feature-extraction", MODEL, { dtype: "q8" })`, 호출 옵션 `{ pooling: "mean", normalize: true }`, 차원 768.
- 입력 형식: 문서 `"title: " + section + " | text: " + text`, 질문 `"task: search result | query: " + question`.
- `src/embedder.mjs` 한 곳에서만 정의하고 파이프라인은 한 번만 만든다. export: `embedDocument(chunk)`, `embedQuery(question)`, `documentInput(chunk)`, `MODEL`, `DTYPE`, `DIM`.
- 청크 검사는 `src/validate-chunks.mjs`(데이터 계약)에서만 한다. 기사 요건이 빠진 청크는 오류가 아니라 '건너뜀'으로 출력한다.
- 벡터 저장소 `data/vectors.json` 형식: `{ model, dtype, dim, createdAt, count, chunks: [{ id, text, url, section, category, source_type, license, claim_type, checked_at, …, vector }] }`.
- 저장소의 `model`·`dtype`·`dim`이 현재 embedder와 다르면 검색을 거부하고 "인덱스를 다시 만드세요(node src/build-index.mjs)"라고 안내한다.

## 검색 계약 (STEP 4에서 결정)
- 벡터는 정규화되어 있으므로 코사인 유사도 = 내적. 점수 내림차순 top-k, 기본 k=3 (`--k`로 변경).
- `--category ST|MK|WK|CS|TH`로 검색 범위를 좁힐 수 있다 (선택).
- `DEFAULT_K`, `WEAK_THRESHOLD`(0.58, 아래 근거)는 `src/search.mjs`에서만 정의·export하고 다른 파일은 import해서 쓴다.
- 1위 점수가 `WEAK_THRESHOLD`보다 낮으면 "관련 자료가 약함"과 1위 점수를 표시한다. 결과는 버리지 않는다.
- 결과마다 id, 점수, section, text 앞부분, url(+url_extra), source_type/license, 확인일을 보여 준다. `copyright-blocked` 청크는 내용 대신 "저작권 침해 요소가 있어 내용 확인 불가"를 보여 준다.
- 저장소가 없거나 임베딩 설정이 다르면 검색하지 않고 인덱스를 다시 만들라고 안내한다.
- 기준 점수 결정 (STEP 5, 2026-10-15): 평가 20문항에서 자료 안 질문 1위 최저점 0.640, 걸러야 할 자료 밖 질문 최고점 0.521. 0.53~0.63은 판정 결과가 같으므로 양쪽 여유가 같은 한가운데 0.58로 정했다(0.55는 자료 밖 쪽 여유 0.029, 0.58은 양쪽 약 0.06). "내 캐릭터 아이디어가 성공할까?"(0.647)처럼 주제는 같지만 답이 없는 질문은 점수로 가를 수 없으므로 STEP 6 규칙으로 막는다.

## 생성 계약 (STEP 6에서 결정)
- 시스템 메시지 (제품 결정, 내가 고칠 수 있는 초안): "당신은 IP 기획 가이드 도우미입니다. 주어진 자료(스토리텔링 이론, 스튜디오 제작 기법과 작품, IP 확장 전략, 국내 캐릭터 사례)에 근거한 내용만 답합니다. 자료가 직접 뒷받침하지 않는 내용, 특히 수치·연도·매출·성공 원인은 추측하지 말고 '확인 불가'라고 답합니다. 작품 평가, 아이디어 생성, 성공 예측을 묻는 질문에는 '자료로 판단할 수 없어 확인 불가'라고 답합니다. 저작권 때문에 내용이 수록되지 않은 자료는 '저작권 침해 요소가 있어 내용 확인 불가'라고 답합니다. 근거 조각의 ID만 [MK-000]처럼 대괄호로 감싸 해당 문장 끝에 표시합니다."
- 사용자 메시지(프롬프트) 순서: ① 자료 소개 ② 근거 원칙 ③ 출처 규칙 ④ KST 현재 시각 ⑤ [자료] + "[TH-xxx] (section) text" 줄들(대괄호 안에는 ID만) ⑥ [질문] + 질문 ⑦ 출처 규칙 한 번 더.
- ① 자료 소개: "다음 자료는 IP 기획에 관한 위키백과, 저작권이 끝난 원전, 논문 초록 정리에서 뽑은 조각입니다."
- 질문 종류 관문 (`src/scope-guard.mjs`의 checkScope, 검색보다 먼저): 성공 예측("성공할까", "잘 팔릴까", "뜰까", "성공 가능성"), 작품 평가("평가해 줘", "피드백 좀", "몇 점", "내 캐릭터 … 어때"), 아이디어 생성("아이디어 줘", "이름 지어 줘", "설정 만들어 줘") 표현이 있으면 검색·LLM 없이 "작품 평가·아이디어 생성·성공 예측은 자료로 판단할 수 없어 확인 불가"와 걸린 표현을 반환한다. 단어 하나("성공", "평가", "아이디어")가 아니라 예측·평가 요청·생성 요청 표현만 잡는다("카카오프렌즈가 성공한 과정은?"은 통과). 패턴을 바꾸면 `node src/test-scope.mjs`(막을 질문·통과할 질문 목록)가 모두 통과해야 한다. 점수(0.647)로는 "내 캐릭터 아이디어가 성공할까?"를 막을 수 없어서 둔 관문이다.
- LLM에 넘기기 전 판정 (`ask.mjs`의 decide, 프롬프트 조립보다 먼저):
  · 1위 점수 < `WEAK_THRESHOLD`(0.58): 프롬프트를 만들지 않고 LLM도 부르지 않는다. "관련 자료가 약함, 확인 불가 (1위 점수 x < 기준 0.58)"를 바로 반환한다. --show-prompt도 같다.
  · 1위 자료가 `copyright-blocked`: LLM을 부르지 않고 "저작권 침해 요소가 있어 내용 확인 불가"와 출처를 반환한다.
  · 둘 다 아닐 때만 프롬프트를 조립해 LLM에 넘긴다.
- ② 근거 원칙: "자료에 근거한 내용만 답하고, 자료에 없으면 '확인 불가'라고 말합니다." (기준 미만 질문은 여기까지 오지 않으므로 약한 근거 문구는 두지 않는다)
- ③ 출처 규칙: "근거가 된 조각의 ID만 [MK-000]처럼 대괄호로 감싸 해당 문장 끝에 표시합니다."
- ④ "현재 시각은 {KST 시각}(KST)입니다. '지금', '올해', '다음 주' 같은 상대 표현은 이 시각을 기준으로 해석합니다."
- ⑤ 자료 줄: `copyright-blocked` 청크는 text 대신 "저작권 침해 요소가 있어 내용 미수록"을 넣는다.
- 표기 견본 `[MK-000]`: ③·⑦과 시스템 메시지의 ID 예시는 실제로 없는 `MK-000`을 쓴다(실제 id를 예시로 쓰면 작은 모델이 베껴 써서 엉뚱한 자료에 ✓가 붙는다). MK-000은 청크 id로 쓰지 않는다. 답변에 MK-000이 나오면 "⚠ 견본 ID를 그대로 베꼈습니다"를 표시하고, STEP 8에서 근거 표시 오류로 센다.
- ⑦ 출처 규칙 한 번 더: "(답할 때 근거로 쓴 자료의 ID를 [MK-000]처럼 문장 끝에 붙입니다.)"
- LLM: Ollama http://localhost:11434, 모델 qwen3.5:2b, POST /api/chat, { model, messages, stream: true, think: false, options: { temperature: 0 } }. 응답은 NDJSON. TextDecoder는 { stream: true }.
- 근거 표시는 LLM에 맡기지 않는다. 답변 뒤에 LLM에게 넘긴 자료를 모두 보여 주고, 답변에 ID가 적힌 자료에 ✓를 붙인다.
- 실행 (STEP 7): `node src/ask.mjs "질문" [--k 3] [--show-prompt] [--no-rag]`. `src/ollama.mjs`는 `pingOllama()`(GET /api/tags), `chatStream(messages, onToken)`(NDJSON 줄 단위 파싱, 덜 받은 줄은 버퍼에 남김, 전체 답변 반환)만 담당한다.
- 출력 순서: "🔎 검색 결과"(id·점수·section, 약하면 ⚠) → "💬 답변"(스트리밍) → "📚 근거 (LLM에게 넘긴 자료 · ✓ = 답변에 ID가 표시된 자료)"(검색된 자료 전부, 답변에 그 ID 글자가 괄호 모양과 상관없이 있으면 ✓) → "⏱ 검색 x초 · 답변 y초". ✓가 하나도 없으면 "(답변에 ID 표시가 없습니다. 위 자료와 답변을 비교해 확인하세요)". 관문에서 멈추면 💬 자리에 멈춘 이유와 "(LLM에 넘기지 않음)"만 출력한다.
- `--no-rag`: 비교 실험용. 관문·검색·시스템 메시지 없이 질문만 LLM에 보내고 💬 답변과 ⏱ 답변 시간만 출력한다.
- Ollama 연결 확인은 실제로 LLM을 호출할 때만 한다(--show-prompt는 Ollama 없이 동작). 연결이 안 되면 "Ollama가 실행 중인지 확인하세요"와 확인 명령을 안내하고 종료.

## 결정 필요
- (없음)
