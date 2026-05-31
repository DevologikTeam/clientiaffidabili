# Production readiness QA gate

## Gate P0

| Gate | Stato in M9-S | Evidenza richiesta prima go-live |
|---|---|---|
| Secret scan | Implementato | `node scripts/security-secret-scan.js` passed |
| Production gate statico | Implementato | `node scripts/security-production-gate.js` passed |
| Build reale | Da eseguire | `pnpm install && pnpm -r typecheck && pnpm -r build` |
| Object auth/BOLA | Scaffold implementato | test cross-account su API reali |
| Webhook security | Scaffold implementato | sandbox Stripe/PayPal/Openapi con firma, replay e idempotenza |
| Restore drill | Runbook implementato | report restore in `docs/qa/RESTORE_DRILL_REPORT.md` |
| Incident response | Runbook implementato | simulazione tabletop e ownership assegnata |

## Regola di rilascio

Se un gate P0 è giallo o rosso, produzione reale non va abilitata.

## Feature flag da mantenere off fino a evidenza

- `ENABLE_PROVIDER_CALLS=false`
- `ENABLE_CHECKOUT=false`
- `ENABLE_STRIPE_PAYMENTS=false`
- `ENABLE_PAYPAL=false`
- `ENABLE_SUBSCRIPTIONS=false`
- `ENABLE_REFUNDS=false`
