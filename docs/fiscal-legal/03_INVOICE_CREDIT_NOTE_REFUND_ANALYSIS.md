# 03 — Invoice, Credit Note and Refund Analysis

## Separazione fondamentale

Il sistema deve distinguere:

- pagamento provider: Stripe/PayPal;
- ordine commerciale;
- fattura/ricevuta/documento fiscale;
- refund pagamento;
- nota credito/rettifica fiscale;
- report erogato;
- credito consumato.

## Entita concettuali

### FiscalDocument

Campi:

- `id`
- `customerId`
- `orderId`
- `paymentId`
- `documentType`: `invoice`, `receipt`, `credit_note`, `debit_note`, `proforma`, `manual_adjustment`
- `status`: `draft`, `queued`, `issued`, `sent`, `failed`, `cancelled`, `requires_review`
- `number`
- `series`
- `issuedAt`
- `currency`
- `taxableAmount`
- `taxAmount`
- `grossAmount`
- `taxProfileSnapshot`
- `lineItemsSnapshot`
- `externalProvider`
- `externalDocumentId`
- `sdiStatus`
- `failureReason`

### FiscalAdjustment

Collega rimborsi e note credito:

- `refundRequestId`
- `originalFiscalDocumentId`
- `adjustmentDocumentId`
- `reason`
- `status`
- `amount`
- `createdBy`
- `approvedBy`

## Stati documento fiscale

| Stato | Quando |
|---|---|
| `draft` | creato ma non pronto |
| `queued` | pronto per emissione/manual review |
| `issued` | emesso nel sistema o provider esterno |
| `sent` | inviato/consegnato se previsto |
| `failed` | errore emissione/invio |
| `cancelled` | annullato prima di emissione effettiva |
| `requires_review` | dati incoerenti o profilo fiscale delicato |

## Regole rimborso fiscale

| Scenario | Refund payment | Documento fiscale |
|---|---|---|
| Pagamento fallito | no | no documento |
| Pagamento riuscito, fattura non emessa, provider non chiamato | si | annulla coda documento |
| Fattura emessa, report non erogato | si con review | nota credito/rettifica |
| Report pubblicato/scaricato | normalmente bloccato | eccezione solo manuale |
| Crediti acquistati ma non consumati | rimborso residuo possibile | nota credito parziale se fattura emessa |
| Crediti consumati | solo residuo | nota credito solo quota rimborsata |
| Dispute aperta | blocco manual refund | attendere esito disputa |

## Anti-duplicazione

Chiavi idempotenti:

- `paymentProviderEventId`
- `orderId + fiscalDocumentType`
- `refundRequestId + fiscalAdjustmentType`
- `externalDocumentId`

## Admin review obbligatoria

- profilo fiscale estero/PA;
- importo negativo o incoerente;
- refund dopo report pubblicato;
- fattura gia emessa e richiesta rimborso;
- differenza tra payment ledger e fiscal document;
- retry emissione documento fallito.

## UX cliente

Mostrare stati semplici:

- “Pagamento ricevuto”;
- “Documento fiscale in preparazione”;
- “Documento fiscale disponibile”;
- “Rimborso richiesto”;
- “Rimborso in verifica”;
- “Rimborso completato”.

Evitare:

- “SDI scartato” senza spiegazione;
- codici errore provider non tradotti;
- riferimenti a raw payload o registri interni.
