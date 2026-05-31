# 09 — Checkout Experience Blueprint

## Principio UX

Il checkout di ClientiAffidabili.it non deve sembrare un form tecnico. Deve guidare l'utente in una decisione professionale: **cosa sto acquistando, quali dati devo fornire, quanto pago, cosa riceverò e quali limiti ha il risultato**.

## Flusso MVP

### Step 1 — Servizio selezionato

Origine: pagina catalogo, dettaglio servizio, prezzi o API partner.

Contenuto obbligatorio:

- nome servizio;
- prezzo netto, IVA, totale;
- tempo stimato;
- dati necessari;
- output atteso;
- limiti e disclaimer;
- stato servizio: diretto, assistito, non disponibile.

CTA:

- `Conferma dati e continua` per servizi diretti;
- `Richiedi verifica assistita` per servizi assistiti;
- nessuna CTA acquisto per servizi bloccati.

### Step 2 — Dati soggetto

Il form deve chiedere solo i dati necessari al servizio selezionato.

Esempi:

- `COMPANY_PRO`: ragione sociale o partita IVA;
- `KYB_COMPLIANCE`: partita IVA, ragione sociale, finalità verifica;
- `IBAN_CHECK`: IBAN e intestatario dichiarato;
- `CONTACT_VERIFY`: email o telefono.

Regole UX:

- non mostrare campi inutili;
- spiegare perché un dato serve;
- validare formato prima del pagamento;
- non fare enrichment provider prima del pagamento.

### Step 3 — Profilo fatturazione

Per MVP, profilo fatturazione semplificato:

- ragione sociale o nome cliente;
- partita IVA o codice fiscale se richiesto;
- indirizzo fiscale;
- email amministrativa;
- paese;
- consenso termini e privacy.

Regola: il pagamento può essere creato solo se il billing profile minimo è completo.

### Step 4 — Conferme obbligatorie

Checkbox non preselezionate:

1. `Confermo di usare il servizio per finalità professionali lecite e proporzionate.`
2. `Ho letto tempi, limiti e contenuto del report.`
3. `Accetto condizioni, privacy e trattamento dei dati necessari alla verifica.`

Per servizi high-risk aggiungere dichiarazione specifica:

`Dichiaro di avere una base lecita o un interesse professionale documentabile per richiedere questa verifica.`

### Step 5 — Hosted checkout

Il backend crea:

1. `Order` con snapshot prezzo;
2. `CheckoutSession` provider;
3. audit log;
4. redirect URL hosted.

Il frontend non riceve mai secret provider.

### Step 6 — Success page

Dopo ritorno provider:

- non fidarsi solo del redirect;
- mostrare stato `Pagamento in verifica` finché webhook non conferma;
- se webhook confermato, mostrare `Pagamento confermato`;
- spiegare prossimo passaggio: `Avviamo la verifica e ti avvisiamo quando il report è pronto.`

### Step 7 — Dashboard ordine

Stati visibili:

- `Pagamento da completare`;
- `Pagamento in verifica`;
- `Verifica in lavorazione`;
- `Report pronto`;
- `Richiede assistenza`;
- `Rimborsato`;
- `Anomalia pagamento`.

Ogni stato deve spiegare:

- cosa significa;
- chi deve agire;
- cosa succede dopo;
- tempi attesi.

## Wireframe testuale

```text
[Header]

[Checkout sicuro]
Verifica azienda Pro
Prezzo: €24,90 + IVA | Totale: €30,38
Tempo stimato: pochi minuti

[Stepper]
1 Servizio  2 Dati  3 Fatturazione  4 Pagamento

[Form dati soggetto]
Partita IVA / Ragione sociale
Email aggiornamenti
Finalità verifica

[Conferme]
☐ Uso lecito
☐ Limiti del report
☐ Privacy e condizioni

[Sidebar]
Riepilogo ordine
- Servizio
- Prezzo netto
- IVA
- Totale
- Cosa ricevi
- Cosa non garantisce

[CTA]
Procedi al pagamento sicuro
```

## Errori UX

| Caso | Messaggio |
|---|---|
| prezzo cambiato prima del pagamento | `Il prezzo del servizio è stato aggiornato. Rivedi il riepilogo prima di continuare.` |
| servizio sospeso | `Questo servizio è temporaneamente gestito in modalità assistita.` |
| payment pending | `Stiamo aspettando conferma dal circuito di pagamento.` |
| webhook duplicato | nessun messaggio utente, solo audit/admin |
| pagamento fallito | `Il pagamento non è stato completato. Puoi riprovare senza perdere i dati inseriti.` |
| provider dati già eseguito | `Il rimborso richiede verifica manuale perché il report è già stato richiesto.` |
