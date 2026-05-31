# Work item detail and actions blueprint

## Layout dettaglio

Il dettaglio operativo si divide in cinque blocchi.

### 1. Header stato

Mostra:

- priorità;
- stato;
- servizio;
- ordine collegato;
- cliente/azienda in forma customer-safe;
- owner;
- SLA.

### 2. Motivo e impatto

Testo breve:

- `Motivo`: perché il sistema ha creato l'item;
- `Impatto`: cosa succede se non viene risolto;
- `Prossima azione`: azione consigliata e ruolo richiesto.

### 3. Snapshot collegati

Card sintetiche:

- ordine;
- pagamento/ledger;
- provider request;
- report;
- fattura;
- support ticket.

Ogni snapshot deve indicare se il dato è disponibile, bloccato o non applicabile.

### 4. Timeline

Timeline mista:

- evento ordine;
- evento pagamento;
- evento provider;
- evento report;
- evento admin;
- evento supporto.

La timeline usa linguaggio operativo e non espone payload tecnici.

### 5. Action panel

Azioni divise in tre gruppi:

1. **Azioni sicure**: eseguibili dal ruolo attuale.
2. **Azioni con conferma**: richiedono reason modal.
3. **Azioni bloccate**: visibili con motivo, non cliccabili.

## Azioni MVP

| Azione | Richiede reason | Ruoli |
|---|---:|---|
| Assegna item | no | operations, super admin |
| Segna in lavorazione | no | owner/role autorizzato |
| Avvia richiesta provider | sì | operations, super admin |
| Ripeti richiesta provider sicura | sì | operations, compliance, super admin |
| Invia a review compliance | sì | operations, analyst, super admin |
| Approva report | sì | analyst, compliance, super admin |
| Pubblica report | sì | compliance, super admin |
| Blocca report | sì | compliance, super admin |
| Proponi rimborso | sì | billing |
| Approva rimborso | sì | super admin |
| Chiudi ticket | no/sì se sensibile | support, super admin |
| Chiudi item | sì se P0/P1 | owner/super admin |

## Reason modal

Campi:

- motivo obbligatorio;
- categoria motivo;
- riepilogo impatto;
- checkbox conferma guardrail;
- preview audit event;
- pulsante azione con label esplicita.

Esempio CTA:

- `Pubblica report al cliente`;
- `Blocca report e avvisa operations`;
- `Approva rimborso manuale`;
- `Ripeti richiesta provider sicura`.

## Azioni vietate in MVP

- Eliminare work item.
- Eliminare audit.
- Modificare snapshot prezzo/report.
- Vedere raw payload da support.
- Pubblicare report senza autorizzazione cliente.
- Rimborsare automaticamente dopo costo provider senza review.
