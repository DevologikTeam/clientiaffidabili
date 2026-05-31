# 10 — Payment, Openapi & OpenAI Settings Governance Analysis

## Obiettivo

Centralizzare le configurazioni runtime modificabili in admin, mantenendo in ENV solo cio' che serve ad avviare l'applicazione e connettersi alla piattaforma.

## Classi di settings

### Public-safe

Valori mostrabili anche in frontend o copy pubblico, per esempio:

- acquisti temporaneamente sospesi;
- messaggio pubblico;
- stato generico provider.

### Internal-readable

Visibili solo admin, senza segreti:

- provider abilitato;
- sandbox/live;
- timeout;
- retry policy;
- webhook status;
- last health check.

### Secret-backed

Salvati cifrati o come secret reference:

- Stripe secret key;
- PayPal client secret;
- Openapi API key;
- OpenAI API key;
- webhook signing secret.

La UI non deve mai mostrare il valore completo dopo il salvataggio.

## OpenAI usage governance

Le API OpenAI possono servire in futuro per:

- assistenza admin;
- suggerimenti copy CMS;
- classificazione ticket;
- sintesi errori;
- supporto QA interno.

Non devono ricevere automaticamente:

- raw payload provider;
- dati carte;
- documenti fiscali completi;
- report sensibili;
- dati personali non minimizzati.

Ogni use case AI deve avere:

- flag abilitazione;
- modello consentito;
- limite costo/usage;
- policy logging prompt;
- redaction obbligatoria;
- fallback se OpenAI fallisce;
- error logging nel ledger operativo.

## Settings lifecycle

- `draft`: configurato ma non attivo;
- `active`: operativo;
- `disabled`: disattivato manualmente;
- `error`: non funzionante;
- `requires_review`: richiede controllo tecnico/compliance.

## Governance modifiche

Reason obbligatoria per:

- passare sandbox -> live;
- abilitare acquisti;
- abilitare Openapi live;
- abilitare OpenAI;
- ridurre soglia margine;
- ruotare segreti;
- ignorare errori critical.

## QA atteso

- Nessun valore con pattern `sk-`, `secret`, `token`, `api_key` stampato in UI o log.
- Settings sensibili sempre redatti.
- Ogni modifica crea audit.
- Config live non attivabile senza required checklist.
