# Webhook Runtime Implementation

## Endpoint implementati

- `POST /billing/stripe/webhook`
- `POST /billing/mock/confirm`
- `GET /billing/admin/queue`

## Normalizzazione eventi

Ogni provider deve produrre un `NormalizedPaymentEvent` con:

- provider;
- eventId;
- eventType;
- orderId o checkoutSessionId;
- providerPaymentId;
- importo;
- valuta;
- payload raw;
- esito verifica firma.

## Eventi gestiti nel MVP

- `checkout.session.completed`: evento pagante, genera `Payment`, `PaymentLedgerEntry`, `Invoice pending` e `Order.paid`.
- altri eventi: vengono registrati come `webhook_ignored` senza side effect economici.

## Firma webhook

Nel codice è presente il parametro `stripe-signature`, ma per validazione reale Stripe serve raw body. Questo è un gate obbligatorio prima della produzione.

## Anti-regressione

Lo script `qa-checkout-billing-development.js` verifica che i file e i concetti obbligatori siano presenti: entità, adapter, webhook, idempotenza, ledger, invoice pending e blocco provider dati pre-pagamento.
