# chunks.json 검토표 (STEP 2, v6 · 2026-10-15)

원문 대조 체크: url을 열어 text 내용이 원문에 있는지 확인하고 ✅ 표시. KCI 청크는 초록 기준, `url_extra`가 있는 작품은 영문 위키백과로 보충한 청크입니다.

## v2 변경 내역

- 목록을 쪼개 비슷해 보이던 청크를 하나로 합침: ST-102~104 → ST-102 (12원칙 전체), TH-102~104 → TH-102 (캠벨 17단계), TH-113~114 → TH-113 (보글러 12단계), TH-123~125 → TH-123 (비트 시트 15비트). 폐기 id: ST-103, ST-104, TH-103, TH-104, TH-114, TH-124, TH-125
- 사실이 겹치던 문장 정리: ST-111(픽사 창업 내용 삭제 → MK-014에만), CS-005(뉴욕 스토어 → CS-008에만), MK-013(토이 스토리 최초 CG → WK-201에만)
- 새 분류 WK(스튜디오 작품) 추가: 스튜디오 지브리 23편(WK-101~123), 픽사 31편(WK-201~231)
- v3 (STEP 2 검수): PRD 코퍼스 표에 있었는데 빠진 출처 13개 청크 추가 — ST-105~106 스토리보드, ST-107 모델 시트, TH-007 서사학, TH-008 클리셰, TH-009 시학(위키), TH-010 3막 구조, TH-011 기승전결, TH-012 체호프의 총, TH-013 36가지 극적 상황, TH-014~016 『시학』 원문(구텐베르크, 퍼블릭 도메인)
- v3 검수: 필수 필드·허용 값·라이선스 조합·id 접두어·120자 규칙을 119개 전체에 자동 검사 → 위반 0건. WK 제외 청크쌍 유사도 최대 0.09
- v4 (STEP 6 중): 내 작업 기준(IP-001~003, `docs/ip-sop.md`)을 RAG에서 뺌 → 폐기 id IP-001~003. 개인 생각·Claude 추측이 섞일 수 있는 자료는 넣지 않는다. 이름 변경: source_type `source-summary` → `paper-abstract`(논문 초록 정리), license `own` → `link-only`(원문 미수록, 출처 링크만). 청크 116개
- v4 추가: "IP가 뭐야?" 질문에 근거가 없던 문제 → MK-015~017 IP 정의·종류(위키백과 「지식 재산권」, 「Intellectual property」, 2026-10-15 확인). 청크 119개
- v5 (STEP 8 전): 무직타이거 기사 5건(뉴시스 2022-01-10, 경제인뉴스 2023-03-31, 문화뉴스 2024-03-07, MTN 2025-04-02, 뉴스핌 2026-02-13)을 원문 없이 요약해 CS-021~026 추가. 기사에 적힌 사실만, 회사 발표는 "대원미디어에 따르면"으로 출처를 밝힘. 매출 수치는 출처가 없어 넣지 않음. CS-008·TH-102 본문에 섞여 있던 검토 메모를 `review_note`로 옮김. 청크 125개
- v6: 조구만 스튜디오 기사 5건(연세춘추 2017-10-25, 중앙일보·폴인 2022-04-14, 이코노믹리뷰 2023-07-17, 디자인플러스 2025-01-23)을 원문 없이 요약해 CS-031~038 추가. 초기 채널은 페이스북 페이지(2017-04-01, 연세춘추)로, "인스타그램에서 먼저 팬을 모았다"는 출처를 찾지 못해 넣지 않음. 청크 133개
- 중복 점검: 전체 청크 쌍의 글자 3-gram 유사도 최대 0.20 (작품 청크끼리의 '픽사 제작·디즈니 배급' 같은 공통 문구). WK 외 청크끼리는 모두 0.12 미만.

| ✅ | id | 분류 | 출처 종류 | 글자 수 | 섹션 | url |
| --- | --- | --- | --- | --- | --- | --- |
| [ ] | ST-101 | ST | wikipedia | 231 | 위키백과 「Disney Animation: The Illusion of Life」 – 개요 | https://en.wikipedia.org/wiki/Disney_Animation:_The_Illusion_of_Life |
| [ ] | ST-102 | ST | wikipedia | 431 | 위키백과 「Twelve basic principles of animation」 – 애니메이션 12원칙 (전체) | https://en.wikipedia.org/wiki/Twelve_basic_principles_of_animation |
| [ ] | ST-105 | ST | wikipedia | 212 | 위키백과 「스토리보드」 – 정의와 쓰임 | https://ko.wikipedia.org/wiki/%EC%8A%A4%ED%86%A0%EB%A6%AC%EB%B3%B4%EB%93%9C |
| [ ] | ST-106 | ST | wikipedia | 205 | 위키백과 「스토리보드」 – 디즈니에서의 정착과 샷 용어 | https://ko.wikipedia.org/wiki/%EC%8A%A4%ED%86%A0%EB%A6%AC%EB%B3%B4%EB%93%9C |
| [ ] | ST-107 | ST | wikipedia | 216 | 위키백과 「Model sheet」 – 모델 시트의 목적과 구성 | https://en.wikipedia.org/wiki/Model_sheet |
| [ ] | ST-111 | ST | wikipedia | 237 | 위키백과 「Creativity, Inc.」 – 개요 | https://en.wikipedia.org/wiki/Creativity,_Inc. |
| [ ] | ST-112 | ST | wikipedia | 208 | 위키백과 「Pixar」 – 픽사 브레인트러스트 | https://en.wikipedia.org/wiki/Pixar |
| [ ] | MK-001 | MK | wikipedia | 174 | 위키백과 「원 소스 멀티 유즈」 – 정의와 유래 | https://ko.wikipedia.org/wiki/%EC%9B%90_%EC%86%8C%EC%8A%A4_%EB%A9%80%ED%8B%B0_%EC%9C%A0%EC%A6%88 |
| [ ] | MK-002 | MK | wikipedia | 168 | 위키백과 「원 소스 멀티 유즈」 – 한국문화콘텐츠진흥원의 정의 | https://ko.wikipedia.org/wiki/%EC%9B%90_%EC%86%8C%EC%8A%A4_%EB%A9%80%ED%8B%B0_%EC%9C%A0%EC%A6%88 |
| [ ] | MK-003 | MK | wikipedia | 169 | 위키백과 「미디어 믹스」 – 정의와 의미 변화 | https://ko.wikipedia.org/wiki/%EB%AF%B8%EB%94%94%EC%96%B4_%EB%AF%B9%EC%8A%A4 |
| [ ] | MK-004 | MK | wikipedia | 174 | 위키백과 「미디어 믹스」 – 기획 단계부터 동시 전개 | https://ko.wikipedia.org/wiki/%EB%AF%B8%EB%94%94%EC%96%B4_%EB%AF%B9%EC%8A%A4 |
| [ ] | MK-005 | MK | wikipedia | 186 | 위키백과 「트랜스미디어 스토리텔링」 – 정의와 OSMU와의 차이 | https://ko.wikipedia.org/wiki/%ED%8A%B8%EB%9E%9C%EC%8A%A4%EB%AF%B8%EB%94%94%EC%96%B4_%EC%8A%A4%ED%86%A0%EB%A6%AC%ED%85%94%EB%A7%81 |
| [ ] | MK-006 | MK | wikipedia | 185 | 위키백과 「트랜스미디어 스토리텔링」 – 성장 요인과 사용자 참여 | https://ko.wikipedia.org/wiki/%ED%8A%B8%EB%9E%9C%EC%8A%A4%EB%AF%B8%EB%94%94%EC%96%B4_%EC%8A%A4%ED%86%A0%EB%A6%AC%ED%85%94%EB%A7%81 |
| [ ] | MK-007 | MK | wikipedia | 153 | 위키백과 「미디어 프랜차이즈」 – 정의 | https://ko.wikipedia.org/wiki/%EB%AF%B8%EB%94%94%EC%96%B4_%ED%94%84%EB%9E%9C%EC%B0%A8%EC%9D%B4%EC%A6%88 |
| [ ] | MK-008 | MK | wikipedia | 158 | 위키백과 「미디어 프랜차이즈」 – 트랜스미디어 프랜차이즈와 팬덤 | https://ko.wikipedia.org/wiki/%EB%AF%B8%EB%94%94%EC%96%B4_%ED%94%84%EB%9E%9C%EC%B0%A8%EC%9D%B4%EC%A6%88 |
| [ ] | MK-009 | MK | wikipedia | 180 | 위키백과 「미디어 프랜차이즈」 – 확장 방식: 라이선스와 동시 출시 | https://ko.wikipedia.org/wiki/%EB%AF%B8%EB%94%94%EC%96%B4_%ED%94%84%EB%9E%9C%EC%B0%A8%EC%9D%B4%EC%A6%88 |
| [ ] | MK-010 | MK | wikipedia | 186 | 위키백과 「미디어 프랜차이즈」 – 캐논 콘텐츠 | https://ko.wikipedia.org/wiki/%EB%AF%B8%EB%94%94%EC%96%B4_%ED%94%84%EB%9E%9C%EC%B0%A8%EC%9D%B4%EC%A6%88 |
| [ ] | MK-011 | MK | wikipedia | 185 | 위키백과 「마블 시네마틱 유니버스」 – 공유 세계관 방식 | https://ko.wikipedia.org/wiki/%EB%A7%88%EB%B8%94_%EC%8B%9C%EB%84%A4%EB%A7%88%ED%8B%B1_%EC%9C%A0%EB%8B%88%EB%B2%84%EC%8A%A4 |
| [ ] | MK-012 | MK | wikipedia | 204 | 위키백과 「스튜디오 지브리」 – 설립과 운영 방식 | https://ko.wikipedia.org/wiki/%EC%8A%A4%ED%8A%9C%EB%94%94%EC%98%A4_%EC%A7%80%EB%B8%8C%EB%A6%AC |
| [ ] | MK-013 | MK | wikipedia | 183 | 위키백과 「픽사」 – 개요와 디즈니 인수 | https://ko.wikipedia.org/wiki/%ED%94%BD%EC%82%AC |
| [ ] | MK-014 | MK | wikipedia | 178 | 위키백과 「픽사」 – 출발: 하드웨어 회사에서 스튜디오로 | https://ko.wikipedia.org/wiki/%ED%94%BD%EC%82%AC |
| [ ] | MK-015 | MK | wikipedia | 190 | 위키백과 「지식 재산권」 – IP의 정의 | https://ko.wikipedia.org/wiki/%EC%A7%80%EC%8B%9D_%EC%9E%AC%EC%82%B0%EA%B6%8C |
| [ ] | MK-016 | MK | wikipedia | 226 | 위키백과 「지식 재산권」 – 종류: 산업재산권과 저작권 | https://ko.wikipedia.org/wiki/%EC%A7%80%EC%8B%9D_%EC%9E%AC%EC%82%B0%EA%B6%8C |
| [ ] | MK-017 | MK | wikipedia | 207 | 위키백과 「Intellectual property」 – IP와 IPR의 구분, 제도의 목적 | https://en.wikipedia.org/wiki/Intellectual_property |
| [ ] | WK-101 | WK | wikipedia | 192 | 스튜디오 지브리 작품 – 바람계곡의 나우시카 (1984) | https://ko.wikipedia.org/wiki/%EB%B0%94%EB%9E%8C%EA%B3%84%EA%B3%A1%EC%9D%98_%EB%82%98%EC%9A%B0%EC%8B%9C%EC%B9%B4_%28%EC%98%81%ED%99%94%29 |
| [ ] | WK-102 | WK | wikipedia | 182 | 스튜디오 지브리 작품 – 천공의 성 라퓨타 (1986) | https://ko.wikipedia.org/wiki/%EC%B2%9C%EA%B3%B5%EC%9D%98_%EC%84%B1_%EB%9D%BC%ED%93%A8%ED%83%80 |
| [ ] | WK-103 | WK | wikipedia | 133 | 스튜디오 지브리 작품 – 이웃집 토토로 (1988) | https://ko.wikipedia.org/wiki/%EC%9D%B4%EC%9B%83%EC%A7%91_%ED%86%A0%ED%86%A0%EB%A1%9C |
| [ ] | WK-104 | WK | wikipedia | 178 | 스튜디오 지브리 작품 – 반딧불이의 묘 (1988) | https://ko.wikipedia.org/wiki/%EB%B0%98%EB%94%A7%EB%B6%88%EC%9D%B4%EC%9D%98_%EB%AC%98 |
| [ ] | WK-105 | WK | wikipedia | 172 | 스튜디오 지브리 작품 – 마녀 배달부 키키 (1989) | https://ko.wikipedia.org/wiki/%EB%A7%88%EB%85%80_%EB%B0%B0%EB%8B%AC%EB%B6%80_%ED%82%A4%ED%82%A4 |
| [ ] | WK-106 | WK | wikipedia | 138 | 스튜디오 지브리 작품 – 추억은 방울방울 (1991) | https://ko.wikipedia.org/wiki/%EC%B6%94%EC%96%B5%EC%9D%80_%EB%B0%A9%EC%9A%B8%EB%B0%A9%EC%9A%B8 |
| [ ] | WK-107 | WK | wikipedia | 164 | 스튜디오 지브리 작품 – 붉은 돼지 (1992) | https://ko.wikipedia.org/wiki/%EB%B6%89%EC%9D%80_%EB%8F%BC%EC%A7%80 |
| [ ] | WK-108 | WK | wikipedia | 198 | 스튜디오 지브리 작품 – 바다가 들린다 (1993) | https://ko.wikipedia.org/wiki/%EB%B0%94%EB%8B%A4%EA%B0%80_%EB%93%A4%EB%A6%B0%EB%8B%A4 |
| [ ] | WK-109 | WK | wikipedia | 136 | 스튜디오 지브리 작품 – 폼포코 너구리 대작전 (1994) | https://ko.wikipedia.org/wiki/%ED%8F%BC%ED%8F%AC%EC%BD%94_%EB%84%88%EA%B5%AC%EB%A6%AC_%EB%8C%80%EC%9E%91%EC%A0%84 |
| [ ] | WK-110 | WK | wikipedia | 191 | 스튜디오 지브리 작품 – 귀를 기울이면 (1995) | https://ko.wikipedia.org/wiki/%EA%B7%80%EB%A5%BC_%EA%B8%B0%EC%9A%B8%EC%9D%B4%EB%A9%B4_%28%EC%98%81%ED%99%94%29 |
| [ ] | WK-111 | WK | wikipedia | 207 | 스튜디오 지브리 작품 – 모노노케 히메 (1997) | https://ko.wikipedia.org/wiki/%EB%AA%A8%EB%85%B8%EB%85%B8%EC%BC%80_%ED%9E%88%EB%A9%94 |
| [ ] | WK-112 | WK | wikipedia | 135 | 스튜디오 지브리 작품 – 이웃집 야마다군 (1999) | https://ko.wikipedia.org/wiki/%EC%9D%B4%EC%9B%83%EC%A7%91_%EC%95%BC%EB%A7%88%EB%8B%A4%EA%B5%B0 |
| [ ] | WK-113 | WK | wikipedia | 206 | 스튜디오 지브리 작품 – 센과 치히로의 행방불명 (2001) | https://ko.wikipedia.org/wiki/%EC%84%BC%EA%B3%BC_%EC%B9%98%ED%9E%88%EB%A1%9C%EC%9D%98_%ED%96%89%EB%B0%A9%EB%B6%88%EB%AA%85 |
| [ ] | WK-114 | WK | wikipedia | 137 | 스튜디오 지브리 작품 – 고양이의 보은 (2002) | https://ko.wikipedia.org/wiki/%EA%B3%A0%EC%96%91%EC%9D%B4%EC%9D%98_%EB%B3%B4%EC%9D%80 |
| [ ] | WK-115 | WK | wikipedia | 157 | 스튜디오 지브리 작품 – 하울의 움직이는 성 (2004) | https://ko.wikipedia.org/wiki/%ED%95%98%EC%9A%B8%EC%9D%98_%EC%9B%80%EC%A7%81%EC%9D%B4%EB%8A%94_%EC%84%B1_%28%EC%98%81%ED%99%94%29 |
| [ ] | WK-116 | WK | wikipedia | 169 | 스튜디오 지브리 작품 – 게드전기: 어스시의 전설 (2006) | https://ko.wikipedia.org/wiki/%EA%B2%8C%EB%93%9C%EC%A0%84%EA%B8%B0%3A_%EC%96%B4%EC%8A%A4%EC%8B%9C%EC%9D%98_%EC%A0%84%EC%84%A4 |
| [ ] | WK-117 | WK | wikipedia | 172 | 스튜디오 지브리 작품 – 벼랑 위의 포뇨 (2008) | https://ko.wikipedia.org/wiki/%EB%B2%BC%EB%9E%91_%EC%9C%84%EC%9D%98_%ED%8F%AC%EB%87%A8 |
| [ ] | WK-118 | WK | wikipedia | 177 | 스튜디오 지브리 작품 – 마루 밑 아리에티 (2010) | https://ko.wikipedia.org/wiki/%EB%A7%88%EB%A3%A8_%EB%B0%91_%EC%95%84%EB%A6%AC%EC%97%90%ED%8B%B0 |
| [ ] | WK-119 | WK | wikipedia | 156 | 스튜디오 지브리 작품 – 코쿠리코 언덕에서 (2011) | https://ko.wikipedia.org/wiki/%EC%BD%94%EC%BF%A0%EB%A6%AC%EC%BD%94_%EC%96%B8%EB%8D%95%EC%97%90%EC%84%9C |
| [ ] | WK-120 | WK | wikipedia | 204 | 스튜디오 지브리 작품 – 바람이 분다 (2013) | https://ko.wikipedia.org/wiki/%EB%B0%94%EB%9E%8C%EC%9D%B4_%EB%B6%84%EB%8B%A4_%28%EC%98%81%ED%99%94%29 |
| [ ] | WK-121 | WK | wikipedia | 185 | 스튜디오 지브리 작품 – 가구야 공주 이야기 (2013) | https://ko.wikipedia.org/wiki/%EA%B0%80%EA%B5%AC%EC%95%BC_%EA%B3%B5%EC%A3%BC_%EC%9D%B4%EC%95%BC%EA%B8%B0 |
| [ ] | WK-122 | WK | wikipedia | 194 | 스튜디오 지브리 작품 – 추억의 마니 (2014) | https://ko.wikipedia.org/wiki/%EC%B6%94%EC%96%B5%EC%9D%98_%EB%A7%88%EB%8B%88 |
| [ ] | WK-123 | WK | wikipedia | 197 | 스튜디오 지브리 작품 – 그대들은 어떻게 살 것인가 (2023) | https://ko.wikipedia.org/wiki/%EA%B7%B8%EB%8C%80%EB%93%A4%EC%9D%80_%EC%96%B4%EB%96%BB%EA%B2%8C_%EC%82%B4_%EA%B2%83%EC%9D%B8%EA%B0%80 |
| [ ] | WK-201 | WK | wikipedia | 206 | 픽사 작품 – 토이 스토리 (1995) | https://ko.wikipedia.org/wiki/%ED%86%A0%EC%9D%B4_%EC%8A%A4%ED%86%A0%EB%A6%AC |
| [ ] | WK-202 | WK | wikipedia | 156 | 픽사 작품 – 벅스 라이프 (1998) | https://ko.wikipedia.org/wiki/%EB%B2%85%EC%8A%A4_%EB%9D%BC%EC%9D%B4%ED%94%84 |
| [ ] | WK-203 | WK | wikipedia | 183 | 픽사 작품 – 토이 스토리 2 (1999) | https://ko.wikipedia.org/wiki/%ED%86%A0%EC%9D%B4_%EC%8A%A4%ED%86%A0%EB%A6%AC_2 |
| [ ] | WK-204 | WK | wikipedia | 151 | 픽사 작품 – 몬스터 주식회사 (2001) | https://ko.wikipedia.org/wiki/%EB%AA%AC%EC%8A%A4%ED%84%B0_%EC%A3%BC%EC%8B%9D%ED%9A%8C%EC%82%AC |
| [ ] | WK-205 | WK | wikipedia | 147 | 픽사 작품 – 니모를 찾아서 (2003) | https://ko.wikipedia.org/wiki/%EB%8B%88%EB%AA%A8%EB%A5%BC_%EC%B0%BE%EC%95%84%EC%84%9C |
| [ ] | WK-206 | WK | wikipedia | 212 | 픽사 작품 – 인크레더블 (2004) | https://ko.wikipedia.org/wiki/%EC%9D%B8%ED%81%AC%EB%A0%88%EB%8D%94%EB%B8%94 |
| [ ] | WK-207 | WK | wikipedia | 161 | 픽사 작품 – 카 (2006) | https://ko.wikipedia.org/wiki/%EC%B9%B4_%28%EC%98%81%ED%99%94%29 |
| [ ] | WK-208 | WK | wikipedia | 186 | 픽사 작품 – 라따뚜이 (2007) | https://ko.wikipedia.org/wiki/%EB%9D%BC%EB%94%B0%EB%9A%9C%EC%9D%B4 |
| [ ] | WK-209 | WK | wikipedia | 192 | 픽사 작품 – 월-E (2008) | https://ko.wikipedia.org/wiki/%EC%9B%94-E |
| [ ] | WK-210 | WK | wikipedia | 170 | 픽사 작품 – 업 (2009) | https://ko.wikipedia.org/wiki/%EC%97%85_%282009%EB%85%84_%EC%98%81%ED%99%94%29 |
| [ ] | WK-211 | WK | wikipedia | 195 | 픽사 작품 – 토이 스토리 3 (2010) | https://ko.wikipedia.org/wiki/%ED%86%A0%EC%9D%B4_%EC%8A%A4%ED%86%A0%EB%A6%AC_3 |
| [ ] | WK-212 | WK | wikipedia | 175 | 픽사 작품 – 카 2 (2011) | https://ko.wikipedia.org/wiki/%EC%B9%B4_2 |
| [ ] | WK-213 | WK | wikipedia | 185 | 픽사 작품 – 메리다와 마법의 숲 (2012) | https://ko.wikipedia.org/wiki/%EB%A9%94%EB%A6%AC%EB%8B%A4%EC%99%80_%EB%A7%88%EB%B2%95%EC%9D%98_%EC%88%B2 |
| [ ] | WK-214 | WK | wikipedia | 162 | 픽사 작품 – 몬스터 대학교 (2013) | https://ko.wikipedia.org/wiki/%EB%AA%AC%EC%8A%A4%ED%84%B0_%EB%8C%80%ED%95%99%EA%B5%90 |
| [ ] | WK-215 | WK | wikipedia | 159 | 픽사 작품 – 인사이드 아웃 (2015) | https://ko.wikipedia.org/wiki/%EC%9D%B8%EC%82%AC%EC%9D%B4%EB%93%9C_%EC%95%84%EC%9B%83_%282015%EB%85%84_%EC%98%81%ED%99%94%29 |
| [ ] | WK-216 | WK | wikipedia | 150 | 픽사 작품 – 굿 다이노 (2015) | https://ko.wikipedia.org/wiki/%EA%B5%BF_%EB%8B%A4%EC%9D%B4%EB%85%B8 |
| [ ] | WK-217 | WK | wikipedia | 169 | 픽사 작품 – 도리를 찾아서 (2016) | https://ko.wikipedia.org/wiki/%EB%8F%84%EB%A6%AC%EB%A5%BC_%EC%B0%BE%EC%95%84%EC%84%9C |
| [ ] | WK-218 | WK | wikipedia | 126 | 픽사 작품 – 카 3: 새로운 도전 (2017) | https://ko.wikipedia.org/wiki/%EC%B9%B4_3%3A_%EC%83%88%EB%A1%9C%EC%9A%B4_%EB%8F%84%EC%A0%84 |
| [ ] | WK-219 | WK | wikipedia | 213 | 픽사 작품 – 코코 (2017) | https://ko.wikipedia.org/wiki/%EC%BD%94%EC%BD%94_%28%EC%98%81%ED%99%94%29 |
| [ ] | WK-220 | WK | wikipedia | 120 | 픽사 작품 – 인크레더블 2 (2018) | https://ko.wikipedia.org/wiki/%EC%9D%B8%ED%81%AC%EB%A0%88%EB%8D%94%EB%B8%94_2 |
| [ ] | WK-221 | WK | wikipedia | 177 | 픽사 작품 – 토이 스토리 4 (2019) | https://ko.wikipedia.org/wiki/%ED%86%A0%EC%9D%B4_%EC%8A%A4%ED%86%A0%EB%A6%AC_4 |
| [ ] | WK-222 | WK | wikipedia | 199 | 픽사 작품 – 온워드: 단 하루의 기적 (2020) | https://ko.wikipedia.org/wiki/%EC%98%A8%EC%9B%8C%EB%93%9C%3A_%EB%8B%A8_%ED%95%98%EB%A3%A8%EC%9D%98_%EA%B8%B0%EC%A0%81 |
| [ ] | WK-223 | WK | wikipedia | 182 | 픽사 작품 – 소울 (2020) | https://ko.wikipedia.org/wiki/%EC%86%8C%EC%9A%B8_%28%EC%98%81%ED%99%94%29 |
| [ ] | WK-224 | WK | wikipedia | 146 | 픽사 작품 – 루카 (2021) | https://ko.wikipedia.org/wiki/%EB%A3%A8%EC%B9%B4_%282021%EB%85%84_%EC%98%81%ED%99%94%29 |
| [ ] | WK-225 | WK | wikipedia | 133 | 픽사 작품 – 메이의 새빨간 비밀 (2022) | https://ko.wikipedia.org/wiki/%EB%A9%94%EC%9D%B4%EC%9D%98_%EC%83%88%EB%B9%A8%EA%B0%84_%EB%B9%84%EB%B0%80 |
| [ ] | WK-226 | WK | wikipedia | 151 | 픽사 작품 – 버즈 라이트이어 (2022) | https://ko.wikipedia.org/wiki/%EB%B2%84%EC%A6%88_%EB%9D%BC%EC%9D%B4%ED%8A%B8%EC%9D%B4%EC%96%B4_%28%EC%98%81%ED%99%94%29 |
| [ ] | WK-227 | WK | wikipedia | 156 | 픽사 작품 – 엘리멘탈 (2023) | https://ko.wikipedia.org/wiki/%EC%97%98%EB%A6%AC%EB%A9%98%ED%83%88 |
| [ ] | WK-228 | WK | wikipedia | 147 | 픽사 작품 – 인사이드 아웃 2 (2024) | https://ko.wikipedia.org/wiki/%EC%9D%B8%EC%82%AC%EC%9D%B4%EB%93%9C_%EC%95%84%EC%9B%83_2 |
| [ ] | WK-229 | WK | wikipedia | 192 | 픽사 작품 – 엘리오 (2025) | https://ko.wikipedia.org/wiki/%EC%97%98%EB%A6%AC%EC%98%A4_%28%EC%98%81%ED%99%94%29 |
| [ ] | WK-230 | WK | wikipedia | 168 | 픽사 작품 – 호퍼스 (2026) | https://ko.wikipedia.org/wiki/%ED%98%B8%ED%8D%BC%EC%8A%A4 |
| [ ] | WK-231 | WK | wikipedia | 162 | 픽사 작품 – 토이 스토리 5 (2026) | https://ko.wikipedia.org/wiki/%ED%86%A0%EC%9D%B4_%EC%8A%A4%ED%86%A0%EB%A6%AC_5 |
| [ ] | CS-001 | CS | wikipedia | 196 | 위키백과 「카카오프렌즈」 – 탄생 | https://ko.wikipedia.org/wiki/%EC%B9%B4%EC%B9%B4%EC%98%A4%ED%94%84%EB%A0%8C%EC%A6%88 |
| [ ] | CS-002 | CS | wikipedia | 175 | 위키백과 「카카오프렌즈」 – 캐릭터 상품과 매장 확장 | https://ko.wikipedia.org/wiki/%EC%B9%B4%EC%B9%B4%EC%98%A4%ED%94%84%EB%A0%8C%EC%A6%88 |
| [ ] | CS-003 | CS | wikipedia | 188 | 위키백과 「카카오프렌즈」 – 게임·금융으로의 확장 | https://ko.wikipedia.org/wiki/%EC%B9%B4%EC%B9%B4%EC%98%A4%ED%94%84%EB%A0%8C%EC%A6%88 |
| [ ] | CS-004 | CS | wikipedia | 187 | 위키백과 「카카오프렌즈」 – 저작권 계약 논란 | https://ko.wikipedia.org/wiki/%EC%B9%B4%EC%B9%B4%EC%98%A4%ED%94%84%EB%A0%8C%EC%A6%88 |
| [ ] | CS-005 | CS | wikipedia | 176 | 위키백과 「IPX (기업)」 – 라인프렌즈 개요 | https://ko.wikipedia.org/wiki/IPX_%28%EA%B8%B0%EC%97%85%29 |
| [ ] | CS-006 | CS | wikipedia | 181 | 위키백과 「IPX (기업)」 – 스티커가 캐릭터가 된 과정 | https://ko.wikipedia.org/wiki/IPX_%28%EA%B8%B0%EC%97%85%29 |
| [ ] | CS-007 | CS | wikipedia | 150 | 위키백과 「IPX (기업)」 – 상품·협업과 BT21 | https://ko.wikipedia.org/wiki/IPX_%28%EA%B8%B0%EC%97%85%29 |
| [ ] | CS-008 | CS | wikipedia | 175 | 위키백과 「IPX (기업)」 – 해외 진출 | https://ko.wikipedia.org/wiki/IPX_%28%EA%B8%B0%EC%97%85%29 |
| [ ] | CS-011 | CS | paper-abstract | 197 | KCI 논문 「스토리텔링을 활용한 인스타그램 캐릭터의 활성화 전략 연구: 〈최고심〉을 중심으로」 – 세계관과 콘텐츠 유형 | https://www.kci.go.kr/kciportal/ci/sereArticleSearch/ciSereArtiView.kci?sereArticleSearchBean.artiId=ART003094385 |
| [ ] | CS-012 | CS | paper-abstract | 203 | KCI 논문 「스토리텔링을 활용한 인스타그램 캐릭터의 활성화 전략 연구: 〈최고심〉을 중심으로」 – 활성화 전략 5가지 | https://www.kci.go.kr/kciportal/ci/sereArticleSearch/ciSereArtiView.kci?sereArticleSearchBean.artiId=ART003094385 |
| [ ] | CS-013 | CS | paper-abstract | 181 | KCI 논문 「캐릭터–스포츠 협업 사례의 스토리텔링 전략 연구」 – 망그러진 곰 × 두산베어스 협업 서사 | https://www.kci.go.kr/kciportal/ci/sereArticleSearch/ciSereArtiView.kci?sereArticleSearchBean.artiId=ART003310557 |
| [ ] | CS-014 | CS | paper-abstract | 194 | KCI 논문 「캐릭터–스포츠 협업 사례의 스토리텔링 전략 연구」 – 트랜스미디어 확산과 팬 참여 | https://www.kci.go.kr/kciportal/ci/sereArticleSearch/ciSereArtiView.kci?sereArticleSearchBean.artiId=ART003310557 |
| [ ] | CS-015 | CS | paper-abstract | 199 | KCI 논문 「지역 콘텐츠IP를 활용한 로컬 브랜딩 성공 요인 도출: 애니메이션 〈엄마 까투리〉 개발사례를 중심으로」 – 엄마 까투리의 개발 과정 | https://www.kci.go.kr/kciportal/ci/sereArticleSearch/ciSereArtiView.kci?sereArticleSearchBean.artiId=ART002981409 |
| [ ] | CS-016 | CS | paper-abstract | 191 | KCI 논문 「지역 콘텐츠IP를 활용한 로컬 브랜딩 성공 요인 도출: 애니메이션 〈엄마 까투리〉 개발사례를 중심으로」 – 성과와 연구의 한계 | https://www.kci.go.kr/kciportal/ci/sereArticleSearch/ciSereArtiView.kci?sereArticleSearchBean.artiId=ART002981409 |
| [ ] | CS-017 | CS | paper-abstract | 178 | KCI 논문 「SNS웹툰 IP와 캐릭터 융합사례 연구: 스토리텔링의 정서적 공감 요인을 중심으로」 – SNS웹툰 IP의 정서적 공감 요인 | https://www.kci.go.kr/kciportal/ci/sereArticleSearch/ciSereArtiView.kci?sereArticleSearchBean.artiId=ART003131097 |
| [ ] | CS-021 | CS | article | 206 | 경제인뉴스 「전통 호랑이 '무직타이거', 한국을 넘어 세계로! 스튜디오무직」 – 브랜드의 시작과 뜻 (경제인뉴스, 2023-03-31) | https://www.newseconomy.kr/news/articleView.html?idxno=4856 |
| [ ] | CS-022 | CS | article | 172 | 경제인뉴스 「전통 호랑이 '무직타이거', 한국을 넘어 세계로! 스튜디오무직」 – 사업 방식과 협업 상품 (경제인뉴스, 2023-03-31) | https://www.newseconomy.kr/news/articleView.html?idxno=4856 |
| [ ] | CS-023 | CS | article | 224 | 뉴시스 「대원미디어, '무직타이거' 공동 원작자 지위 획득」 – 라이선싱 에이전트에서 공동 원작자로 (뉴시스, 2022-01-10) | https://www.newsis.com/view/NISX20220110_0001718528 |
| [ ] | CS-024 | CS | article | 193 | 문화뉴스 「무직타이거, 일본을 사로잡다... 대원미디어의 글로벌 도약」 – 일본 상품 계약과 협업 (문화뉴스, 2024-03-07) | https://www.mhns.co.kr/news/articleView.html?idxno=576299 |
| [ ] | CS-025 | CS | article | 233 | MTN 「애니판 '무직타이거' 오늘 韓-日 첫 공개」 – 일러스트에서 숏폼 애니메이션으로 (머니투데이방송(MTN), 2025-04-02) | https://news.mtn.co.kr/news-detail/2025040215015448456 |
| [ ] | CS-026 | CS | article | 198 | 뉴스핌 「대원미디어, K-캐릭터 '무직타이거' 글로벌 시장 공략 본격화」 – 눈축제 참여와 협업 상품 수출 (뉴스핌, 2026-02-13) | https://www.newspim.com/news/view/20260213000687 |
| [ ] | CS-031 | CS | article | 177 | 연세춘추 「조구맣다고 안 중요하단건 아냐!」 – 시작: 페이스북 페이지와 첫 프로젝트 (연세춘추, 2017-10-25) | https://chunchu.yonsei.ac.kr/news/articleView.html?idxno=23162 |
| [ ] | CS-032 | CS | article | 193 | 연세춘추 「조구맣다고 안 중요하단건 아냐!」 – 페이스북 카드뉴스와 초기 고민 (연세춘추, 2017-10-25) | https://chunchu.yonsei.ac.kr/news/articleView.html?idxno=23162 |
| [ ] | CS-033 | CS | article | 214 | 중앙일보(폴인) 「MZ세대가 사랑한 공룡…'조구만 월드' 10배 성장한 비결은」 – 시작과 공룡을 고른 이유 (중앙일보, 2022-04-14) | https://www.joongang.co.kr/article/25063486 |
| [ ] | CS-034 | CS | article | 192 | 중앙일보(폴인) 「MZ세대가 사랑한 공룡…'조구만 월드' 10배 성장한 비결은」 – 굿즈 리테일에서 캐릭터 IP로 (중앙일보, 2022-04-14) | https://www.joongang.co.kr/article/25063486 |
| [ ] | CS-035 | CS | article | 204 | 중앙일보(폴인) 「MZ세대가 사랑한 공룡…'조구만 월드' 10배 성장한 비결은」 – 책 출간, 수익 다각화, 해외 수출 (중앙일보, 2022-04-14) | https://www.joongang.co.kr/article/25063486 |
| [ ] | CS-036 | CS | article | 212 | 이코노믹리뷰 「IPX × 조구만 스튜디오, 글로벌 캐릭터 시장 공략」 – IPX와 글로벌 IP 사업 (이코노믹리뷰, 2023-07-17) | https://www.econovill.com/news/articleView.html?idxno=618196 |
| [ ] | CS-037 | CS | article | 222 | 디자인플러스 「[Creator+] 크리에이티브 스튜디오 조구만 스튜디오」 – 공룡 캐릭터의 탄생과 협업 (디자인플러스, 2025-01-23) | https://design.co.kr/article/107867/ |
| [ ] | CS-038 | CS | article | 181 | 디자인플러스 「[Creator+] 크리에이티브 스튜디오 조구만 스튜디오」 – 세계관을 설계하는 방식 (디자인플러스, 2025-01-23) | https://design.co.kr/article/107867/ |
| [ ] | TH-001 | TH | wikipedia | 164 | 위키백과 「플롯」 – 정의: 스토리와의 차이 | https://ko.wikipedia.org/wiki/%ED%94%8C%EB%A1%AF |
| [ ] | TH-002 | TH | wikipedia | 176 | 위키백과 「플롯」 – 4단계 구조와 플롯 장치 | https://ko.wikipedia.org/wiki/%ED%94%8C%EB%A1%AF |
| [ ] | TH-003 | TH | wikipedia | 167 | 위키백과 「플롯」 – 플롯의 유형 | https://ko.wikipedia.org/wiki/%ED%94%8C%EB%A1%AF |
| [ ] | TH-004 | TH | wikipedia | 181 | 위키백과 「인물호」 – 인물호(캐릭터 아크) | https://ko.wikipedia.org/wiki/%EC%9D%B8%EB%AC%BC%ED%98%B8 |
| [ ] | TH-005 | TH | wikipedia | 178 | 위키백과 「맥거핀」 – 맥거핀 | https://ko.wikipedia.org/wiki/%EB%A7%A5%EA%B1%B0%ED%95%80 |
| [ ] | TH-006 | TH | wikipedia | 166 | 위키백과 「민담 형태론」 – 프로프의 민담 형태론 | https://ko.wikipedia.org/wiki/%EB%AF%BC%EB%8B%B4_%ED%98%95%ED%83%9C%EB%A1%A0 |
| [ ] | TH-007 | TH | wikipedia | 238 | 위키백과 「서사학」 – 서사학의 두 흐름 | https://ko.wikipedia.org/wiki/%EC%84%9C%EC%82%AC%ED%95%99 |
| [ ] | TH-008 | TH | wikipedia | 208 | 위키백과 「클리셰」 – 클리셰 | https://ko.wikipedia.org/wiki/%ED%81%B4%EB%A6%AC%EC%85%B0 |
| [ ] | TH-009 | TH | wikipedia | 237 | 위키백과 「시학 (아리스토텔레스)」 – 핵심 용어와 미메시스·카타르시스 | https://ko.wikipedia.org/wiki/%EC%8B%9C%ED%95%99_%28%EC%95%84%EB%A6%AC%EC%8A%A4%ED%86%A0%ED%85%94%EB%A0%88%EC%8A%A4%29 |
| [ ] | TH-010 | TH | wikipedia | 207 | 위키백과 「Three-act structure」 – 3막 구조 | https://en.wikipedia.org/wiki/Three-act_structure |
| [ ] | TH-011 | TH | wikipedia | 229 | 위키백과 「Kishōtenketsu」 – 기승전결 | https://en.wikipedia.org/wiki/Kish%C5%8Dtenketsu |
| [ ] | TH-012 | TH | wikipedia | 232 | 위키백과 「Chekhov's gun」 – 체호프의 총 | https://en.wikipedia.org/wiki/Chekhov's_gun |
| [ ] | TH-013 | TH | wikipedia | 237 | 위키백과 「The Thirty-Six Dramatic Situations」 – 36가지 극적 상황 | https://en.wikipedia.org/wiki/The_Thirty-Six_Dramatic_Situations |
| [ ] | TH-014 | TH | public-domain | 213 | 『The Poetics of Aristotle』(S. H. Butcher 영역) – 비극의 정의 | https://www.gutenberg.org/ebooks/1974 |
| [ ] | TH-015 | TH | public-domain | 230 | 『The Poetics of Aristotle』(S. H. Butcher 영역) – 비극의 6요소와 플롯의 우선 | https://www.gutenberg.org/ebooks/1974 |
| [ ] | TH-016 | TH | public-domain | 250 | 『The Poetics of Aristotle』(S. H. Butcher 영역) – 전체성(처음·중간·끝)과 급전·인지 | https://www.gutenberg.org/ebooks/1974 |
| [ ] | TH-101 | TH | wikipedia | 175 | 위키백과 「Hero's journey」 – 개요 | https://en.wikipedia.org/wiki/Hero%27s_journey |
| [ ] | TH-102 | TH | wikipedia | 275 | 위키백과 「Hero's journey」 – 17단계 (전체) | https://en.wikipedia.org/wiki/Hero%27s_journey |
| [ ] | TH-111 | TH | wikipedia | 207 | 위키백과 「The Writer's Journey: Mythic Structure for Writers」 – 개요 | https://en.wikipedia.org/wiki/The_Writer%27s_Journey:_Mythic_Structure_for_Writers |
| [ ] | TH-112 | TH | wikipedia | 218 | 위키백과 「The Writer's Journey: Mythic Structure for Writers」 – 인물 원형 8가지 | https://en.wikipedia.org/wiki/The_Writer%27s_Journey:_Mythic_Structure_for_Writers |
| [ ] | TH-113 | TH | wikipedia | 266 | 위키백과 「The Writer's Journey: Mythic Structure for Writers」 – 영웅의 여정 12단계 (전체) | https://en.wikipedia.org/wiki/The_Writer%27s_Journey:_Mythic_Structure_for_Writers |
| [ ] | TH-121 | TH | wikipedia | 186 | 위키백과 「Save the Cat!: The Last Book on Screenwriting You'll Ever Need」 – 개요와 로그라인 | https://en.wikipedia.org/wiki/Save_the_Cat!:_The_Last_Book_on_Screenwriting_You%27ll_Ever_Need |
| [ ] | TH-122 | TH | wikipedia | 196 | 위키백과 「Save the Cat!: The Last Book on Screenwriting You'll Ever Need」 – 이야기 유형 10가지 | https://en.wikipedia.org/wiki/Save_the_Cat!:_The_Last_Book_on_Screenwriting_You%27ll_Ever_Need |
| [ ] | TH-123 | TH | wikipedia | 354 | 위키백과 「Save the Cat!: The Last Book on Screenwriting You'll Ever Need」 – 비트 시트 15비트 (전체) | https://en.wikipedia.org/wiki/Save_the_Cat!:_The_Last_Book_on_Screenwriting_You%27ll_Ever_Need |
| [ ] | TH-126 | TH | wikipedia | 183 | 위키백과 「Save the Cat!: The Last Book on Screenwriting You'll Ever Need」 – 고양이 구하기 규칙과 보드 | https://en.wikipedia.org/wiki/Save_the_Cat!:_The_Last_Book_on_Screenwriting_You%27ll_Ever_Need |
| [ ] | TH-127 | TH | wikipedia | 190 | 위키백과 「Save the Cat!: The Last Book on Screenwriting You'll Ever Need」 – 평가와 비판 | https://en.wikipedia.org/wiki/Save_the_Cat!:_The_Last_Book_on_Screenwriting_You%27ll_Ever_Need |

## 제외한 자료

- 「조구만 IP 성장 IR 시각화 v2」 PDF (2026-10-15 검토): 작성자·발행처가 없고 쪽마다 출처가 없음. "200% 연평균 성장", "SNS 팔로워 300% 증가", "글로벌 팬 40만", "브랜드 협업 100+", 국가별 진출 연도·쇼핑몰 이름 등 수치·사실의 근거를 확인할 수 없음. "핵심 해석", "IP 가치 80~300억(공식 평가 아님)" 같은 해석·추정이 섞여 있음. 기사와 겹치는 사실(티셔츠 100장 예상 → 700장, 2023 IPX, 대상·케이스티파이·NC 다이노스·불가리 협업)은 이미 기사 청크(CS-031~038)에 출처와 함께 있음. 조구만 캐릭터 그림도 들어 있어 저작권 문제 소지.
- ChatGPT가 정리한 조구만 성장 단계 표: 출처가 아니라 생성된 요약. "인스타그램에서 먼저 팬을 모았다"는 기사에서 확인되지 않음(연세춘추는 페이스북 페이지로 시작했다고 적음).

## 아직 없는 자료

- 스티키몬스터랩: 공식 사이트·기사(언론사·URL·발행일 필수)로 수집 예정 (무직타이거 v5, 조구만 v6에서 추가)
- 《2025 캐릭터산업백서》: 공공누리 유형 확인 후
- 책 본문은 직접 요약하지 않고 위키백과 문서로 대신함 (2026-10-15)
- 지브리 목록은 위키백과 '스튜디오 지브리 제작 작품' 섹션 기준(23편). 《붉은 거북》(2016), 《아야와 마녀》(2020)는 그 목록에 없어 넣지 않음
