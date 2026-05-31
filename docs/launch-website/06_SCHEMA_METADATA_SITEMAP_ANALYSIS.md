# 06 — Schema, Metadata and Sitemap Analysis

## Technical SEO readiness

Prima del lancio il sito deve avere:

- title unici;
- meta description orientate al beneficio reale;
- canonical per ogni pagina pubblica;
- robots coerente;
- sitemap statica + dinamica per pagine CMS pubblicate;
- OpenGraph e Twitter card;
- schema JSON-LD coerente con contenuto visibile;
- breadcrumbs;
- pagine legal indicizzabili solo se utili;
- pagine admin/dashboard noindex e protette.

## Schema consigliati

| Pagina | Schema |
|---|---|
| Homepage | Organization, WebSite |
| Servizio | Service, Product dove appropriato e prudente |
| Prezzi | Product/Offer prudente o nessuno se rischia mismatch |
| Guida | Article, FAQPage solo se FAQ visibile |
| Legal | WebPage |
| Breadcrumbs | BreadcrumbList |

## Regole JSON-LD

- il markup deve corrispondere al testo visibile;
- niente rating/review inventate;
- niente prezzo se non coerente con la pagina;
- niente claim legali o finanziari non presenti nel contenuto;
- FAQPage solo se le FAQ sono visibili e complete.

## Sitemap CMS

Solo pagine `published` devono entrare in sitemap.

Le pagine `draft`, `review`, `archived` devono restare fuori da sitemap e avere `noindex` se raggiungibili.
