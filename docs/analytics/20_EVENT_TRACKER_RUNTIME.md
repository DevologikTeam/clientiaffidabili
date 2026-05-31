# Event tracker runtime

Gli eventi sono registrati nel registry `analytics-event-registry.ts` e ogni evento dichiara allowed/forbidden payload.

## Eventi MVP

- `public.page_view`
- `seo_geo.guide_viewed`
- `checkout.started`
- `payment.failed`
- `provider.request_failed`
- `email.failed`

## Regola di rilascio

Ogni nuovo evento deve dichiarare:

- categoria;
- origine;
- allowed payload;
- forbidden payload;
- se è server-authoritative;
- retention policy.
