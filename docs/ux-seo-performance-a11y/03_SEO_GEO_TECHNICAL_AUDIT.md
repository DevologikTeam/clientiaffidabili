# 03 — SEO/GEO Technical Audit

## Stato positivo

- `metadataBase` configurato nel root layout.
- Home con title, description, canonical e OpenGraph.
- Home con JSON-LD Organization, WebSite e FAQ.
- Guide pubbliche con metadata e JSON-LD.
- Sitemap generata dal runtime launch website.
- Robots blocca admin/dashboard in produzione e blocca tutto fuori produzione.
- Guide non pubblicate non entrano in UI pubblica ne' sitemap.

## Gap P0

| Gap | Evidenza | Azione M20-P |
|---|---|---|
| Metadata non uniformi | Solo 6 route con metadata espliciti su 72 page route | Definire policy per route pubbliche, legal, checkout, dashboard, admin. |
| Pagine commerciali senza canonical dedicato | `/servizi`, `/servizi/[slug]`, `/prezzi`, `/api`, `/checkout` | Blueprint `buildPublicMetadata()` e `buildSensitiveMetadata()`. |
| Sensitive routes senza noindex page-level | Admin/dashboard/report affidati a robots + esclusione sitemap | Aggiungere metadata noindex per dashboard, admin, reports, checkout success/cancel, inviti. |
| Schema non uniforme sui servizi | Schema forte su home/guide, meno su catalogo e pricing | Definire JSON-LD Service/Product solo dove prezzo e contenuto visibile sono coerenti. |
| OpenGraph image assente come standard | Nessuna policy OG image trasversale | Definire asset default e specifico per guide/servizi. |

## Gap P1

- BreadcrumbList da uniformare su guide, servizi, legal e checkout.
- `dateModified` e `lastReviewedAt` da trattare come evidenza editoriale reale, non aggiornamento automatico.
- Legal pages pubbliche da dotare di metadata trust-oriented.
- `/contatti` ha metadata ma va collegata a conversion tracking privacy-safe solo su invio riuscito e senza PII.
- `/api` deve separare intenti: pubblico commerciale, developer docs, partner dashboard autenticata.

## Policy route proposta

| Gruppo | Indicizzazione | Metadata | Sitemap | Tracking esterno |
|---|---|---|---|---|
| Public commercial | index | title/description/canonical/OG | si | solo con consenso/settings |
| Public guide | index se published | Article/Breadcrumb/FAQ se visibili | si | solo con consenso/settings |
| Legal/trust | index selettivo | metadata specifici | si dove utile | no marketing aggressivo |
| Checkout pre-payment | noindex prudente | noindex + title operativo | no | no external tracking |
| Checkout success/cancel | noindex | noindex | no | no external tracking |
| Dashboard/report | noindex | noindex | no | no external tracking |
| Admin | noindex | noindex | no | no external tracking |
| Partner authenticated | noindex | noindex | no | no external tracking |

## SEO/GEO acceptance criteria M20-S

- Ogni route pubblica P0 ha metadata specifici.
- Ogni route sensibile ha `robots.index=false` a livello page/layout.
- Sitemap include solo route pubbliche indicizzabili e guide published.
- Schema JSON-LD corrisponde sempre a contenuto visibile.
- Nessuna pagina pubblica contiene copy interno da sviluppo.
- QA statico blocca claim assoluti e link admin pubblici non desiderati.
