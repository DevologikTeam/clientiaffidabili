# 22 — Schema, metadata and sitemap implementation

## Metadata

Il layout ora definisce `metadataBase`, template title e robots base. Le pagine pubbliche principali definiscono title, description e canonical.

## JSON-LD

Sono stati aggiunti helper per:

- Organization;
- WebSite;
- FAQPage;
- BreadcrumbList;
- Article per guide CMS.

## Sitemap

La sitemap include pagine commerciali e solo guide `published`.

## Robots

In produzione consente crawling pubblico, ma blocca admin, dashboard e pagine checkout post-payment. Fuori produzione blocca tutto.
