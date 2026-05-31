# M4B-P Source Notes — Payments, Subscriptions, Refunds

## Stripe

- Stripe Refunds guide: rimborsi full/partial, refund events, refund failure e refund su PaymentIntent.
- Stripe Refunds API: create/retrieve/list/cancel refund, eventi `refund.created`, `refund.updated`, `refund.failed`.
- Stripe Subscription cancellation: cancellazione immediata, a fine periodo, proration/refund e customer portal.

## PayPal

- PayPal Orders API: capture e refund come modello per pagamenti one-shot.
- PayPal Subscriptions API: create/list/show/update/revise/suspend/cancel/activate subscription, transaction list.
- PayPal subscription status: APPROVAL_PENDING, APPROVED, ACTIVE, SUSPENDED, CANCELLED, EXPIRED.

## Impatto sul progetto

- I rimborsi devono essere normalizzati internamente, non gestiti direttamente dalla UI cliente.
- Le dispute devono bloccare il rimborso manuale duplicato.
- Le subscription devono avere entitlement interno indipendente dal provider.
- PayPal resta feature-flagged fino a sandbox completa.
