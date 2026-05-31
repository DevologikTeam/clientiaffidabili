# 03 — Attribution and Funnel Analysis

## Funnel principale

1. Visita pagina pubblica.
2. Lettura guida o servizio.
3. Click CTA.
4. Checkout start.
5. Conferma uso lecito.
6. Pagamento.
7. Provider request.
8. Report pronto.
9. Report aperto/scaricato.
10. Eventuale ritorno/acquisto successivo/abbonamento.

## Attribution MVP

Usare modello semplice first-touch + last-touch:

- first touch: prima sorgente nota della sessione/account;
- last touch: ultima pagina/CTA prima del checkout;
- content assist: guide viste nei 7 giorni precedenti;
- service assist: schede servizio viste prima dell'acquisto.

## Perché non partire con multi-touch avanzato

Il traffico iniziale sarà limitato. Un modello complesso genererebbe falsa precisione e aumenterebbe rischi privacy. Meglio partire da dati chiari e utili.

## Parametri sorgente consentiti

- `utm_source`
- `utm_medium`
- `utm_campaign`
- `utm_content`
- `utm_term` solo se sanificato e non contiene PII
- referrer domain normalizzato

## Parametri da scartare o redigere

- email in URL;
- telefono;
- codice fiscale;
- partita IVA completa se passata per errore;
- token;
- API key;
- session ID esterni;
- query libere sensibili.

## Metriche funnel MVP

- visite pubbliche;
- visite guide;
- CTA click rate;
- checkout start rate;
- checkout completion rate;
- payment failure rate;
- report completion rate;
- refund rate;
- support contact rate dopo acquisto;
- revenue per service;
- margin per service.

## Attribution e rimborsi

I rimborsi devono essere collegati alla sorgente/funnel solo in forma aggregata. Non usare dati di rimborso per profilazione utente individuale.
