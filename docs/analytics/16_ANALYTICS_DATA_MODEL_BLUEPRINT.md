# 16 — Analytics Data Model Blueprint

## Entità proposte

### AnalyticsEvent

Evento minimizzato.

Campi:

- `id`;
- `eventName`;
- `category`;
- `origin`;
- `occurredAt`;
- `payload` redatto;
- `consentState`;
- `environment`;
- `anonymousSessionHash` opzionale.

### AttributionSnapshot

Snapshot creato su conversione.

Campi:

- `id`;
- `conversionType`;
- `subjectType`;
- `subjectId`;
- `firstTouch`;
- `lastTouch`;
- `contentAssist`;
- `utm`;
- `createdAt`.

### GrowthKpiSnapshot

KPI pre-aggregati.

Campi:

- `id`;
- `periodStart`;
- `periodEnd`;
- `metricKey`;
- `metricValue`;
- `dimension`;
- `createdAt`.

### FunnelSnapshot

Snapshot funnel per data range e segmento.

### SeoGeoMetricSnapshot

Misure contenuti SEO/GEO.

### ExternalAnalyticsSync

Stato sync futuro con GA4, Matomo, Search Console.

## Separazione

Analytics non sostituisce audit, ledger pagamenti, error ledger o CRM. Li aggrega e li rende leggibili.
