# Kibana 탐지 규칙 (KQL)

| 규칙 | 조건 | 임계 |
|---|---|---|
| 웹 로그인 무차별 대입 | `url.path : "/login/" and http.response.status_code : (401 or 403 or 500)` | 같은 IP · 5분 20회 |
| SQL Injection 시도 | `url.query : (*union* or *select* or *%27*)` | 1회 |
| 스캐너 User-Agent | `user_agent.original : (*sqlmap* or *nikto* or *gobuster*)` | 1회 |
| 상태 확인 요청 제외 | `not (url.path : "/healthz" and source.ip : (LB01 or LB02))` | 정상 잡음 분리 |

`LB01` · `LB02`는 로드밸런서 주소 자리입니다. 이 두 곳에서 오는 헬스체크 요청은 정상 트래픽이므로 탐지 전에 제외합니다.
