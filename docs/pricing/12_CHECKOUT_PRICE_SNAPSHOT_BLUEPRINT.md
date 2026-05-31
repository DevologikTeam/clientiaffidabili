# Checkout price snapshot blueprint

## Obiettivo

Garantire che il prezzo visto dal cliente prima del pagamento sia lo stesso prezzo registrato sull'ordine, fattura/report e audit, anche se il listino cambia dopo l'acquisto.

## Principio

Il checkout crea uno snapshot immutabile di:

- prodotto;
- versione prodotto;
- prezzo;
- IVA;
- imposte/diritti;
- add-on;
- tempi stimati;
- dati richiesti;
- disclaimer;
- conferme legali;
- contenuto minimo del report atteso.

## Modello logico

```text
Product
ProductVersion
ProductPrice
Bundle
BundleItem
CheckoutSession
Order
OrderLine
OrderPriceSnapshot
Payment
ReportRequest
AuditLog
```

## Snapshot ordine

Campi minimi:

| Campo | Tipo | Note |
|---|---|---|
| `productCode` | string | stabile |
| `productVersion` | string | versione contenuto |
| `priceVersion` | string | versione prezzo |
| `publicName` | string | nome al momento acquisto |
| `publicPriceNet` | decimal | prezzo netto |
| `vatRate` | decimal | aliquota IVA |
| `vatAmount` | decimal | importo IVA |
| `taxesAndDutiesNet` | decimal | se presenti |
| `totalGross` | decimal | totale cliente |
| `estimatedDelivery` | string | testo mostrato al cliente |
| `requiredInputs` | json | dati richiesti |
| `legalConfirmations` | json | checkbox e timestamp |
| `disclaimerVersion` | string | versione disclaimer |
| `providerCostEstimated` | decimal | admin-only, opzionale snapshot interno |

## Stati checkout

```text
draft → price_locked → pending_payment → paid → request_queued → provider_processing → report_ready
                         ↘ expired
                         ↘ failed
                         ↘ refunded
```

## Regole UX

- Mostrare sempre “prezzo netto + IVA” prima del pagamento.
- Mostrare eventuali imposte/diritti separati.
- Mostrare tempi in modo prudente.
- Bloccare pagamento se prodotto non è più pubblicato tra scelta e conferma.
- Se il prezzo cambia durante la sessione, chiedere riconferma.
- Salvare consenso/checkbox finalità lecita solo dopo visualizzazione chiara.

## Regole tecniche

- Il frontend non calcola il totale finale in modo autoritativo.
- Il backend crea e firma la sessione checkout.
- Il provider pagamento riceve importo già calcolato server-side.
- L'ordine viene creato solo da sessione valida.
- Ogni webhook pagamento deve essere idempotente.
- Nessuna chiamata provider dati deve partire prima del pagamento confermato, salvo prodotti gratuiti interni non previsti nel MVP.

## Error states

| Caso | Messaggio cliente |
|---|---|
| prezzo cambiato | “Il prezzo è stato aggiornato. Ricontrolla il riepilogo prima di procedere.” |
| prodotto sospeso | “Questo servizio non è momentaneamente acquistabile.” |
| pagamento fallito | “Il pagamento non è andato a buon fine. Nessun importo è stato confermato.” |
| sessione scaduta | “La sessione è scaduta. Riapri il riepilogo per bloccare nuovamente il prezzo.” |
| servizio assistito | “Questo controllo richiede una valutazione prima dell'acquisto.” |
