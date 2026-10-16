# 이재학 · Security Portfolio

서버 · 네트워크 구축, 로그 수집부터 관제 환경 구축 및 보안 점검 자동화까지의 경험

**[웹 포트폴리오 보기 →](https://ljx1565.github.io/Portfolio/)** (← → 키 · 휠 · 스와이프로 넘기기) · [PDF 내려받기](portfolio.pdf) · [설정 예시](examples)

---

## 세 기둥

| | 한 일 |
|---|---|
| **로그와 관제** | rsyslog · ELK · Wazuh · Splunk로 로그를 모으고, 공격 흐름을 시간순으로 재구성 |
| **방어 설계** | 구간별 허용 목록 · 단계별 방화벽 정책 · XSS 방어 · 사설 Root CA로 4개 구간 TLS |
| **점검 자동화** | 주정통 점검 241개 항목 자동화 · Ansible로 점검 → 조치 연결 · 보안 토글 13개 |

## 주요 내용

| 분류 | 페이지 |
|---|---|
| 인프라 | 망 분리 구성 · VRRP 이중화와 무중단 포트 전환 |
| 로그 수집 | facility · imfile 수집, 디스크 큐 전송 · 수집 경로 4가지 |
| 관제 | 목적별 수집 경로 · ELK 탐지 규칙 · Wazuh FIM과 자동 대응 · Grafana / Zabbix 가용성 · 퍼플 검증 · 로그 기반 분석 · 오탐 분석 · 트러블슈팅 |
| 보안 · 암호화 | 다계층 방어 9개 항목 전 → 후 · iptables 단계별 정책 · Stored XSS 방어 · 구간 암호화 |
| 자동화 · 점검 | 주정통 진단 도구 설계 · 5대 492개 항목 결과와 자동 조치 · Ansible 정책 배포 |

## 기술 스택

`Rocky / Ubuntu Linux` `Windows Server` `Cisco` `ESXi` `HAProxy` `Keepalived` `Apache` `Django` `MariaDB`
`rsyslog` `auditd` `Filebeat` `Logstash` `Elasticsearch` `Kibana` `Wazuh` `Splunk` `Prometheus` `Grafana` `Zabbix` `Suricata`
`iptables` `firewalld` `fail2ban` `SELinux` `ModSecurity` `Ansible` `Python`

## 저장소 구성

```
index.html        웹 포트폴리오 (한 장씩 넘기는 페이지 방식 · PC 가로 / 휴대폰 · 분할 화면 세로 최적화)
assets/           스타일 · 스크립트 · 화면 캡처 · 로고
portfolio.pdf     인쇄용 PDF (A4 · 25쪽)
examples/         포트폴리오에 나온 설정의 발췌본 (주소 · 계정 · 키는 자리표시자)
```

## 이력

- 정보보안 전문가 과정 · 메가스터디 AI 캠퍼스 (2026.04 – 2026.10)
  - 1차 사내 인프라 구축과 통합 관리 시스템 — 인프라 설계 및 구축
  - 2차 쇼핑몰 서비스 보안 관제 — 보안 로그 관제팀 팀장
  - 3차 대학 IT 인프라 침투 테스트와 보안관제 — 서버 구축 및 보안
- 네트워크관리사 2급 · 리눅스마스터 2급 · TOEIC 755

## 연락처

- Email: ljx1565@gmail.com
- GitHub: [github.com/ljx1565](https://github.com/ljx1565)

---

모든 화면과 설정은 교육과정 팀 프로젝트의 실습용 가상 환경에서 나온 것입니다. 팀 프로젝트 결과물 중 본인이 맡은 부분과 직접 확인한 내용을 중심으로 정리했습니다.
