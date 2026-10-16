# Ansible 실행 순서

문법 검사 → `--check --diff` 미리보기 → `--limit`로 한 대씩 적용 → PLAY RECAP 확인

```bash
ansible-playbook -i inventory 04_apache.yaml --syntax-check
ansible-playbook -i inventory security.yaml --tags sec_firewall -e sec_firewall=true --check --diff
ansible-playbook -i inventory lb_firewall.yaml --limit lb01 --check
ansible-playbook -i inventory lb_firewall.yaml --limit lb01
ansible-playbook -i inventory 06_django.yaml -e sec_ph_web_xss=true --check --diff
```

- 보안 설정은 항목별 토글(`-e <항목>=true|false`)로 켜고 끔 → 같은 공격을 보안 전 · 후로 반복 검증
- 비밀번호를 다루는 작업은 `no_log: true`, 비밀값이 들어가는 템플릿은 `diff: false`
- 비밀값은 Ansible Vault에 두고 inventory · group_vars에 평문으로 쓰지 않음
