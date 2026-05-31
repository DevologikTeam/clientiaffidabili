# 06 — Developer Experience, Docs & OpenAPI Analysis

## Developer experience target

Il partner deve capire in pochi minuti:

1. come ottenere una API key sandbox;
2. come fare la prima chiamata;
3. quali dati servono;
4. quali errori aspettarsi;
5. come ricevere un webhook;
6. quando una chiamata genera costo;
7. come passare in produzione.

## Documentazione necessaria

- Quick start;
- Authentication;
- Idempotency;
- Products and scopes;
- Create check;
- Get check status;
- Get report;
- Webhooks;
- Errors;
- Rate limits;
- Sandbox examples;
- Go-live checklist;
- Acceptable use.

## OpenAPI spec

La documentazione pubblica API deve essere generata da una specifica OpenAPI versionata, con:

- security scheme `ApiKeyAuth` via header;
- server sandbox e production;
- request/response schema;
- error schema uniforme;
- esempi cURL;
- changelog API;
- deprecation policy.

## Sandbox

Il sandbox non deve chiamare Openapi/provider dati. Deve usare fixture realistiche ma chiaramente simulate.

## Developer dashboard

- API keys;
- usage;
- credits;
- webhook status;
- request logs redatti;
- rate limit;
- latest docs;
- production request status.
