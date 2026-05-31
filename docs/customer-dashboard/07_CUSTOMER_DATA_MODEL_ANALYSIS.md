# Customer Dashboard — Data Model Analysis

## Entità candidate

### CustomerWorkspace

Rappresenta l'account cliente.

Campi:

- `id`
- `name`
- `vatNumber`
- `status`
- `createdAt`
- `updatedAt`

### CustomerMembership

Associa utenti a workspace e ruoli.

Campi:

- `id`
- `workspaceId`
- `userId`
- `role`
- `status`
- `invitedBy`
- `createdAt`

### CustomerDashboardItem

Vista denormalizzata o query model per mostrare verifiche/report/ordini.

Campi:

- `id`
- `workspaceId`
- `orderId`
- `checkId`
- `reportId`
- `subjectName`
- `subjectIdentifierMasked`
- `serviceName`
- `customerStatus`
- `priority`
- `nextAction`
- `lastUpdatedAt`

### CustomerNotification

Notifiche in-app.

Campi:

- `id`
- `workspaceId`
- `userId nullable`
- `type`
- `title`
- `body`
- `actionLabel`
- `actionUrl`
- `readAt`
- `createdAt`

### CustomerSupportTicket

Richieste supporto collegate a ordine/report.

Campi:

- `id`
- `workspaceId`
- `createdByUserId`
- `orderId nullable`
- `reportId nullable`
- `category`
- `status`
- `subject`
- `description`
- `lastReplyAt`
- `createdAt`

## Query model consigliato

Per MVP, non è necessario creare subito tutte le entità. È sufficiente costruire una dashboard aggregando:

- `Order`
- `CheckoutSession`
- `Payment`
- `ProviderRequest`
- `Report`
- `Invoice`

Nel tempo, si può aggiungere una tabella/materialized view `CustomerActivityItem` per performance e audit leggibile.

## CustomerStatus enum candidato

```ts
export type CustomerFacingStatus =
  | 'draft_order'
  | 'payment_required'
  | 'payment_failed'
  | 'processing'
  | 'manual_review'
  | 'report_ready'
  | 'action_required'
  | 'refunded'
  | 'cancelled'
  | 'support_needed';
```

## NextAction enum candidato

```ts
export type CustomerNextAction =
  | 'resume_checkout'
  | 'retry_payment'
  | 'wait_processing'
  | 'open_report'
  | 'complete_missing_data'
  | 'contact_support'
  | 'download_invoice'
  | 'none';
```

## Stato aggregato

La dashboard deve usare un service dedicato che calcola lo stato cliente da più fonti. Non bisogna duplicare logica incoerente nel frontend.

Esempio:

```text
payment.status = confirmed + provider.status = completed + report.status = published
=> customerStatus = report_ready
=> nextAction = open_report
```

## Performance

MVP:

- query paginata;
- limit 20 elementi;
- indici su workspace, createdAt, status;
- filtri server-side.

Post-MVP:

- search indexed;
- export storico;
- activity stream;
- dashboard analytics.
