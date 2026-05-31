# PayPal Orders & Subscriptions Blueprint

## Uso previsto

PayPal entra come secondo provider per migliorare fiducia e conversione, ma non deve complicare il dominio interno. Il dominio ClientiAffidabili.it normalizza ordini, subscription e rimborsi come fa per Stripe.

## Feature flag

```env
ENABLE_PAYPAL=false
PAYPAL_ENV=sandbox
PAYPAL_CLIENT_ID=...
PAYPAL_CLIENT_SECRET=...
```

## Casi supportati

| Caso | API PayPal | Stato MVP |
|---|---|---|
| Acquisto singolo | Orders + capture | design-ready |
| Rimborso acquisto singolo | Capture refund | design-ready |
| Subscription | Billing Subscriptions | design-ready |
| Suspend/cancel subscription | Subscription API | design-ready |
| Crediti/wallet | Ledger interno post webhook | design-ready |

## Mapping lifecycle

| PayPal | Interno |
|---|---|
| order created | checkout pending |
| payer approved | requires capture / approved |
| capture completed | paid |
| capture refunded | refunded / partially_refunded |
| subscription approval pending | subscription pending |
| subscription active | subscription active |
| subscription suspended | subscription suspended |
| subscription cancelled | subscription cancelled |

## Idempotenza

- Ogni chiamata PayPal deve usare request id dove supportato.
- Il sistema deve salvare `providerReference`, `providerRequestId`, `paypalOrderId`, `paypalCaptureId`, `paypalSubscriptionId`.
- Webhook/eventi ripetuti non devono duplicare crediti o ledger.

## Rimborsi PayPal

- Rimborso sempre collegato a capture.
- Rimborso full o partial secondo policy interna.
- Stato finale aggiornato solo dopo evento/conferma provider.
- Se PayPal restituisce errore, aprire work item admin e non correggere manualmente saldo senza audit.

## Guardrail

- PayPal disattivo sul pubblico finche' non sono testati sandbox, webhook e refund.
- Copy pubblico: "PayPal disponibile dove supportato" solo dopo attivazione reale.
- Nessuna differenza di entitlement tra Stripe e PayPal: cambia solo il provider di incasso.
