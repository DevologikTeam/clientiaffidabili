# 12 — Webhook & Idempotency Blueprint

## Obiettivo

Garantire che eventi provider duplicati, ritardati o fuori ordine non creino doppi pagamenti, doppi report, doppi rimborsi o stati incoerenti.

## Regola primaria

Il redirect frontend non conferma il pagamento. Solo webhook valido e firmato può portare l'ordine a stato `paid`.

## Pipeline webhook

```text
Provider webhook
  ↓
Verify signature
  ↓
Compute payload hash
  ↓
Store PaymentWebhookEvent(received)
  ↓
Check providerEventId duplicate
  ↓
Resolve order/payment
  ↓
Apply state transition idempotent
  ↓
Append ledger entry
  ↓
Audit log
  ↓
Mark event processed / failed / ignored
```

## Chiavi idempotenza

| Caso | Chiave |
|---|---|
| evento provider | `provider + providerEventId` |
| checkout session | `provider + providerSessionId` |
| pagamento | `provider + providerPaymentId` |
| ledger | `paymentId + type + providerEventId + amountCents` |
| provider data execution | `orderId + productCode + subjectHash` |

## State transition idempotenti

### Da payment succeeded

Se ordine:

- `pending_payment` → `paid`;
- `payment_processing` → `paid`;
- `paid` → resta `paid`;
- `processing/completed` → nessun downgrade;
- `refunded` → non riaprire ordine.

### Da payment failed

Se ordine:

- `pending_payment` → `failed` o resta pagabile;
- `paid/completed` → ignorare e aprire alert admin;
- `refunded` → ignorare.

### Da refund

Se provider dati non eseguito:

- `paid` → `refunded`;
- ledger `refund` debit;
- invoice `credit_note_required` se fattura già emessa.

Se provider dati eseguito:

- `requires_assistance`;
- admin review.

## Payload retention

Per sicurezza/privacy:

- salvare raw payload solo se necessario e minimizzato;
- preferire `payloadHash` + campi normalizzati;
- mascherare email, indirizzi e riferimenti di pagamento nei log;
- non salvare PAN/card data.

## Error taxonomy

| Codice | Azione |
|---|---|
| `SIGNATURE_INVALID` | 400, salva evento solo se sicuro, alert security |
| `DUPLICATE_EVENT` | 200, marca duplicate |
| `ORDER_NOT_FOUND` | 202/failed, admin queue |
| `STATE_CONFLICT` | 200, admin queue |
| `LEDGER_WRITE_FAILED` | retry interno, blocca provider execution |
| `UNSUPPORTED_EVENT` | 200 ignored |

## Retry policy

- retry automatico solo su errori transienti DB/lock;
- massimo 3 tentativi interni;
- dopo fallimento, coda admin;
- retry manuale con motivo obbligatorio.

## Anti doppia esecuzione provider dati

Prima di inviare richiesta dati:

1. controllare `Order.status`;
2. verificare pagamento `succeeded`;
3. verificare assenza di `ProviderExecution` completata per stessa chiave;
4. acquisire lock transazionale;
5. creare audit `provider_execution_started`.
