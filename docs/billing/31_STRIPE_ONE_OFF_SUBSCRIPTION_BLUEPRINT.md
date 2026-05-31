# Stripe One-shot & Subscription Blueprint

## Uso previsto

Stripe resta il provider primario per:

- acquisto singolo report/verifica;
- pacchetti crediti;
- abbonamenti con crediti mensili e benefici limitati;
- refund full/partial;
- customer portal futuro per gestione carta e subscription.

## Checkout mode

| Caso | Stripe mode | Note |
|---|---|---|
| Report singolo | `payment` | Crea `CheckoutSession` collegata a `Order` |
| Wallet crediti | `payment` | Crea `CreditWalletLedgerEntry` dopo webhook paid |
| Abbonamento | `subscription` | Crea `InternalSubscription` solo dopo evento confermato |

## Metadata obbligatori

Ogni sessione Stripe deve includere metadata tecnici non sensibili:

- `orderId` se acquisto singolo;
- `customerAccountId`;
- `productCode` o `planCode`;
- `checkoutSessionId` interno;
- `idempotencyKey`;
- `environment`.

Non inserire PII inutili o payload provider dati nei metadata.

## Eventi minimi da normalizzare

- checkout/session completed;
- payment succeeded/failed;
- invoice paid/payment_failed;
- customer subscription created/updated/deleted;
- refund created/updated/failed;
- charge refunded;
- dispute created/closed.

## Subscription lifecycle interno

| Evento provider | Stato interno |
|---|---|
| subscription created + first invoice paid | `active` |
| invoice payment failed | `past_due` o `payment_failed` |
| subscription deleted/canceled | `cancelled` |
| customer portal cancel at period end | `cancel_scheduled` |
| payment recovered | `active` |

## Cancellazione e rimborso

- Cancellazione immediata: disattiva entitlement subito e valuta rimborso residuo solo con policy.
- Cancellazione a fine periodo: entitlement resta valido fino a `currentPeriodEnd`.
- Rimborso ultimo pagamento: genera `RefundRequest`, poi provider refund, poi ledger.
- Proration: da usare solo se progettata e chiara al cliente.

## Guardrail

- Nessuna subscription con accesso illimitato a report a costo provider.
- Nessun credito creato prima del webhook pagato.
- Crediti scaduti o stornati non riutilizzabili.
- Dispute aperta blocca nuovi rimborsi manuali sullo stesso pagamento.
