# M18 — Email & Customer Notifications Roadmap Insert

## Obiettivo

Prevedere e poi implementare tutte le email tecniche necessarie per il cliente: registrazione, sicurezza account, checkout, pagamento, documento pronto, PDF/report, abbonamenti, rimborsi, supporto e anomalie operative.

Il modulo M18 deve essere completato prima della Release Candidate perche' le email sono parte del ciclo operativo e legale del servizio.

## Scope M18

### M18-A — Analysis

Analizzare:

- inventory completa email tecniche;
- provider email consigliato;
- deliverability, SPF, DKIM, DMARC, TLS;
- separazione email transazionali/marketing;
- log invii, bounce, complaint, retry, webhook;
- allegati PDF vs link sicuro;
- copy tecnico cliente;
- retention e privacy;
- interazione con error ledger e admin operations.

### M18-P — Design

Progettare:

- data model `EmailTemplate`, `EmailDelivery`, `EmailEvent`, `EmailSuppression`;
- API invio email;
- queue/retry;
- webhook provider;
- template responsive;
- admin email monitor;
- invio PDF/link report;
- policy allegati;
- fallback manuale da admin.

### M18-S — Development

Implementare:

- email adapter provider-ready;
- template tecnici cliente;
- email ledger;
- webhook email provider;
- retry e replay sicuro;
- admin monitor;
- integrazione con auth, checkout, billing, reports, CRM, supporto e settings admin.

## Decisione architetturale

Email provider adapter-first, con settings da admin e secret reference write-only.

Provider candidati:

- Resend: moderno, ottimo per Next.js/React email e webhook chiari;
- Postmark: molto forte su email transazionali e deliverability;
- Amazon SES: economico e scalabile, ma piu' operativo da gestire;
- SMTP custom: fallback solo per ambienti controllati.

Per MVP si consiglia **Resend o Postmark**, non SMTP generico, per avere webhooks, delivery status, bounce, complaint e message id.

## Deliverability baseline

Prima del go-live bisogna documentare:

- dominio mittente dedicato, es. `notifiche.clientiaffidabili.it` o `mail.clientiaffidabili.it`;
- SPF;
- DKIM;
- DMARC;
- TLS;
- From coerenti per categoria;
- Message-ID valido;
- no contenuti marketing dentro email tecniche;
- gestione bounce/complaint.

## Guardrail

- Nessun dato carta, token, API key, raw provider payload o segreti nelle email.
- Nessun PDF allegato se contiene dati sensibili senza valutazione dimensione/sicurezza.
- Preferire link sicuro temporaneo al PDF quando possibile.
- Ogni invio deve essere tracciato in `EmailDelivery`.
- Ogni errore critico deve poter aprire un evento in `OperationalErrorLedger`.
- I reinvii manuali devono richiedere reason e audit.
