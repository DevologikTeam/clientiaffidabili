# 11 — Build, Typecheck, Docker, CI & Dependency Freeze Blueprint

## Obiettivo

Rendere riproducibile il build prima della Release Candidate.

## Sequenza obbligatoria

1. Installazione dipendenze con lockfile.
2. `pnpm lint`.
3. `pnpm typecheck`.
4. `pnpm build`.
5. `pnpm --filter @clientiaffidabili/web build`.
6. `pnpm --filter @clientiaffidabili/api build`.
7. `docker compose build --no-cache api web`.
8. `docker compose up -d api web`.
9. Healthcheck `http://localhost:3001/health` e `http://localhost:3000`.
10. Export log build e digest immagini.

## Dependency freeze

- `pnpm-lock.yaml` deve esistere prima della RC.
- Se il lockfile viene generato in M21-S, va incluso nel commit/pacchetto.
- Ogni aggiornamento dipendenza dopo freeze apre nuovo RC build gate.
- Il package manager resta `pnpm@9.0.0` salvo decisione esplicita.

## Gestione warning

- Warning CSS/Autoprefixer gia coperto da fix #32: `align-items:flex-end`.
- Warning Next.js non bloccanti vanno registrati, ma un type error blocca sempre.
- Ogni warning ripetuto entra nel risk register se non risolto.

## Evidenze

- `artifacts/rc-hardening/build/pnpm-build.log`.
- `artifacts/rc-hardening/build/docker-build.log`.
- `artifacts/rc-hardening/build/healthcheck.json`.
- `artifacts/rc-hardening/build/dependency-freeze.json`.

## Uscita gate

`rc-build-typecheck-docker` passa solo se build, Docker e healthcheck sono tutti verdi. `rc-dependency-freeze` passa solo con lockfile presente e coerente.
