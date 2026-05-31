# API, Provider & Payment Security Analysis

## API security

Il progetto e' API-heavy: catalogo, checkout, webhook, provider runtime, report, dashboard cliente, admin operations. La protezione deve coprire sia API customer-facing sia API interne/admin.

## Controlli API minimi

- DTO validation obbligatoria.
- Request size limit.
- Rate limit per IP/account/route.
- CORS restrittivo.
- Auth guard e permission guard centralizzati.
- Object-level authorization su ogni ID.
- Idempotency key su checkout, provider request, refund, retry, cancel subscription.
- Errori redatti: no stack trace, no payload provider, no token.

## Provider data calls

- Trigger solo dopo pagamento confermato o credito riservato.
- Mapping prodotto-provider versionato.
- Cost snapshot prima della chiamata.
- Provider cost ledger append-only.
- Retry automatico solo per errori sicuri e senza doppio addebito.
- Manual review se stato ambiguo.
- Raw payload vault con accesso ristretto e retention.

## Pagamenti e subscription

- Checkout hosted/redirect per ridurre ambito PCI.
- Nessun dato carta nel database.
- Webhook firmati e idempotenti.
- Payment ledger append-only.
- Reconciliation periodica con provider.
- Refund full/partial con reason e policy check.
- Dispute/chargeback bloccano rimborso manuale duplicato.
- Credit wallet come source of truth interna per servizi a consumo.

## Abuse e cost protection

| Scenario | Controllo |
|---|---|
| Bot sul checkout | rate limit, anti-abuse, captcha only if needed |
| Crediti consumati in loop | reservation + idempotency + wallet ledger |
| Provider retry doppio | state machine + idempotency + no unsafe retry |
| Webhook replay | event ID uniqueness + signature + timestamp tolerance |
| Admin retry malevolo | RBAC + reason + audit + threshold alert |
