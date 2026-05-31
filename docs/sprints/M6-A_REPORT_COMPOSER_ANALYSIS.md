# Sprint M6-A — Report Composer Analysis

Versione pacchetto: **0.17.0**  
Tipo sprint: **Analisi**  
Modulo: **M6 Report Composer**  
Sprint precedente: **M5-S Provider Integration Development**  
Sprint successivo: **M6-P Report Composer Design**

## Obiettivo

Definire, prima della progettazione e dello sviluppo, come ClientiAffidabili.it deve trasformare i risultati normalizzati del provider in un report commerciale utile, leggibile, prudente e legalmente difendibile.

Il report non deve essere una semplice esposizione del payload provider. Deve diventare un documento decisionale per PMI, agenzie, consulenti, studi professionali e aziende che vogliono valutare clienti, fornitori o partner prima di lavorare con loro.

## Decisione di prodotto

Il report MVP sarà un **report di affidabilità descrittivo**, non una sentenza automatica.

Non useremo claim come:

- “questo cliente pagherà”; 
- “azienda sicura”; 
- “rischio zero”; 
- “garanzia di solvibilità”; 
- “approvato/non approvato” come giudizio assoluto.

Useremo invece una struttura prudente:

- livello di attenzione;
- segnali osservati;
- fonti disponibili;
- limiti della verifica;
- data della richiesta;
- suggerimento operativo non vincolante;
- prossime azioni consigliate.

## Input disponibili da M5-S

Lo sprint M5-S ha introdotto il runtime provider con:

- `ProviderRequest`;
- `ProviderRequestEvent`;
- `ProviderCostLedgerEntry`;
- `ProviderRawPayloadVault`;
- adapter mock/Openapi-ready;
- normalizzazione provider;
- admin provider queue.

M6-A analizza come usare questi output senza esporre payload grezzi o dettagli tecnici al cliente finale.

## Principi di composizione report

1. **Decision-first**: l'utente deve capire subito cosa fare.
2. **Evidence-backed**: ogni segnale deve avere fonte, data e limite.
3. **No black box**: lo score, se presente, deve essere spiegato.
4. **No absolute claims**: il report non garantisce pagamenti né affidabilità futura.
5. **Readable by non-experts**: niente linguaggio da visura grezza o API.
6. **Audit-ready**: il sistema deve poter ricostruire come è stato generato il report.
7. **Privacy by design**: dati personali o compliance-sensitive devono essere minimizzati.
8. **Immutable snapshot**: report generato da uno snapshot di dati e versione template.

## Scope MVP

### Dentro MVP

- Report web consultabile dopo ordine completato.
- Stato report: queued, composing, review_required, ready, failed.
- Sezioni standard per Check Affidabilità Pro.
- Evidence model normalizzato.
- Score descrittivo con fasce prudenziali.
- Disclaimer e limiti del report.
- Admin review per risposte ambigue o dati incompleti.
- Preparazione futura per export PDF.

### Fuori MVP

- Generazione PDF definitiva.
- Firma digitale del report.
- Conservazione sostitutiva.
- AI generativa libera sui report.
- Scoring predittivo proprietario senza validazione.
- Report persona fisica consumer/investigativi.

## Report taxonomy MVP

| Report | Priorità | Note |
|---|---:|---|
| Verifica azienda essenziale | Alta | Anagrafica, stato attività, sede, segnali base. |
| Check Affidabilità Pro | Altissima | Prodotto core: sintesi, segnali, rischio descrittivo, azioni. |
| Affidabilità Pro + Bilancio | Alta | Aggiunge indicatori bilancio quando disponibili. |
| KYB Compliance | Media | Richiede copy più prudente e review compliance. |
| Verifica IBAN | Alta | Report breve con esito tecnico e limiti. |
| Verifica email/telefono | Alta | Report breve con deliverability/validità, senza abuso marketing. |

## Stato finale sprint

M6-A produce la base analitica per M6-P:

- struttura report;
- sezioni;
- scoring prudente;
- evidence model;
- copy e disclaimer;
- guardrail compliance;
- data model analysis;
- QA antiregressione.

## Gate completati

- [x] Definito obiettivo report come documento decisionale e prudente.
- [x] Definite sezioni MVP.
- [x] Definito evidence model.
- [x] Definita tassonomia score/livelli attenzione.
- [x] Definiti limiti, disclaimer e copy vietati.
- [x] Definito workflow admin review.
- [x] Definiti requisiti data model.
- [x] Definiti QA e guardrail per M6-P/M6-S.
