# M21-A — RC Hardening Analysis

## Obiettivo

M21-A apre il ciclo Release Candidate Hardening. Lo sprint non introduce nuove feature e non cambia flussi runtime: fotografa lo stato v0.71.0, classifica i blocchi che impediscono una RC credibile e prepara il design operativo M21-P.

## Perimetro verificato staticamente

- Web Next.js: 72 page route, 6 layout, 137 componenti TSX, metadata/noindex M20-S e superfici pubbliche/sensibili.
- API NestJS: 25 directory modulo, 27 controller, 50 service e 74 entity TypeORM.
- QA: 79 script `qa-*`, 85 script JS totali, 5 spec Playwright E2E.
- Deploy: `apps/web/Dockerfile`, `apps/api/Dockerfile`, `docker-compose.yml`, `docker-compose.coolify.yml` e workflow `.github/workflows/production-qa.yml`.
- Runtime config: `.env.example`, `apps/web/.env.local.example`, feature flag, provider sandbox/live, checkout, Openapi, Stripe, PayPal, OpenAI, email e demo data.
- Operativita: sandbox certification, launch readiness, error ledger, rollback, waiver, healthcheck e support escalation.

## Evidenze principali

- Il progetto e' vicino alla RC per copertura funzionale, ma non puo' essere dichiarato RC finche' build reale, Docker, Playwright, migrazioni e sandbox provider non sono certificati in ambiente target.
- Il fix #32 ha ridotto il rischio build web su `DataTable`, ma il Docker build deve essere rieseguito realmente con `pnpm --filter @clientiaffidabili/web build`.
- Non risulta presente `pnpm-lock.yaml`: la riproducibilita' del build non e' ancora congelata.
- Non risultano migrazioni TypeORM versionate: le 74 entity sono gestite da `synchronize` fuori produzione, ma la RC richiede piano migrazioni, seed controllati e restore drill.
- La CI esegue install, lint, typecheck, build e Playwright, ma deve diventare un gate RC con artifact, secret scan, sandbox certification summary e blocchi P0 espliciti.
- Le route sensibili hanno noindex layout e robots rafforzati, ma il gate RC deve verificare anche header, cache, tracking denylist, token, secret e raw payload.
- Sandbox certification e' implementata mock-first: serve passaggio M21-S/M22 verso esecuzioni sandbox reali o waiver auditati con feature disabilitata.

## Blocchi P0 prima della RC

| Area | Blocco | Impatto | Output M21-P |
|---|---|---|---|
| Build riproducibile | Assenza lockfile e build reale non certificata nel pacchetto | Rischio drift dipendenze e fallimenti Docker | Build freeze plan, lockfile policy, CI fail-fast |
| Docker/Coolify | Smoke non eseguito in ambiente reale | Rischio deploy non avviabile | Runbook smoke, healthcheck e artifact obbligatori |
| Database | Migrazioni non versionate e restore drill non provato | Rischio perdita dati o schema drift | Migration freeze, backup/restore checklist, seed policy |
| Provider sandbox | Stripe/PayPal/Openapi/OpenAI/email non certificati reali | Checkout/report non firmabili per RC | Provider certification sign-off o waiver con feature off |
| Security | Secret scan statico presente, ma headers/token/cache/log non consolidati in RC gate | Rischio esposizione accidentale | Security freeze checklist e P0 security gate |
| QA browser | 5 spec Playwright presenti ma non eseguiti qui | Rischio regressione UX/checkout/dashboard | Matrix E2E reale con report e screenshot artifact |
| Operativita | Error ledger e support esistono, ma manca triage RC unificato | Rischio incident response debole | RC command center e escalation map |
| Release governance | Rollback e sign-off documentati in sprint precedenti, non ancora congelati per RC | Rischio rilascio non controllato | Release checklist con go/no-go e owner |

## Blocchi P1/P2

- Allineare versioni root/web/api/shared nel rilascio.
- Congelare lista feature flag production-safe.
- Definire log retention e redaction per payload provider.
- Inserire check su `ENABLE_DEMO_DATA=false` per produzione reale.
- Definire policy di waiver: ammesso solo se la feature resta disabilitata e il rischio e' documentato.
- Rafforzare artifact di QA con baseline JSON, log comandi, screenshot e report.
- Preparare manuale operativo minimo per supporto, rimborsi, dispute, report falliti e rollback.

## Decisioni M21-A

1. La prossima fase non deve aggiungere feature: deve ridurre rischio RC.
2. Nessun provider live deve essere abilitato senza sandbox passata, evidenze e kill switch verificato.
3. Le demo possono restare nel tenant/fixture dedicato, mai nei tenant reali.
4. Ogni waiver deve avere owner, motivo, scadenza, feature flag disabilitato e audit.
5. La RC deve essere bloccata se falliscono build, typecheck, Docker smoke, E2E critici, secret scan, migration plan o sandbox certification P0.

## Deliverable aggiunti

- `docs/rc-hardening/01_RELEASE_CANDIDATE_SCOPE_AND_EXIT_CRITERIA.md`
- `docs/rc-hardening/02_BUILD_TYPECHECK_DOCKER_AND_CI_ANALYSIS.md`
- `docs/rc-hardening/03_RUNTIME_CONFIG_ENV_AND_SECRETS_AUDIT.md`
- `docs/rc-hardening/04_DATABASE_MIGRATION_BACKUP_RESTORE_AUDIT.md`
- `docs/rc-hardening/05_SECURITY_PRIVACY_AND_COMPLIANCE_FREEZE_AUDIT.md`
- `docs/rc-hardening/06_PROVIDER_SANDBOX_TO_LIVE_READINESS_AUDIT.md`
- `docs/rc-hardening/07_OBSERVABILITY_ERROR_LEDGER_AND_SUPPORT_AUDIT.md`
- `docs/rc-hardening/08_RC_RISK_REGISTER_AND_RELEASE_BLOCKERS.md`
- `docs/rc-hardening/09_M21P_RC_HARDENING_DESIGN_HANDOFF.md`
- `apps/web/lib/rc-hardening/rc-hardening-analysis.ts`
- `apps/api/src/modules/launch-readiness/rc-hardening-analysis.types.ts`
- `artifacts/rc-hardening/m21a-rc-hardening-baseline.json`
- `scripts/qa-rc-hardening-analysis.js`

## QA M21-A

Il gate M21-A verifica deliverable, versione, script, metriche statiche, blocchi P0, registry, baseline JSON, CI/Docker healthcheck e assenza di claim assoluti nei nuovi documenti.

## Stato

Sprint completato come analisi. Non sono stati eseguiti build Next.js/Nest reali, Docker/Coolify, Playwright, Lighthouse, axe, migrazioni, restore drill o provider sandbox reali in questo ambiente.
