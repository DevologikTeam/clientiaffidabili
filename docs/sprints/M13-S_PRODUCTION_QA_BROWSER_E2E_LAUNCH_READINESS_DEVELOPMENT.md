# M13-S — Production QA, Browser E2E & Launch Readiness Development

## Obiettivo

Rendere eseguibile il gate progettato in M13-P senza dichiarare il prodotto production-ready. Lo sprint aggiunge Playwright, smoke test, production gate script, healthcheck Docker/Coolify, fixture policy e pagina admin di launch readiness.

## Cosa viene implementato

- Configurazione `playwright.config.ts` reale.
- Suite E2E scaffold per funnel, checkout, dashboard, admin, partner e CMS SEO/GEO.
- Fixture dati QA senza dati reali.
- Script `launch-smoke-check.js` per web/api health.
- Script `launch-production-gate.js` per blocchi minimi di release.
- Healthcheck su `api` e `web` in Docker Compose e Coolify Compose.
- Modulo NestJS `LaunchReadinessModule`.
- Pagina admin `/admin/launch-readiness`.
- Workflow CI GitHub Actions blueprint eseguibile.

## Guardrail

- Nessun dato reale nei test.
- Nessuna chiamata provider reale nel gate locale.
- Nessun go-live senza sandbox reale Stripe/PayPal/Openapi.
- Nessun go-live senza build reale, Playwright, object auth, webhook signature, backup/restore e rollback provato.
- Il gate può restituire warning: warning significa “non pronto alla produzione”, non errore di sviluppo.

## Esito

Sprint completato come implementazione di readiness. Produzione ancora bloccata finché non vengono eseguiti test reali in ambiente con dipendenze installate.
