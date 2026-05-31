# Docker/Coolify Smoke Runtime

M13-S aggiunge healthcheck Docker Compose per `api` e `web`.

## Healthcheck API

`wget -qO- http://localhost:3001/health || exit 1`

## Healthcheck Web

`wget -qO- http://localhost:3000 || exit 1`

## Smoke script

`scripts/launch-smoke-check.js` controlla:

- homepage web;
- API `/health`.

## Comandi consigliati

```bash
pnpm qa:launch:smoke
```

In ambiente Coolify bisogna eseguire smoke usando gli URL pubblici/staging configurati in `PLAYWRIGHT_BASE_URL` e `PLAYWRIGHT_API_URL`.
