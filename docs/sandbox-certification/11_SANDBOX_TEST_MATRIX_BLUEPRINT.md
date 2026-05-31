# Sandbox Test Matrix Blueprint

## Matrice obbligatoria per RC

| Area | Scenario | Blocker RC | Esito accettabile |
|---|---|---:|---|
| Stripe | Pagamento riuscito | Sì | Order paid, ledger coerente, webhook idempotente |
| Stripe | Pagamento fallito | Sì | Nessuna provider call, email fail, error ledger se necessario |
| Stripe | 3DS/SCA | Sì | Stato payment action_required/paid coerente |
| Stripe | Rimborso full | Sì | Refund ledger, stato ordine e email coerenti |
| Stripe | Rimborso parziale | Sì | Importi e note credito/ledger coerenti |
| Stripe | Webhook duplicato | Sì | Nessun doppio ordine, email o provider call |
| PayPal | Capture sandbox | No, se disabilitato | Ledger normalizzato come Stripe |
| PayPal | Refund sandbox | No, se disabilitato | Refund ledger normalizzato |
| Openapi | Provider call post-payment | Sì | Chiamata solo dopo pagamento/credito riservato |
| Openapi | Timeout/error | Sì | Error ledger, retry sicuro, customer status chiaro |
| OpenAI | Copilot disabled | No | Nessuna chiamata esterna se disabilitato |
| OpenAI | Redaction + budget | No | Payload redatto, usage ledger, draft only |
| Email | Verifica account | Sì | Delivery ledger e link sicuro |
| Email | Documento pronto/PDF | Sì | Link sicuro e fallback dashboard |
| PDF | Report download | Sì | Snapshot/audit/download autorizzato |
| Auth | Reset password | Sì | Token hash/scadenza/audit |
| Partner API | Sandbox check | No, se disabilitato | Idempotenza, rate limit, usage ledger |
| Docker/Coolify | Build e healthcheck | Sì | Web/API healthy e rollback documentato |

## Regola pass/fail

Ogni scenario deve produrre una evidenza verificabile: log redatto, response snapshot, ledger entry, screenshot E2E o report test. Senza evidenza, lo scenario resta `not_certified`.
