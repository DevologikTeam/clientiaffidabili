# 01 — Analytics Product Strategy

## Perché serve

ClientiAffidabili.it dovrà vendere servizi a pagamento, abbonamenti, crediti e accesso API. Senza analytics non si può capire:

- quali servizi generano margine reale;
- quali pagine guidano al checkout;
- quali guide SEO/GEO portano utenti qualificati;
- quali clienti si bloccano per mancanza di fiducia;
- quali errori generano ticket o rimborsi;
- quali partner/API consumano crediti in modo sano.

## Obiettivo business

Costruire una base dati decisionale per:

- migliorare conversione;
- ridurre rimborsi evitabili;
- migliorare copy e contenuti;
- capire quali servizi promuovere;
- misurare ROI SEO/GEO;
- individuare errori ricorrenti pagamenti/provider/OpenAI;
- rendere il supporto più rapido.

## Modello consigliato

### 1. Internal business events

Tracciati server-side o backend-controlled. Sono la fonte più affidabile per:

- checkout created;
- payment confirmed;
- order completed;
- provider request started/completed/failed;
- report generated/published/downloaded;
- refund requested/approved/rejected;
- contact message received;
- support ticket created;
- partner API request accepted/rejected.

### 2. Public website analytics

Tracciati client-side, ma solo con consenso dove necessario:

- page view;
- guide view;
- CTA click;
- service card click;
- pricing view;
- checkout start click;
- contact form start/submit.

### 3. SEO/GEO analytics

Misurazione tramite:

- Search Console;
- CMS published pages;
- internal link graph;
- conversioni associate a guide;
- query cluster e page intent;
- CTR, impression, click, posizione media, quando disponibili.

### 4. Operational analytics

Non è marketing analytics. Usa l'Operational Error Ledger e misura:

- errori per provider;
- webhook falliti;
- refund rate;
- dispute rate;
- report in review;
- ticket aperti per categoria;
- tempi di risoluzione.

## Decisione MVP

Implementare prima eventi e dashboard interne minime. GA4/Matomo restano settings admin opzionali e disattivabili.

## Non obiettivo

Non creare un sistema invasivo di tracking utente individuale. L'utente non deve essere profilato oltre quanto necessario a erogare servizi, assistenza, sicurezza e fatturazione.
