# 24 — Email API Contracts Blueprint

## Internal event API

```http
POST /internal/email/events
```

Payload:

```json
{
  "eventKey": "report.ready",
  "accountId": "acc_123",
  "userId": "usr_123",
  "relatedEntityType": "report",
  "relatedEntityId": "rep_123",
  "payload": {
    "checkCode": "CHK-2026-0001",
    "reportUrl": "https://clientiaffidabili.it/dashboard/verifiche/rep_123"
  }
}
```

## Admin delivery list

```http
GET /admin/email/deliveries?status=failed&templateKey=report_ready_v1
```

## Admin delivery detail

```http
GET /admin/email/deliveries/:id
```

## Retry delivery

```http
POST /admin/email/deliveries/:id/retry
```

Payload:

```json
{
  "reason": "Cliente segnala mancata ricezione, errore provider temporaneo gia risolto."
}
```

## Webhook provider

```http
POST /webhooks/email/:provider
```

Regole:

- firma obbligatoria;
- idempotenza su provider event id;
- payload redatto;
- mapping a delivery status.

## Public unsubscribe

Per email tecniche non e' previsto unsubscribe.  
Per eventuali email marketing future usare route separata e consenso esplicito.
