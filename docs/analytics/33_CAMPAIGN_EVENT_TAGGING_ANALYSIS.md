# 33 — Campaign Event Tagging Analysis

## Funnel da coprire

### Pubblico

- visita homepage;
- click CTA principale;
- apertura pagina servizio;
- apertura pagina prezzi;
- apertura guida SEO/GEO;
- click da guida a servizio;
- invio contatto.

### Checkout

- checkout start;
- conferma uso lecito;
- compilazione profilo fiscale completata;
- redirect pagamento;
- pagamento riuscito/fallito in forma aggregata;
- acquisto sospeso da kill switch.

### Cliente

- login;
- apertura dashboard;
- report pronto visto;
- PDF scaricato;
- richiesta supporto aperta.

### Admin/Growth interno

Gli eventi admin non devono essere inviati a GTM/Clarity. Devono rimanere nel ledger interno.

## Parametri evento ammessi

| Parametro | Ammesso | Note |
|---|---:|---|
| `event` | si | Nome whitelist |
| `page_type` | si | homepage/service/guide/pricing/contact |
| `service_slug` | si | Slug pubblico, non ID interno sensibile |
| `guide_slug` | si | Slug pubblico |
| `cta_id` | si | ID CTA non personale |
| `funnel_step` | si | step astratto |
| `plan_code` | si | es. starter/pro/agency |
| `value_bucket` | si | opzionale, non importo puntuale se non approvato |
| `utm_source` | si | redatto/validato |
| `utm_medium` | si | redatto/validato |
| `utm_campaign` | si | redatto/validato |

## Parametri vietati

Email, telefono, nome, cognome, ragione sociale libera, codice fiscale, partita IVA, IBAN, IP, indirizzo, token, API key, raw payload, prompt OpenAI, output OpenAI, contenuto messaggio, contenuto report, ID ordine reale se non hashato e approvato.
