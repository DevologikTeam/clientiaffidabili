# Deploy Coolify

## Obiettivo

Deploy con tre servizi:

- PostgreSQL persistente;
- API NestJS;
- Web Next.js.

## Variabili minime Coolify

In Coolify mantenere solo variabili runtime e segreti. Non mettere configurazioni di prodotto hardcoded nel deploy.

### Database

```env
POSTGRES_DB=clientiaffidabili
POSTGRES_USER=clientiaffidabili
POSTGRES_PASSWORD=...
DATABASE_URL=postgresql://clientiaffidabili:...@postgres:5432/clientiaffidabili
```

### App

```env
APP_URL=https://clientiaffidabili.it
API_URL=https://api.clientiaffidabili.it
PUBLIC_API_URL=https://api.clientiaffidabili.it
JWT_SECRET=...
```

### Provider

```env
OPENAPI_BASE_URL=...
OPENAPI_OAUTH_URL=...
OPENAPI_EMAIL=...
OPENAPI_API_KEY=...
OPENAPI_CALLBACK_SECRET=...
```

### Billing

```env
BILLING_PROVIDER=stripe
STRIPE_SECRET_KEY=...
STRIPE_WEBHOOK_SECRET=...
STRIPE_SUCCESS_URL=https://clientiaffidabili.it/checkout/success
STRIPE_CANCEL_URL=https://clientiaffidabili.it/checkout/cancel
```

### Feature flag go-live

```env
ENABLE_PROVIDER_CALLS=false
ENABLE_CHECKOUT=false
ENABLE_DEMO_DATA=false
```

Portare `ENABLE_PROVIDER_CALLS` e `ENABLE_CHECKOUT` a `true` solo dopo QA e verifica legale.

## Domini

- `clientiaffidabili.it` -> servizio web;
- `api.clientiaffidabili.it` -> servizio api;
- eventuale `admin.clientiaffidabili.it` in futuro se si separa admin.

## Checklist pre-deploy

- segreti impostati in Coolify;
- build web OK;
- build api OK;
- migrazioni DB OK;
- health check API OK;
- webhook Stripe configurato;
- callback provider configurata;
- backup PostgreSQL attivo;
- demo data disattivata in produzione;
- legal pages pubblicate;
- privacy/cookie configurate.
