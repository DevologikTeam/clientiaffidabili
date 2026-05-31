# M4-A — Checkout & Billing Analysis

Versione pacchetto: `0.11.0`  
Tipo sprint: **Analisi**  
Modulo: **M4 Checkout & Billing**  
Data: 2026-05-29

## Obiettivo

Definire il modello di pagamento, fatturazione, ledger e sicurezza operativa per ClientiAffidabili.it prima della progettazione M4-P e dello sviluppo M4-S.

Il checkout deve permettere al cliente di acquistare report e verifiche B2B con prezzo chiaro, uso lecito dichiarato, pagamento tracciato, fattura gestibile e ordine immutabile. Nessuna chiamata al provider dati deve partire prima della conferma pagamento, salvo servizi gratuiti interni o ambienti sandbox.

## Decisione senior

Per MVP si adotta una strategia **Stripe Checkout hosted first** con architettura provider-adapter.

Motivazione:

- riduce il rischio PCI perché la raccolta delle carte avviene fuori dal nostro frontend;
- supporta pagamenti una tantum e, in futuro, abbonamenti/monitoraggi;
- consente webhooks e stato pagamento tracciabile;
- permette di aggiungere in futuro Nexi, PayPal o Mollie senza cambiare il dominio ordine;
- consente di partire velocemente con un flusso affidabile e poi raffinare fatturazione elettronica e riconciliazione.

## Principi non negoziabili

1. **Order snapshot immutabile**: prezzo, IVA, totale, prodotto, versione prodotto, costo stimato e margine vengono salvati al momento dell'acquisto.
2. **Provider call dopo pagamento**: il report non viene richiesto al provider fino a `payment_succeeded` verificato da webhook idempotente.
3. **Nessun dato carta nel database**: salviamo solo ID sessione/provider, stato e metadati tecnici minimi.
4. **Uso lecito esplicito**: il checkout richiede conferma di titolarità/interesse legittimo e accettazione condizioni.
5. **Audit completo**: ordine, checkout session, webhook, pagamento, provider run, fattura, rimborso e assistenza devono essere tracciati.
6. **Fatturazione separata dal pagamento**: il pagamento incassa; la fattura segue un workflow fiscale controllato.
7. **Rimborso controllato**: se il report è già stato generato, il rimborso non è automatico salvo errore tecnico o policy commerciale approvata.
8. **Fallback assistito**: servizi ad alto rischio o lenti possono passare a richiesta assistita invece che checkout immediato.

## Esito analisi

Il modulo M4 dovrà introdurre quattro livelli:

| Livello | Scopo | MVP |
|---|---|---|
| Checkout Session | Crea sessione hosted e redirect sicuro | Sì |
| Payment Ledger | Registra movimenti e stati finanziari | Sì |
| Billing Profile | Raccoglie dati fiscali cliente | Sì |
| Fiscal Invoice Workflow | Emissione/riconciliazione fattura | Parziale / provider-ready |

## Scope M4-P

Nel prossimo sprint di progettazione dovremo definire:

- wireframe checkout step-by-step;
- stati ordine e pagamento;
- contratti API `POST /checkout/session`, `POST /webhooks/stripe`, `GET /orders/:id`;
- data model definitivo per `Payment`, `PaymentLedgerEntry`, `BillingProfile`, `Invoice`;
- schema webhook idempotente;
- schermate admin per pagamenti, anomalie e rimborsi;
- policy fiscale/fatturazione elettronica da validare con consulente.

## Scope M4-S

Lo sprint sviluppo dovrà implementare:

- modulo NestJS `checkout`;
- adapter Stripe iniziale;
- creazione sessione hosted;
- webhook idempotente;
- ordine pagato con snapshot;
- ledger payment/refund/dispute;
- blocco provider run senza pagamento;
- QA antiregressione checkout.

## Fuori scope MVP

- marketplace payouts;
- salvataggio carte;
- split payment automatico;
- abbonamenti complessi a consumo;
- calcolo fiscale internazionale avanzato;
- fatturazione elettronica SDI completamente integrata;
- rimborsi automatici dopo report consegnato;
- pagamento posticipato senza accordo commerciale.

## Gate per M4-P

- [x] Provider checkout selezionato per MVP.
- [x] Stati pagamento/ordine analizzati.
- [x] Ledger finanziario definito a livello concettuale.
- [x] Webhook/idempotenza analizzati.
- [x] Impatto commissioni su margine analizzato.
- [x] Guardrail checkout/compliance definiti.
- [x] Rischi operativi e supporto analizzati.
