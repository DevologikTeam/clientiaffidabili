# 14 — M18-P/M18-S Readiness Checklist

## Per M18-P Design

- [ ] Definire provider adapter.
- [ ] Definire template registry.
- [ ] Definire event contract.
- [ ] Definire data model email.
- [ ] Definire retry policy.
- [ ] Definire suppression policy.
- [ ] Definire PDF delivery policy.
- [ ] Definire admin email monitor.
- [ ] Definire copy deck completo.
- [ ] Definire API contract.

## Per M18-S Development

- [ ] Implementare `EmailNotificationsModule`.
- [ ] Implementare provider mock.
- [ ] Implementare provider reale feature-flagged.
- [ ] Implementare queue/log delivery.
- [ ] Implementare template rendering.
- [ ] Implementare webhook provider.
- [ ] Implementare reset password email.
- [ ] Implementare registrazione/verifica email.
- [ ] Implementare payment/report/fiscal/support emails.
- [ ] Implementare PDF link delivery.
- [ ] Implementare admin monitor.
- [ ] Implementare QA anti-secret/anti-PII.

## Gate pre-RC

- [ ] SPF/DKIM/DMARC documentati.
- [ ] Sandbox provider verificata.
- [ ] Email critiche testate E2E.
- [ ] Bounce/complaint testati.
- [ ] Retry e idempotenza testati.
- [ ] Nessun token in chiaro nei log.
- [ ] PDF delivery sicuro.
- [ ] Link scadono e sono revocabili.
