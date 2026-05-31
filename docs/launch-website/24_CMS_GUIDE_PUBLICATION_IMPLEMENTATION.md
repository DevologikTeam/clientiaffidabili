# 24 — CMS guide publication implementation

Le guide SEO/GEO usano `seoCmsPages` come registry scaffold. Solo le pagine con stato `published` sono esposte pubblicamente.

## Comportamento

- `/guide` mostra solo guide pubblicate.
- `/guide/[slug]` restituisce `notFound()` se la pagina non e' pubblicata.
- la sitemap usa lo stesso filtro.

## Futuro

Sostituire registry statico con query backend CMS e cache ISR/revalidation controllata.
