# M17-A — OpenAI Assisted Operations & Content Copilot Analysis

Versione: **0.60.0**  
Data: **2026-05-30**  
Tipo sprint: **Analisi**

## Obiettivo

Analizzare dove introdurre funzioni OpenAI/AI all'interno di ClientiAffidabili.it senza trasformare l'AI in un decisore automatico. Il modulo deve aumentare produttivita', qualita' contenuti e velocita' operativa, ma restare sempre controllato da admin, audit, settings, limiti di costo e redaction.

## Perimetro del modulo

Il modulo M17 coprira':

- content copilot per CMS SEO/GEO;
- support reply assistant per CRM/ticket;
- error ledger summarizer;
- admin operations assistant;
- report note assistant, solo per note prudenti e non per giudizi automatici;
- release/QA summarizer;
- prompt registry e versioning;
- OpenAI settings amministrabili;
- budget, rate limit e usage ledger;
- error ledger OpenAI;
- approval workflow obbligatorio.

## Decisione prodotto

L'AI sara' un **assistente interno**. Non sara' una funzione pubblica libera nel MVP.

Pattern obbligatorio:

```text
AI propone -> Admin verifica -> Admin approva -> Sistema audita
```

## Cosa potra' fare l'AI

| Area | Funzione consentita | Output |
|---|---|---|
| CMS SEO/GEO | Suggerire title, meta description, FAQ, outline, H2 e miglioramenti copy | Bozza modificabile |
| CRM/Supporto | Riassumere messaggi e proporre risposte prudenti | Bozza risposta |
| Error Ledger | Raggruppare errori e suggerire possibili cause | Sintesi interna |
| Admin Operations | Spiegare stato ordine/pagamento/provider/report | Nota operativa |
| Report | Migliorare chiarezza di note non sensibili | Bozza interna |
| QA/Release | Riassumere esiti test, errori build e next action | Sintesi release |

## Cosa non potra' fare l'AI

L'AI non deve:

- pubblicare contenuti senza approvazione;
- rimborsare utenti;
- modificare settings;
- attivare/disattivare provider;
- cambiare prezzi o margini;
- chiamare Openapi;
- decidere se una societa' e' affidabile;
- generare claim come "rischio zero", "pagamento garantito" o "solvibilita' garantita";
- usare dati carta, IBAN, API key, token, prompt sensibili o raw payload provider;
- inviare email al cliente senza preview/approvazione dove il contenuto non e' puramente transazionale.

## Dipendenze gia' presenti

- **Settings Admin**: serve per abilitare/disabilitare OpenAI, configurare modello, budget, limiti e secret reference.
- **Operational Error Ledger**: serve a registrare errori OpenAI, timeout, limiti, safety block, budget exceeded e retry.
- **Analytics interno**: serve per capire quali contenuti/supporti migliorano conversione, senza inviare PII a provider esterni.
- **CMS SEO/GEO**: e' il primo use case a basso rischio.
- **CRM/Supporto**: secondo use case, sempre con bozza e approvazione.

## Rischi principali

1. Invio accidentale di dati sensibili a OpenAI.
2. Costi non controllati.
3. Output con claim commerciali o legali rischiosi.
4. Uso dell'AI come decisore invece che assistente.
5. Prompt injection da contenuti cliente/ticket.
6. Salvataggio non governato di prompt/output.
7. Mancanza di audit su chi ha generato, modificato e approvato.

## Guardrail obbligatori

- OpenAI disabilitato di default.
- Chiave API mai salvata in chiaro nel DB, solo secret reference/write-only.
- Redaction prima di ogni richiesta.
- Prompt registry versionato.
- Output salvato come bozza, non pubblicato direttamente.
- Reason obbligatoria per approvare output sensibili.
- Budget giornaliero/mensile.
- Limite token per use case.
- Error ledger per ogni failure o safety block.
- Audit per generate, regenerate, approve, discard, publish.
- No PII nei log analytics.

## Readiness per M17-P

M17-P dovra' progettare:

- OpenAI settings admin;
- prompt registry;
- AI use-case registry;
- redaction service;
- OpenAI usage ledger;
- AI error ledger integration;
- UI copilot per CMS/support/error ledger;
- approval workflow;
- QA anti prompt leak e anti risky claims.
