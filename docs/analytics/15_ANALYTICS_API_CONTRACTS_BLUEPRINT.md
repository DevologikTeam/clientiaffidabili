# 15 — Analytics API Contracts Blueprint

## Customer/public tracking endpoint

`POST /analytics/events`

Uso: eventi minimizzati client-side e privacy-safe.

Campi:

- `eventName`;
- `routeTemplate`;
- `contentCluster`;
- `serviceCode`;
- `ctaId`;
- `consentState`;
- `anonymousSessionId`.

Il backend deve validare allowlist evento e payload.

## Server-side event endpoint interno

`POST /internal/analytics/events`

Uso: eventi business generati da backend.

Campi:

- `eventName`;
- `subjectType`;
- `subjectId`;
- `serviceCode`;
- `normalizedStatus`;
- `errorLedgerId`;
- `attributionSnapshotId`.

## Dashboard endpoint

`GET /admin/analytics/summary`

Ritorna KPI aggregati.

`GET /admin/analytics/funnel`

Ritorna funnel per date range e segmento.

`GET /admin/analytics/seo-geo`

Ritorna stato guide, CTA, assist e queue editoriale.

`GET /admin/analytics/errors`

Ritorna error insights aggregati, non errori raw.

## Sicurezza

- Tutti gli endpoint admin richiedono RBAC admin.
- Gli endpoint public accettano solo eventi allowlisted.
- Rate limit per eventi client-side.
- Deduplica idempotente lato server quando possibile.
