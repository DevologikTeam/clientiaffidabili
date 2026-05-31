# 07 — Payment Provider E2E Readiness Analysis

## Ambito
Stripe e PayPal sono stati progettati e scaffoldati. Prima del go-live servono test sandbox reali.

## Stripe readiness
Da verificare:

- creazione Checkout Session one-shot;
- creazione Checkout Session subscription;
- webhook signature verification;
- eventi `checkout.session.completed`, `payment_intent.succeeded`, `invoice.paid`, `customer.subscription.deleted`;
- refund full;
- refund partial;
- dispute/chargeback sandbox se disponibile;
- idempotency provider;
- currency/IVA coerenti.

## PayPal readiness
Da verificare:

- order/capture one-shot;
- refund capture;
- subscription plan sandbox;
- cancel/suspend subscription;
- webhook verification;
- mapping lifecycle su ledger interno.

## Guardrail economici
- Nessun provider data call prima di pagamento confermato.
- Nessun doppio accredito in caso di webhook duplicato.
- Nessun refund manuale se dispute aperta senza review.
- Nessun piano illimitato su servizi con costo provider.
- Ogni movimento economico deve avere ledger entry append-only.

## Output M13-S o M4C futuro
- `tests/e2e/payments-stripe.spec.ts` sandbox.
- `tests/e2e/payments-paypal.spec.ts` sandbox.
- `docs/qa/PAYMENT_SANDBOX_CERTIFICATION_REPORT.md`.
