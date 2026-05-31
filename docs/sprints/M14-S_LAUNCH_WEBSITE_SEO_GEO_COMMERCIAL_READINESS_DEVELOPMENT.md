# M14-S — Launch Website, SEO/GEO & Commercial Readiness Development

## Stato

Completato come sviluppo scaffold/MVP del sito di lancio pubblico.

## Obiettivo

Trasformare il blueprint M14-P in una superficie pubblica piu pronta al lancio: home commerciale, pagina garanzia operativa, indice guide CMS, metadata, schema JSON-LD, sitemap, robots, tracking privacy-safe e QA dedicato.

## Cosa e' stato sviluppato

- Home page riscritta come launch website orientato a conversione prudente.
- Componenti `launch-website` riutilizzabili.
- Pagina `/garanzia-operativa`.
- Pagina `/guide` collegata alle pagine SEO/GEO pubblicate dal CMS.
- Arricchimento di `/guide/[slug]` con JSON-LD Article e breadcrumb.
- Metadata base nel layout.
- `sitemap.ts` con pagine pubbliche e guide CMS `published`.
- `robots.ts` con blocco indicizzazione fuori produzione.
- Runtime commerciale/SEO in `apps/web/lib/launch-website/launch-website-runtime.ts`.
- QA antiregressione M14-S.

## Decisioni

1. Le guide entrano in sitemap solo se pubblicate.
2. La garanzia resta operativa, non predittiva.
3. Il tracking e' solo privacy-safe: niente PII, aziende cercate, report ID, IBAN o dati sensibili.
4. Lo staging/non-production blocca i crawler via `robots.ts`.
5. Lo schema deve riflettere contenuto visibile, non promesse nascoste.

## Limiti

- Non e' stata eseguita build reale.
- Non e' stata eseguita validazione Rich Results.
- Non e' stato collegato un analytics provider reale.
- Non e' stata effettuata scansione Search Console.
- Non e' stata eseguita Lighthouse.

## Handoff

Prima del go-live servono:

- build reale `pnpm install && pnpm build`;
- test Playwright reale;
- validazione sitemap/robots in staging;
- verifica canonical e metadata;
- validazione legal/copy;
- controllo contenuti CMS pubblicati;
- Search Console e analytics privacy-safe.
