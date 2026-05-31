# 02 — Event Taxonomy Analysis

## Regole generali

Ogni evento deve avere:

- nome stabile snake_case;
- categoria;
- origine: client, server, admin, webhook, partner_api;
- sensitivity level;
- retention consigliata;
- payload consentito;
- payload vietato;
- relazione opzionale con lead, ordine, report, ticket o errore.

## Categorie evento

### Public funnel

- `public_page_view`
- `guide_page_view`
- `service_card_click`
- `pricing_plan_view`
- `checkout_cta_click`
- `contact_form_start`
- `contact_form_submit`

Payload consentito:

- route template;
- slug pagina;
- service code;
- plan code;
- source/medium/campaign sanitized;
- consent state;
- device class generico.

Payload vietato:

- email;
- telefono;
- nome azienda inserito;
- messaggio contatto;
- query testuale libera non sanificata.

### Checkout and billing

- `checkout_started`
- `checkout_blocked_purchase_disabled`
- `payment_session_created`
- `payment_confirmed`
- `payment_failed`
- `refund_requested`
- `refund_completed`
- `subscription_started`
- `subscription_canceled`

Payload consentito:

- order id interno;
- product code;
- price snapshot id;
- payment provider;
- amount bucket o amount netto se server-side;
- error code normalizzato.

Payload vietato:

- card data;
- customer email;
- fiscal profile raw;
- payment provider raw payload.

### Provider/API/OpenAI operations

- `provider_request_started`
- `provider_request_completed`
- `provider_request_failed`
- `openai_operation_started`
- `openai_operation_failed`
- `partner_api_request_accepted`
- `partner_api_request_rejected`

Payload consentito:

- provider code;
- product code;
- normalized error code;
- retryable flag;
- cost bucket;
- operation category.

Payload vietato:

- raw payload provider;
- prompt completo OpenAI;
- response OpenAI completa;
- API keys;
- subject identifiers in chiaro.

### Report and dashboard

- `report_ready`
- `report_viewed`
- `report_downloaded`
- `report_blocked_review_required`
- `dashboard_viewed`

Payload consentito:

- report template;
- score band;
- report status;
- account role.

Payload vietato:

- contenuto report;
- evidenze testuali sensibili;
- soggetto report in chiaro.

### CRM and support

- `lead_created`
- `lead_qualified`
- `support_ticket_created`
- `support_ticket_resolved`
- `contact_email_failed`

Payload consentito:

- lead source;
- category;
- status;
- SLA bucket.

Payload vietato:

- messaggio integrale;
- email/telefono in analytics;
- allegati.

## Naming convention

Preferire evento + verbo passato:

- `checkout_started`, non `start_checkout`;
- `payment_failed`, non `payment_error`;
- `report_downloaded`, non `download_report`.

## Sensitivity levels

- `public_low`: eventi pagine pubbliche senza PII;
- `business_medium`: eventi ordini/report senza payload sensibili;
- `security_high`: eventi admin, webhook, provider, OpenAI;
- `restricted`: non va in analytics, solo audit/error ledger.
