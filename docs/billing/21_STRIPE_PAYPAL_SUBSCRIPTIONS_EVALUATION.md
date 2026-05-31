# M6-S Addendum — Valutazione Stripe + PayPal e abbonamenti

## Obiettivo

Durante M6-S viene aggiunta una valutazione architetturale sui pagamenti, perché ClientiAffidabili.it dovrà vendere sia report singoli sia pacchetti ricorrenti.

## Decisione consigliata

- **MVP**: Stripe Checkout hosted per pagamenti una tantum.
- **Post-MVP controllato**: Stripe Billing per abbonamenti e pacchetti crediti.
- **Secondo metodo di pagamento**: PayPal Checkout per pagamenti una tantum, PayPal Subscriptions solo dopo validazione fiscale/operativa.
- **Bonifico assistito**: utile per clienti B2B, ma non deve avviare provider dati finché il pagamento non è riconciliato.

## Perché Stripe resta first choice

Stripe Checkout riduce complessità PCI, supporta pagamenti una tantum e subscription, e permette di gestire molte modalità locali in modo centralizzato. Per gli abbonamenti, Stripe usa Products/Prices e Checkout Session in modalità `subscription`.

## Perché includere PayPal

PayPal può aumentare conversione nel pubblico PMI/freelance, ma va trattato come adapter separato. Per subscription, PayPal richiede product, plan, billing cycles e subscription lifecycle dedicati.

## Commercial model consigliato

| Modello | Provider primario | Provider secondario | Note |
|---|---|---|---|
| Report singolo | Stripe Checkout | PayPal Orders | Avvio provider solo a pagamento confermato |
| Pacchetto crediti prepagati | Stripe Checkout | PayPal Orders | Ledger crediti interno obbligatorio |
| Abbonamento Basic/Pro | Stripe Billing | PayPal Subscriptions | Feature flag e validazione fatturazione |
| Bonifico B2B | Manuale | - | Nessuna automazione finché non riconciliato |

## Guardrail obbligatori

1. Ogni ordine conserva `paymentProvider`, `paymentCommercialMode`, `providerExternalId` e snapshot prezzo.
2. Nessuna chiamata Openapi/provider dati prima del pagamento confermato o credito disponibile.
3. Le subscription non danno chiamate illimitate: danno crediti, soglie o sconti.
4. Ogni rinnovo genera evento ledger e controllo entitlement.
5. Se subscription è `past_due`, i nuovi report si bloccano o passano in review.
6. PayPal e Stripe devono condividere interfaccia adapter, ma non payload.
7. Webhook idempotenti e firmati/verificati; eventi duplicati ignorati.
8. Dispute/refund non cancellano report già consumati: aprono coda supporto.

## Roadmap impattata

La valutazione non sostituisce M4-S già completato. Aggiunge un modulo futuro:

- **M4B-A Payment Providers & Subscriptions Analysis**
- **M4B-P Payment Providers & Subscriptions Design**
- **M4B-S Stripe/PayPal Subscription Development**

Questo modulo va inserito dopo M8 o anticipato se il business vuole vendere abbonamenti prima del lancio.

Nota QA: i webhook devono essere verificati, idempotenti e riconciliati prima di aggiornare ordine, subscription o credito.
