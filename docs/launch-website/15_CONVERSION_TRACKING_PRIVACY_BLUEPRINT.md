# 15 — Conversion Tracking Privacy Blueprint

## Principio

Tracciare il funnel senza salvare PII, dati dei soggetti verificati, payload provider, IBAN, codici fiscali, partite IVA inserite o contenuti dei report.

## Eventi ammessi

| Evento | Dati ammessi |
|---|---|
| `landing_viewed` | path, referrer bucket, device bucket |
| `service_card_clicked` | serviceSlug, position |
| `pricing_cta_clicked` | planSlug/serviceSlug |
| `guide_cta_clicked` | guideSlug, targetService |
| `checkout_started` | serviceSlug, priceBucket |
| `checkout_legal_confirmed` | booleans, documentVersions |
| `payment_completed` | orderId hash/internal, amountBucket, provider |
| `report_viewed` | reportType, ageBucket |
| `refund_requested` | reasonCategory, state |

## Eventi vietati

- query inserita dall'utente;
- nome azienda verificata;
- P.IVA/CF/IBAN/email/telefono;
- payload provider;
- scoring puntuale se riconducibile a ordine;
- dati fattura;
- testo ticket supporto.

## Consent mode

- analytics opzionale e aggregato;
- marketing tracking disattivato finche' non esiste CMP validata;
- server logs redatti;
- retention limitata.

## Dashboard conversione admin

Metriche consentite:

- visite pagine P0;
- CTR CTA;
- checkout start/completion rate;
- refund/dispute rate aggregato;
- guide con conversione maggiore;
- revenue aggregata per prodotto;
- nessuna esposizione dati del soggetto verificato.
