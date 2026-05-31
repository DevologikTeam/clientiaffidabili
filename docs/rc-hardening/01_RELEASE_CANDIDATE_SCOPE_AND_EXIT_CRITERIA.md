# 01 — Release Candidate Scope and Exit Criteria

## Scopo RC

La Release Candidate deve dimostrare che ClientiAffidabili.it puo' essere avviato, testato, monitorato e riportato indietro senza affidarsi a dati fittizi in produzione, chiamate provider non controllate o procedure manuali non tracciate.

## Ambito congelato

- Funnel pubblico, servizi, prezzi e checkout.
- Dashboard cliente, report, fatture, team, supporto e account.
- Admin operations, billing, provider, report, settings, analytics, email, OpenAI copilot e sandbox certification.
- Partner/API sandbox e go-live controllato.
- SEO/GEO pubblico, noindex sensibile, privacy-safe tracking e accessibilita base.

## Criteri di uscita P0

| Gate | Pass richiesto | Evidenza |
|---|---|---|
| Build | `pnpm install`, typecheck, lint e build web/api passano | Log CI + artifact |
| Docker | immagini web/api buildano e healthcheck rispondono | Log Docker + smoke |
| Database | migrazioni versionate o piano schema freeze approvato | migration report |
| E2E | journeys pubblici, checkout, dashboard, admin e partner passano | Playwright report |
| Sandbox provider | Stripe, PayPal, Openapi, OpenAI/email e PDF passano o sono disabilitati con waiver | certification ledger |
| Security | secret scan, headers, no raw payload, token/cache e RBAC controllati | security gate report |
| Privacy | tracking su route sensibili escluso, demo data isolati, log redatti | privacy checklist |
| Rollback | rollback documentato e provato almeno come smoke | rollback artifact |

## Regole go/no-go

- Un P0 fallito blocca RC.
- Un waiver P0 e' ammesso solo se la feature collegata resta disabilitata da settings/feature flag.
- Un P1 aperto puo' entrare in RC solo con owner, data limite e impatto documentato.
- Non si abilita provider live prima di sandbox passata, error ledger attivo e kill switch verificato.

## Handoff

M21-P deve trasformare questi criteri in un gate operativo con stati, owner, artifact richiesti, comandi, runbook e interfaccia/admin command center.
