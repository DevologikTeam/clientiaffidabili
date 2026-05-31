# M9-P / M9-S Readiness Checklist

## Pronto per M9-P quando

- [x] Threat model iniziale definito.
- [x] Priorita' P0/P1/P2 definite.
- [x] Gate produzione elencati.
- [x] Rischi privacy/GDPR mappati.
- [x] API/provider/payment security analizzati.
- [x] Backup/restore/incident response analizzati.
- [x] Logging/audit/ledger separati.
- [x] Coolify/deploy hardening analizzato.

## M9-P deve produrre

- Blueprint security architecture.
- Auth/RBAC blueprint definitivo.
- Secrets/env inventory blueprint.
- Security headers/CORS/rate limit blueprint.
- Backup/restore runbook blueprint.
- Incident/data breach runbook blueprint.
- Security QA matrix tecnica.
- Production readiness checklist definitiva.

## M9-S deve implementare almeno

- Config security headers frontend/backend.
- Rate limit middleware/guard.
- RBAC guard centralizzato scaffold.
- Secret/env scanner QA.
- Log redaction helper.
- Healthcheck e readiness endpoints.
- Backup/restore script/documentazione.
- Production smoke test script.
- Security QA script.

## Blocco produzione

La produzione reale resta bloccata finche' non sono eseguiti build reale, test auth/RBAC, webhook signature, provider idempotency, backup restore e legal/privacy readiness.
