# 25 — Subscription, credit and entitlement model analysis

## Principio

Gli abbonamenti non devono dare accesso illimitato a servizi che hanno costo vivo provider. Il modello corretto e':

- piano mensile/annuale;
- crediti inclusi;
- eventuale sconto su report extra;
- monitoraggio limitato;
- limiti API se abilitata;
- overage controllato solo con credito o pagamento aggiuntivo.

## Piano MVP consigliato

| Piano | Prezzo ipotesi | Include | Target |
|---|---:|---|---|
| Free/account | €0 | storico acquisti, report pagati | utenti one-shot |
| Starter | €29/mese | 2 report Pro o crediti equivalenti | PMI occasionali |
| Professional | €79/mese | crediti mensili + sconto extra | consulenti/agenzie |
| Business | €199/mese | crediti, multiutente, monitoraggio | recupero crediti/uffici acquisti |

Le cifre sono ipotesi da validare con il modello costi definitivo e con fee payment/provider.

## Crediti

Il credito deve essere espresso in un'unita' interna, non in euro puro, per evitare ambiguita' fiscale e per poter gestire bundle/promozioni.

Esempio:

- 1 credito = valore commerciale interno;
- ogni prodotto ha `creditCost`;
- ogni richiesta riserva crediti prima della chiamata provider;
- se la richiesta fallisce prima di consumo provider, i crediti si rilasciano;
- se il provider addebita, il costo resta registrato e si decide refund/compensazione manuale.

## Entitlement gate

Prima di ogni azione costosa:

1. identificare customer account;
2. verificare stato subscription/account;
3. verificare saldo crediti o ordine pagato;
4. calcolare costo prodotto;
5. riservare crediti/order entitlement;
6. solo dopo chiamare provider dati.

## Stati subscription

| Stato | Significato | Effetto |
|---|---|---|
| `active` | pagamento valido | crediti/benefici attivi |
| `trialing` | prova attiva | limiti stretti |
| `past_due` | pagamento fallito | grace controllato, niente nuovi costi alti |
| `paused` | sospeso | accesso storico, no nuove verifiche incluse |
| `cancelled` | cancellato | storico accessibile, rinnovi bloccati |
| `expired` | periodo terminato | solo storico acquistato |

## Guardrail

- Nessun piano illimitato.
- Crediti mensili non necessariamente cumulabili: decisione da definire in M4B-P.
- Rollover crediti solo se economicamente sostenibile.
- Ogni consumo credito e' ledger append-only.
- Admin override sempre con reason e audit.
