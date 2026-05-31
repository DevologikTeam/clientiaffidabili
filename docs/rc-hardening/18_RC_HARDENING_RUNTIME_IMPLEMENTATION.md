# 18 — RC Hardening Runtime Implementation

M21-S implementa il runtime operativo dei gate RC. Il runtime non sostituisce build, Docker, Playwright, provider sandbox o restore drill reali: li rende visibili, bloccanti e tracciabili.

## Superfici implementate

- Web registry: `apps/web/lib/rc-hardening/rc-hardening-runtime.ts`.
- API registry: `apps/api/src/modules/launch-readiness/rc-hardening-runtime.types.ts`.
- API service: `RcHardeningService`.
- API endpoint summary: `GET /launch-readiness/rc-hardening/summary`.
- API endpoint bundle: `GET /launch-readiness/rc-hardening/evidence-bundle`.
- Admin UI: `/admin/launch-readiness/rc-hardening`.

## Regola di stato

Un gate P0 in stato `ready_to_run` resta comunque aperto per la RC. Significa che il runner esiste, non che l'evidenza reale sia stata prodotta.

La RC diventa `ready_for_rc` solo quando `openBlockingGateCount` vale 0.
