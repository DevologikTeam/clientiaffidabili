# 17 — Email Delivery Ledger & Webhook Blueprint

## Data model

### EmailEvent

Rappresenta l'evento applicativo che richiede una comunicazione.

Campi principali:

- `id`;
- `eventKey`;
- `sourceModule`;
- `accountId`;
- `userId` opzionale;
- `relatedEntityType`;
- `relatedEntityId`;
- `payloadRedacted`;
- `status`;
- `createdAt`.

### EmailDelivery

Rappresenta il tentativo di consegna.

Campi principali:

- `id`;
- `eventId`;
- `templateKey`;
- `templateVersion`;
- `recipientEmailHash`;
- `recipientEmailRedacted`;
- `recipientName` opzionale;
- `provider`;
- `providerMessageId`;
- `status`;
- `attemptCount`;
- `lastErrorCode`;
- `lastErrorMessageRedacted`;
- `nextRetryAt`;
- `sentAt`;
- `deliveredAt`;
- `bouncedAt`;
- `complainedAt`.

### EmailWebhookEvent

Rappresenta un evento provider ricevuto via webhook.

Campi principali:

- `id`;
- `provider`;
- `providerEventId`;
- `providerMessageId`;
- `eventType`;
- `signatureVerified`;
- `payloadRedacted`;
- `processedAt`;
- `idempotencyKey`.

### EmailSuppression

Blocca invii futuri verso indirizzi in bounce/complaint.

Campi:

- `emailHash`;
- `reason`;
- `sourceProvider`;
- `createdAt`;
- `expiresAt` opzionale;
- `manualOverrideReason` opzionale.

## Stati delivery

```text
queued -> sending -> sent -> delivered
queued -> sending -> failed -> queued_retry
queued -> sending -> bounced
queued -> suppressed
sent -> complained
sent -> expired_tracking
```

## Retry policy

| Errore | Retry |
|---|---|
| Timeout provider | si, backoff |
| 429/rate limit | si, backoff lungo |
| 5xx provider | si |
| 4xx payload/template | no, admin review |
| bounce permanente | no, suppression |
| complaint | no, suppression |

## Webhook security

- firma provider obbligatoria;
- replay tolerance;
- idempotency su `providerEventId`;
- raw payload salvato solo redatto;
- errori webhook nel ledger operativo.

## Collegamento con Operational Error Ledger

Ogni errore critico genera o collega un `OperationalErrorEvent` con:

- module: `email`;
- severity;
- related delivery;
- suggested action;
- refund relevance se l'email riguarda pagamento/report/PDF.
