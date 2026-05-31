# 07 — Observability, Error Ledger and Support Audit

## Componenti gia' presenti

- Operational Error Ledger in settings/admin.
- Email delivery ledger.
- Payment ledger e refund/dispute entities.
- Provider request/event/cost ledger.
- Sandbox certification run/evidence/waiver.
- Admin operations queue e audit.
- Support ticket e CRM lead/support.

## Gap RC

| Gap | Severita | Azione richiesta |
|---|---|---|
| Command center unificato RC assente | P1 | vista unica blocker/build/provider/support |
| Severity taxonomy non congelata | P1 | P0/P1/P2 con SLA e owner |
| Alerting esterno non certificato | P1 | almeno runbook manuale prima del pilot |
| Evidenze sparse tra moduli | P1 | artifact index e release evidence bundle |
| Errori customer-facing non sempre collegati a supporto | P2 | next action e ticket link |

## Runbook minimo

- Checkout fallito.
- Provider timeout.
- Report non generato.
- Email non consegnata.
- Webhook duplicato o non valido.
- Cliente chiede rimborso.
- Admin deve disattivare acquisti o provider calls.
- Rollback deploy.

## Output M21-P

Blueprint RC operations command center e artifact ledger.
