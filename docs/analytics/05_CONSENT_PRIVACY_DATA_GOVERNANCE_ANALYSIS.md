# 05 — Consent, Privacy and Data Governance Analysis

## Regola base

Analytics deve essere disattivabile e governabile da admin settings.

## Consent mode

Per strumenti Google, il progetto deve prevedere default negato dove richiesto e aggiornamento dello stato consenso quando l'utente interagisce con il banner o il pannello preferenze.

## Dati vietati negli eventi

- email;
- telefono;
- nome persona;
- messaggio contatto;
- partita IVA completa se non strettamente necessaria;
- codice fiscale;
- IBAN;
- dati carta;
- prompt/risposte OpenAI;
- raw payload Openapi/provider;
- API key;
- token;
- indirizzo IP completo lato analytics marketing.

## IP e acquisti

L'IP acquisto è già previsto come audit privacy-aware nel modulo settings/admin. Non deve essere duplicato negli eventi marketing.

## Retention consigliata

- eventi pubblici aggregati: 14-26 mesi;
- eventi business interni: secondo policy fiscale/audit;
- error ledger: retention separata, legata a sicurezza/supporto;
- raw debug payload: evitare, o vault limitato e redatto.

## Admin controls

Settings admin previsti:

- analytics enabled;
- GA4 measurement id;
- Matomo enabled;
- Matomo site id;
- consent required;
- internal event retention days;
- analytics debug mode;
- source attribution window days;
- disable client tracking.

## Data minimization

Ogni evento deve essere progettato come una scheda business, non come dump tecnico.
