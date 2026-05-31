# Studio senior designer sulle bozze HTML e sui loghi

## Materiale analizzato

Sono stati inclusi nel pacchetto:

- `docs/reference/legacy-prototype-sito`: prima bozza sito corporate/marketing;
- `docs/reference/legacy-prototype-flusso`: landing, catalogo servizi, checkout, dashboard e report HTML;
- `assets/logos`: logo principale, logo HD, logo web, favicon e icone PWA.

## Cosa funziona già

Le bozze hanno una base coerente:

- palette affidabile: blu istituzionale, celeste operativo, accento oro;
- struttura B2B chiara;
- presenza di dashboard e report, quindi non solo landing;
- idea di acquisto self-service;
- identità visuale già riconoscibile.

## Cosa va corretto prima dello sviluppo reale

### 1. Da “visure” a “decisioning”

La bozza usa spesso parole come “visure”, “dati ufficiali”, “documenti”. Sono corrette, ma rischiano di posizionare il prodotto come portale documentale generico. Il copy deve spostarsi su:

- verifica affidabilità;
- segnali di rischio;
- decisione commerciale;
- storico controllabile;
- prevenzione insoluti e frodi.

### 2. Checkout

La bozza checkout contiene campi carta custom. In produzione non dobbiamo mai gestire direttamente carta o PAN nel frontend. La UI corretta è:

1. riepilogo ordine;
2. dati soggetto da verificare;
3. dati fatturazione;
4. consensi e uso lecito;
5. redirect/embedded hosted checkout Stripe.

### 3. Dati demo

I report mostrano dati fittizi come “ACME Italia S.p.A.”. Vanno bene come prototipo statico, ma in app reale:

- i dati demo devono vivere solo in ambiente demo o feature flag;
- nessun tenant reale deve contenere dati inventati;
- ogni report deve indicare fonte, timestamp e stato elaborazione.

### 4. Immagini esterne

La bozza usa immagini Unsplash via URL. Per l’MVP è meglio evitare dipendenze esterne non controllate. Preferire:

- illustrazioni vettoriali proprietarie;
- pattern geometrici brand;
- screenshot UI reali;
- nessuna immagine stock generica nella parte più decisionale.

### 5. Gerarchia UX

La prima schermata deve avere una sola promessa e una sola azione primaria:

- CTA primaria: `Verifica un'azienda`;
- CTA secondaria: `Scopri i piani team`;
- CTA terziaria: `Parla con noi`.

Non usare CTA generiche come “Acquista visure ora” quando il valore è la riduzione del rischio.

## Direzione visual consigliata

Il prodotto deve apparire:

- affidabile ma non burocratico;
- fintech/compliance, non “portale pratiche”;
- semplice per PMI;
- rassicurante nei report;
- molto chiaro su stato, tempi e prossima azione.

## Componenti core da progettare

- hero decisionale;
- selettore verifica;
- wizard dati soggetto;
- card prezzo/servizio;
- stato elaborazione;
- risk summary/semaforo;
- red flag list;
- report evidence cards;
- storico dashboard;
- billing summary;
- empty state guidati;
- banner compliance/uso lecito.

## Copy replacement immediati

| Bozza | Nuovo copy consigliato |
|---|---|
| Acquista Visure Ora | Verifica un'azienda |
| Report Azienda Top | Check Affidabilità Pro |
| Archivio Report e Visure | Storico verifiche |
| Completa la Richiesta | Conferma verifica e pagamento |
| I dati ufficiali per il tuo business | Decisioni commerciali più sicure, con dati verificabili |
