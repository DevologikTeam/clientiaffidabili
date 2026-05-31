# Conversion Architecture Analysis

## Conversion model

Il modello consigliato è **service-led checkout**, non subscription-first.

La subscription potrà arrivare dopo, ma nella fase iniziale il cliente deve poter acquistare un controllo singolo o un pacchetto crediti. Questo riduce attrito, aumenta fiducia e permette test di pricing.

## Entry point

### 1. Hero primary CTA

`Verifica un'azienda`

Porta a una pagina o sezione di scelta rapida con Company Essential e Company Pro.

### 2. Scenario selector

L'utente seleziona cosa deve decidere:

- accettare nuovo cliente;
- verificare fornitore;
- controllare dati di pagamento;
- verificare contatti;
- controllare compliance partner.

Ogni scenario suggerisce 1-2 servizi, non più.

### 3. Service detail

Deve mostrare:

- cosa controlla;
- cosa serve per avviarlo;
- tempi stimati;
- cosa ricevi;
- cosa non garantisce;
- prezzo IVA esclusa/inclusa secondo decisione fiscale;
- condizioni uso lecito;
- CTA checkout.

### 4. Checkout

Deve essere hosted/redirect o embedded sicuro. Prima del pagamento:

- riepilogo servizio;
- dati input;
- finalità dichiarata;
- consenso termini;
- privacy;
- prezzo totale;
- eventuale imposta/IVA;
- tempi di evasione.

### 5. Post-acquisto

Subito dopo pagamento:

- stato richiesta;
- eventuale attesa provider;
- link report quando pronto;
- storico dashboard;
- possibilità di acquistare monitoraggio o bundle.

## Conversion friction map

| Frizione | Rischio | Soluzione |
|---|---|---|
| Non so quale servizio scegliere | Abbandono | Scenario selector |
| Ho paura sia illegale | Abbandono o abuso | Uso lecito e limiti visibili |
| Non capisco cosa ricevo | Bassa conversione | Report preview |
| Prezzo percepito alto | Abbandono | Spiegare decisione evitata/costo errore |
| Troppe API | Confusione | Catalogo MVP ristretto |
| Tempi non chiari | Reclami | Evasione dichiarata per servizio |

## Funnel low-friction MVP

```text
Homepage
→ Scenario selector
→ Servizio consigliato
→ Dettaglio servizio
→ Checkout
→ Stato richiesta
→ Report
```

## Upsell non aggressivi

- Dopo report Company Essential: “Vuoi un controllo più completo?”
- Dopo report Company Pro: “Vuoi monitorare variazioni?”
- Dopo 3 acquisti: “Risparmia con pacchetto crediti.”
- Per volumi: “Parla con noi per listino business.”

## Metriche minime

- `page_view_landing`
- `scenario_selected`
- `service_selected`
- `checkout_started`
- `lawful_use_confirmed`
- `payment_completed`
- `report_ready_viewed`
- `bundle_upsell_clicked`
