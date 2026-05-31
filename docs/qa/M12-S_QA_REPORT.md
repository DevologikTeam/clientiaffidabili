# M12-S QA Report — API Partner & Reseller Portal Development

## Esito
Passed.

## Controlli eseguiti
- Presenza modulo backend `PartnerPortalModule`.
- Presenza entita' partner/API key/webhook/ledger/rate limit/live request/idempotency.
- Presenza controller partner portal, API pubblica e admin.
- Presenza servizi API key, usage ledger, rate limit, webhook e sandbox.
- Presenza pagine partner dashboard, API key, docs, usage, webhook e go-live.
- Presenza console admin partner.
- Presenza OpenAPI scaffold.
- Presenza guardrail su hash API key, live bloccato, idempotenza, usage ledger e raw payload.

## Guardrail verificati
- API key generate con secret mostrato una sola volta e hash salvato.
- Live API bloccata nel runtime MVP.
- `Idempotency-Key` obbligatoria per `POST /company-checks`.
- Usage ledger append-only via servizio dedicato.
- Sandbox non chiama provider reale.
- Webhook firmati con HMAC SHA-256.
- Admin actions sensibili richiedono reason.

## Limiti
QA statico. Non sono stati eseguiti build, test E2E browser, test carico, test webhook reali, rate limit persistente o verifica crittografica in ambiente deploy.
