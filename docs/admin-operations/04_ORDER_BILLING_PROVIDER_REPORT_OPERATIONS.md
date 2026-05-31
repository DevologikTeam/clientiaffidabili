# Order, billing, provider and report operations

## Order operations

L'ordine è il nodo centrale. Ogni evento operativo deve potersi ricondurre a un ordine.

### Stati operativi ordine

- `draft`: ordine creato ma non ancora portato a checkout.
- `checkout_started`: sessione checkout creata.
- `payment_pending`: pagamento in attesa.
- `paid`: pagamento confermato.
- `provider_requested`: richiesta provider avviata.
- `provider_completed`: dati provider disponibili.
- `report_generated`: report generato.
- `report_in_review`: report in revisione interna.
- `report_published`: report pubblicato al cliente.
- `blocked`: blocco operativo.
- `refunded`: rimborso completato.
- `cancelled`: ordine annullato.

## Billing operations

La console billing deve separare:

- pagamento;
- ledger;
- fattura;
- rimborso;
- dispute;
- subscription future.

Pagamento confermato non significa fattura emessa; fattura emessa non significa report pubblicato.

## Provider operations

La sezione provider deve evidenziare:

- richiesta provider;
- tentativi sicuri;
- cost ledger;
- stato callback/polling;
- errore classificato;
- eventuale manual review;
- raw payload solo vault interno, non navigazione standard.

## Report operations

La sezione report deve consentire:

- revisione evidenze;
- controllo score prudente;
- controllo copy vietato;
- richiesta integrazione manuale;
- pubblicazione;
- blocco con motivazione;
- audit pubblicazione.

## Support operations

Ogni ticket deve essere collegato a uno tra:

- ordine;
- pagamento;
- fattura;
- provider request;
- report;
- account cliente.

I ticket generici sono consentiti ma meno prioritari.
