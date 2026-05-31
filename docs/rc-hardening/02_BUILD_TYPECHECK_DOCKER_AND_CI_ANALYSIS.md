# 02 — Build, Typecheck, Docker and CI Analysis

## Stato statico

- Web Dockerfile usa `pnpm --filter @clientiaffidabili/web build` e output standalone.
- API Dockerfile usa `pnpm --filter @clientiaffidabili/api build`.
- Compose locale e Coolify includono healthcheck per web e API.
- GitHub Actions esegue install, lint, typecheck, build e Playwright.
- Il pacchetto non contiene `pnpm-lock.yaml`.

## Rischi RC

| Rischio | Severita | Evidenza | Mitigazione M21-P |
|---|---|---|---|
| Build non riproducibile | P0 | lockfile assente | generare/committare lockfile o definire freeze dependencies |
| Build reale non eseguita in questo ambiente | P0 | pnpm e Docker non disponibili qui | gate CI/Coolify obbligatorio con log allegati |
| Docker web gia' fallito su DataTable in #32 | P0 mitigato | fix statico presente | rieseguire `docker compose build web` reale |
| CI non produce tutti gli artifact RC | P1 | workflow carica Playwright report soltanto | aggiungere build logs, sandbox summary, secret scan, coverage statico |
| Install con `--frozen-lockfile=false` | P1 | Dockerfile e workflow | congelare strategia dependency per RC |

## Comandi obbligatori in ambiente target

```bash
pnpm install --frozen-lockfile
pnpm -r typecheck
pnpm -r lint
pnpm -r build
node scripts/qa-source-syntax-smoke.js
node scripts/security-secret-scan.js
node scripts/qa-m20p-docker-build-fix-32.js
docker compose build --no-cache api web
docker compose up -d postgres api web
node scripts/launch-smoke-check.js
pnpm e2e:ci
```

## Decisione

M21-P deve creare un RC build gate che non si limita a documentare i comandi: deve dichiarare output, owner, pass/fail, artifact e blocchi release.
