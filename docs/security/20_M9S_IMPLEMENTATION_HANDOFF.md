# M9-S Implementation Handoff

## Obiettivo sviluppo

Implementare il minimo set di controlli runtime e QA che renda il progetto candidabile a staging sicuro, non ancora necessariamente produzione commerciale.

## File da creare/modificare in M9-S

### Backend

- `apps/api/src/modules/security/security.module.ts`
- `apps/api/src/modules/security/guards/auth.guard.ts`
- `apps/api/src/modules/security/guards/rbac.guard.ts`
- `apps/api/src/modules/security/guards/object-ownership.guard.ts`
- `apps/api/src/modules/security/policies/action-policy.service.ts`
- `apps/api/src/modules/security/audit/audit-log.service.ts`
- `apps/api/src/modules/security/webhooks/webhook-verification.service.ts`
- `apps/api/src/modules/security/redaction/redaction.service.ts`
- `apps/api/src/modules/security/security.controller.ts`

### Frontend

- `apps/web/lib/security/security-runtime.ts`
- `apps/web/app/admin/security/page.tsx`
- `apps/web/components/security/ProductionGatePanel.tsx`
- `apps/web/components/security/SecurityControlCard.tsx`

### Scripts

- `scripts/qa-security-compliance-hardening-development.js`
- `scripts/security-secret-scan.js`
- `scripts/production-gate-check.js`

### Docs

- `docs/security/21_SECURITY_RUNTIME_IMPLEMENTATION_NOTES.md`
- `docs/security/22_RBAC_OBJECT_AUTH_IMPLEMENTATION.md`
- `docs/security/23_SECRET_SCAN_AND_DEPLOY_GATE.md`
- `docs/security/24_INCIDENT_BACKUP_RESTORE_RUNBOOK.md`
- `docs/qa/M9-S_QA_REPORT.md`

## Priorita'

1. Secret scan e production gate script.
2. RBAC/object ownership interfaces e helper.
3. Webhook verification contract.
4. Audit/redaction runtime helper.
5. Admin security readiness view.
6. Backup/restore + incident runbook.

## Non fare in M9-S

- non inserire segreti reali;
- non attivare provider production;
- non introdurre piani illimitati;
- non mostrare raw payload;
- non saltare QA per velocita'.
