# Admin Operations — API Implementation

## Endpoint MVP

```http
GET /admin/operations/summary
GET /admin/operations/work-items
GET /admin/operations/work-items/:id
POST /admin/operations/work-items/:id/actions/:actionCode
GET /admin/operations/audit
```

## Action execution

Le azioni sensibili richiedono:

- ruolo autorizzato;
- permission presente in `ADMIN_ROLE_PERMISSIONS`;
- reason significativa;
- categoria reason;
- conferma guardrail;
- idempotency key se l'azione può essere ripetuta o generare costi/stati esterni.

## Errori previsti

- `ADMIN_PERMISSION_DENIED`;
- `ADMIN_REASON_REQUIRED`;
- `ADMIN_GUARDRAIL_BLOCKED`;
- `ADMIN_INVALID_STATE`;
- `ADMIN_IDEMPOTENCY_REQUIRED`;
- `ADMIN_SENSITIVE_DATA_REDACTED`.

## Sicurezza

L'MVP non implementa ancora autenticazione reale, ma il contratto è predisposto per RBAC server-side. Prima produzione, tutti gli endpoint `/admin/*` devono essere protetti da auth, ruoli e audit.
