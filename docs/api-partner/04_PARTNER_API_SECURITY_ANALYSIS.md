# 04 — Partner API Security Analysis

## Rischi OWASP rilevanti

- Broken Object Level Authorization: ogni report, ordine, fattura, webhook e key deve essere filtrato per account/partner.
- Broken Authentication: API key rubate o sessioni partner compromesse.
- Unrestricted Resource Consumption: chiamate automatiche possono generare costi provider.
- Broken Function Level Authorization: partner potrebbe accedere a funzioni admin o prodotti non abilitati.
- Improper Inventory Management: endpoint vecchi o debug possono restare esposti.
- Unsafe Consumption of APIs: dati provider e webhook terzi non devono essere fidati ciecamente.

## API key model

- Generazione key una sola volta.
- Salvataggio solo hash.
- Prefissi chiari: `ca_test_`, `ca_live_`.
- Scope granulari per prodotto/funzione.
- Stato: active, suspended, rotated, revoked, expired.
- Rotazione con finestra temporale.
- Revoca immediata.
- Audit obbligatorio.

## Rate limit e cost guard

- Limite per API key.
- Limite per account partner.
- Limite per IP.
- Quota giornaliera e mensile.
- Budget massimo per endpoint costosi.
- Circuit breaker se errori provider o margine anomalo.

## Idempotenza

Ogni endpoint che può generare costo deve richiedere `Idempotency-Key`. Se manca, la richiesta viene bloccata.

## Webhooks partner

- Secret dedicato.
- Firma HMAC.
- Timestamp e tolleranza replay.
- Delivery attempts tracciati.
- Retry con backoff.
- Test webhook dal portale.

## Dati vietati nelle API

- Raw provider payload.
- Dati carta.
- Token segreti.
- Informazioni interne di margine/costo provider.
- Audit completi admin.
