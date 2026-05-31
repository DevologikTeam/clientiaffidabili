# 35 — Data Layer & Route Tagging Analysis

## Data layer

Il progetto dovrà esporre una funzione unica lato frontend, per esempio:

```ts
trackCampaignEvent('service_view', {
  page_type: 'service',
  service_slug: 'check-affidabilita-pro'
});
```

La funzione deve:

- validare il nome evento;
- filtrare proprietà non ammesse;
- redigere valori rischiosi;
- inviare al ledger interno;
- opzionalmente inviare a `window.dataLayer` se consenso/settings lo permettono.

## Route coverage MVP

| Route | Eventi |
|---|---|
| `/` | `homepage_view`, `public_cta_click` |
| `/servizi` | `service_catalog_view`, `service_filter_used` |
| `/servizi/[slug]` | `service_view`, `service_checkout_click` |
| `/prezzi` | `pricing_view`, `pricing_plan_click` |
| `/guide` | `guide_index_view` |
| `/guide/[slug]` | `guide_view`, `guide_related_service_click` |
| `/garanzia-operativa` | `guarantee_view` |
| `/contatti` | `contact_view`, `contact_submit_success` |
| `/checkout` | `checkout_started`, `checkout_legal_confirmed`, `checkout_payment_redirected` |
| `/checkout/success` | `payment_success_page_view` |
| `/checkout/cancel` | `payment_cancel_page_view` |

## Attribution

Le UTM devono essere salvate come attribution snapshot interno e inviate esternamente solo come valori validati e non personali.
