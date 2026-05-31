# Campaign Event Tagging Taxonomy

Versione: **0.59.1**

## Principio

Gli eventi esterni per Tag Manager/Clarity devono essere una vista ridotta e privacy-safe degli eventi interni M16. Il ledger interno resta piu' completo; Tag Manager riceve solo dati utili a campagne e analisi, senza identificare direttamente una persona o esporre informazioni sensibili.

## Eventi funnel pubblico

| Evento | Quando | Parametri ammessi |
|---|---|---|
| `ca_page_view` | navigazione pagina pubblica | page_type, path_group, locale |
| `ca_guide_view` | apertura guida SEO/GEO | guide_slug, topic_cluster, intent |
| `ca_service_view` | apertura scheda servizio | service_code, service_category |
| `ca_pricing_view` | visita prezzi | pricing_section |
| `ca_api_docs_view` | visita docs API | docs_section |
| `ca_cta_click` | click CTA pubblico | cta_id, cta_area, destination_type |
| `ca_contact_started` | form contatto iniziato | source_page, topic |
| `ca_contact_submitted` | form contatto inviato | source_page, topic, result |

## Eventi checkout/acquisto

| Evento | Quando | Parametri ammessi |
|---|---|---|
| `ca_checkout_started` | ingresso checkout | service_code, price_band, source_page |
| `ca_checkout_step_completed` | step completato | step_name, service_code |
| `ca_payment_redirected` | redirect provider pagamento | provider, service_code |
| `ca_payment_completed` | pagamento confermato | provider, service_code, amount_band |
| `ca_payment_failed` | pagamento fallito | provider, error_family |
| `ca_purchase_completed` | acquisto completato | service_code, amount_band, attribution_channel |

## Eventi prodotto/report

| Evento | Quando | Parametri ammessi |
|---|---|---|
| `ca_provider_request_started` | chiamata provider iniziata | service_code, provider_family |
| `ca_provider_request_failed` | errore provider | service_code, error_family |
| `ca_report_ready` | report pronto | service_code, delivery_time_band |
| `ca_report_viewed` | report visto | service_code |
| `ca_pdf_requested` | PDF richiesto | service_code, delivery_method |

## Eventi account/supporto

| Evento | Quando | Parametri ammessi |
|---|---|---|
| `ca_account_registered` | account creato | account_type |
| `ca_email_verified` | email verificata | account_type |
| `ca_password_reset_requested` | reset richiesto | none |
| `ca_support_ticket_created` | ticket creato | topic, source_area |
| `ca_lead_qualified` | lead qualificato | source_channel, lead_segment |

## Eventi vietati

Non devono mai essere inviati a Tag Manager, Clarity custom tags o strumenti advertising:

- email;
- telefono;
- nome/cognome;
- codice fiscale;
- partita IVA se usata per identificare singolarmente un cliente in campagna;
- IBAN;
- indirizzo completo;
- IP in chiaro;
- API key/token;
- provider raw payload;
- prompt/risposte OpenAI;
- contenuto messaggi supporto;
- contenuto report;
- dettagli carta o transazione completi.

## Naming convention

Tutti gli eventi esterni devono iniziare con prefisso `ca_`.

Esempio dataLayer:

```ts
window.dataLayer.push({
  event: 'ca_checkout_started',
  service_code: 'company_reliability_pro',
  price_band: '20_50',
  source_page: 'guide_cliente_non_paga'
});
```

## Attribution

Gli eventi possono includere solo attribution non personale:

- `utm_source`;
- `utm_medium`;
- `utm_campaign`;
- `utm_content`;
- `utm_term`;
- `landing_page_group`;
- `first_touch_channel`;
- `last_touch_channel`.

Le UTM devono essere normalizzate e ripulite da valori che contengono PII.
