# 26 — Settings Admin Data Model Blueprint

## Entita' previste M15B-S

### `PlatformSetting`

- id;
- namespace;
- key;
- valueJson;
- valueSource;
- isSecret;
- secretRef;
- state;
- environment;
- requiresReasonOnChange;
- updatedBy;
- updatedAt.

### `PlatformSettingAudit`

- id;
- settingId;
- action;
- oldValueRedacted;
- newValueRedacted;
- reason;
- actorId;
- createdAt.

### `BootstrapAdminAudit`

- id;
- action;
- outcome;
- actorEmail;
- ipHash;
- reason;
- createdAt.

### `OperationalErrorEvent`

Vedi documento 21.

### `PurchaseAuditEvent`

- id;
- orderId;
- paymentId;
- accountId;
- buyerIpHash;
- buyerUserAgentHash;
- eventType;
- createdAt.

## Indici consigliati

- `namespace + key` unique;
- `category + severity + status` per ledger;
- `orderId`, `paymentId`, `refundId` per correlazione;
- `buyerIpHash + createdAt` per antifrode e anomalie.
