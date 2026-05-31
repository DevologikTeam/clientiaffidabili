# 19 — Provider Settings & Secrets Blueprint

## Principio

La UI admin puo' governare i provider, ma non deve mostrare segreti in chiaro. I segreti reali restano in Coolify/secret manager oppure vengono salvati cifrati in futuro. Nel MVP si usa `secretRef`.

## Provider coperti

- Stripe;
- PayPal;
- Openapi;
- OpenAI;
- email provider.

## Campi comuni

- provider key;
- ambiente: sandbox/live;
- enabled/disabled;
- health status;
- secret reference;
- last verified at;
- timeout;
- retry policy;
- budget/cost guard;
- error routing;
- owner interno.

## Regole

- Nessun secret in response API admin.
- Nessun secret nel frontend bundle.
- Secret value scrivibile solo con action dedicata e mai rileggibile.
- Rotazione con reason obbligatoria.
- Test connessione genera evento nel ledger se fallisce.
