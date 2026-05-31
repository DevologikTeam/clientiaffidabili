# 22 — Payment provider strategy analysis

## Perche' serve M4B

Il checkout attuale e' pensato per acquisti one-shot. Per far crescere ClientiAffidabili.it servono tre strade:

1. acquisto immediato di una verifica;
2. pacchetti crediti per clienti ricorrenti;
3. abbonamenti per monitoraggio, API o crediti mensili.

Queste strade devono restare compatibili con il modello Openapi/provider, dove ogni chiamata puo' avere un costo vivo e quindi non puo' essere lasciata libera senza copertura economica.

## Ruoli dei provider

| Provider | Ruolo consigliato | Perche' |
|---|---|---|
| Stripe | Provider primario | Checkout hosted, subscription, webhook maturi, Billing, fatture/Tax future-ready. |
| PayPal | Provider secondario | Fiducia utente, pagamento con account PayPal, possibile aumento conversione. |
| Bonifico | Assisted/futuro | Per clienti B2B con ordini alti o PA, ma richiede attivazione manuale. |

## Source of truth

Il provider pagamento non deve essere la fonte unica dello stato cliente. La fonte di verita' applicativa deve essere:

- `CustomerSubscription` per stato piano;
- `CreditWallet` per saldo e riserve;
- `PaymentLedgerEntry` per eventi economici;
- `EntitlementSnapshot` per cosa il cliente puo' fare in un momento specifico;
- `AuditLog` per decisioni operative.

Stripe/PayPal confermano eventi esterni. Il prodotto decide accesso, consumi, blocchi, retry e report.

## Decisione

M4B deve introdurre un layer indipendente:

```text
Checkout UI -> PaymentProviderAdapter -> Stripe/PayPal
                              -> PaymentWebhookEvent
                              -> Internal Subscription/Credit Ledger
                              -> Entitlement Gate
                              -> Provider Data Request
```

Nessuna richiesta a Openapi/provider dati deve saltare l'entitlement gate.
