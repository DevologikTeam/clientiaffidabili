# Admin Operations — Experience blueprint

## Principio guida

L'admin deve rispondere a quattro domande in meno di cinque secondi:

1. Cosa richiede attenzione ora?
2. Perché è bloccato?
3. Qual è l'impatto su cliente, ricavo o compliance?
4. Qual è la prossima azione sicura?

## Struttura della home `/admin/operations`

### 1. Command header

Contenuto:

- titolo: `Centro operativo`;
- descrizione: `Ordini, pagamenti, provider, report e supporto da lavorare`;
- metrica primaria: `item urgenti`;
- CTA primaria contestuale: `Lavora il primo blocco critico`;
- CTA secondaria: `Apri audit critici`.

Regola: massimo una CTA primaria visivamente dominante.

### 2. Priority strip

Quattro card:

- `Critici`: incidenti, doppio addebito, esposizione dati, report non autorizzato;
- `Da sbloccare`: ordini pagati senza provider/report;
- `Da revisionare`: report, compliance, provider manual review;
- `Amministrazione`: fatture, rimborsi, dispute.

Ogni card mostra numero, trend, owner e prima azione.

### 3. Work queue principale

La coda principale deve essere sopra la piega. Colonne minime:

- priorità;
- tipo;
- ordine;
- servizio;
- motivo;
- impatto;
- owner;
- prossima azione;
- SLA;
- stato.

### 4. Side panel contestuale

Quando un item è selezionato, il lato destro mostra:

- riepilogo customer-safe;
- blocco attuale;
- azioni consentite;
- azioni bloccate con motivo;
- ultime 5 voci audit.

### 5. Operational health

Sezione secondaria, non sopra la coda:

- pagamenti confermati oggi;
- provider request fallite;
- report pubblicati;
- fatture pendenti;
- ticket aperti;
- anomalie critiche.

## Pattern informativo obbligatorio

Ogni item deve includere sempre:

- `status`: stato leggibile;
- `reason`: motivo del blocco;
- `impact`: conseguenza operativa;
- `nextAction`: azione consigliata;
- `ownerRole`: chi deve agire;
- `blockedActions`: azioni vietate o non sicure.

## Copy interno

Usare copy operativo, non tecnico fine a sé stesso.

| Evitare | Usare |
|---|---|
| Webhook failed | Pagamento non riconciliato automaticamente |
| Provider error | Il fornitore dati non ha completato la richiesta |
| Retry | Ripeti richiesta solo se sicuro |
| Raw payload | Dati tecnici del fornitore |
| Publish | Pubblica report al cliente |

## Responsive

Desktop first per uso operativo, ma tablet friendly:

- desktop: tabella + side panel;
- tablet: lista compatta + drawer dettaglio;
- mobile: solo consultazione/urgenze, azioni critiche disabilitate o spostate su desktop se necessario.
