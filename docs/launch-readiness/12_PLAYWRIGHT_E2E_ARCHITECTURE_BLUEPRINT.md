# 12 — Playwright E2E Architecture Blueprint

## Scelta tecnica
Playwright e' lo strumento E2E standard del progetto. La suite deve partire in M13-S con test piccoli, stabili e leggibili.

## Principi
- Una suite critica breve deve girare a ogni PR.
- Una suite completa deve girare su release candidate.
- In CI i worker devono essere ridotti per stabilita'.
- Ogni test deve usare dati deterministici e tenant/account isolati.
- Nessun test deve consumare provider reali senza sandbox e flag esplicito.

## Struttura proposta

```text
tests/e2e/
  fixtures/
    accounts.ts
    catalog.ts
    billing.ts
  pages/
    public-site.page.ts
    checkout.page.ts
    dashboard.page.ts
    admin.page.ts
    partner.page.ts
  specs/
    public-funnel.spec.ts
    checkout-payment.spec.ts
    customer-dashboard.spec.ts
    report-access.spec.ts
    admin-operations.spec.ts
    partner-api.spec.ts
    security-cross-account.spec.ts
  smoke/
    web-smoke.spec.ts
    api-smoke.spec.ts
```

## Configurazione proposta
- `baseURL` da `E2E_BASE_URL`.
- `API_URL` da `E2E_API_URL`.
- `trace: retain-on-failure`.
- screenshot/video solo su failure.
- reporter HTML + JUnit.
- `workers: 1` in CI.

## Progetti browser
MVP:
- Chromium desktop.
- Mobile Chromium viewport.

Post-MVP:
- Firefox.
- WebKit.

## Criterio anti-flaky
Un test e' bloccante solo se:
- non dipende da dati temporali fragili;
- non dipende da chiamate provider reali;
- usa selettori stabili `data-testid`;
- attende stati applicativi, non timeout fissi;
- pulisce o isola i dati.
