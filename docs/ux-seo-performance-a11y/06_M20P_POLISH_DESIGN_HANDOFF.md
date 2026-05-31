# 06 — M20-P Polish Design Handoff

## Obiettivo M20-P

Disegnare il blueprint operativo per correggere i gap P0/P1 emersi in M20-A, senza introdurre nuove feature non necessarie alla RC.

## Backlog P0 per M20-P

1. **Public copy scrub blueprint**
   - Sostituzione termini interni nelle pagine pubbliche.
   - Matrice approvata pagina -> copy nuovo -> motivazione.

2. **Route metadata/noindex policy**
   - `buildPublicMetadata`, `buildGuideMetadata`, `buildSensitiveMetadata`.
   - Noindex page-level per admin, dashboard, report, post-checkout, inviti.

3. **Mobile header/accessibility blueprint**
   - Menu mobile accessibile.
   - Skip link.
   - Focus states unificati tra `.btn` legacy e `.ca-button`.

4. **Checkout polish blueprint**
   - Step piu chiari.
   - Campi per tipo verifica.
   - Fieldset, error summary, conferme legali leggibili.
   - Copy non tecnico su pagamento/provider.

5. **Pricing/catalog accessibility blueprint**
   - Tabella nativa o pattern card/list responsive.
   - CTA coerenti e descrizioni leggibili.
   - Totale/IVA/limiti sempre visibili.

6. **Performance measurement blueprint**
   - Budget pubblico e admin.
   - Evidenze salvate in `artifacts/ux-polish/`.
   - Gate ripetibile in CI o script locale.

7. **SEO/GEO implementation blueprint**
   - Metadata per public P0.
   - Breadcrumb/schema policy.
   - OG image default.
   - Sitemap/noindex regression test.

8. **Accessibility QA blueprint**
   - Axe/keyboard smoke route P0.
   - Test reduced motion.
   - Checklist manuale per checkout e table semantics.

## Handoff M20-S

M20-S dovra implementare solo cio che M20-P ha reso verificabile. Ogni fix deve avere almeno uno di questi gate:

- static QA;
- Playwright smoke;
- axe route smoke;
- metadata/noindex assertion;
- Lighthouse/performance artifact;
- screenshot/manual evidence registrata.

## Guardrail

- Non inserire dati demo o fake in tenant reali.
- Non attivare provider live.
- Non attivare tracking esterno senza consenso/settings.
- Non rimuovere avvisi sui limiti del report.
- Non esporre admin/dashboard/report in sitemap o indicizzazione.
- Non introdurre claim assoluti.

## Prossimi file attesi in M20-P

- `docs/ux-seo-performance-a11y/07_PUBLIC_COPY_POLISH_BLUEPRINT.md`
- `docs/ux-seo-performance-a11y/08_METADATA_NOINDEX_SCHEMA_BLUEPRINT.md`
- `docs/ux-seo-performance-a11y/09_ACCESSIBLE_HEADER_AND_LAYOUT_BLUEPRINT.md`
- `docs/ux-seo-performance-a11y/10_CHECKOUT_POLISH_BLUEPRINT.md`
- `docs/ux-seo-performance-a11y/11_PRICING_CATALOG_ACCESSIBILITY_BLUEPRINT.md`
- `docs/ux-seo-performance-a11y/12_PERFORMANCE_AND_A11Y_QA_BLUEPRINT.md`
