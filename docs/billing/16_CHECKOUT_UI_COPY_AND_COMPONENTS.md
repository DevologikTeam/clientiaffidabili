# 16 — Checkout UI Copy & Components

## Componenti da sviluppare in M4-S

### `CheckoutStepper`

Mostra avanzamento:

1. Servizio
2. Dati
3. Fatturazione
4. Pagamento
5. Conferma

Stati: `done`, `current`, `blocked`, `pending`.

### `OrderSummaryCard`

Contiene:

- servizio;
- prezzo netto;
- IVA;
- totale;
- tempo stimato;
- snapshot versione;
- limiti report.

### `LegalUseConfirmation`

Checkbox obbligatorie con microcopy legale-operativo.

Non deve essere nascosto in accordion.

### `BillingProfileForm`

Form riutilizzabile per dati fiscali.

Varianti:

- azienda italiana;
- professionista;
- PA;
- cliente estero;
- individuale solo se servizio ammesso.

### `PaymentStatusPanel`

Stati:

- pending;
- processing;
- succeeded;
- failed;
- expired;
- refunded;
- requires assistance.

### `AdminBillingQueueTable`

Tabella operativa per code billing.

Colonne:

- priorità;
- ordine;
- cliente;
- importo;
- stato;
- provider;
- ultimo evento;
- azione consigliata.

## Microcopy checkout

### Hero checkout

`Conferma i dati e procedi al pagamento sicuro.`

Descrizione:

`Prima del pagamento puoi controllare servizio, prezzo, tempi, dati richiesti e limiti del report. La verifica viene avviata solo dopo conferma del pagamento.`

### Box limiti report

`Il report aiuta a valutare segnali disponibili da fonti informative, ma non garantisce pagamenti futuri, solvibilità assoluta o assenza di rischio.`

### Uso lecito

`Confermo di richiedere questa verifica per una finalità professionale lecita, proporzionata e collegata alla mia attività.`

### Stato pagamento in verifica

`Stiamo attendendo conferma sicura dal circuito di pagamento. Non chiudere l'ordine: la pagina si aggiornerà appena riceveremo l'esito.`

### Pagamento confermato

`Pagamento confermato. La richiesta è stata registrata e passerà alla lavorazione.`

### Pagamento fallito

`Il pagamento non è stato completato. Puoi riprovare senza perdere il riepilogo dell'ordine.`

### Sessione scaduta

`La sessione di pagamento è scaduta. Crea una nuova sessione per continuare.`

## Layout desktop

```text
[Header]
[Checkout hero + trust notice]

[Main column 65%]
  CheckoutStepper
  Service confirmation
  Subject form
  Billing profile form
  Legal confirmations
  Payment CTA/status

[Sidebar 35%]
  OrderSummaryCard sticky
  Report limits
  Support box
```

## Layout mobile

- summary compatto sopra CTA;
- sidebar diventa accordion non chiuso di default sul primo step;
- CTA sticky bottom solo dopo validazione campi;
- conferme legali sempre visibili prima di CTA.

## Accessibilità

- errori associati a `aria-describedby`;
- checkbox con label completo;
- stepper leggibile da screen reader;
- focus visibile dopo redirect/cancel;
- nessun messaggio solo colore.

## Anti-pattern vietati

- CTA `Compra ora` senza riepilogo dati;
- checkbox preselezionate;
- nascondere costi IVA nel riepilogo;
- mostrare promesse tipo `cliente sicuro` o `zero rischi`;
- chiamare provider dati durante validazione form;
- mostrare messaggi tecnici provider al cliente finale.
