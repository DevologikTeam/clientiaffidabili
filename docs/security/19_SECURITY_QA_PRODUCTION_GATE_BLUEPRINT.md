# Security QA & Production Gate Blueprint

## Obiettivo

Definire gate misurabili per impedire go-live prematuro.

## Gate P0

| Gate | Pass criteria |
|---|---|
| Build reale | `pnpm install`, typecheck, build web/api riusciti |
| Docker build | immagini web/api buildate in ambiente pulito |
| Auth/RBAC | test ruoli customer/admin passed |
| Object-level authorization | test IDOR/BOLA principali passed |
| Webhook security | firma/idempotenza/replay test passed |
| Payment/provider | no provider call prima di paid/credit reserved |
| Refund/dispute | doppio rimborso impedito |
| Secret scan | nessun secret reale in repo/log |
| Backup/restore | restore drill riuscito documentato |
| Log redaction | PII/secrets/raw provider non nei log |
| Audit | azioni critiche append-only con reason |
| Data breach runbook | owner + template + decision record presenti |
| Legal pages | privacy/cookie/terms/refund draft presenti prima public launch |

## Test antiregressione M9-S

- manipolazione `/reports/{id}` di altro account;
- manipolazione `/orders/{id}` di altro account;
- customer viewer su `/dashboard/fatture` se non autorizzato;
- admin support prova refund;
- webhook Stripe duplicato;
- webhook firma non valida;
- provider call con ordine unpaid;
- provider call con margin guard failed;
- report raw payload in response;
- log con `sk_live_` o `OPENAPI_API_KEY`;
- restore drill checklist.

## Exit criteria M9-S

M9-S potra' dichiararsi completato se implementa almeno:

- guard/policy skeleton;
- object ownership helpers;
- webhook verification interfaces;
- secret scan script;
- security headers baseline;
- rate limit blueprint/config;
- production gate script/documento;
- incident/data breach runbook operativo;
- QA report con risultati.
