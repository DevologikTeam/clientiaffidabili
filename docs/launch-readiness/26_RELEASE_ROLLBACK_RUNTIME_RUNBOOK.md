# Release & Rollback Runtime Runbook

## Prima della release candidate

- `pnpm install --frozen-lockfile=false`
- `pnpm lint`
- `pnpm typecheck`
- `pnpm build`
- `pnpm qa:launch:gate`
- `pnpm e2e:ci`
- `pnpm qa:launch:smoke`
- secret scan
- backup database
- restore drill su ambiente separato

## Deploy Coolify

1. deploy su staging;
2. smoke test URL staging;
3. Playwright contro staging;
4. verifica webhook sandbox;
5. verifica provider sandbox/mock;
6. verifica download report e fatture;
7. sign-off.

## Rollback

- conservare immagine/commit precedente;
- congelare nuovi checkout se il problema coinvolge billing/provider/report;
- ripristinare release precedente;
- verificare DB migrations reversibili o forward-only compatibili;
- aprire incident log;
- comunicare impatto a support/admin.

## Blocco go-live

La produzione è bloccata se manca anche uno solo tra build reale, E2E P0, smoke, webhook sandbox, backup/restore e rollback provato.
