# Implementazione Admin CMS SEO/GEO

## Route admin
- `/admin/seo-pages` lista pagine.
- `/admin/seo-pages/nuova` nuova pagina.
- `/admin/seo-pages/[id]` editing pagina.

## Componenti frontend
- `SeoPageAdminShell`.
- `SeoPageListTable`.
- `SeoPageMetadataPanel`.
- `SeoPageRichEditor`.
- `SeoPageSeoChecklist`.
- `SeoPagePublishPanel`.

## API backend
- `GET /seo-cms/admin/pages`.
- `GET /seo-cms/admin/pages/:id`.
- `POST /seo-cms/admin/pages`.
- `PATCH /seo-cms/admin/pages/:id`.
- `POST /seo-cms/admin/pages/:id/publish`.
- `POST /seo-cms/admin/pages/:id/archive`.
- `GET /seo-cms/public/pages/:slug`.

## Sicurezza
- Solo ruoli admin abilitati possono creare/modificare/pubblicare.
- Pubblicazione con reason obbligatoria.
- Sanitizzazione HTML da rafforzare prima del go-live.
- Audit append-only per creazione, update, publish, archive.

## Nota implementativa
Lo scaffold contiene runtime mock per frontend e servizio NestJS pronto per TypeORM. Le chiamate API reali andranno collegate quando auth/sessioni reali saranno stabilizzate.
