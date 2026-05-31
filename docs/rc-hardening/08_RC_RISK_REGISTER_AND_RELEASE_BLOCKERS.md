# 08 — RC Risk Register and Release Blockers

## Registro rischi M21-A

| ID | Rischio | Severita | Stato | Owner proposto | Prossima azione |
|---|---|---|---|---|---|
| RC-P0-001 | Build web/api non certificata in ambiente reale | P0 | open | Tech Lead | eseguire CI/Docker build completo |
| RC-P0-002 | Lockfile assente | P0 | open | Tech Lead | definire dependency freeze |
| RC-P0-003 | Migrazioni DB assenti | P0 | open | Backend Lead | produrre baseline migration/restore plan |
| RC-P0-004 | Sandbox provider reali non eseguiti | P0 | open | Ops/Backend | usare M19-S runner come base per esecuzioni reali |
| RC-P0-005 | E2E browser non eseguiti qui | P0 | open | QA Lead | lanciare Playwright in CI target |
| RC-P0-006 | Demo data production guard non verificato | P0 | open | Product/Ops | bloccare `ENABLE_DEMO_DATA=true` in production |
| RC-P0-007 | Security privacy freeze non consolidato | P0 | open | Security Lead | generare RC security gate |
| RC-P1-001 | Artifact release non centralizzati | P1 | open | Release Manager | evidence bundle |
| RC-P1-002 | Support triage non unificato | P1 | open | Customer Ops | command center |
| RC-P1-003 | Retention cleanup non provato | P1 | open | Backend Lead | job/checklist retention |

## Regola blocco

La RC resta bloccata finche' tutti gli `RC-P0-*` non sono `passed` oppure `waived_with_feature_off`.

## Output M21-P

Struttura dati del registro rischi, stati consentiti, owner, prove richieste e UI/admin o documento di sign-off.
