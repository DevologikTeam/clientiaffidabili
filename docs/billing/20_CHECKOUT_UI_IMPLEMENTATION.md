# Checkout UI Implementation

## Pagine implementate

- `/checkout`
- `/checkout/success`
- `/checkout/cancel`
- `/admin/billing`

## Componenti implementati

- `BillingProfileForm`
- `CheckoutLegalConfirmation`
- `CheckoutOrderSummary`
- `PaymentStatusPanel`

## UX principles

- Il cliente vede prezzo, IVA, totale e output prima di pagare.
- Il form chiede solo dati necessari.
- Le conferme di uso lecito sono esplicite.
- Il checkout spiega che i dati carta non vengono salvati.
- La pagina success chiarisce che il report parte dopo conferma pagamento.
- La pagina cancel chiarisce che nessun provider dati è stato chiamato.

## Admin billing

La pagina `/admin/billing` è una vista interna preliminare per:

- webhook;
- ledger;
- fatture pending;
- anomalie;
- prossima azione operativa.

In futuro dovrà essere protetta da RBAC e collegata a dati reali API.
