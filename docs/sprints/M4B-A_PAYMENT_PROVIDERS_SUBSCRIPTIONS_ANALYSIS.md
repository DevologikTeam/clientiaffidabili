# M4B-A — Payment Providers & Subscriptions Analysis

Versione: `0.26.0`  
Tipo sprint: analisi  
Modulo: M4B Payment Providers & Subscriptions

## Obiettivo

Analizzare l'estensione del checkout di ClientiAffidabili.it da pagamenti one-shot a un modello multi-provider e subscription-ready, mantenendo il prodotto sicuro, semplice e ad alta marginalita'.

Lo sprint valuta:

- Stripe Checkout/Billing come provider principale;
- PayPal Orders/Subscriptions come provider secondario;
- pagamenti una tantum per report singoli;
- abbonamenti mensili/annuali per pacchetti di crediti o monitoraggio;
- wallet crediti prepagati;
- entitlement, rinnovi, upgrade, downgrade, cancellazioni e grace period;
- impatto delle fee su margini e pricing;
- webhook, riconciliazione e amministrazione operativa;
- guardrail per evitare chiamate provider dati non coperte economicamente.

## Decisione strategica

La decisione consigliata e':

1. **Stripe first** per MVP e subscription.
2. **PayPal come secondo provider**, utile per conversione e fiducia commerciale, ma non come fonte di verita' primaria degli entitlement.
3. **Subscription ledger interno come source of truth**: Stripe/PayPal confermano pagamenti e rinnovi, ma crediti, permessi e consumo servizi restano governati dal database applicativo.
4. **Crediti prepagati prima del consumo provider**: nessuna richiesta Openapi/provider deve partire se l'ordine non e' pagato o se il wallet non contiene crediti sufficienti.
5. **Abbonamenti come pacchetti credito + benefici**, non come promessa di verifiche illimitate.

## Modelli commerciali analizzati

| Modello | Descrizione | Priorita' | Note |
|---|---|---:|---|
| One-shot report | Acquisto singolo di report/verifica | Gia' presente | Resta canale principale per MVP. |
| Crediti prepagati | Il cliente compra un pacchetto crediti | Alta | Riduce fee relative e semplifica consumo API. |
| Abbonamento crediti mensili | Crediti inclusi ogni mese, non illimitati | Alta | Buono per agenzie, consulenti, recupero crediti, PMI. |
| Monitoraggio mensile | Fee ricorrente per soggetti/fornitori monitorati | Media | Richiede jobs e costi ricorrenti provider. |
| API partner subscription | Piano API con quota/limiti | Media-futura | Richiede developer portal e rate limiting. |
| Illimitato | Report illimitati | Escluso | Rischio margine negativo e abuso. |

## Raccomandazione MVP M4B

Per lo sviluppo M4B-S, implementare inizialmente:

- `PaymentProviderAdapter` multi-provider;
- `stripe` come provider runtime principale;
- `paypal` come adapter contrattuale e sandbox-ready;
- `SubscriptionPlan` interno;
- `CustomerSubscription` interno;
- `CreditWallet` e `CreditLedgerEntry`;
- `EntitlementSnapshot` per verificare consumo e accesso;
- webhook event idempotenti per provider;
- admin reconciliation queue.

PayPal puo' essere abilitato dopo test sandbox e dopo validazione contrattuale/fiscale. La UI pubblica non deve promettere PayPal o abbonamenti se non sono realmente attivi.

## Guardrail

- Nessuna chiamata provider dati prima di pagamento confermato o credito riservato.
- Nessun piano illimitato.
- Crediti e entitlement salvati internamente, non dedotti solo dallo stato provider pagamento.
- Webhook firmati, idempotenti e riconciliabili.
- Fee di pagamento incluse nel modello margine.
- Upgrade/downgrade con effetto esplicito e auditato.
- Cancellazione subscription non cancella report storici gia' acquistati.
- Dati carta non salvati nel database.
- Abbonamenti e PayPal non visibili come attivi finche' non implementati e testati.

## Esito

Sprint completato come analisi. Handoff pronto per **M4B-P Payment Providers & Subscriptions Design**.
