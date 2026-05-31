# SEO/GEO Measurement & Iteration Analysis

## Metriche SEO principali

- pagine indicizzate;
- impressioni per query informative;
- click organici;
- CTR per pagina;
- posizione media;
- query con crescita;
- query senza pagina dedicata;
- pagine con impressioni ma bassa conversione.

## Metriche GEO/answer engine

Non esiste una metrica standard unica per "GEO". Il progetto deve usare segnali indiretti:

- query long-tail che aumentano dopo pubblicazione;
- citazioni/menzioni da motori AI o referral;
- sessioni che atterrano su guide e poi visitano servizi/prezzi;
- lead che citano una guida;
- domande supporto ricorrenti trasformabili in FAQ;
- contenuti che compaiono in snippet/FAQ/risposte sintetiche quando verificabile.

## Eventi privacy-safe

Consentiti:

- `guide_viewed` con slug e categoria;
- `guide_cta_clicked` con slug e CTA;
- `guide_service_recommendation_clicked`;
- `guide_faq_opened` aggregato;
- `guide_to_checkout_started`.

Vietati:

- nomi aziende cercate;
- partite IVA in analytics;
- dati provider/report;
- email o telefono;
- payload checkout.

## Ciclo di miglioramento

Ogni mese:

1. esportare query/pagine da Search Console;
2. classificare intenti scoperti;
3. migliorare pagine esistenti prima di crearne nuove;
4. aggiungere FAQ basate su dubbi reali;
5. aggiornare date reviewed solo se c'e' revisione vera;
6. archiviare pagine duplicate o deboli.

## KPI di qualita'

Una pagina non e' pronta solo perche' pubblicata. E' valida se:

- risponde meglio di una pagina generica;
- porta a un'azione utile;
- non genera aspettative false;
- mantiene tempo di lettura ragionevole;
- migliora conversione o riduce domande ripetitive;
- non cannibalizza altre pagine.
