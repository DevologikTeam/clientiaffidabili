# M20-S — UX, SEO, Performance & Accessibility Polish Development

## Versione

0.71.0

## Obiettivo

Trasformare il blueprint M20-P in modifiche runtime reali per preparare la RC: metadata pubblici, noindex su aree sensibili, copy cliente, navigazione mobile accessibile, checkout guidato, tabella prezzi semantica, skip link/focus state e scaffold performance/privacy.

## Implementato

### Metadata e indicizzazione

- Aggiunto helper `apps/web/lib/seo/metadata.ts` con:
  - `buildPublicMetadata`;
  - `buildSensitiveMetadata`;
  - `buildServiceMetadata`;
  - `buildGuideMetadata`.
- Applicati metadata pubblici P0 a home, servizi, dettaglio servizio, prezzi, guide, dettaglio guida, garanzia, contatti e API.
- Aggiunti layout `noindex,nofollow,nocache` per:
  - `/admin/**`;
  - `/dashboard/**`;
  - `/reports/**`;
  - `/checkout/**`;
  - `/invito/**`.
- Rafforzato `robots.ts` con disallow su admin, dashboard, report, checkout, inviti, fatture e reset password.

### UX/copy pubblico

- Rimossi dalle superfici pubbliche P0 termini interni come MVP, dashboard demo, CMS editoriale, margine protetto, provider mapping, endpoint provider e raw payload.
- Rimosse informazioni interne di margine/provider dalla scheda dettaglio servizio pubblica.
- Sostituito copy tecnico del checkout con linguaggio cliente: verifica, pagamento protetto, fonti dati, riepilogo ordine, limiti e prossima azione.

### Navigazione mobile e accessibilità

- Refactor `Header` in componente client con menu mobile accessibile.
- Aggiunti `aria-expanded`, `aria-controls`, `role="dialog"`, chiusura con Escape e focus trap pragmatico.
- Rimossi link pubblici verso dashboard demo/admin.
- Aggiunto skip link globale `Salta al contenuto`.
- Aggiunto `id="main-content"` e `tabIndex={-1}` al primo main delle pagine.
- Rafforzati focus state globali per link, button, input, select, textarea, summary e card interattive.

### Checkout guidato

- Checkout riorganizzato in fieldset leggibili:
  - verifica richiesta;
  - dati di fatturazione;
  - conferme obbligatorie;
  - riepilogo e stato pagamento.
- Aggiunti help text e `aria-describedby` sui campi principali.
- Aggiunto error summary informativo sopra il form.
- Aggiornati testi success/cancel per evitare dettagli tecnici.

### Tabelle e prezzi

- `PricingComparison` ora usa `<table>` reale, `caption`, `th scope="col"`, celle con `data-label` mobile e CTA specifiche.
- `DataTable` mantiene il bridge legacy introdotto da M20-P per fix #32.

### Performance e privacy-safe observability

- Aggiunto registry runtime `apps/web/lib/ux-polish/ux-seo-performance-a11y-runtime.ts`.
- Aggiunto artifact `artifacts/ux-seo-performance-a11y/m20s-performance-budget.json`.
- Centralizzata la denylist tracking esterna in `tag-manager-clarity-runtime.ts`.
- Mantenuto blocco tracking su admin, dashboard, checkout, report, fatture, API, inviti, legal e reset password.

## QA

Comandi previsti:

```bash
node scripts/qa-ux-seo-performance-accessibility-analysis.js
node scripts/qa-ux-seo-performance-accessibility-design.js
node scripts/qa-m20p-docker-build-fix-32.js
node scripts/qa-ux-seo-performance-accessibility-development.js
node scripts/qa-source-syntax-smoke.js
node scripts/security-secret-scan.js
zip -T clientiaffidabili_foundation_v0_71_0.zip
```

## Limiti noti

- Lighthouse reale non eseguito in questo ambiente.
- Axe reale non eseguito in questo ambiente.
- Playwright/browser E2E reale non eseguito in questo ambiente.
- Build Docker/Coolify reale e `pnpm --filter @clientiaffidabili/web build` devono essere eseguiti nell’ambiente con dipendenze installate.

## Handoff a M21-A

M21-A deve usare questo sprint come base per RC Hardening Analysis, concentrandosi su build reale, typecheck reale, Docker/Coolify, Playwright, axe, Lighthouse, smoke checkout, auth, dashboard, admin e provider sandbox.
