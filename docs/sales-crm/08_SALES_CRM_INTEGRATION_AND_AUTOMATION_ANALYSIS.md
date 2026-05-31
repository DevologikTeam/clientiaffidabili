# 08 — Sales CRM Integration & Automation Analysis

## Integrazioni future possibili

- email provider transazionale;
- calendario per demo;
- webhook verso CRM esterno;
- export CSV;
- Slack/Teams interno;
- WhatsApp Business solo se legalmente e operativamente validato;
- CRM esterni come HubSpot/Pipedrive/Zoho in fase successiva;
- helpdesk esterni come Zendesk/Freshdesk solo se necessario.

## Automazioni MVP consentite

- autoresponder generico di ricezione richiesta;
- task interno di follow-up;
- assegnazione automatica per categoria;
- notifica interna su lead caldo;
- reminder follow-up;
- creazione ticket da form supporto;
- collegamento automatico a page source/UTM.

## Automazioni da rimandare

- lead nurturing massivo;
- newsletter automation;
- scoring AI invasivo;
- invio automatico di offerte custom;
- sconti automatici;
- auto-rimborsi da ticket;
- arricchimento dati azienda automatico su ogni lead.

## Email template

Template MVP:

- richiesta ricevuta;
- demo ricevuta;
- proposta link checkout;
- richiesta partner sandbox ricevuta;
- ticket aperto;
- ticket aggiornato;
- ticket risolto;
- richiesta fuori perimetro;
- richiesta bloccata per uso non consentito.

## Tracking commerciale

Ogni evento deve essere privacy-safe:

- `lead_submitted`;
- `demo_requested`;
- `partner_request_submitted`;
- `support_ticket_created`;
- `checkout_link_sent`;
- `opportunity_won`;
- `opportunity_lost`.

Non tracciare:

- messaggio completo;
- dati del soggetto verificato;
- contenuto report;
- dati fiscali completi;
- PII nei parametri evento.

## Decisione

MVP con automazioni operative semplici. La marketing automation sarà valutata solo dopo aver verificato traffico, consenso, valore dei contenuti SEO/GEO e tassi di conversione.
