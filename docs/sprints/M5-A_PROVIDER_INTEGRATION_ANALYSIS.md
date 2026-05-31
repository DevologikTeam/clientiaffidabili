# M5-A — Provider Integration Analysis

Versione pacchetto: **0.14.0**  
Data: **2026-05-29**  
Tipo sprint: **Analisi**

## Obiettivo

Analizzare come ClientiAffidabili.it deve integrare il provider Openapi e, in futuro, altri provider dati senza trasformare il prodotto in un semplice proxy API.

Il cliente acquista un controllo leggibile, con prezzo chiaro, tempi dichiarati, fonti e limiti. L'applicazione deve invece gestire internamente endpoint, costi, payload, retry, code, normalizzazione, audit e report.

## Decisione senior

M5-A conferma una direzione **contract-first + adapter server-side**:

1. nessuna chiamata provider prima del pagamento confermato;
2. nessuna credenziale provider nel frontend;
3. ogni servizio pubblico viene mappato su uno o più servizi provider;
4. il costo provider viene congelato in un `providerCostSnapshot` prima della richiesta;
5. ogni richiesta provider ha una chiave di idempotenza;
6. la risposta provider non viene mai mostrata grezza al cliente;
7. il report finale mostra evidenze normalizzate, fonte, data e limiti;
8. gli errori paid/manual vengono gestiti con review, non con retry ciechi.

## Fonti e vincoli disponibili oggi

La base economica e di selezione servizi resta il listino Openapi acquisito nella strategia iniziale. In quel listino sono presenti servizi compatibili con il progetto: Business Information, ID & Trust, Digital Transformation e verifiche come Company, Credit Scoring, AML, IBAN, email, telefono, PEC, SDI, bilanci e visure.

Per l'integrazione tecnica reale è necessario validare in M5-P/M5-S la documentazione ufficiale accessibile dall'account partner/developer, perché endpoint, autenticazione, ambienti, callback, codici errore e condizioni commerciali possono dipendere dal contratto.

## Perimetro MVP

| Prodotto pubblico | Mapping provider candidato | Modalità | Nota |
|---|---|---|---|
| Verifica azienda essenziale | Company Start/Advanced + PEC/SDI dove utile | sync | primo servizio a basso rischio |
| Check Affidabilità Pro | Company Full + Credit Scoring + negatività | async/polling | core commerciale |
| Pro + Bilancio | Company Full + Bilancio | async | costo più alto, disponibilità da verificare |
| KYB Compliance | AML + titolare effettivo + sanctions/PEP dove applicabile | async/review | alta cautela compliance |
| Verifica IBAN | IBAN Start | sync | check veloce, margine alto |
| Verifica email/telefono | Email/Phone Start/Advanced | sync | add-on o micro prodotto |

## Non obiettivi dello sprint

- Non implementare chiamate production al provider.
- Non inserire credenziali reali.
- Non pubblicare endpoint partner ai clienti.
- Non attivare retry automatici su servizi potenzialmente a costo.
- Non produrre report finali completi: arriveranno nel modulo M6.

## Output creati

- analisi integrazione provider;
- mapping servizio pubblico → provider;
- modello request lifecycle;
- strategia cost tracking;
- error taxonomy;
- retry/fallback analysis;
- normalizzazione ed evidenze;
- security/compliance provider guardrails;
- readiness checklist per M5-P e M5-S;
- costanti TypeScript di analisi;
- QA statico antiregressione.

## Gate completati

- [x] Definito adapter server-side Openapi-first.
- [x] Definito mapping servizi MVP.
- [x] Definito provider request lifecycle post-payment.
- [x] Definito cost snapshot provider.
- [x] Definita tassonomia errori e retry decision.
- [x] Definiti guardrail per credenziali, PII, raw payload e compliance.
- [x] Definiti gap da chiudere con documentazione ufficiale partner.

## Prossimo sprint

**M5-P Provider Integration Design**: blueprint tecnico di adapter, DTO, entity `ProviderRequest`, code worker, callbacks, polling, normalizzazione e admin review.

