# M14-S QA report

## Sprint

M14-S Launch Website, SEO/GEO & Commercial Readiness Development

## Esecuzione

```bash
node scripts/qa-launch-website-commercial-readiness-development.js
```

## Esito

Passed.

## Controlli coperti

- file runtime launch website;
- componenti commerciali;
- home page aggiornata;
- pagina `/guide`;
- pagina `/garanzia-operativa`;
- metadata route `sitemap.ts`;
- metadata route `robots.ts`;
- helper JSON-LD;
- CSS launch;
- release notes.

## Non coperto

- build reale;
- crawl reale;
- validazione Rich Results;
- Playwright reale;
- Search Console;
- analytics provider reale.
