# Data model iniziale

## Tabelle principali

```mermaid
erDiagram
  organizations ||--o{ users : has
  organizations ||--o{ orders : owns
  organizations ||--o{ checks : owns
  products ||--o{ order_items : sold_as
  orders ||--o{ order_items : contains
  orders ||--o{ checks : creates
  checks ||--o{ reports : produces
  users ||--o{ audit_logs : triggers
  organizations ||--o{ audit_logs : scopes
```

## Organization

- id
- name
- vatNumber
- billingEmail
- planCode
- createdAt
- updatedAt

## User

- id
- organizationId
- email
- fullName
- role
- passwordHash
- createdAt
- updatedAt

## Product

- id
- code
- name
- category
- description
- publicPriceCents
- estimatedProviderCostCents
- taxRate
- active
- requiresLegalBasis
- providerConfig JSONB

## Order

- id
- organizationId
- userId
- status
- totalCents
- taxCents
- currency
- checkoutProvider
- checkoutSessionId
- paidAt
- createdAt
- updatedAt

## Check

- id
- organizationId
- orderId
- productId
- requestedByUserId
- subjectType
- subjectPayload JSONB
- status
- providerName
- providerRequestId
- normalizedResult JSONB
- riskLevel
- completedAt
- createdAt
- updatedAt

## Report

- id
- checkId
- title
- htmlSnapshot
- pdfPath future
- dataSnapshot JSONB
- createdAt

## AuditLog

- id
- organizationId
- actorUserId nullable
- eventType
- entityType
- entityId
- metadata JSONB
- ipAddress
- userAgent
- createdAt
