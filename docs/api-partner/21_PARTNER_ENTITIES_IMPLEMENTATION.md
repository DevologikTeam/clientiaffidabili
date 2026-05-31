# Partner Entities Implementation

## Entita' implementate
- `PartnerAccount`
- `PartnerApiKey`
- `PartnerWebhookEndpoint`
- `PartnerUsageLedgerEntry`
- `PartnerRateLimitProfile`
- `PartnerLiveAccessRequest`
- `PartnerIdempotencyRecord`

## Principi
Le entita' separano chiaramente:
- profilo partner;
- ambiente sandbox/live;
- segreti/API key;
- consumo economico;
- richiesta live;
- idempotenza;
- webhook.

## Note di sicurezza
`PartnerApiKey.secretHash` salva solo hash del secret. Il valore completo della chiave e' restituibile solo al momento della creazione e non e' recuperabile.

## Note economiche
`PartnerUsageLedgerEntry` salva importo, tipo movimento, servizio, environment, pricing snapshot e idempotency key. Il ledger e' append-only: correzioni e rimborsi sono nuove righe, non update distruttivi.
