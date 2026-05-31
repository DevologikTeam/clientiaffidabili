# Sandbox Automation & E2E Blueprint

## Livelli di test

### Livello 1 — Static gate

- source syntax smoke;
- secret scan;
- banned claims scan;
- hardcoded live keys scan;
- PII in analytics/tag payload scan.

### Livello 2 — Build gate

- `pnpm install --frozen-lockfile`;
- typecheck web/API;
- build web/API;
- Docker Compose build;
- healthcheck web/API.

### Livello 3 — E2E browser

- registrazione;
- login;
- checkout Stripe sandbox;
- pagamento fallito;
- report pronto;
- download PDF;
- support ticket;
- admin error ledger;
- CMS guide;
- partner sandbox API.

### Livello 4 — Provider sandbox

- Stripe real sandbox;
- PayPal sandbox se abilitato;
- Openapi mock/sandbox;
- OpenAI mock/sandbox;
- Email provider sandbox.

## Comandi previsti

```bash
pnpm qa:source
pnpm qa:security
pnpm qa:sandbox-certification
pnpm e2e:sandbox
pnpm smoke:docker
pnpm release:rc-gate
```

## Artifact

- Playwright HTML report;
- JSON scenario results;
- screenshot fallimenti;
- error ledger export;
- sandbox sign-off report.
