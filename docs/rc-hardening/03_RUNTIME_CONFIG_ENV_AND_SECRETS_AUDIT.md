# 03 — Runtime Config, ENV and Secrets Audit

## Superfici configurate

- `.env.example` contiene runtime, database, auth, Openapi, billing, feature flag, security gate, E2E, bootstrap admin, analytics, OpenAI e email.
- `docker-compose.coolify.yml` espone variabili production critical per API e web.
- Web riceve solo `NEXT_PUBLIC_API_URL` come variabile pubblica principale.

## Gate secrets e config

| Area | Stato statico | Blocco RC |
|---|---|---|
| JWT | `JWT_SECRET` presente come placeholder | deve essere forte e non committato |
| Openapi | credenziali server-side | provider live solo dopo sandbox |
| Stripe/PayPal | secret e webhook separati | live off finche' certification non passa |
| Demo data | `ENABLE_DEMO_DATA=true` in esempio locale | produzione deve essere false |
| Checkout | `ENABLE_CHECKOUT=false` di default | abilitazione solo via sign-off |
| Provider calls | `ENABLE_PROVIDER_CALLS=false` di default | live calls bloccate senza gate |
| OpenAI | feature flag e budget | non deve agire senza approval |
| Email | provider/event ledger progettati | sandbox email prima di production |

## Policy M21-P

1. Separare preset `local`, `sandbox`, `staging`, `production`.
2. Vietare `change_me`, email test e password esempio in ambienti production.
3. Richiedere `ENABLE_DEMO_DATA=false` per production.
4. Richiedere kill switch acquisti e provider come controlli server-side.
5. Produrre `RC_ENV_REQUIRED_KEYS` e `RC_ENV_BLOCKING_VALUES` verificabili da script.

## Evidenza richiesta in M21-S

Un comando `node scripts/rc-env-gate.js` dovra' validare variabili obbligatorie, valori vietati, feature flag e differenze sandbox/live.
