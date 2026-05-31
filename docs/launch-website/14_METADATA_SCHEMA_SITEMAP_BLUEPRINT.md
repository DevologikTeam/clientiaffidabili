# 14 — Metadata, Schema & Sitemap Blueprint

## Metadata base

Ogni pagina pubblica deve avere:

- `title` unico;
- `description` orientata al valore;
- canonical;
- OpenGraph title/description;
- robots policy;
- breadcrumbs quando applicabile.

## Pattern title

| Tipo pagina | Pattern |
|---|---|
| Homepage | ClientiAffidabili.it — Verifiche e report per decisioni B2B piu' consapevoli |
| Servizio | {Nome servizio} — Prezzo, dati richiesti e report | ClientiAffidabili.it |
| Guida | {Domanda principale} | Guida ClientiAffidabili.it |
| Prezzi | Prezzi verifiche e report aziendali | ClientiAffidabili.it |
| API | API verifiche aziendali per partner e reseller | ClientiAffidabili.it |

## Schema JSON-LD ammessi

- `Organization` per identita' piattaforma;
- `WebSite` con eventuale `SearchAction` solo quando ricerca interna reale esiste;
- `BreadcrumbList` su pagine profonde;
- `FAQPage` solo per FAQ visibili nella pagina;
- `Product`/`Service` solo se coerente con pagina e prezzo visibile;
- `Article` per guide editoriali;
- `SoftwareApplication` solo se pagina prodotto SaaS lo giustifica.

## Regole schema

- Il markup deve corrispondere al testo visibile.
- Non inserire FAQPage se le FAQ non sono mostrate.
- Non usare Review/AggregateRating senza recensioni reali verificabili.
- Non usare claim di disponibilita' o prezzo se non mantenuti dal catalogo.
- Aggiornare `dateModified` solo se il contenuto cambia davvero.

## Sitemap policy

In sitemap entrano solo:

- pagine statiche commerciali pubbliche;
- pagine servizio `published`;
- guide CMS `published`;
- legal pages pubbliche definitive.

Escluse:

- dashboard;
- admin;
- checkout session-specific;
- pagine draft/review/archived;
- pagine con `noindex`;
- API interne.

## Robots

- `/admin/*`: noindex + accesso autenticato.
- `/dashboard/*`: noindex + accesso autenticato.
- `/checkout/*`: noindex tranne landing generica se utile.
- `/guide/*`: index solo se `published`.
