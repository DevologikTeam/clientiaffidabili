# Security QA & Production Gate Analysis

## QA livelli

1. **Static checks**: lint, typecheck, dependency audit, secret scan.
2. **Unit tests**: RBAC, price guard, refund policy, provider state machine.
3. **Integration tests**: checkout webhook, provider request lifecycle, report generation.
4. **E2E browser tests**: public funnel, checkout, dashboard report access, admin operations.
5. **Security tests**: IDOR/BOLA, rate limit, CORS, headers, auth bypass, error leakage.
6. **Operational tests**: backup/restore, deploy/rollback, webhook replay, provider failure.

## Production gate P0

| Gate | Blocco release se KO |
|---|---:|
| Build reale web/api | si |
| Typecheck reale | si |
| Auth/RBAC test | si |
| Object-level authorization test report/order | si |
| Webhook signature test | si |
| Provider idempotency test | si |
| Secret scan | si |
| Log redaction sample | si |
| Backup + restore drill | si |
| Admin action audit/reason test | si |
| Privacy/legal pages presenti | si prima go-live pubblico |

## Security test cases minimi

- Cliente A non accede a report Cliente B.
- Cliente A non accede a fatture Cliente B.
- Viewer non puo' avviare richiesta provider.
- Admin support non puo' approvare rimborso.
- Webhook senza firma non cambia pagamento.
- Webhook duplicato non duplica ledger.
- Provider retry duplicato non duplica cost ledger.
- Report draft non e' visibile al cliente.
- Raw payload non appare in admin list.
- Error response non contiene stack trace.
- Env `NEXT_PUBLIC_*` non contiene secret.

## Tooling consigliato

- Jest/Vitest per unit/integration.
- Playwright per browser E2E.
- npm/pnpm audit + Dependabot/Renovate.
- secret scanner pre-commit/CI.
- OWASP ZAP baseline per staging.
- Container image scan.
- SQL migration dry-run.
