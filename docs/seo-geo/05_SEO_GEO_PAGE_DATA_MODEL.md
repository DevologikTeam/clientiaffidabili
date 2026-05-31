# Data model pagine SEO/GEO CMS

## SeoPage
Pagina editoriale pubblica o in bozza.

Campi principali:
- `id`;
- `slug`;
- `title`;
- `excerpt`;
- `status`: `draft`, `review`, `published`, `archived`;
- `seoTitle`;
- `seoDescription`;
- `canonicalPath`;
- `targetKeyword`;
- `searchIntent`;
- `geoAnswerFocus`;
- `bodyHtml`;
- `bodyJson`;
- `authorUserId`;
- `reviewedByUserId`;
- `publishedAt`;
- `archivedAt`.

## SeoPageVersion
Versione immutabile generata a ogni salvataggio importante o pubblicazione.

Campi principali:
- `id`;
- `pageId`;
- `versionNumber`;
- `snapshotHash`;
- `changeReason`;
- `bodyHtmlSnapshot`;
- `seoSnapshot`;
- `createdByUserId`.

## Regole
- Lo slug non si cambia dopo la pubblicazione senza redirect plan.
- Una pagina pubblicata deve avere snapshot versione.
- Il rendering pubblico legge solo `published`.
- Admin può modificare draft/review; published genera nuova bozza futura in backlog.
