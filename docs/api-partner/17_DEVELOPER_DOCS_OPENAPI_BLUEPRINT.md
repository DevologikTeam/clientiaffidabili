# Developer Docs & OpenAPI Blueprint

## Obiettivo documentazione
Permettere a un developer partner di fare il primo test sandbox in meno di 30 minuti, senza esporre dettagli interni/provider.

## Struttura docs
- Introduzione e requisiti.
- Quickstart sandbox.
- Autenticazione API key.
- Ambienti sandbox/live.
- Idempotenza.
- Rate limit.
- Endpoint verifiche azienda.
- Stati e lifecycle.
- Webhook firmati.
- Errori e next action.
- Usage e crediti.
- Sicurezza e privacy.
- Changelog API.

## OpenAPI spec futura
File previsto: `apps/api/openapi/partner.v1.yaml`.

La spec deve includere:
- security scheme bearer API key;
- schemas input/output;
- error model;
- examples sandbox;
- response codes;
- webhook event schemas se mantenuti nello stesso file o in spec dedicata.

## Esempi SDK
Non MVP, ma predisporre esempi:
- cURL;
- JavaScript/TypeScript;
- PHP;
- Python.

## Versioning
- path versionato `/v1`;
- changelog API pubblico;
- deprecation policy;
- breaking changes con preavviso.

## Copy docs
Usare copy diretto e operativo. Ogni errore deve dire cosa e' successo, perche e cosa fare dopo.
