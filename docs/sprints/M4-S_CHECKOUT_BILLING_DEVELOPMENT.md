# Sprint M4-S — Checkout & Billing Development

Data: 2026-05-29  
Release: 0.13.0  
Tipo sprint: Sviluppo

## Obiettivo

Implementare la prima versione funzionante del modulo checkout e billing, coerente con l'analisi M4-A e il blueprint M4-P.

Il modulo deve permettere di:

- creare una sessione checkout da un ordine valido;
- salvare un profilo di fatturazione;
- astrarre il provider pagamento tramite adapter;
- usare mock checkout in locale e Stripe-ready flow in ambiente configurato;
- ricevere webhook idempotenti;
- registrare ledger pagamenti append-only;
- segnare l'ordine come pagato solo dopo evento confermato;
- creare una fattura pending manual-assisted;
- mostrare UI checkout, successo, annullamento e admin billing queue.

## Decisione implementativa

Per MVP si usa un adapter `PaymentProviderAdapter` con due modalità:

1. **mock locale** quando `ENABLE_CHECKOUT=false` o mancano chiavi Stripe;
2. **Stripe-ready** quando `ENABLE_CHECKOUT=true`, `BILLING_PROVIDER=stripe` e `STRIPE_SECRET_KEY` è configurata.

La modalità mock non chiama provider esterni e permette di testare il flusso senza dati reali.

## Guardrail implementati

- Nessuna chiamata al provider dati prima del pagamento.
- Nessun dato carta salvato nel database.
- Snapshot ordine già esistente rimane immutabile.
- Webhook idempotenti tramite `provider + eventId`.
- Ledger append-only con eventi checkout/session/payment/invoice.
- Fattura in stato `pending`, non emessa automaticamente.
- Servizi assistiti restano fuori dal checkout diretto.

## File principali

- `apps/api/src/modules/billing/entities/*`
- `apps/api/src/modules/billing/payment-provider.adapter.ts`
- `apps/api/src/modules/billing/billing.service.ts`
- `apps/api/src/modules/billing/billing.controller.ts`
- `apps/web/components/billing/*`
- `apps/web/app/checkout/page.tsx`
- `apps/web/app/checkout/success/page.tsx`
- `apps/web/app/checkout/cancel/page.tsx`
- `apps/web/app/admin/billing/page.tsx`
- `apps/web/lib/billing/checkout.ts`
- `scripts/qa-checkout-billing-development.js`

## Esito

Sprint completato come scaffold runtime-ready. Build reale e test e2e con Stripe test mode sono rimandati allo sprint di certificazione ambiente perché richiedono dipendenze installate e chiavi sandbox.
