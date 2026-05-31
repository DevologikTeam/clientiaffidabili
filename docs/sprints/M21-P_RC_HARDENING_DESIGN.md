# M21-P — RC Hardening Design

## Obiettivo

M21-P trasforma l'analisi M21-A in un blueprint operativo per arrivare a una Release Candidate credibile. Lo sprint non dichiara ancora la RC pronta: disegna gate, contratti, evidenze, responsabilita e blocchi che M21-S dovra implementare e far eseguire in ambiente reale.

## Perimetro

- Build reale web/API, typecheck, lint, Docker, healthcheck e CI.
- Dependency freeze con `pnpm-lock.yaml` o procedura approvata di generazione/freeze.
- Runtime config, ENV, secrets, feature flag, demo data e route sensibili.
- Database: baseline migrazioni, backup, restore drill e rollback schema/app.
- Provider: Stripe, PayPal, Openapi, OpenAI, email/PDF e passaggio sandbox -> live.
- Browser/E2E: Playwright reale, screenshot, report e failure triage.
- Osservabilita: error ledger, sandbox ledger, email ledger, payment ledger, support runbook.
- Evidence bundle, sign-off, waiver auditato e release freeze.

## Decisioni principali

1. La RC non puo passare senza evidenze reali per build, Docker, Playwright, migrazioni/restore e provider sandbox, oppure waiver `waived_with_feature_off` con feature disabilitata.
2. Ogni gate deve produrre artifact leggibile: log, JSON summary, screenshot/report se browser, export config redatto, decisione owner e timestamp.
3. Il blocco `ENABLE_DEMO_DATA` deve essere trattato come P0: in produzione deve risultare `false` e qualunque dataset demo deve restare fuori dai tenant reali.
4. Le migrazioni vanno congelate con baseline e piano rollback; nessuna modifica schema deve essere eseguita senza restore drill documentato.
5. I provider live non si abilitano in massa: si passa per sandbox passata, readiness commerciale/legale, limite feature flag e monitoraggio error ledger.
6. Il gate finale deve leggere lo stato dei gate intermedi; non deve fidarsi di checklist manuali non collegate a evidenze.
7. Le route admin/dashboard/report/checkout/invite restano noindex e fuori dal tracking esterno.
8. I claim pubblici restano prudenti: supporto decisionale, non garanzia di pagamento o rischio nullo.

## Blocchi RC disegnati

| Codice | Area | Blocco | Uscita richiesta |
| --- | --- | --- | --- |
| RC-P0-001 | Build | Build reale non certificata | `pnpm build`, typecheck, Docker e healthcheck con artifact |
| RC-P0-002 | Dipendenze | Lockfile mancante | lockfile generato e committato o waiver tecnico approvato |
| RC-P0-003 | Database | Migrazioni non versionate | baseline migration, backup log e restore drill |
| RC-P0-004 | Provider | Sandbox reali non eseguite | sandbox passata o feature off con waiver |
| RC-P0-005 | Browser | Playwright reale non eseguito | report E2E, screenshot e triage fallimenti |
| RC-P0-006 | Config | Demo/test abilitabile in produzione | ENV gate e production guard |
| RC-P0-007 | Security/privacy | Freeze non centralizzato | secret scan, route sensitive guard, policy tracking |
| RC-P0-008 | Release | Evidence bundle assente | bundle finale con sign-off owner |

## Output M21-P

- Blueprint gate orchestration RC.
- Blueprint build/typecheck/Docker/CI/dependency freeze.
- Blueprint ENV/secrets/feature flag/demo data freeze.
- Blueprint migrazioni, backup, restore e rollback.
- Blueprint provider sandbox/live cutover.
- Blueprint osservabilita, error ledger e support runbook.
- Blueprint evidence bundle, waiver e sign-off.
- Handoff M21-S con task P0/P1 e criteri di completamento.
- Registry TypeScript web e contract TypeScript API.
- Artifact JSON `m21p-rc-hardening-design-blueprint.json`.
- QA statico `qa-rc-hardening-design.js`.

## QA previsto

- `node scripts/qa-rc-hardening-analysis.js`
- `node scripts/qa-rc-hardening-design.js`
- `node scripts/qa-m20p-docker-build-fix-32.js`
- `node scripts/qa-source-syntax-smoke.js`
- `node scripts/security-secret-scan.js`

## Stato

Sprint completato come progettazione. Non sono stati eseguiti build reale, Docker/Coolify reale, Playwright reale, provider sandbox reali, migrazioni o restore drill. Tutte queste attivita diventano gate operativi per M21-S.
