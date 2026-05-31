# DataLayer runtime

Gli eventi campagna passano da helper controllato, non da `window.dataLayer.push` sparsi nel codice.

## Eventi page view automatici MVP

- `/` → `homepage_view`
- `/servizi` → `service_catalog_view`
- `/servizi/[slug]` → `service_view`
- `/prezzi` → `pricing_view`
- `/guide` → `guide_index_view`
- `/guide/[slug]` → `guide_view`
- `/garanzia-operativa` → `guarantee_view`

## Payload consentito

Solo campi anonimi e utili a funnel/campagne:

- `page_type`
- `service_slug`
- `guide_slug`
- `cta_id`
- `plan_code`
- `funnel_step`
- `value_bucket`
- `utm_source`
- `utm_medium`
- `utm_campaign`
- `route_template`
- `content_cluster`

Tutti gli altri campi vengono ignorati dal sanitizer.
