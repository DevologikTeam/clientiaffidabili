# 14 — Settings Data Model Analysis

## Entita' candidate

### PlatformSetting

- `id`
- `namespace`: commerce, payment, openapi, openai, email, security, crm, partner
- `key`
- `valueType`: boolean, string, number, json, secret_reference
- `valueEncrypted?`
- `valueRedacted`
- `status`: draft, active, disabled, error, requires_review
- `isSensitive`
- `requiresReasonOnChange`
- `updatedByUserId`
- `updatedAt`

### PlatformSettingVersion

- `id`
- `settingId`
- `previousValueHash`
- `newValueHash`
- `redactedDiff`
- `reason`
- `actorUserId`
- `createdAt`

### BootstrapAdminState

- `id`
- `hasSuperAdmin`
- `bootstrapEnabled`
- `lastBootstrapAttemptAt`
- `lastBootstrapResult`
- `mustRotateBootstrapSecrets`

### PurchaseControlState

- `id`
- `purchasesEnabled`
- `disabledReason`
- `disabledPublicMessage`
- `disabledUntil`
- `overrideAllowedRoles[]`
- `lastChangedByUserId`

### OperationalErrorEvent

- `id`
- `category`
- `severity`
- `status`
- `sourceModule`
- `sourceAction`
- `correlationId`
- `accountId?`
- `userId?`
- `orderId?`
- `checkoutSessionId?`
- `paymentId?`
- `refundId?`
- `subscriptionId?`
- `providerRequestId?`
- `reportId?`
- `contactMessageId?`
- `partnerId?`
- `apiKeyId?`
- `safeMessage`
- `technicalSummary`
- `redactedPayload`
- `stackHash?`
- `externalReference?`
- `recommendedAction?`
- `ownerUserId?`
- `resolutionReason?`
- `createdAt`
- `resolvedAt?`

### PurchaseIpAudit

- `id`
- `orderId`
- `checkoutSessionId`
- `paymentId?`
- `buyerIpEncrypted?`
- `buyerIpHash`
- `buyerUserAgent`
- `requestId`
- `collectedAt`
- `retentionUntil?`

## Index consigliati

- `PlatformSetting(namespace, key)` unique;
- `OperationalErrorEvent(category, severity, status, createdAt)`;
- `OperationalErrorEvent(orderId)`;
- `OperationalErrorEvent(paymentId)`;
- `OperationalErrorEvent(stackHash)`;
- `PurchaseIpAudit(buyerIpHash)`;
- `PurchaseIpAudit(orderId)`.

## Note implementative

I settings sensibili non devono essere gestiti come semplici colonne JSON leggibili. Serve almeno cifratura applicativa o secret reference. Per MVP e' accettabile una `secretReference` collegata a Coolify/ENV, con roadmap per storage cifrato.

## Rischi

- trasformare il DB in secret manager non governato;
- mostrare valori sensibili in admin;
- perdere audit reason;
- affidarsi solo a log tecnici senza ledger business.
