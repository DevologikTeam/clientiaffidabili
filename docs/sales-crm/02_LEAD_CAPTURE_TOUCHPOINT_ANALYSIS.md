# 02 — Lead Capture & Touchpoint Analysis

## Touchpoint pubblici

| Touchpoint | Intento utente | Azione consigliata |
|---|---|---|
| Homepage | Capire il valore | CTA verso servizio o contatto |
| Pagina prezzi | Valutare costo | Checkout, richiesta pacchetto, demo |
| Dettaglio servizio | Acquistare o chiarire | Checkout o domanda commerciale |
| Garanzia operativa | Ridurre rischio percepito | Contatto supporto/commerciale |
| Guide SEO/GEO | Educazione e domanda latente | CTA soft verso servizio o checklist |
| API/Partner | Valutare integrazione | Richiesta accesso sandbox |
| Dashboard cliente | Supporto/account | Ticket contestuale |

## Form MVP

### Form contatto commerciale

Campi minimi:

- nome;
- email aziendale;
- azienda;
- ruolo opzionale;
- messaggio;
- servizio di interesse;
- consenso privacy obbligatorio.

### Form richiesta demo

Campi minimi:

- nome;
- email aziendale;
- azienda;
- telefono opzionale;
- dimensione azienda opzionale;
- scenario principale;
- disponibilità oraria libera;
- consenso privacy.

### Form partner/API

Campi minimi:

- azienda;
- referente;
- email;
- sito web;
- caso d'uso;
- volume stimato;
- ambiente richiesto: sandbox/live;
- dichiarazione uso lecito.

### Ticket supporto cliente

Campi minimi:

- account;
- categoria;
- ordine/report/fattura opzionale;
- priorità proposta;
- descrizione;
- allegato opzionale solo se sicuro e necessario.

## Sorgenti da tracciare

- page path;
- CTA id;
- service slug;
- guide slug;
- pricing plan;
- UTM campaign/source/medium se presenti;
- referral domain se disponibile senza PII.

## Dati da non tracciare

- contenuto report;
- raw payload provider;
- dati carta;
- IBAN completi nei sistemi marketing;
- query sensibili di verifica;
- dati personali del soggetto verificato non necessari al lead.

## Anti-spam e anti-abuse

- honeypot invisibile;
- rate limit per IP/email;
- blocco domini temporanei;
- validazione email;
- captcha solo se abuso reale;
- audit dei form sospetti;
- flag `requiresReview` per richieste investigative, massive o ambigue.

## Decisione

Ogni form deve creare un record `Lead` oppure `SupportTicket` con origine, consenso e stato iniziale. Nessun form deve attivare automaticamente provider, report o invii commerciali non richiesti.
