# Observability, redaction e audit implementation

## Redaction

`RedactionService` oscura chiavi sensibili prima di log o preview:

- authorization;
- password;
- secret;
- token;
- apiKey/api_key;
- rawPayload;
- card;
- iban;
- taxCode.

## Audit

I moduli già implementati devono continuare a scrivere audit append-only per:

- checkout;
- webhook;
- provider request;
- report publish/download;
- refund;
- dispute;
- admin action;
- support ticket.

## Log policy

Non loggare mai:

- payload grezzo provider;
- documenti completi;
- dati carta;
- segreti;
- token;
- IBAN completo;
- codice fiscale completo se non necessario.

## Metriche operative future

- webhook falliti;
- provider failed/manual review;
- report bloccati;
- refund pending;
- login failure;
- rate limit;
- errori 403/404 sospetti su risorse customer.
