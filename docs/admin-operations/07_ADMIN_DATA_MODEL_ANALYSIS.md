# Admin Operations — Data model analysis

## Entità candidate

### `AdminWorkItem`

Rappresenta un item operativo unificato.

Campi principali:

- `id`.
- `type`.
- `priority`.
- `status`.
- `sourceEntityType`.
- `sourceEntityId`.
- `orderId` opzionale.
- `customerId` opzionale.
- `reason`.
- `impact`.
- `nextAction`.
- `assignedToId`.
- `dueAt`.
- `resolvedAt`.

### `AdminActionRequest`

Richiesta di azione ad alto rischio o override.

- `actionType`.
- `requestedBy`.
- `requiresApprovalFromRole`.
- `reason`.
- `status`.
- `approvedBy`.
- `rejectedReason`.

### `AdminAuditEvent`

Audit interno normalizzato, eventualmente integrato con il modulo audit esistente.

### `OperationalSlaPolicy`

Policy futura per scadenze e priorità.

## Relazioni

- Work item può riferirsi a ordine, pagamento, provider request, report, fattura o ticket.
- Action request può essere collegata a work item.
- Audit event deve essere sempre collegabile all'entità sorgente.

## Anti-pattern da evitare

- Stati duplicati e incoerenti su ordine/provider/report.
- Work item senza sorgente.
- Azioni manuali senza audit.
- Queue calcolate solo frontend.
- Raw payload salvato in work item.
