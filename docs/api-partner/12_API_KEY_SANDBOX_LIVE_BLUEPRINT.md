# API Key, Sandbox & Live Blueprint

## Modello API key
Ogni API key appartiene a un partner account e a un ambiente.

Campi principali:
- `id`
- `partnerAccountId`
- `environment`: `sandbox` | `live`
- `label`
- `prefix`: visibile per riconoscimento, es. `ca_sbox_1234`
- `secretHash`: mai salvare il valore completo in chiaro
- `scopes`
- `allowedIps`
- `rateLimitProfileId`
- `lastUsedAt`
- `expiresAt`
- `revokedAt`
- `createdByUserId`

## Regole sandbox
- dati simulati o dataset test isolato;
- nessuna chiamata provider reale;
- nessun costo provider;
- rate limit basso ma sufficiente per test;
- risposte coerenti con schema live;
- errori simulabili per testing.

## Regole live
- disponibile solo dopo approvazione operations/compliance;
- richiede profilo aziendale completo;
- richiede accettazione termini API;
- richiede wallet/abbonamento/entitlement valido;
- richiede webhook configurato per flussi asincroni;
- puo richiedere IP allowlist per clienti ad alto rischio.

## Rotazione e revoca
- rotazione genera nuova chiave e mantiene vecchia in periodo di grazia opzionale;
- revoca immediata blocca nuove richieste;
- le richieste gia elaborate restano nel ledger;
- ogni rotazione/revoca produce audit.

## Scope MVP
- `checks:company.read`
- `checks:company.create`
- `checks:company.status`
- `reports:read`
- `webhooks:manage`
- `usage:read`
- `billing:read`

## Guardrail
La API key non autorizza da sola: ogni richiesta deve passare anche partner status, environment, scope, entitlement, rate limit, object-level authorization e usage guard.
