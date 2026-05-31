# 20 — Launch website runtime implementation notes

Il runtime M14-S centralizza pagine pubbliche, CTA, guide pubblicate, JSON-LD, sitemap entries e tracking privacy-safe.

## File principale

`apps/web/lib/launch-website/launch-website-runtime.ts`

## Regole

- La home usa schema Organization, WebSite e FAQPage.
- Le guide pubblicate dal CMS generano card e sitemap entry.
- Le guide draft/review/archived non entrano nella UI pubblica ne' nella sitemap.
- Il sito non crea file speciali per AI/GEO: usa SEO tecnico, testo utile, internal linking e schema coerente con il contenuto visibile.
