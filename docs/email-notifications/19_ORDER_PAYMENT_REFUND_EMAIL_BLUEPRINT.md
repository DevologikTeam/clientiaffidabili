# 19 — Order, Payment & Refund Email Blueprint

## Ordine creato

Evento: `order.created`  
Template: `order_created_v1`

Scopo: confermare che la richiesta e' stata ricevuta, ma chiarire che il servizio parte solo dopo pagamento confermato.

## Pagamento riuscito

Evento: `payment.succeeded`  
Template: `payment_succeeded_v1`

Scopo: confermare importo, prodotto, ordine e prossima fase.

Regole:

- non includere dati carta;
- includere ordine e importo;
- link dashboard ordine;
- se report parte automaticamente, indicare "stiamo avviando la verifica".

## Pagamento fallito

Evento: `payment.failed`  
Template: `payment_failed_v1`

Scopo: permettere retry senza creare confusione.

Regole:

- non includere dettagli tecnici provider;
- CTA "Riprova pagamento";
- se ordine scade, indicare scadenza;
- evento collegato a error ledger.

## Azione pagamento richiesta

Evento: `payment.action_required`  
Template: `payment_action_required_v1`

Scopo: gestire SCA/3DS o verifica provider.

## Rimborso

Eventi:

- `refund.requested`;
- `refund.approved`;
- `refund.rejected`;
- `refund.failed`;
- `refund.completed`.

Regole:

- collegare ordine e importo;
- spiegare tempi indicativi senza promessa assoluta;
- se rimborso rifiutato, spiegare motivo operativo e link supporto;
- se nota credito necessaria, indicare documento fiscale separato.

## Dispute/chargeback

Evento interno/admin: `payment.dispute_received`.

Per cliente si invia email solo se esiste una procedura formalizzata. MVP: admin review manuale.

## Abbonamenti e crediti

Eventi:

- `subscription.activated`;
- `subscription.renewed`;
- `subscription.renewal_failed`;
- `subscription.cancelled`;
- `credits.low`;
- `credits.exhausted`;
- `credits.wallet_refilled`.

Regole:

- nessun concetto di "illimitato";
- mostrare crediti/benefici residui in modo chiaro;
- link a dashboard billing.
