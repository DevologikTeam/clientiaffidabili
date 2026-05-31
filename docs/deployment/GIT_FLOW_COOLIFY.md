# Git flow e pubblicazione Coolify

## Branch

- `develop`: branch principale di sviluppo e staging. Ogni sprint viene committato qui.
- `main`: branch stabile/production-ready. Si aggiorna solo dopo QA e preflight passati.
- `release/vX.Y.Z`: branch temporaneo opzionale per preparare una release.
- tag `vX.Y.Z`: tag annotato della versione rilasciata.

## Flusso standard sprint

```bash
git checkout develop
git pull origin develop
pnpm release:pre-zip-check
pnpm qa:coolify-preflight
git add .
git commit -m "v0.75.1 final client copy and coolify git flow"
git tag -a v0.75.1 -m "v0.75.1 final client copy and coolify git flow"
git push origin develop
git push origin v0.75.1
```

## Promozione a main

Dopo verifica manuale su staging/Coolify:

```bash
git checkout main
git pull origin main
git merge --no-ff develop -m "release v0.75.1"
git push origin main
```

## Deploy Coolify consigliato

In Coolify configurare:

- Repository: `https://github.com/DevologikTeam/clientiaffidabili.git`
- Branch staging: `develop`
- Branch produzione: `main`
- Docker Compose file locale/staging: `docker-compose.yml`
- Docker Compose file strict/Coolify: `docker-compose.coolify.yml`

## Deploy tramite webhook GitHub Actions

Impostare nel repository GitHub i secrets:

- `COOLIFY_STAGING_WEBHOOK_URL`
- `COOLIFY_PRODUCTION_WEBHOOK_URL`

Il workflow `.github/workflows/coolify-deploy.yml` invia il deploy a Coolify:

- push su `develop` -> staging
- push su `main` -> produzione
- tag `v*` -> evidenza release versionata

## Gate obbligatori prima del push

```bash
pnpm release:pre-zip-check
pnpm qa:coolify-preflight
```

Per simulazione più vicina a Coolify senza porte host:

```bash
pnpm qa:coolify-preflight:strict
```

## Comandi rapidi v0.75.1

```bash
git checkout develop
git pull origin develop
git add . && git commit -m "v0.75.1 final client copy and coolify git flow"
git tag -a v0.75.1 -m "v0.75.1 final client copy and coolify git flow"
git push origin develop && git push origin v0.75.1
```
