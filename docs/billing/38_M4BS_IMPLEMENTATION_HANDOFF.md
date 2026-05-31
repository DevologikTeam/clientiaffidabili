# M4B-S Implementation Handoff

## Obiettivo M4B-S

Implementare lo scheletro runtime per multi-provider payment/subscription/refund senza attivare integrazioni live pericolose.

## Backend da sviluppare

- `PaymentProviderRegistry`.
- `StripePaymentProviderAdapter` mock/sandbox-ready.
- `PayPalPaymentProviderAdapter` mock/sandbox-ready e feature-flagged.
- `SubscriptionService`.
- `CreditWalletService`.
- `RefundPolicyService`.
- `RefundService`.
- `PaymentReconciliationService`.
- Entita' `InternalSubscription`, `CreditWallet`, `CreditLedgerEntry`, `RefundRequest`, `RefundLedgerEntry`, `DisputeCase`.

## Frontend da sviluppare

- `/dashboard/abbonamento`.
- `/dashboard/crediti`.
- `/dashboard/rimborsi`.
- componenti `SubscriptionStatusCard`, `CreditWalletCard`, `RefundRequestPanel`, `PaymentMethodBadge`.
- admin billing extensions in `/admin/billing` o `/admin/operations`.

## API minime

- `POST /billing/providers/checkout/payment`.
- `POST /billing/providers/checkout/subscription`.
- `POST /billing/refunds/request`.
- `POST /billing/admin/refunds/:id/approve`.
- `POST /billing/admin/refunds/:id/reject`.
- `POST /billing/subscriptions/:id/cancel`.
- `GET /billing/credits`.
- `GET /billing/reconciliation/anomalies`.

## QA M4B-S richiesto

- Nessun piano illimitato.
- Crediti creati solo dopo pagamento/webhook.
- Refund bloccato se report consegnato, salvo manual review.
- Refund bloccato se dispute aperta.
- Ledger append-only.
- Webhook idempotenti.
- PayPal nascosto se `ENABLE_PAYPAL=false`.
- Nessun dato carta nel database.
- Nessun provider live call con flag disattivo.
