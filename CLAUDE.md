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
- id는 분류 접두어 + 번호(ST- / MK- / WK- / CS- / IP- / TH-). 한 번 붙인 id의 뜻은 바꾸지 않는다.
- text는 최소 120자, 주장 하나, 혼자 읽어도 뜻이 통해야 한다. 원문에 없는 말을 보태지 않는다.
- category: ST(스튜디오 기법) / MK(확장·마케팅) / WK(스튜디오 작품) / CS(국내 사례) / IP(내 SOP) / TH(스토리텔링 이론).
- 비슷한 내용을 여러 청크로 쪼개지 않는다. 목록(원칙·단계·비트)은 한 청크에 담고, 같은 사실은 한 청크에만 둔다. 폐기한 id는 다시 쓰지 않는다.
- source_type: wikipedia / public-domain / gov-open / official / article / source-summary / my-doc.
- license: CC BY-SA / PD / KOGL-4 / own. 원문을 넣을 수 있는 건 CC BY-SA·PD·(조건 기록한) KOGL-4뿐, 나머지는 원문 문장 없이 출처 요약만.
- claim_type: fact / interpretation / unverifiable / copyright-blocked. 자료가 없으면 unverifiable, 추정값을 채우지 않는다.
- url은 확인 가능한 출처. 위키백과는 문서 주소, 논문은 KCI 주소, 내 문서는 `docs/ip-sop.md#제목`(공백은 하이픈).
- 기사(article)는 publisher·url·published_at이 모두 있어야 하며, 하나라도 없으면 인덱스에서 뺀다.

## 결정 필요
- 임베딩 모델 설정은 무엇으로 할까? (STEP 3)
- 검색 결과를 몇 개 보여 주고, 점수가 몇 점 아래면 "관련 자료가 약함"으로 볼까? (STEP 4, 출발값 0.55)
- LLM에게 어떤 규칙(시스템 메시지)을 줄까? (STEP 6)
