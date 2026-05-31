# Payment ledger, rimborsi e dispute

## Perché serve un ledger

Un ordine può avere più eventi economici: pagamento autorizzato, pagamento riuscito, rimborso parziale, rimborso totale, contestazione, storno, commissione provider, nota credito. Salvare solo uno `status` sull'ordine non è sufficiente.

## Entity concettuale

```ts
type LedgerEntryType =
  | 'payment_created'
  | 'payment_succeeded'
  | 'payment_failed'
  | 'provider_fee_estimated'
  | 'refund_requested'
  | 'refund_succeeded'
  | 'refund_failed'
  | 'dispute_opened'
  | 'dispute_closed'
  | 'manual_adjustment';
```

Campi minimi:

| Campo | Scopo |
|---|---|
| `id` | identificativo interno |
| `orderId` | ordine collegato |
| `paymentId` | pagamento collegato |
| `type` | tipo movimento |
| `amountNetCents` | imponibile se applicabile |
| `taxCents` | IVA se applicabile |
| `grossCents` | totale |
| `providerFeeCents` | costo provider pagamento stimato/reale |
| `currency` | EUR default |
| `source` | webhook/admin/system |
| `idempotencyKey` | anti-duplicazione |
| `metadata` | payload ridotto e non sensibile |
| `createdAt` | audit temporale |

## Rimborsi

### Rimborso automatico consentito

- pagamento riuscito ma provider dati non ancora chiamato;
- duplicato tecnico confermato;
- errore checkout prima di esecuzione servizio.

### Rimborso manuale richiesto

- report già generato;
- servizio lanciato verso provider con costo sostenuto;
- dati cliente errati imputabili al cliente;
- richiesta commerciale fuori policy;
- contestazione/dispute.

## Dispute

Quando arriva una contestazione:

1. ordine passa a `disputed`;
2. download/report può restare disponibile solo se già consegnato, ma nuovi acquisti possono essere messi in review;
3. evento audit obbligatorio;
4. supporto riceve task operativo;
5. ledger registra apertura/chiusura disputa.

## KPI finanziari

- tasso conversione checkout;
- tasso sessioni scadute;
- costo medio commissioni;
- margine lordo dopo provider dati + commissione pagamento;
- refund rate;
- dispute rate;
- tempo medio da pagamento a report.
