# 12 — Email Data Model Analysis

## Entita' proposte

### EmailTemplate

- id
- key
- category
- version
- subject
- preheader
- htmlBody
- textBody
- locale
- status: draft, review, active, archived
- variablesSchema
- createdBy
- approvedBy

### EmailEvent

- id
- eventKey
- sourceModule
- sourceEntityType
- sourceEntityId
- recipientUserId
- recipientEmailRedacted
- templateKey
- templateVersion
- status
- priority
- correlationId
- createdAt

### EmailDelivery

- id
- emailEventId
- provider
- providerMessageId
- status: queued, sent, delivered, bounced, complained, failed, suppressed
- attempts
- nextRetryAt
- lastErrorCode
- lastErrorMessageRedacted
- metadataRedacted

### EmailAttachment

- id
- deliveryId
- attachmentType: pdf_report, invoice, credit_note
- storageRef
- fileName
- contentHash
- expiresAt
- policyDecision

### EmailSuppression

- id
- emailHash
- reason: bounce, complaint, manual, unsubscribe_marketing
- categoryScope
- createdAt
- expiresAt

### EmailWebhookEvent

- id
- provider
- providerEventId
- eventType
- signatureValid
- processedAt
- rawPayloadRefRedacted
- relatedDeliveryId

## Correlation

Tutti gli invii devono poter essere collegati a:

- orderId;
- paymentId;
- refundId;
- reportId;
- invoiceId;
- ticketId;
- accountId;
- partnerId;
- errorLedgerEventId.

## Stati delivery

```text
created -> queued -> sent -> delivered
created -> queued -> failed -> retrying -> sent
created -> queued -> bounced -> suppressed
created -> queued -> complained -> suppressed
created -> suppressed
```
