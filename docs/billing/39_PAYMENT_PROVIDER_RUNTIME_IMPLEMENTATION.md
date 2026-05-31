# 39 — Payment Provider Runtime Implementation

Il runtime usa `PaymentProviderOrchestrator` per selezionare adapter Stripe o PayPal tramite `PaymentProviderCode`. Stripe resta provider primario per checkout hosted, pagamenti one-shot, subscription e refund. PayPal e' implementato come adapter mock/sandbox-ready e resta protetto da feature flag.

## Regole
- `ENABLE_STRIPE_PAYMENTS=true` abilita Stripe reale solo se `STRIPE_SECRET_KEY` e' presente.
- `ENABLE_PAYPAL=true` abilita i flussi PayPal dopo QA sandbox.
- `mock` non deve essere disponibile in produzione.
- Ogni richiesta usa idempotency key.
