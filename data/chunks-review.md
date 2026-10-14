# chunks.json 검토표 (STEP 2, v2 · 2026-10-15)

원문 대조 체크: url을 열어 text 내용이 원문에 있는지 확인하고 ✅ 표시. KCI 청크는 초록 기준, `url_extra`가 있는 작품은 영문 위키백과로 보충한 청크입니다.

## v2 변경 내역

- 목록을 쪼개 비슷해 보이던 청크를 하나로 합침: ST-102~104 → ST-102 (12원칙 전체), TH-102~104 → TH-102 (캠벨 17단계), TH-113~114 → TH-113 (보글러 12단계), TH-123~125 → TH-123 (비트 시트 15비트). 폐기 id: ST-103, ST-104, TH-103, TH-104, TH-114, TH-124, TH-125
- 사실이 겹치던 문장 정리: ST-111(픽사 창업 내용 삭제 → MK-014에만), CS-005(뉴욕 스토어 → CS-008에만), MK-013(토이 스토리 최초 CG → WK-201에만)
- 새 분류 WK(스튜디오 작품) 추가: 스튜디오 지브리 23편(WK-101~123), 픽사 31편(WK-201~231)
- 중복 점검: 전체 청크 쌍의 글자 3-gram 유사도 최대 0.20 (작품 청크끼리의 '픽사 제작·디즈니 배급' 같은 공통 문구). WK 외 청크끼리는 모두 0.12 미만.

| ✅ | id | 분류 | 출처 종류 | 글자 수 | 섹션 | url |
| --- | --- | --- | --- | --- | --- | --- |
| [ ] | ST-101 | ST | wikipedia | 231 | 위키백과 「Disney Animation: The Illusion of Life」 – 개요 | https://en.wikipedia.org/wiki/Disney_Animation:_The_Illusion_of_Life |
| [ ] | ST-102 | ST | wikipedia | 431 | 위키백과 「Twelve basic principles of animation」 – 애니메이션 12원칙 (전체) | https://en.wikipedia.org/wiki/Twelve_basic_principles_of_animation |
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
| [ ] | CS-011 | CS | source-summary | 197 | KCI 논문 「스토리텔링을 활용한 인스타그램 캐릭터의 활성화 전략 연구: 〈최고심〉을 중심으로」 – 세계관과 콘텐츠 유형 | https://www.kci.go.kr/kciportal/ci/sereArticleSearch/ciSereArtiView.kci?sereArticleSearchBean.artiId=ART003094385 |
| [ ] | CS-012 | CS | source-summary | 203 | KCI 논문 「스토리텔링을 활용한 인스타그램 캐릭터의 활성화 전략 연구: 〈최고심〉을 중심으로」 – 활성화 전략 5가지 | https://www.kci.go.kr/kciportal/ci/sereArticleSearch/ciSereArtiView.kci?sereArticleSearchBean.artiId=ART003094385 |
| [ ] | CS-013 | CS | source-summary | 181 | KCI 논문 「캐릭터–스포츠 협업 사례의 스토리텔링 전략 연구」 – 망그러진 곰 × 두산베어스 협업 서사 | https://www.kci.go.kr/kciportal/ci/sereArticleSearch/ciSereArtiView.kci?sereArticleSearchBean.artiId=ART003310557 |
| [ ] | CS-014 | CS | source-summary | 194 | KCI 논문 「캐릭터–스포츠 협업 사례의 스토리텔링 전략 연구」 – 트랜스미디어 확산과 팬 참여 | https://www.kci.go.kr/kciportal/ci/sereArticleSearch/ciSereArtiView.kci?sereArticleSearchBean.artiId=ART003310557 |
| [ ] | CS-015 | CS | source-summary | 199 | KCI 논문 「지역 콘텐츠IP를 활용한 로컬 브랜딩 성공 요인 도출: 애니메이션 〈엄마 까투리〉 개발사례를 중심으로」 – 엄마 까투리의 개발 과정 | https://www.kci.go.kr/kciportal/ci/sereArticleSearch/ciSereArtiView.kci?sereArticleSearchBean.artiId=ART002981409 |
| [ ] | CS-016 | CS | source-summary | 191 | KCI 논문 「지역 콘텐츠IP를 활용한 로컬 브랜딩 성공 요인 도출: 애니메이션 〈엄마 까투리〉 개발사례를 중심으로」 – 성과와 연구의 한계 | https://www.kci.go.kr/kciportal/ci/sereArticleSearch/ciSereArtiView.kci?sereArticleSearchBean.artiId=ART002981409 |
| [ ] | CS-017 | CS | source-summary | 178 | KCI 논문 「SNS웹툰 IP와 캐릭터 융합사례 연구: 스토리텔링의 정서적 공감 요인을 중심으로」 – SNS웹툰 IP의 정서적 공감 요인 | https://www.kci.go.kr/kciportal/ci/sereArticleSearch/ciSereArtiView.kci?sereArticleSearchBean.artiId=ART003131097 |
| [ ] | IP-001 | IP | my-doc | 285 | 캐릭터 시트 작성 | docs/ip-sop.md#캐릭터-시트-작성 |
| [ ] | IP-002 | IP | my-doc | 223 | 세계관 규칙 정하기 | docs/ip-sop.md#세계관-규칙-정하기 |
| [ ] | IP-003 | IP | my-doc | 287 | 매체 확장 검토 | docs/ip-sop.md#매체-확장-검토 |
| [ ] | TH-001 | TH | wikipedia | 164 | 위키백과 「플롯」 – 정의: 스토리와의 차이 | https://ko.wikipedia.org/wiki/%ED%94%8C%EB%A1%AF |
| [ ] | TH-002 | TH | wikipedia | 176 | 위키백과 「플롯」 – 4단계 구조와 플롯 장치 | https://ko.wikipedia.org/wiki/%ED%94%8C%EB%A1%AF |
| [ ] | TH-003 | TH | wikipedia | 167 | 위키백과 「플롯」 – 플롯의 유형 | https://ko.wikipedia.org/wiki/%ED%94%8C%EB%A1%AF |
| [ ] | TH-004 | TH | wikipedia | 181 | 위키백과 「인물호」 – 인물호(캐릭터 아크) | https://ko.wikipedia.org/wiki/%EC%9D%B8%EB%AC%BC%ED%98%B8 |
| [ ] | TH-005 | TH | wikipedia | 178 | 위키백과 「맥거핀」 – 맥거핀 | https://ko.wikipedia.org/wiki/%EB%A7%A5%EA%B1%B0%ED%95%80 |
| [ ] | TH-006 | TH | wikipedia | 166 | 위키백과 「민담 형태론」 – 프로프의 민담 형태론 | https://ko.wikipedia.org/wiki/%EB%AF%BC%EB%8B%B4_%ED%98%95%ED%83%9C%EB%A1%A0 |
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

## 아직 없는 자료

- 스티키몬스터랩, 조구만, 무직타이거: 공식 사이트·기사(언론사·URL·발행일 필수)로 수집 예정
- 《2025 캐릭터산업백서》: 공공누리 유형 확인 후
- 책 5권 출처 요약: 책을 읽은 뒤 쪽수와 함께
- 지브리 목록은 위키백과 '스튜디오 지브리 제작 작품' 섹션 기준(23편). 《붉은 거북》(2016), 《아야와 마녀》(2020)는 그 목록에 없어 넣지 않음
