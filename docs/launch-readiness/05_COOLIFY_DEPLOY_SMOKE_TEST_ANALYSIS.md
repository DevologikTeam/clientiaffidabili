# 05 — Coolify Deploy & Smoke Test Analysis

## Obiettivo
Garantire che lo stack sia avviabile, osservabile e rollbackabile su Coolify.

## Controlli Docker Compose
- Servizi separati `web`, `api`, `postgres`.
- Variabili obbligatorie non hardcoded.
- Healthcheck per API.
- Startup order robusto, non basato solo su `depends_on`.
- Log leggibili e privi di segreti.
- Network interno per DB.

## Smoke test post deploy

```bash
curl -f https://clientiaffidabili.it
curl -f https://api.clientiaffidabili.it/health
curl -f https://clientiaffidabili.it/servizi
curl -f https://clientiaffidabili.it/prezzi
```

## Smoke funzionali minimi
- Creazione ordine mock/sandbox.
- Login utente seeded.
- Accesso dashboard.
- Admin security gate.
- Partner dashboard sandbox.

## Rollback
Prima del go-live deve essere documentato:

- immagine precedente;
- backup DB pre-release;
- comando/azione Coolify per rollback;
- tempo massimo accettabile;
- criterio per dichiarare rollback riuscito.

## Output futuro
- `scripts/smoke-web.sh`.
- `scripts/smoke-api.sh`.
- `scripts/smoke-coolify.sh`.
- `docs/qa/COOLIFY_SMOKE_TEST_REPORT.md`.
