# Billing and subscription account blueprint

## Obiettivo

Disegnare l'area ordini, pagamenti, fatture e, in prospettiva, abbonamenti/crediti. Lo sprint M7-P non implementa subscription ma prepara l'esperienza cliente coerente con la futura evoluzione Stripe + PayPal.

## MVP billing area

Route proposta:

```text
/dashboard/ordini
/dashboard/fatture
/dashboard/profilo-azienda
```

### Ordini

Campi:

- codice ordine leggibile;
- servizio acquistato;
- soggetto verificato;
- totale pagato;
- metodo pagamento;
- stato pagamento;
- data;
- report collegato.

### Fatture

Campi:

- numero o stato provvisorio;
- ordine collegato;
- imponibile;
- IVA;
- totale;
- stato: in preparazione, emessa, inviata, annullata;
- download se disponibile.

### Profilo azienda

Campi:

- ragione sociale;
- partita IVA/codice fiscale;
- indirizzo;
- email amministrativa;
- email fatturazione;
- PEC/SDI se necessario;
- preferenze comunicazioni.

## Subscription future-ready

Possibili pacchetti futuri:

- **Starter mensile**: X verifiche incluse/mese;
- **Business**: crediti inclusi + sconto add-on;
- **Partner/API**: plafond e fatturazione ricorrente;
- **Monitoraggio fornitori**: canone per soggetti monitorati.

## Stripe + PayPal readiness

Il design area account deve essere provider-neutral:

- mostrare “Metodo di pagamento” senza legare la UI a Stripe o PayPal;
- usare `paymentProvider` solo internamente;
- distinguere pagamento singolo da abbonamento;
- mostrare rinnovo, crediti e prossima fatturazione solo quando reali;
- permettere gestione pagamento tramite pagina provider hosted, non dati carta interni.

## Stati subscription futuri

| Stato | Copy cliente |
|---|---|
| `trialing` | Periodo di prova attivo |
| `active` | Piano attivo |
| `past_due` | Pagamento da aggiornare |
| `paused` | Piano sospeso |
| `canceled` | Piano annullato |

## Guardrail

- Non vendere crediti senza tracciamento costi/provider.
- Non promettere report illimitati se ogni chiamata provider ha costo variabile.
- Non salvare dati carta nel database.
- Non mostrare ID payment provider al cliente salvo necessità supporto.
- Ogni cambio piano/rinnovo deve generare audit e invoice/ledger.
