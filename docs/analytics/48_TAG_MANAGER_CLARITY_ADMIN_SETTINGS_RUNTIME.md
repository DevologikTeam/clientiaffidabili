# Admin settings runtime

Il namespace `analytics` contiene le impostazioni operative per tracking esterno.

## Settings principali

- `analytics.externalTags.enabled`
- `analytics.gtm.enabled`
- `analytics.gtm.containerId`
- `analytics.clarity.enabled`
- `analytics.clarity.projectId`
- `analytics.consent.defaultMode`
- `analytics.clarity.allowedRoutePrefixes`
- `analytics.clarity.blockedRoutePrefixes`

## UX admin

La pagina `/admin/settings/analytics` mostra la policy e i settings attesi. Le modifiche reali devono passare dalla console settings esistente, con reason obbligatoria e audit.

## Sicurezza

- Nessun codice HTML/script libero salvato nei settings.
- Solo ID validati.
- Nessun secret o token nel frontend.
- Le route sensibili prevalgono sempre sull'allowlist.
