# Admin RBAC & Audit — Implementation

## Ruoli MVP

- `support_agent`
- `operations_agent`
- `billing_agent`
- `compliance_reviewer`
- `analyst`
- `super_admin`

## Audit

Ogni azione eseguita tramite `executeAction` genera `AdminActionAudit` con:

- work item;
- attore;
- ruolo;
- action code;
- reason;
- categoria;
- idempotency key;
- safe description;
- contesto redatto.

## Raw payload

Il raw payload non entra mai in audit timeline o lista work item. Eventuale accesso futuro dovrà passare da vault separato, permesso dedicato, reason e retention policy.

## Produzione

Prima della produzione servono:

- guard NestJS per auth;
- mapping user reale → ruolo;
- session tracking;
- rate limit admin;
- alert su azioni critiche.
