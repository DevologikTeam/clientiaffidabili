# Payment Reconciliation & Ledger Blueprint

## Obiettivo

Rendere ogni movimento economico tracciabile, idempotente e riconciliabile tra provider pagamento, ordini, crediti, subscription, fatture e rimborsi.

## Ledger separati

| Ledger | Scopo |
|---|---|
| `PaymentLedgerEntry` | incassi, fee, refund, dispute |
| `CreditLedgerEntry` | crediti assegnati, riservati, consumati, stornati |
| `SubscriptionLedgerEntry` | attivazioni, rinnovi, sospensioni, cancellazioni |
| `RefundLedgerEntry` | lifecycle refund e provider result |
| `InvoiceLedgerEntry` | emissione/stato documento fiscale |

## Event correlation

Ogni evento deve poter essere correlato tramite:

- `provider`;
- `providerEventId`;
- `providerReference`;
- `paymentId`;
- `orderId`;
- `customerAccountId`;
- `idempotencyKey`;
- `occurredAt`;
- `processedAt`.

## Idempotenza

Chiave consigliata:

```text
{provider}:{eventType}:{providerEventId}:{providerObjectId}
```

Se il provider non fornisce event id stabile, generare hash del payload redatto + timestamp provider + object id.

## Reconciliation jobs

| Job | Frequenza | Azione |
|---|---|---|
| `webhook-unprocessed` | ogni 15 min | riprocessa eventi non conclusi |
| `payment-mismatch` | giornaliero | confronta pagamento provider vs interno |
| `refund-pending` | giornaliero | verifica rimborsi provider pending |
| `subscription-renewal` | giornaliero | allinea renewal/failure |
| `credit-balance-check` | giornaliero | verifica saldo wallet non negativo |

## Stati anomalia

- payment paid ma order unpaid;
- refund succeeded ma ledger assente;
- subscription active provider ma internal suspended;
- invoice paid ma crediti non assegnati;
- dispute open ma account non flagged;
- refund total > paid total.

## Admin handling

Ogni mismatch genera work item admin con:

- impatto economico;
- rischio cliente;
- provider coinvolto;
- prossima azione sicura;
- blocco automatico se rischio doppio consumo/rimborso.
