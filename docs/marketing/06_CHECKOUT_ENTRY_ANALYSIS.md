# Checkout Entry Analysis

## Decisione

Il checkout deve essere **servizio-specifico**, non generico. L'utente deve arrivare al pagamento sapendo esattamente cosa sta comprando, quali dati deve inserire, quanto costa, quanto tempo richiede e quali limiti ha.

## Checkout preconditions

Prima di creare una sessione checkout:

1. servizio selezionato;
2. prezzo risolto lato server;
3. dati input validati;
4. finalità lecita dichiarata;
5. termini accettati;
6. eventuale fatturazione/IVA raccolta;
7. order draft creato;
8. audit log generato.

## Checkout page content

- Titolo servizio.
- Riepilogo cosa ricevi.
- Dati inseriti.
- Tempi di evasione.
- Prezzo netto/lordo secondo configurazione.
- Costi aggiuntivi/imposte se dovute.
- Uso lecito.
- Link termini/privacy.
- CTA: `Procedi al pagamento sicuro`.

## Payment provider

MVP: Stripe Checkout Hosted.

Motivi:

- riduce gestione PCI;
- più veloce per MVP;
- webhook robusti;
- facile riconciliazione order/payment;
- compatibile con Coolify se le variabili sono gestite lato backend.

Adapter futuri:

- Nexi;
- Mollie;
- PayPal solo se utile commercialmente;
- bonifico manuale per clienti business ad alto volume.

## Eventi ordine

```text
DRAFT_CREATED
INPUT_VALIDATED
LAWFUL_USE_ACCEPTED
CHECKOUT_SESSION_CREATED
PAYMENT_SUCCEEDED
PAYMENT_FAILED
PROVIDER_REQUEST_CREATED
PROVIDER_RESPONSE_RECEIVED
REPORT_READY
REPORT_DELIVERED
```

## Errori da gestire

| Errore | UX |
|---|---|
| Pagamento fallito | Permetti retry senza duplicare ordine provider |
| Provider non disponibile | Stato in attesa + supporto |
| Dati input insufficienti | Blocca prima del pagamento |
| Servizio non disponibile | Disabilita CTA e spiega perché |
| Prezzo variato | Ricalcola e chiedi conferma |
| Report non evaso | Regole rimborso/credito da definire |

## Guardrail monetizzazione

- Mai chiamare provider a pagamento prima di pagamento confermato, salvo servizi gratuiti/sandbox.
- Mai fidarsi del prezzo frontend.
- Mai permettere ordine senza finalità lecita.
- Mai duplicare richiesta provider in retry pagamento.
- Ogni transazione deve avere `orderId`, `paymentId`, `providerRequestId` quando disponibile.
