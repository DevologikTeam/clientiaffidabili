# 15 — Observability, Error Ledger & Support Blueprint

## Obiettivo

Centralizzare triage operativo per RC senza esporre complessita tecnica agli utenti finali.

## Fonti da aggregare

- `OperationalErrorEvent` e error ledger.
- Sandbox certification run/result/evidence/waiver.
- Payment ledger, refund, dispute e webhook reconciliation.
- Email delivery ledger, bounce, complaint e suppression list.
- Openapi/OpenAI provider errors.
- Support ticket, admin operations e audit timeline.

## Vista admin proposta

Route: `/admin/launch-readiness/rc-hardening`.

Sezioni:

1. Stato RC complessivo.
2. Gate P0/P1 con owner e prossima azione.
3. Errori recenti per area.
4. Evidenze mancanti.
5. Waiver feature-off.
6. Runbook checkout/report/provider/email/rollback.
7. Export evidence bundle.

## Regole privacy

- Nessuna PII nei summary pubblicabili.
- Payload provider mascherati.
- Token, chiavi, link firmati e PDF non devono apparire nei log UI.
- Admin vede solo dati necessari al supporto.

## Evidenze

- Export error ledger aggregato.
- Lista blocker RC.
- Runbook con owner e tempo di risposta.
- Audit delle decisioni gate.
