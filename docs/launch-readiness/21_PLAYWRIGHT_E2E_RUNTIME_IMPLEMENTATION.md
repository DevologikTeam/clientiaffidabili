# Playwright E2E Runtime Implementation

## Configurazione

Il file `playwright.config.ts` abilita:

- test directory `tests/e2e`;
- screenshot/video/trace su fallimento;
- report HTML;
- `workers: 1` in CI;
- progetti desktop e mobile;
- web server Next.js in locale quando non viene saltato da `PLAYWRIGHT_SKIP_WEB_SERVER`.

## Suite scaffold

- `public-funnel.spec.ts`
- `checkout-billing-report.spec.ts`
- `customer-dashboard.spec.ts`
- `admin-operations-security.spec.ts`
- `partner-seo-cms.spec.ts`

## Percorsi obbligatori

I test coprono i P0/P1: funnel pubblico, checkout, success/cancel, report, dashboard cliente, admin operations, security gate, partner portal e CMS SEO/GEO.

## Limite attuale

Sono test scaffold: diventano gate reale solo dopo `pnpm install`, avvio servizi e dati seed coerenti.
