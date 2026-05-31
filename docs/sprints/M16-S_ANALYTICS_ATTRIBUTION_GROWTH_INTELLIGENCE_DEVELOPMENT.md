# M16-S — Analytics, Attribution & Growth Intelligence Development

Versione: 0.59.0

## Obiettivo

Implementare il primo runtime analytics interno e privacy-safe per misurare funnel pubblico, checkout, SEO/GEO, ricavi/margini, errori operativi e conversioni senza introdurre tracciamento invasivo o dati sensibili negli eventi.

## Scope implementato

- Modulo backend `AnalyticsModule`.
- Event ledger analytics con redaction.
- Attribution snapshot.
- KPI snapshot.
- API admin per summary, funnel, SEO/GEO ed error insights.
- Runtime frontend per event model e payload sanitization.
- Dashboard admin `/admin/analytics`.
- Sottopagine funnel, SEO/GEO, errori e ricavi.
- QA statico dedicato.

## Guardrail

- Nessuna PII negli analytics.
- Nessun raw payload Openapi, OpenAI, webhook o provider.
- Nessun prompt/completion OpenAI.
- Nessun dato carta, IBAN, API key, token, IP in chiaro.
- Gli eventi economici restano server-side.
- Gli errori dettagliati restano nell Operational Error Ledger.

## Stato

Completato come runtime MVP/scaffold. Prima del go-live servono build reale, migrazioni DB, eventi collegati ai flussi runtime reali, integrazione consent/CMP, Search Console/GA4/Matomo se scelti e test E2E.
