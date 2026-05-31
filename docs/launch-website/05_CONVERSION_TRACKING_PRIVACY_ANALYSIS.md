# 05 — Conversion Tracking and Privacy-Safe Analytics Analysis

## Obiettivo

Misurare il funnel commerciale senza raccogliere dati sensibili non necessari.

## Eventi consigliati

| Evento | Trigger | Dati ammessi |
|---|---|---|
| `service_viewed` | vista dettaglio servizio | service slug, category |
| `pricing_viewed` | vista prezzi | pricing variant |
| `checkout_started` | click CTA checkout | service slug, price snapshot id |
| `legal_confirmed` | conferme uso lecito | boolean aggregato, versioni legal |
| `payment_completed` | pagamento confermato | order id interno, importo, provider |
| `report_viewed` | report aperto | report id, service slug |
| `guide_viewed` | guida letta | slug, cluster intent |
| `cta_clicked` | click CTA | cta id, page type |

## Dati vietati negli analytics

- codice fiscale;
- partita IVA del soggetto verificato;
- IBAN;
- email/telefono verificati;
- raw provider payload;
- nomi persone fisiche non necessari;
- dettagli report sensibili;
- dati carta.

## KPI launch

- conversione homepage -> servizi;
- conversione servizi -> checkout;
- checkout completion rate;
- page-to-report completion;
- traffico organico guide;
- query Search Console per cluster;
- click da pagine guida verso servizi;
- richieste supporto per dubbi su garanzia/limiti;
- rimborsi per incomprensione del servizio.

## Privacy-safe tracking rule

Il tracking deve spiegare il comportamento aggregato del sito, non profilare il soggetto verificato o il contenuto del report.
