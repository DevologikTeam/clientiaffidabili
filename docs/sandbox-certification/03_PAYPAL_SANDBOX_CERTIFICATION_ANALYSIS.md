# PayPal Sandbox Certification Analysis

## Flussi obbligatori

- Ordine PayPal creato in sandbox.
- Capture riuscita.
- Capture fallita/annullata.
- Refund capture.
- Subscription sandbox mock/sandbox-ready.
- Webhook normalizzato verso lo stesso ledger usato da Stripe.

## Decisione MVP

PayPal può restare disabilitato in RC se non supera sandbox, purché UI, settings admin e documentazione lo comunichino chiaramente. Stripe resta provider primario.

## Criteri

PayPal deve produrre gli stessi oggetti interni: Payment, PaymentLedgerEntry, RefundRequest, PaymentDispute, OperationalErrorEvent. Non sono ammessi flussi paralleli non riconciliati.
