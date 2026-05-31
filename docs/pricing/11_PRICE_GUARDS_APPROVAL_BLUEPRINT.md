# Price guards & approval blueprint

## Obiettivo

Evitare pubblicazioni rischiose: prezzi sotto costo, margini insufficienti, servizi con claim non consentiti, prodotti high-risk pubblicati senza revisione o costi provider non aggiornati.

## Calcolo progettato

```text
netRevenue = publicPriceNet - discountNet
estimatedVariableCost = providerCostEstimated + checkoutFeeEstimated + supportReserve + retryReserve + invoiceReserve
estimatedGrossMargin = netRevenue - estimatedVariableCost
estimatedGrossMarginRatio = estimatedGrossMargin / netRevenue
```

## Soglie

| Regola | Default |
|---|---:|
| Margine target | 70% |
| Margine minimo pubblicabile | 55% |
| Margine warning | 65% |
| Sconto massimo MVP | 20% |
| Revisione costo provider | ogni 30 giorni o cambio listino |
| Override super admin | obbligatorio sotto 55% o high-risk |

## Stati price guard

| Stato | Significato | Effetto |
|---|---|---|
| `pass` | prezzo pubblicabile | può andare in review/pubblicazione |
| `warning` | margine sotto target ma sopra minimo | richiede motivazione pricing manager |
| `blocked` | sotto soglia o dati mancanti | non pubblicabile |
| `override_requested` | eccezione richiesta | attesa super admin |
| `override_approved` | eccezione approvata | pubblicabile con audit |

## Motivi di blocco

- costo provider stimato mancante;
- prezzo netto minore del prezzo minimo;
- margine stimato sotto 55%;
- IVA/imposte non configurate;
- prodotto high-risk senza revisione compliance;
- copy contiene claim vietati;
- servizio provider non disponibile;
- tempo evasione non dichiarato;
- finalità lecita non richiesta nel checkout.

## UI admin price guard

### Box riepilogo

```text
Prezzo pubblico netto: €24,90
Costo variabile stimato: €3,70
Margine stimato: 85,1%
Stato: Pubblicabile
```

### Warning copy

Usare messaggi operativi:

- “Il margine è sotto il target. Puoi inviare in review motivando la scelta.”
- “Questo prezzo è sotto la soglia minima. Serve approvazione super admin.”
- “Manca la finalità lecita nel checkout. Il prodotto non può essere pubblicato.”

## Audit obbligatorio

Ogni evento deve salvare:

- utente;
- timestamp;
- prodotto;
- versione prezzo precedente;
- nuova versione prezzo;
- calcolo guardrail;
- motivo modifica;
- eventuale override;
- IP/session id admin se disponibile.

## Coupon e promozioni

Nel MVP:

- nessun coupon pubblico automatico;
- sconto massimo 20%;
- coupon bloccato se margine scende sotto soglia;
- no sconti su servizi assistiti/high-risk senza approvazione;
- coupon sempre tracciato su ordine e snapshot prezzo.
