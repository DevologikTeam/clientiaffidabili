# 05 — API Key, Scopes & Rate Limit Analysis

## Scopes MVP

| Scope | Descrizione | Rischio |
|---|---|---|
| `checks:create` | crea verifica/report | alto, genera costo |
| `checks:read` | legge stato verifica | medio |
| `reports:read` | legge report pubblicato | alto, dati sensibili |
| `reports:download` | ottiene URL temporaneo PDF futuro | alto |
| `wallet:read` | legge crediti e soglie | basso |
| `webhooks:manage` | gestisce endpoint webhook | medio |
| `sandbox:simulate` | usa simulatore | basso |

## Tipi chiave

- Sandbox key: usa dati simulati, non genera costi provider.
- Live key: solo partner approvato, può generare costi/crediti.
- Restricted key: limitata per IP, endpoint e prodotti.
- Read-only key: utile per integrazioni reporting.

## Rate limit iniziali

| Piano | Sandbox/min | Live/min | Daily live | Note |
|---|---:|---:|---:|---|
| Starter | 60 | 10 | 100 | solo prodotti base |
| Pro | 180 | 60 | 1.000 | idempotenza obbligatoria |
| Agency | 600 | 180 | 5.000 | review tecnica |
| Enterprise | custom | custom | custom | contratto dedicato |

## Errori da restituire

- `401 invalid_api_key`;
- `403 scope_not_allowed`;
- `403 product_not_enabled`;
- `409 idempotency_conflict`;
- `402 insufficient_credits`;
- `429 rate_limit_exceeded`;
- `423 production_access_pending`;
- `503 provider_temporarily_unavailable`.
