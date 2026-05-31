# 09 — Analytics Event Taxonomy Blueprint

## Principio

Ogni evento deve essere utile per una decisione operativa. Se un evento non aiuta a migliorare vendite, UX, supporto, contenuti, error handling o marginalità, non va tracciato.

## Namespace eventi

| Namespace | Scopo | Esempi |
|---|---|---|
| `public.*` | Funnel pubblico | `public.page_view`, `public.cta_clicked` |
| `seo_geo.*` | Guide e CMS | `seo_geo.guide_viewed`, `seo_geo.guide_cta_clicked` |
| `checkout.*` | Checkout | `checkout.started`, `checkout.blocked`, `checkout.completed` |
| `payment.*` | Pagamenti | `payment.succeeded`, `payment.failed`, `payment.refund_requested` |
| `provider.*` | Openapi/provider | `provider.request_completed`, `provider.request_failed` |
| `openai.*` | Copilot futuro | `openai.suggestion_requested`, `openai.error_logged` |
| `report.*` | Report | `report.ready`, `report.viewed`, `report.pdf_downloaded` |
| `crm.*` | Lead/supporto | `crm.lead_created`, `crm.ticket_created` |
| `email.*` | Email tecniche | `email.queued`, `email.failed`, `email.delivered` |
| `partner.*` | API partner | `partner.api_key_created`, `partner.check_requested` |
| `admin.*` | Operazioni admin | `admin.action_executed`, `admin.setting_changed` |

## Payload consentito

Ogni evento ha solo payload minimizzato:

- `eventName`;
- `occurredAt`;
- `source`;
- `routeTemplate`;
- `serviceCode`;
- `contentCluster`;
- `orderId` se server-side e business-safe;
- `errorLedgerId` se già redatto;
- `attributionSnapshotId`;
- `consentState`;
- `environment`.

## Payload vietato

- Email, telefono, codice fiscale, partita IVA, IBAN.
- Nome azienda cercata, targa, nominativi, identificativi soggetto.
- Messaggi contatto o ticket in chiaro.
- Raw payload provider.
- Prompt e risposta OpenAI completi.
- API key, token, session id, secret.
- Dati carta o dati pagamento sensibili.
- IP in chiaro.

## Eventi MVP

| Evento | Origine | Note |
|---|---|---|
| `public.page_view` | client/server | Solo template e source |
| `public.cta_clicked` | client | CTA e posizione |
| `seo_geo.guide_viewed` | server/client | slug, cluster, intent |
| `seo_geo.guide_cta_clicked` | client | CTA verso servizio/prezzi/contatto |
| `checkout.started` | server | da ordine o sessione valida |
| `checkout.blocked` | server | kill switch, prezzo, consenso, billing profile |
| `payment.succeeded` | webhook/server | solo stato e provider |
| `payment.failed` | webhook/server | normalized reason |
| `provider.request_failed` | server | con error ledger id |
| `report.ready` | server | report pubblicabile |
| `report.pdf_delivered` | server | email/link/allegato |
| `crm.lead_created` | server | source e cluster |
| `email.failed` | webhook/server | email delivery id e codice normalizzato |
