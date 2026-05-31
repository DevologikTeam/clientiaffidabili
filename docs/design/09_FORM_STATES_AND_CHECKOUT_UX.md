# Form States & Checkout UX Blueprint

## 1. Principio

I form di ClientiAffidabili.it raccolgono dati sensibili o commercialmente rilevanti. Devono essere chiari, sobri, guidati e tracciabili.

## 2. Stati campo

| Stato | UI | Copy |
|---|---|---|
| Default | bordo neutro | label semplice |
| Focus | ring blu | nessun cambio layout |
| Help | testo sotto campo | spiega formato o motivo |
| Valid | opzionale, non invasivo | “Dato pronto per la verifica” |
| Error | bordo rosso + testo | cosa correggere e perché |
| Disabled | grigio leggibile | motivo del blocco |
| Loading | spinner/testo | “Verifica in corso…” |

## 3. Checkout flow

### Step 1 — Scelta servizio

Copy esempio: “Scegli la verifica più adatta al tipo di decisione che devi prendere.”

### Step 2 — Inserimento dati

Copy esempio: “Inserisci solo i dati necessari. Li useremo per generare il report richiesto.”

### Step 3 — Uso lecito

Copy obbligatorio: “Confermo di richiedere questa verifica per una finalità lecita e collegata a un rapporto professionale, commerciale o amministrativo.”

### Step 4 — Pagamento

Usare PSP hosted. Non salvare dati carta.

### Step 5 — Esito ordine

Mostrare:

- ID ordine;
- stato verifica;
- tempi stimati;
- link dashboard;
- fattura/ricevuta quando disponibile.

## 4. Errori checkout

| Caso | Messaggio |
|---|---|
| Pagamento rifiutato | “Il pagamento non è stato autorizzato. Nessun addebito è stato completato.” |
| Provider non disponibile | “Il servizio dati non è temporaneamente disponibile. Puoi riprovare o richiedere assistenza.” |
| Dato non valido | “Il dato inserito non è sufficiente per avviare la verifica.” |
| Finalità non confermata | “Per procedere devi confermare la finalità lecita della verifica.” |

## 5. Guardrail checkout

- Nessuna verifica parte prima della conferma pagamento, salvo piani a credito autorizzati.
- Nessuna chiamata provider ripetuta senza idempotency key.
- Nessun costo extra nascosto.
- Nessun “esito garantito”.
- Ogni ordine deve essere auditabile.
