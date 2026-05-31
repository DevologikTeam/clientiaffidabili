# Sandbox Runner and Provider Adapters

## Runner mock-first

`scripts/sandbox-certification-runner.js` legge il registry scenari e genera un report JSON in:

```text
artifacts/sandbox-certification/latest-run.json
```

Il runner non usa rete, non carica secret e non chiama provider reali. Serve per verificare copertura, evidence hash, stato RC e blocker manuali.

## Adapter backend

`MockSandboxCertificationAdapter` implementa il contratto `SandboxCertificationAdapter`.

Responsabilita:

- produrre outcome deterministicamente;
- generare evidence redatte;
- non esporre raw payload, token, secret o API key;
- marcare gli scenari manual-only come `blocked` fino a evidenza esterna;
- preparare passaggio futuro a adapter sandbox reali.

## Provider futuri

Gli adapter futuri dovranno restare separati per provider:

- Stripe sandbox;
- PayPal sandbox;
- Openapi sandbox/mock ufficiale;
- OpenAI sandbox/budget test;
- provider email sandbox;
- PDF/secure link/access control;
- Docker/Coolify smoke esterno.

Ogni adapter reale deve restituire solo evidenze redatte e riferimenti sicuri. Le secret devono restare in ambiente/Coolify secrets o vault, mai nel repository.
