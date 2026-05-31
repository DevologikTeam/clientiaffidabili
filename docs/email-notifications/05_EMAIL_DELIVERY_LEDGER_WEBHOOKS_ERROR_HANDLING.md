# Email Delivery Ledger, Webhook e Error Handling

## Data model MVP

### EmailTemplate

- `code`
- `name`
- `category`: auth, billing, report, legal, support, partner, admin
- `subject`
- `preheader`
- `htmlBody`
- `textBody`
- `locale`
- `version`
- `status`: draft, review, published, archived
- `requiresLegalReview`

### EmailDelivery

- `id`
- `templateCode`
- `templateVersion`
- `recipientEmailHash`
- `recipientMasked`
- `accountId`
- `orderId`
- `paymentId`
- `reportId`
- `invoiceId`
- `supportTicketId`
- `provider`
- `providerMessageId`
- `status`: queued, sending, sent, delivered, bounced, complained, failed, suppressed
- `attempts`
- `lastErrorCode`
- `lastErrorMessageRedacted`
- `sentAt`
- `deliveredAt`
- `createdAt`

### EmailEvent

- `deliveryId`
- `eventType`
- `providerEventId`
- `payloadRedacted`
- `occurredAt`
- `receivedAt`
- `idempotencyKey`

### EmailSuppression

- `emailHash`
- `reason`: hard_bounce, complaint, manual, unsubscribe_marketing
- `scope`: technical, marketing, all
- `createdAt`
- `expiresAt`

## Webhook handling

- endpoint server-side;
- signature verification se provider supporta;
- idempotenza per provider event id;
- payload raw non esposto;
- payload redatto salvato solo se necessario;
- eventi fuori ordine gestiti con timestamp;
- bounce/complaint aggiornano suppression e aprono errore operativo se riguarda email critica.

## Retry policy

| Evento | Retry automatico | Note |
|---|---|---|
| email temporaneamente fallita | Sì | backoff progressivo |
| hard bounce | No | suppression |
| complaint | No | suppression e review |
| provider timeout | Sì | se idempotente |
| PDF attachment failed | Review | valutare link sicuro |
| report ready email failed | Sì + admin alert | email critica |

## Collegamento con Operational Error Ledger

Creare evento operativo se:

- email pagamento riuscito fallisce;
- report ready fallisce;
- PDF non inviato;
- reset password fallisce;
- email verifica fallisce;
- webhook email provider fallisce oltre soglia;
- bounce su documento pronto;
- complaint su email tecnica.

## Admin operations

Admin deve poter:

- vedere delivery status;
- filtrare per cliente, ordine, report, template;
- reinviare email sicure con reason;
- inviare link PDF sicuro;
- vedere bounce/complaint;
- aprire ticket/fix/rimborso se errore impatta l'acquisto;
- non vedere contenuti sensibili non necessari.
