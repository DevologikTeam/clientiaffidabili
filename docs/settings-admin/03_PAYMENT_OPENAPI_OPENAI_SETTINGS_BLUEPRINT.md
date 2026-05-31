# 03 — Payment, Openapi & OpenAI Settings Blueprint

## Obiettivo

Spostare la configurazione runtime modificabile nel pannello admin, mantenendo in ENV solo bootstrap e segreti necessari all'avvio.

## Payment settings

- provider abilitati: Stripe, PayPal;
- modalità: sandbox/live;
- webhook status;
- checkout enabled;
- subscriptions enabled;
- refunds enabled;
- fee model configurabile;
- minimum margin threshold.

I segreti reali devono essere salvati come secret reference o valore cifrato, mai mostrati in chiaro.

## Openapi settings

- environment: sandbox/live;
- provider calls enabled;
- base URL;
- timeout;
- retry policy;
- cost guard;
- mapping version active;
- credential status redatto.

## OpenAI settings

Se in futuro si usano API OpenAI per copy, classificazioni interne, assistenza o analisi, devono essere settings admin:

- OpenAI enabled;
- provider/model policy;
- usage limits;
- allowed use cases;
- prompt logging policy;
- PII redaction required;
- API key secret reference;
- error handling e fallback.

Guardrail: nessun dato sensibile/report/raw provider verso OpenAI senza base legale, minimizzazione e redaction.

## Settings states

- `draft`
- `active`
- `disabled`
- `requires_review`
- `error`

Ogni cambio deve avere reason e audit.
