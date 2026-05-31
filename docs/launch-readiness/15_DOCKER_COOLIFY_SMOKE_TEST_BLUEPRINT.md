# 15 — Docker/Coolify Smoke Test Blueprint

## Obiettivo
Validare che il progetto parta in un ambiente simile alla produzione.

## Smoke test minimi

```bash
curl -fsS "$API_PUBLIC_BASE_URL/health"
curl -fsS "$APP_PUBLIC_BASE_URL"
curl -fsS "$APP_PUBLIC_BASE_URL/servizi"
curl -fsS "$APP_PUBLIC_BASE_URL/prezzi"
```

## Healthcheck attesi
- API: `/health` con database reachable, config valida, feature flag coerenti.
- Web: homepage renderizzata.
- Database: connessione interna, non porta pubblica salvo debug locale.

## Coolify readiness
- Variabili obbligatorie definite in Coolify secrets.
- `ENABLE_PROVIDER_CALLS=false` finche' sandbox non validato.
- `ENABLE_PAYPAL=false` finche' webhook non validato.
- `ENABLE_STRIPE_LIVE=false` finche' test card/sandbox non passa.
- Backup database attivo.
- Healthcheck configurato.
- Dominio e HTTPS verificati.

## Smoke report
M13-S deve generare un file:

```json
{
  "version": "0.43.0",
  "environment": "staging",
  "checks": [
    {"name":"api-health","status":"passed"},
    {"name":"web-home","status":"passed"}
  ]
}
```

## Bloccanti
- health endpoint assente;
- API risponde ma DB non pronto;
- Web carica senza CSS/asset;
- env mock/sandbox attivi in produzione;
- log contenenti segreti o payload grezzi.
