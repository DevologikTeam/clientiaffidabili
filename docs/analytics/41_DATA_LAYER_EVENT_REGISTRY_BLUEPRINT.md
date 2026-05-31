# 41 — Data Layer Event Registry Blueprint

## Registry eventi MVP

| Evento | Quando | Esterno | Note |
|---|---|---:|---|
| `homepage_view` | apertura home | si | no PII |
| `public_cta_click` | click CTA pubblica | si | `cta_id` whitelist |
| `service_catalog_view` | apertura catalogo | si | no filtri personali |
| `service_view` | apertura servizio | si | `service_slug` pubblico |
| `service_checkout_click` | click acquisto servizio | si | no soggetto verificato |
| `pricing_view` | apertura prezzi | si | no dati utente |
| `pricing_plan_click` | click piano/prezzo | si | `plan_code` pubblico |
| `guide_view` | apertura guida | si | `guide_slug` pubblico |
| `guide_related_service_click` | click guida -> servizio | si | slug pubblici |
| `guarantee_view` | pagina garanzia operativa | si | no dati utente |
| `contact_submit_success` | contatto salvato | si | no contenuto messaggio |
| `checkout_started` | inizio checkout | si | no subject, no email |
| `checkout_payment_redirected` | redirect provider | si | no ID ordine reale |
| `payment_success_page_view` | pagina successo | si | opzionale `value_bucket` |
| `payment_cancel_page_view` | pagina annullata | si | no dettagli pagamento |

## Parametri ammessi

```ts
export type CampaignEventPayload = {
  page_type?: 'homepage' | 'service' | 'guide' | 'pricing' | 'contact' | 'checkout' | 'success' | 'cancel';
  service_slug?: string;
  guide_slug?: string;
  cta_id?: string;
  plan_code?: string;
  funnel_step?: string;
  value_bucket?: 'low' | 'medium' | 'high';
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
};
```

## Sanitizer

Il sanitizer rimuove ogni chiave non whitelistata e blocca l'evento se trova pattern sensibili nei valori.

Pattern da bloccare:

- email;
- telefono;
- codice fiscale/P.IVA;
- IBAN;
- token/JWT;
- API key;
- prompt o risposta AI;
- contenuto report;
- raw payload provider.
