# M21-S — RC Hardening Development

## Obiettivo

Implementare il runtime operativo dei gate Release Candidate progettati in M21-P senza dichiarare artificialmente pronta la RC.

Lo sprint aggiunge command center, API, runner statico, production env guard, evidence bundle e slot artifact per build reale, Docker, lockfile, migrazioni, restore drill, provider sandbox, Playwright, security/privacy freeze e sign-off.

## Decisione di prodotto

La Release Candidate resta **blocked** finche i gate P0 non hanno evidenze reali oppure, solo per provider non inclusi nel perimetro, waiver `waived_with_feature_off` con feature flag disabilitata, UI non raggiungibile, live credential non attive e nota release.

## Implementato

- Runtime web `apps/web/lib/rc-hardening/rc-hardening-runtime.ts`.
- Command center admin `/admin/launch-readiness/rc-hardening`.
- Componenti `RcHardeningSummaryCards`, `RcGateTable`, `RcEvidenceBundlePanel`, `RcSignoffPanel`, `RcWaiverGuardPanel`.
- API admin `GET /launch-readiness/rc-hardening/summary`.
- API admin `GET /launch-readiness/rc-hardening/evidence-bundle`.
- Service `RcHardeningService` e contract runtime API.
- Runner `scripts/rc-hardening-gate-runner.js`.
- Guard `scripts/rc-hardening-production-env-guard.js`.
- Artifact `artifacts/rc-hardening/m21s-rc-gate-run.json`.
- Artifact `artifacts/rc-hardening/m21s-rc-evidence-bundle.json`.
- Artifact `artifacts/rc-hardening/m21s-production-env-guard.sample.json`.
- Slot artifact per build, database, provider e Playwright.

## Gate P0 runtime

| Codice | Gate | Stato pacchetto | Motivo |
| --- | --- | --- | --- |
| RC-P0-001 | Build/typecheck/Docker reali | blocked | Mancano log target reali |
| RC-P0-002 | Dependency freeze e lockfile | blocked | `pnpm-lock.yaml` non presente |
| RC-P0-003 | ENV, secret e feature flag | ready_to_run | Guard implementato, serve esecuzione target |
| RC-P0-004 | Migrazioni, backup e restore | blocked | Mancano migration baseline e restore drill |
| RC-P0-005 | Provider sandbox | blocked | M19-S e mock-first, servono prove reali o waiver feature-off |
| RC-P0-006 | Playwright reale | blocked | Mancano report browser target |
| RC-P0-007 | Security/privacy freeze | ready_to_run | Gate statici presenti, serve freeze firmato |
| RC-P0-008 | Evidence bundle e sign-off | blocked | Bundle creato ma firme pending |

## Guardrail

- Nessun provider live abilitato dallo sprint.
- Nessun dato demo in tenant reale.
- Nessun fake log inserito per fingere build o test reali.
- Nessun segreto scritto negli artifact.
- La UI admin mostra stato, owner, missing evidence e prossima azione.

## QA

- `node scripts/rc-hardening-production-env-guard.js`
- `node scripts/rc-hardening-gate-runner.js`
- `node scripts/qa-rc-hardening-development.js`
- `node scripts/qa-rc-hardening-design.js`
- `node scripts/qa-rc-hardening-analysis.js`
- `node scripts/qa-m20p-docker-build-fix-32.js`
- `node scripts/qa-source-syntax-smoke.js`
- `node scripts/security-secret-scan.js`

## Esito

Sprint completato come runtime RC hardening. RC non pronta: il sistema blocca correttamente il passaggio a Release Candidate finche non sono prodotte evidenze reali.


Nota Coolify: i log Docker/Coolify reali devono essere allegati come evidenza target prima della RC.
