# Payment Entities Implementation

## Entità aggiunte

| Entità | Ruolo |
|---|---|
| `BillingProfile` | Dati fiscali minimi cliente/organizzazione. |
| `CheckoutSession` | Sessione hosted provider o mock. |
| `Payment` | Stato pagamento normalizzato. |
| `PaymentLedgerEntry` | Registro append-only degli eventi pagamento. |
| `PaymentWebhookEvent` | Idempotenza, firma e payload hash webhook. |
| `Invoice` | Stato fattura pending/manual-assisted. |

## Relazioni logiche

```text
Order
 ├─ CheckoutSession
 ├─ Payment
 ├─ PaymentLedgerEntry[]
 └─ Invoice
      └─ BillingProfile
```

Le relazioni sono implementate per ora tramite `orderId`, `paymentId`, `billingProfileId` per mantenere semplice il bootstrap TypeORM. In una fase successiva si potranno aggiungere relazioni esplicite e migration versionate.

## Regola fondamentale

`Order.status = paid` può essere impostato solo dal modulo billing dopo evento pagamento confermato e processato.
