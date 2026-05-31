# 10 — Payment Data Model Blueprint

## Obiettivo

Separare chiaramente ordine commerciale, pagamento, ledger finanziario, fatturazione e webhook provider.

## Entità

### Order

Già introdotta in M3-S. In M4-S deve diventare il centro commerciale dell'acquisto.

Campi chiave:

- `id`
- `organizationId`
- `userId`
- `productCode`
- `status`
- `priceSnapshot`
- `subjectPayload`
- `subtotalNetCents`
- `taxCents`
- `totalCents`
- `currency`
- `billingProfileId`
- `latestPaymentId`
- `paidAt`
- `createdAt`
- `updatedAt`

Stati suggeriti:

- `draft`
- `pending_payment`
- `payment_processing`
- `paid`
- `provider_queued`
- `processing`
- `completed`
- `requires_assistance`
- `refunded`
- `cancelled`
- `failed`

### CheckoutSession

Rappresenta una sessione provider hosted.

Campi:

- `id`
- `orderId`
- `provider`: `stripe | nexi | mollie | manual_bank_transfer | mock`
- `providerSessionId`
- `status`: `created | redirected | completed | expired | cancelled | failed`
- `checkoutUrl`
- `amountCents`
- `currency`
- `expiresAt`
- `createdAt`
- `completedAt`

Regola: più sessioni possono esistere per lo stesso ordine, ma solo una può essere attiva.

### Payment

Rappresenta l'esito economico del pagamento.

Campi:

- `id`
- `orderId`
- `checkoutSessionId`
- `provider`
- `providerPaymentId`
- `status`: `requires_payment | pending | succeeded | failed | cancelled | disputed | refunded | partially_refunded`
- `amountGrossCents`
- `feeCents`
- `netReceivedCents`
- `currency`
- `paidAt`
- `failureCode`
- `failureMessage`
- `rawProviderRef`

### PaymentLedgerEntry

Registro append-only degli eventi economici.

Campi:

- `id`
- `orderId`
- `paymentId`
- `type`: `authorization | capture | fee | refund | dispute | adjustment | payout`
- `direction`: `credit | debit`
- `amountCents`
- `currency`
- `providerEventId`
- `description`
- `createdAt`

Regola: non modificare righe ledger; correggere solo con nuove righe di adjustment.

### BillingProfile

Dati fiscali/amministrativi del cliente.

Campi:

- `id`
- `organizationId`
- `customerType`: `company | professional | public_administration | individual`
- `legalName`
- `vatNumber`
- `taxCode`
- `sdiCode`
- `pec`
- `billingEmail`
- `country`
- `addressLine1`
- `postalCode`
- `city`
- `province`
- `createdAt`
- `updatedAt`

### Invoice

Rappresenta documento fiscale o ricevuta interna finché la fatturazione reale non è integrata.

Campi:

- `id`
- `orderId`
- `billingProfileId`
- `status`: `not_required | pending | issued | sent | failed | cancelled | credit_note_required`
- `invoiceNumber`
- `invoiceDate`
- `netCents`
- `vatCents`
- `grossCents`
- `currency`
- `provider`: `manual | stripe_invoice | external_accounting | sdi_future`
- `externalId`
- `pdfUrl`
- `errorMessage`

### PaymentWebhookEvent

Archivio idempotenza webhook.

Campi:

- `id`
- `provider`
- `providerEventId`
- `eventType`
- `signatureVerified`
- `status`: `received | processed | duplicate | ignored | failed`
- `payloadHash`
- `orderId`
- `paymentId`
- `receivedAt`
- `processedAt`
- `errorMessage`

## Relazioni

```text
Order 1--n CheckoutSession
Order 1--n Payment
Order 1--n PaymentLedgerEntry
Order 1--1 Invoice
Order n--1 BillingProfile
Payment 1--n PaymentLedgerEntry
PaymentWebhookEvent n--0/1 Payment
```

## Invarianti

- `Order.totalCents` deve corrispondere allo snapshot al momento checkout.
- `Payment.amountGrossCents` non può superare `Order.totalCents` per pagamento one-shot.
- `Provider data request` può partire solo se `Order.status in [paid, provider_queued]`.
- `Invoice` può essere emessa solo dopo pagamento riuscito o policy amministrativa definita.
- `Refund automatico` può partire solo se nessuna richiesta provider dati è stata eseguita.
