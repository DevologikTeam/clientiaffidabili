# M12-A — Source Notes

## Openapi/listino iniziale

La base servizi/prezzi resta quella acquisita nel documento iniziale del progetto: Business Information, ID & Trust, KYB, IBAN e verifiche contatti sono compatibili con un portale partner controllato.

## OWASP API Security Top 10 2023

Per il portale partner sono particolarmente rilevanti:

- Broken Object Level Authorization;
- Broken Authentication;
- Unrestricted Resource Consumption;
- Broken Function Level Authorization;
- Improper Inventory Management;
- Unsafe Consumption of APIs.

## Stripe API keys

Stripe distingue sandbox/live keys, publishable/restricted/secret keys, webhook signing secrets e raccomanda vault/env vars, rotazione, IP restrictions e restricted API keys. Questi principi sono adattati alle API key partner di ClientiAffidabili.it.

## PayPal REST authentication

PayPal usa access token OAuth2 per REST API. È utile come riferimento per separare API credential provider da API key partner del nostro portale.

## OpenAPI Specification

La documentazione partner deve essere generata e versionata con OpenAPI Specification, evitando documenti manuali non sincronizzati con il codice.
