# Security, Privacy & Compliance Analysis

## Segreti e ambienti

Le credenziali provider devono stare solo nel backend:

```text
OPENAPI_BASE_URL
OPENAPI_CLIENT_ID / OPENAPI_API_KEY
OPENAPI_CLIENT_SECRET
OPENAPI_CALLBACK_SECRET
ENABLE_PROVIDER_CALLS=false
PROVIDER_EXECUTION_MODE=mock_enabled|sandbox|production
```

Nessuna variabile `NEXT_PUBLIC_*` deve contenere credenziali o URL sensibili del provider.

## Ambienti

| Ambiente | Provider calls | Uso |
|---|---|---|
| local | mock | sviluppo UI/API |
| staging | mock o sandbox | test integrati |
| production-preview | disabled/sandbox controllato | smoke test |
| production | production solo dopo approval | servizio reale |

## PII e minimizzazione

Regole:

- inviare al provider solo i campi necessari;
- validare formato prima della chiamata;
- mascherare IBAN/codici fiscali dove possibile;
- non usare dati per finalità marketing se non previste;
- separare dati ordine, dati fatturazione e dati soggetto verificato;
- definire retention per payload provider.

## Uso lecito

Prima del provider call deve esistere traccia di:

- conferma checkout;
- finalità dichiarata;
- accettazione termini;
- contesto B2B o compliance;
- user/account che ha richiesto il controllo.

## Audit

Azioni da auditare:

- mapping provider pubblicato/modificato;
- provider request creata;
- provider request inviata;
- risposta ricevuta;
- normalizzazione fallita;
- retry programmato;
- review manuale;
- raw payload consultato;
- report pubblicato.

## Compliance guardrails

- vietare wording investigativo consumer;
- non promuovere servizi persona nel funnel pubblico MVP;
- rendere visibili fonte, limiti e data report;
- richiedere uso lecito per KYB/AML;
- bloccare richieste senza soggetto e finalità chiara;
- non usare claim assoluti di affidabilità.

