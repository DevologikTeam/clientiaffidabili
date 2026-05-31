# 42 — Dispute & Reconciliation Implementation

`PaymentReconciliationService` normalizza webhook provider e li salva in `PaymentWebhookEvent` con payload redatto e hash. Gli eventi dispute aggiornano `PaymentDispute`.

## Principi
- Webhook idempotenti.
- Payload provider redatto.
- Riconciliazione sempre append-only nel ledger.
- Dispute e chargeback bloccano rimborso manuale per evitare doppio rimborso.
