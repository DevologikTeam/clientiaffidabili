# 02 — Build, Typecheck, Lint Gate Analysis

## Gate build reale
Il progetto non deve essere dichiarato pronto finche' non vengono eseguiti in ambiente pulito:

```bash
pnpm install --frozen-lockfile
pnpm -r typecheck
pnpm -r lint
pnpm -r test
pnpm build
```

## Gate Docker
Devono passare:

```bash
docker compose build --no-cache
docker compose up -d
```

E devono essere verificati:

- `web` risponde sulla porta pubblica;
- `api` espone health endpoint;
- PostgreSQL e' raggiungibile solo dai servizi interni;
- migration/seed non distruggono dati esistenti;
- variabili mancanti producono errore chiaro, non comportamento silenzioso.

## Errori bloccanti
- TypeScript errors.
- Route Next.js non compilabili.
- Moduli NestJS non registrati correttamente.
- Entity TypeORM con import mancanti.
- Env obbligatori non dichiarati.
- Feature flag production attivi per mock/sandbox.
- Secret in repository.
- Package lock assente o incoerente.

## Output richiesto in M13-S
- `scripts/qa-build-gate.js`.
- `scripts/qa-env-gate.js`.
- `scripts/qa-docker-gate.js`.
- Report `docs/qa/M13-S_BUILD_GATE_REPORT.md`.
