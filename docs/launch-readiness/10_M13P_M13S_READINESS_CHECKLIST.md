# 10 — M13-P / M13-S Readiness Checklist

## M13-P deve progettare
- Playwright config.
- Test data strategy.
- Page object model o fixture strategy.
- Test matrix P0/P1/P2.
- CI workflow.
- Coolify smoke blueprint.
- Launch readiness dashboard blueprint.
- QA evidence format.

## M13-S deve implementare
- Playwright install/config.
- Test E2E public funnel.
- Test E2E checkout mock/sandbox.
- Test E2E dashboard cliente.
- Test E2E admin operations.
- Test E2E partner portal sandbox.
- Test cross-account authz.
- Smoke scripts API/Web/Coolify.
- Production launch gate script.
- QA report generato.

## Gate di accettazione M13-S
- `pnpm install` documentato.
- `pnpm build` eseguito o esito KO documentato con fix list.
- `pnpm test`/`pnpm -r typecheck` eseguiti o esito KO documentato.
- Playwright test suite presente.
- Smoke scripts presenti.
- Launch gate presente.
- Report finale chiaro: pronto/non pronto.
