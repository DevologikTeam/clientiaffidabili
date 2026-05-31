# 09 — M21-P RC Hardening Design Handoff

## Obiettivo M21-P

Trasformare questa analisi in blueprint implementabile M21-S, senza aggiungere feature di prodotto.

## Deliverable richiesti

1. RC hardening command center blueprint.
2. Build/typecheck/Docker gate blueprint.
3. ENV/secrets production gate blueprint.
4. Migration/backup/restore blueprint.
5. Security/privacy freeze checklist.
6. Provider sandbox/live readiness gate.
7. Observability/error ledger/support runbook.
8. Release sign-off, rollback e evidence bundle.
9. Static QA design script.

## Stati standard

- `not_started`
- `ready_to_run`
- `running`
- `passed`
- `failed`
- `blocked`
- `waived_with_feature_off`

## Guardrail obbligatori

- Nessun dato demo nei tenant reali.
- Nessun provider live senza sandbox passata.
- Nessuna azione rischiosa senza kill switch, audit e rollback.
- Nessun secret o raw payload nei log/UI.
- Nessun claim pubblico assoluto.
- Un P0 fallito blocca la RC.

## Handoff M21-S

M21-S dovra' implementare gate statici/runtime dove possibile, aggiornare QA, produrre artifact JSON e preparare comandi reali da eseguire in ambiente target.
