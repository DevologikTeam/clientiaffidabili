# Customer Dashboard — Post-Purchase Lifecycle Analysis

## Lifecycle completo

```text
catalogo -> checkout -> pagamento confermato -> richiesta provider -> normalizzazione -> composizione report -> review -> pubblicazione -> consultazione -> eventuale download/supporto
```

## Esperienza cliente per fase

| Fase | Cosa vede il cliente | Cosa non deve vedere |
|---|---|---|
| Checkout avviato | Riepilogo ordine e dati richiesti | Fee provider, webhook, idempotency key |
| Pagamento confermato | Conferma e stato elaborazione | Payload Stripe/PayPal |
| Provider request | Verifica in elaborazione | Nome endpoint, retry, raw JSON |
| Normalizzazione | Aggiornamento in corso | Log tecnici |
| Report draft | Report in preparazione | Score grezzo intermedio |
| Review manuale | Controllo qualità in corso | Motivazioni interne sensibili |
| Report pubblicato | Report pronto | Payload provider integrale |
| Fallimento finale | Verifica non completata + supporto | Stack trace, codici tecnici non spiegati |

## Eventi che aggiornano dashboard

- `ORDER_CREATED`
- `CHECKOUT_STARTED`
- `PAYMENT_CONFIRMED`
- `PAYMENT_FAILED`
- `PROVIDER_REQUEST_QUEUED`
- `PROVIDER_REQUEST_COMPLETED`
- `PROVIDER_REQUEST_FAILED`
- `REPORT_COMPOSED`
- `REPORT_REVIEW_REQUIRED`
- `REPORT_PUBLISHED`
- `INVOICE_PENDING`
- `INVOICE_ISSUED`
- `REFUND_PENDING`
- `REFUND_COMPLETED`

## Timeline cliente

Ogni verifica dovrebbe avere una timeline sintetica:

1. Ordine creato
2. Pagamento ricevuto
3. Verifica avviata
4. Dati ricevuti
5. Report preparato
6. Report pubblicato

La timeline può nascondere passaggi tecnici non necessari, ma deve mantenere audit interno completo.

## Gestione ritardi

Un ritardo non deve generare panico. La UI deve indicare:

- cosa sta succedendo;
- da quanto tempo;
- cosa stiamo facendo;
- se l'utente deve agire;
- canale supporto se supera soglia.

## Soglie operative candidate

| Scenario | Soglia UI | Azione |
|---|---:|---|
| Provider real-time oltre attesa | 2 minuti | Mostrare `elaborazione in corso` |
| Provider real-time oltre soglia | 10 minuti | Mostrare avviso e supporto |
| Review manuale | Sempre | Stato chiaro `controllo qualità` |
| Fattura pending | 24 ore | Mostrare `fattura in preparazione` |
| Pagamento fallito | immediato | CTA `Riprova pagamento` |

## Regola fondamentale

La dashboard cliente non deve mai anticipare risultati non consolidati. Finché il report non è pubblicato, l'utente vede solo stato e prossima azione, non score parziali.
