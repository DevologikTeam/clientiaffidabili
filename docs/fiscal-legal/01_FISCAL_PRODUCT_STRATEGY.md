# 01 — Fiscal Product Strategy

## Principio guida

ClientiAffidabili.it deve trattare fiscalita e legal non come “pagine statiche”, ma come parte del ciclo operativo del prodotto.

Il ciclo completo e:

1. il cliente sceglie un servizio o piano;
2. accetta condizioni, privacy e uso lecito;
3. inserisce dati fiscali minimi;
4. paga con provider abilitato;
5. il pagamento viene riconciliato;
6. il documento fiscale viene generato o messo in coda;
7. il servizio viene erogato;
8. report e documenti restano accessibili secondo regole di retention;
9. eventuale rimborso/nota credito segue regole tracciate.

## Scelta MVP

Non implementare subito invio diretto SDI. Implementare prima:

- raccolta dati fiscali completa;
- `FiscalDocument` con stato;
- `FiscalDocumentQueue` per lavorazioni manual-assisted;
- export strutturato per commercialista/provider esterno;
- audit fiscale e legale;
- versionamento delle accettazioni.

Questa scelta riduce rischio di errori fiscali e permette di partire con processo controllato.

## Perimetro vendite

### Vendita singola

Esempi:

- Verifica azienda essenziale;
- Check Affidabilita Pro;
- KYB Compliance;
- Verifica IBAN;
- Verifica email/telefono.

Regola: documento fiscale associato al pagamento e al servizio acquistato.

### Abbonamento

Esempi futuri:

- pacchetto crediti mensile;
- monitoraggio fornitori;
- piano agenzia.

Regola: documento fiscale associato al ciclo di rinnovo o all'acquisto credito, non al consumo di ogni singola chiamata provider, salvo diversa decisione fiscale.

### Crediti prepagati

Regola di prodotto da validare fiscalmente:

- il pagamento genera credito spendibile;
- il consumo credito genera ledger interno;
- il documento fiscale puo essere collegato all'acquisto credito o ai servizi consumati secondo scelta del consulente fiscale.

## Decisioni operative

| Area | Decisione MVP |
|---|---|
| Fattura elettronica | Coda manual-assisted + export, non SDI diretto |
| Cliente B2B Italia | Richiedere P.IVA, ragione sociale, codice destinatario o PEC |
| Cliente B2C Italia | Richiedere codice fiscale se necessario per documento fiscale |
| Cliente estero | Stato `requires_review` finche non definite regole IVA/OSS/reverse charge |
| PA | Non MVP, stato assistito |
| Rimborsi | Collegati a payment refund + fiscal adjustment |
| Note credito | Coda admin se fattura gia emessa |
| Legal pack | Versionato e accettato prima del pagamento |

## Rischi principali

- emettere fattura sbagliata per profilo fiscale incompleto;
- rimborsare senza rettifica fiscale;
- promettere report come garanzia commerciale;
- usare dati di terzi senza base lecita/uso consentito;
- gestire clienti esteri senza regole IVA definite;
- duplicare fatture in caso di retry webhook;
- non conservare evidenza dell'accettazione condizioni.

## Guardrail

- nessuna fattura automatica se profilo fiscale incompleto;
- nessun documento fiscale duplicato per stesso payment event;
- ogni rimborso deve controllare stato fattura/report/credito;
- ogni accettazione deve salvare versione documento, timestamp, IP hash e user agent hash;
- ogni testo legale pubblicato deve avere `legalReviewStatus=approved`;
- ogni claim commerciale deve essere allineato ai limiti report.
