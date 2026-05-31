# Analytics runtime implementation notes

Il runtime introdotto in M16-S aggiunge un ledger interno di eventi analytics pensato per misurare risultati di business senza trasformare il sistema in una piattaforma di sorveglianza.

## Principi

1. Gli eventi sensibili sono server-side.
2. Gli eventi client-side non sono fonte economica.
3. I payload vengono sanitizzati.
4. Il ledger operativo degli errori resta il punto di dettaglio tecnico.
5. L'analytics mostra solo aggregazioni e segnali decisionali.

## Entità

- `AnalyticsEvent`
- `AnalyticsAttributionSnapshot`
- `AnalyticsKpiSnapshot`

## API

- `POST /analytics/events`
- `GET /analytics/admin/summary`
- `GET /analytics/admin/events`
- `GET /analytics/admin/funnel`
- `GET /analytics/admin/seo-geo`
- `GET /analytics/admin/error-insights`
