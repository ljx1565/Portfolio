# 설정 예시

포트폴리오에 나온 설정의 발췌본입니다. 주소 · 도메인 · 계정 · 키는 자리표시자(`LOG_SERVER`, `ES_HOST`, `MANAGER_IP`, `LB01` …)로 바꿨습니다.

| 폴더 | 내용 | 포트폴리오 페이지 |
|---|---|---|
| [`rsyslog/`](rsyslog) | facility · imfile 수집, 디스크 큐 전송, 송신 서버별 저장 | 로그 수집 · 서버 로그 설정 |
| [`logstash/`](logstash) | grok 필드 분리, GeoIP, log_type별 인덱스 | 관제 · ELK Stack |
| [`kibana/`](kibana) | KQL 탐지 규칙, 헬스체크 잡음 분리 | 관제 · ELK Stack |
| [`wazuh/`](wazuh) | ATT&CK 매핑 자체 룰, FIM, 자동 대응 | 관제 · Wazuh |
| [`prometheus/`](prometheus) | file_sd 수집 대상, 호스트 경보 규칙 | 관제 · 지표 관제 |
| [`suricata/`](suricata) | SID 대역을 나눈 IPS drop 룰 | 관제 · 퍼플 검증 |
| [`ansible/`](ansible) | 미리보기 먼저, 한 대씩 적용, 보안 토글 | 자동화 · Ansible |
