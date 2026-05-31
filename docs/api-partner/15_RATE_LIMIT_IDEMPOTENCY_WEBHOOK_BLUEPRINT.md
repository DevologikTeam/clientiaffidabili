# Rate Limit, Idempotency & Partner Webhook Blueprint

## Rate limit
Livelli:
- account partner;
- API key;
- endpoint;
- servizio;
- ambiente;
- finestra minuto/ora/giorno.

Profili MVP:
- `sandbox_default`: basso, orientato a test.
- `live_starter`: basso/medio.
- `live_pro`: medio.
- `live_agency`: alto ma controllato.
- `manual_restricted`: per partner in review.

## Idempotenza
`Idempotency-Key` obbligatoria per:
- creazione verifica;
- prenotazione crediti;
- retry provider-backed;
- richieste potenzialmente costose.

La stessa chiave con lo stesso payload restituisce la stessa risposta. La stessa chiave con payload diverso produce `idempotency_key_conflict`.

## Partner webhook
Eventi MVP:
- `check.queued`
- `check.processing`
- `check.completed`
- `check.failed`
- `report.ready`
- `credits.low`
- `subscription.renewed`
- `subscription.payment_failed`

## Firma webhook
Header:
- `X-CA-Timestamp`
- `X-CA-Signature`
- `X-CA-Event-Id`

Firma: HMAC SHA-256 su `timestamp.payload` con secret webhook partner.

## Retry webhook
- retry esponenziale;
- massimo tentativi configurabili;
- disabilitazione automatica dopo errori persistenti;
- log delivery visibile al partner;
- replay manuale admin con reason.

## Sicurezza
Non inviare dati sensibili non necessari nel webhook. Per report completi inviare link/API reference, non il report integrale nel payload.
