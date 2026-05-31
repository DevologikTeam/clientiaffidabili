# Stripe Sandbox Certification Analysis

## Flussi obbligatori

- Checkout session creata con snapshot prezzo.
- Pagamento riuscito.
- Pagamento fallito.
- Pagamento con autenticazione 3D Secure/SCA.
- Webhook `checkout.session.completed` idempotente.
- Webhook pagamento fallito.
- Rimborso completo.
- Rimborso parziale.
- Dispute simulata.
- Subscription sandbox per piano starter/pro/agency.

## Regole

- Usare solo test API keys.
- Mai usare carte reali in test.
- Salvare provider event id, idempotency key, order id, payment id e ledger id.
- Ogni webhook ripetuto deve essere safe.
- Il refund deve aggiornare ledger, stato ordine e ticket operativo se necessario.

## Pass/fail

PASS se pagamento, ledger, email, report e audit restano coerenti anche con webhook duplicati. FAIL se un webhook duplicato crea doppio ordine, doppio provider call, doppio rimborso o doppia email critica.
