# 13 — Billing Profile & Invoice Blueprint

## Obiettivo

Disegnare una fatturazione MVP prudente: abbastanza strutturata per partire, ma senza fingere integrazione fiscale completa prima di validazione commercialista/SDI.

## Profilo fatturazione

### UI cliente

Campi minimi per Italia B2B:

- ragione sociale;
- partita IVA;
- codice fiscale se diverso;
- indirizzo;
- CAP;
- Comune;
- Provincia;
- paese;
- email amministrativa;
- PEC o codice destinatario se disponibile.

### Validazioni MVP

- email valida;
- paese obbligatorio;
- se paese `IT`, provincia obbligatoria;
- P.IVA/C.F. da validare almeno formalmente;
- SDI o PEC non obbligatori nella fase iniziale, ma consigliati per B2B italiano.

## Invoice workflow

### MVP manual-assisted

1. Pagamento riuscito.
2. Sistema crea `Invoice` in stato `pending`.
3. Admin vede coda `fatture da emettere`.
4. Admin emette tramite gestionale esterno.
5. Admin marca `issued` e carica riferimento/PDF se disponibile.
6. Cliente vede `Documento fiscale emesso` o `In preparazione`.

### Evoluzione

- integrazione Stripe invoice;
- integrazione gestionale contabile;
- integrazione SDI/e-fattura;
- note credito automatiche per rimborsi.

## Stati Invoice

| Stato | Significato cliente | Azione admin |
|---|---|---|
| `not_required` | documento non richiesto | nessuna |
| `pending` | documento in preparazione | emettere documento |
| `issued` | documento emesso | nessuna |
| `sent` | documento inviato | nessuna |
| `failed` | problema emissione | correggere dati |
| `cancelled` | annullato | audit obbligatorio |
| `credit_note_required` | serve nota credito | emettere nota credito |

## Copy cliente

### Documento in preparazione

`Il pagamento è confermato. Il documento fiscale sarà preparato sulla base dei dati di fatturazione indicati.`

### Dati incompleti

`Mancano alcuni dati di fatturazione. Completa il profilo per ricevere correttamente il documento fiscale.`

### Fattura emessa

`Documento fiscale emesso. Puoi scaricarlo dalla sezione ordini.`

## Guardrail fiscali

- indicare sempre prezzi IVA esclusa/inclusa dove necessario;
- non usare copy che promette fattura elettronica automatica finché non integrata;
- non inviare documenti fiscali generati automaticamente senza revisione normativa;
- distinguere ricevuta ordine, conferma pagamento e fattura.
