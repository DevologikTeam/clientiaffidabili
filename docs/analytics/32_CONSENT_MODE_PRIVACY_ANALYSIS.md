# 32 — Consent Mode & Privacy Analysis

## Baseline

Per traffico UE/Italia, il default deve essere prudente: nessun tracking marketing/analytics esterno prima del consenso quando richiesto. Il sistema deve distinguere:

- eventi tecnici necessari interni;
- analytics interno privacy-safe;
- analytics esterno;
- marketing/ads;
- session recording/heatmap.

## Consent Mode v2

I parametri da prevedere sono:

- `analytics_storage`;
- `ad_storage`;
- `ad_user_data`;
- `ad_personalization`.

Default consigliato:

```ts
{
  analytics_storage: 'denied',
  ad_storage: 'denied',
  ad_user_data: 'denied',
  ad_personalization: 'denied'
}
```

## Eventi sempre interni

Restano interni e non passano a GTM/Clarity:

- errore pagamento dettagliato;
- errore Openapi;
- errore OpenAI;
- payload webhook;
- IP acquisto;
- dati fiscali;
- report/documento;
- note admin;
- ticket con contenuto cliente.

## Eventi esterni consentiti solo se redatti

Esempi:

- `public_cta_click`;
- `guide_view`;
- `service_view`;
- `pricing_view`;
- `contact_form_submit_success`;
- `checkout_started` senza dati soggetto;
- `payment_success` senza importi sensibili se non bucket/valore aggregato configurato;
- `report_ready_notification_viewed` senza ID report reale.
