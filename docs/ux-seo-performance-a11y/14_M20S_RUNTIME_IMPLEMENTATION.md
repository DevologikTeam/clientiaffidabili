# 14 — M20-S Runtime Implementation

## Scope

M20-S applica il blueprint M20-P sulle superfici runtime principali senza introdurre nuovi provider o automazioni rischiose.

## File principali

| Area | File |
|---|---|
| Metadata | `apps/web/lib/seo/metadata.ts` |
| Noindex | `apps/web/app/admin/layout.tsx`, `apps/web/app/dashboard/layout.tsx`, `apps/web/app/reports/layout.tsx`, `apps/web/app/checkout/layout.tsx`, `apps/web/app/invito/layout.tsx` |
| Header mobile | `apps/web/components/Header.tsx` |
| Focus/skip link/CSS | `apps/web/app/layout.tsx`, `apps/web/app/globals.css` |
| Checkout guidato | `apps/web/app/checkout/page.tsx`, `apps/web/components/billing/*` |
| Pricing table | `apps/web/components/catalog/PricingComparison.tsx` |
| Runtime registry | `apps/web/lib/ux-polish/ux-seo-performance-a11y-runtime.ts` |
| Artifact budget | `artifacts/ux-seo-performance-a11y/m20s-performance-budget.json` |

## Route pubbliche indicizzabili

- `/`
- `/servizi`
- `/servizi/[slug]`
- `/prezzi`
- `/guide`
- `/guide/[slug]`
- `/garanzia-operativa`
- `/contatti`
- `/api`

## Route sensibili noindex

- `/admin/**`
- `/dashboard/**`
- `/reports/**`
- `/checkout/**`
- `/invito/**`

## Copy policy runtime

Le superfici pubbliche P0 non devono mostrare linguaggio interno di sprint, demo, provider, webhook, payload, endpoint o margine. Il cliente deve leggere solo cosa viene verificato, cosa serve, cosa riceve, quanto costa, quali limiti restano e cosa fare dopo.

## Accessibilità runtime

- Skip link globale.
- Main target stabile.
- Menu mobile con stato ARIA.
- Focus trap pragmatico nel menu mobile.
- Focus visibile globale.
- Checkout con fieldset, legend, help text e aria-describedby.
- Prezzi in tabella semantica.

## Performance budget

Il budget è tracciato come artifact statico. Le misure reali devono essere eseguite in ambiente con build Next.js e browser.
