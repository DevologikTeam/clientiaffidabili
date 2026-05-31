# Admin Operations — API contracts blueprint

## Base path

`/admin/operations`

Tutti gli endpoint sono server-side, autenticati e protetti da RBAC.

## GET `/admin/operations/summary`

Restituisce metriche home.

```ts
type AdminOperationsSummary = {
  criticalCount: number;
  blockedRevenueCount: number;
  reviewCount: number;
  billingCount: number;
  openSupportCount: number;
  slaBreachedCount: number;
  updatedAt: string;
};
```

## GET `/admin/operations/work-items`

Query:

- `priority`;
- `type`;
- `status`;
- `ownerRole`;
- `assignedTo`;
- `sla`;
- `serviceCode`.

Response:

```ts
type AdminWorkItemListItem = {
  id: string;
  type: AdminWorkItemType;
  priority: AdminWorkItemPriority;
  status: AdminWorkItemStatus;
  orderCode?: string;
  serviceLabel: string;
  reason: string;
  impact: string;
  nextAction: string;
  ownerRole: AdminRole;
  assignedToLabel?: string;
  dueAt?: string;
  canOpen: boolean;
};
```

## GET `/admin/operations/work-items/:id`

Response include:

- item;
- snapshots;
- allowedActions;
- blockedActions;
- auditTimeline;
- supportLinks.

## POST `/admin/operations/work-items/:id/actions/:action`

Body:

```ts
type AdminActionBody = {
  reason?: string;
  reasonCategory?: AdminReasonCategory;
  idempotencyKey?: string;
  confirmGuardrail?: boolean;
};
```

Regole:

- reason obbligatoria se azione critica;
- idempotency obbligatoria per provider retry/refund/publish;
- backend verifica stato e RBAC;
- genera audit event sempre.

## GET `/admin/operations/audit`

Filtri:

- entityType;
- entityId;
- severity;
- actorRole;
- from/to.

Nessun raw payload provider in response standard.

## Error contract

```ts
type AdminOperationError = {
  code: string;
  message: string;
  safeExplanation: string;
  blockedReason?: string;
  requiredPermission?: string;
  auditId?: string;
};
```

## Errori standard

- `ADMIN_PERMISSION_DENIED`;
- `ADMIN_REASON_REQUIRED`;
- `ADMIN_GUARDRAIL_BLOCKED`;
- `ADMIN_INVALID_STATE`;
- `ADMIN_IDEMPOTENCY_REQUIRED`;
- `ADMIN_SENSITIVE_DATA_REDACTED`.
