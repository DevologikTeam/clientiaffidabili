# Credit Wallet & Entitlement Blueprint

## Obiettivo

Supportare abbonamenti e pacchetti prepagati senza mettere a rischio il margine sui servizi Openapi/provider.

## Concetti

- `CreditWallet`: saldo crediti per account cliente.
- `CreditLedgerEntry`: movimento credito append-only.
- `EntitlementSnapshot`: diritti attivi in un momento preciso.
- `CreditReservation`: blocco temporaneo prima della chiamata provider.
- `CreditConsumption`: consumo definitivo dopo richiesta provider accettata.

## Crediti

Un credito non rappresenta sempre 1 euro. Per semplicità MVP:

- 1 credito base = 1 unita' commerciale interna;
- ogni prodotto ha `creditCost`;
- il credit cost tiene conto del costo provider e del margine target;
- i prodotti ad alto costo non devono essere acquistabili con crediti generici se il margine non e' certificato.

## Flusso consumo

1. Cliente seleziona verifica.
2. Sistema valuta entitlement e saldo.
3. Se saldo sufficiente, crea `CreditReservation`.
4. Se provider request parte, converte reservation in consumo.
5. Se provider request non parte o fallisce prima di costo, rilascia reservation.
6. Se provider ha sostenuto costo, il credito resta consumato salvo refund policy manuale.

## Subscription entitlement

| Piano | Benefici possibili |
|---|---|
| Starter | crediti mensili limitati, storico report, supporto base |
| Pro | piu' crediti, monitoraggio fornitori limitato, priorita' supporto |
| Business | crediti maggiori, utenti multipli, alert e invoice support |

## Regole anti-abuso

- No rollover infinito salvo scelta esplicita.
- No credito negativo salvo override admin.
- No consumo se account in dispute/past_due.
- No conversione credito in denaro, salvo refund policy su pagamento specifico.
- No crediti creati prima di pagamento confermato.

## Entitlement snapshot

Lo snapshot viene salvato su:

- checkout;
- creazione ordine da credito;
- richiesta provider;
- pubblicazione report.

Serve a dimostrare perche' un cliente poteva o non poteva usare un servizio in un certo momento.
