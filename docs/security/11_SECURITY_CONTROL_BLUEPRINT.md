# Security Control Blueprint

## Obiettivo

Definire i controlli minimi obbligatori per staging e produzione.

## Control groups

| Area | Controllo | Gate |
|---|---|---|
| Auth | session/JWT validi, scadenza, rotazione secret | P0 |
| RBAC | ruoli customer/admin separati | P0 |
| Object-level authorization | ownership check su ogni risorsa | P0 |
| API input | validation DTO, allowlist campi, size limit | P0 |
| Webhook | firma provider, idempotency, replay protection | P0 |
| Provider | call solo post-payment/credito riservato | P0 |
| Reports | snapshot immutabile, raw payload nascosto | P0 |
| Billing | ledger append-only, refund/dispute audit | P0 |
| Secrets | no secret in repo/frontend/log | P0 |
| Logs | redaction PII/secrets/raw provider payload | P0 |
| Backup | backup schedulato e restore provato | P0 |
| Incident | runbook incident/data breach approvato | P0 |
| Rate limit | login, checkout, provider trigger, report download | P1 |
| Security headers | CSP, HSTS, frame/clickjacking controls | P1 |
| Dependency security | lockfile, audit, outdated review | P1 |

## OWASP mapping

Il blueprint copre in modo prioritario access control, broken authentication, security misconfiguration, software/data integrity, logging/monitoring failures e API risks come BOLA, unrestricted resource consumption e unsafe consumption of third-party APIs.

## Definition of done

Un controllo e' completato solo quando ha:

- owner tecnico;
- test automatico o checklist verificabile;
- log/audit se produce azioni sensibili;
- comportamento di errore sicuro;
- documentazione operativa.
