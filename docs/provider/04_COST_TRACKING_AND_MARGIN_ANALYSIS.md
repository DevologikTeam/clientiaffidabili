# Cost Tracking & Margin Analysis

## Perché serve

Nel modello di rivendita API il margine può essere eroso da:

- costi provider variabili;
- servizi combinati in bundle;
- retry non controllati;
- errori paid/non refundable;
- commissioni pagamento;
- IVA, fatturazione, supporto;
- sconti/promozioni.

## Snapshot economici necessari

### Order price snapshot

Già introdotto nei moduli M3/M4. Congela:

- prezzo netto venduto;
- IVA;
- totale lordo;
- prodotto/versione;
- quantità;
- guardrail margine.

### Provider cost snapshot

Da introdurre in M5-P/M5-S. Congela:

- provider;
- servizio/i provider candidati;
- costo stimato da listino;
- riserva margine;
- mapping version;
- costo massimo ammesso senza review;
- stato contrattuale/prezzo confermato.

## Margine operativo consigliato

| Categoria | Margine lordo target | Nota |
|---|---:|---|
| Micro-verifiche IBAN/email/telefono | 70–85% | costo basso, UX self-service |
| Company Essential | 60–75% | basso rischio, prezzo accessibile |
| Company Pro | 55–70% | core business, costo composto |
| Pro + Bilancio | 35–55% | costo provider più alto |
| KYB Compliance | 50–65% | valore alto ma supporto maggiore |

## Retry e costo

Regola fondamentale: **non ripetere automaticamente chiamate a costo senza sapere se il provider ha già consumato credito**.

Decisioni:

- retry automatico solo per timeout prima dell'accettazione provider;
- retry sicuro solo se endpoint idempotente o providerRequestId assente;
- retry manual review se risposta incerta;
- support ticket se costo addebitato e output mancante.

## Ledger provider futuro

Serve un ledger separato dal payment ledger:

- `provider_request_created`;
- `provider_request_sent`;
- `provider_cost_reserved`;
- `provider_cost_confirmed`;
- `provider_response_received`;
- `provider_retry_scheduled`;
- `provider_manual_review`;
- `provider_refund_requested` se previsto.

## Soglie guardrail

| Condizione | Azione |
|---|---|
| costo stimato > 55% prezzo netto | warning admin |
| costo stimato > 70% prezzo netto | blocco pubblicazione prezzo |
| costo effettivo ignoto | manual review prima di attivare production |
| costo provider cambiato rispetto allo snapshot | blocco ordine o repricing controllato |
| servizio provider paid e non idempotente | retry manuale |

