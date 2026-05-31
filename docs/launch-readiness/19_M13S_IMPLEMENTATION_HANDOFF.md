# 19 — M13-S Implementation Handoff

## Obiettivo M13-S
Implementare la prima suite reale di QA/Browser/Launch Readiness.

## Da creare

```text
playwright.config.ts
tests/e2e/specs/public-funnel.spec.ts
tests/e2e/specs/checkout-payment.spec.ts
tests/e2e/specs/customer-dashboard.spec.ts
tests/e2e/specs/admin-operations.spec.ts
tests/e2e/specs/security-cross-account.spec.ts
scripts/smoke-local-stack.js
scripts/production-gate-report.js
.github/workflows/production-qa.yml
```

## Test minimi M13-S
1. Public funnel navigabile.
2. Catalogo/prezzi coerenti.
3. Checkout blocca senza consenso uso lecito.
4. Dashboard cliente visibile dopo login mock/test.
5. Report non accessibile cross-account.
6. Admin action richiede reason.
7. Partner sandbox API key mostra usage ledger.
8. Security production gate produce esito JSON.

## Feature flag
- `ENABLE_BROWSER_E2E=true` solo test/staging.
- `ENABLE_E2E_SEED=true` solo test/staging.
- `ENABLE_PROVIDER_CALLS=false` di default.
- `ENABLE_STRIPE_LIVE=false` di default.
- `ENABLE_PAYPAL=false` finche' non validato.

## Done definition
M13-S e' completo quando:
- gli script QA dedicati passano;
- la suite Playwright iniziale esiste;
- i test possono girare in CI/staging;
- gli artifact sono previsti;
- lo zip contiene istruzioni chiare per esecuzione reale;
- il progetto resta onesto: se non eseguito in ambiente reale, non e' production-ready.
