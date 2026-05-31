# M10-A — Fiscalita, Fatturazione e Customer Legal Analysis

## Obiettivo sprint

Analizzare il perimetro fiscale, documentale e legale necessario per rendere ClientiAffidabili.it vendibile in modo ordinato, evitando che checkout, rimborsi, abbonamenti, fatture e documenti pubblici nascano scollegati tra loro.

Questo sprint non sostituisce il parere di commercialista, consulente fiscale o legale. Produce una baseline tecnica e prodotto da validare prima del go-live.

## Contesto prodotto

ClientiAffidabili.it vende servizi digitali B2B/B2C legati a verifiche aziendali, report decisionali, KYB, controlli IBAN/contatti e futuri abbonamenti/crediti. La base servizi e marginalita resta collegata al listino Openapi acquisito nella strategia iniziale.

Il sistema ha gia:

- checkout e billing MVP;
- Stripe/PayPal/subscription/refund runtime feature-flagged;
- provider runtime Openapi-first;
- report composer;
- dashboard cliente;
- admin operations;
- security/production gate.

Ora serve definire il livello fiscale e legale che governa tutto il ciclo: **prezzo -> pagamento -> fattura/ricevuta -> report -> rimborso/nota credito -> documentazione legale -> retention**.

## Decisioni di analisi

1. **Fatturazione come processo separato dal pagamento**  
   Il pagamento confermato non coincide automaticamente con fattura emessa. Il sistema deve gestire payment ledger e fiscal document lifecycle separatamente.

2. **Fattura elettronica/SDI come integrazione futura, non MVP fragile**  
   MVP: raccolta dati fiscali, stato fattura, export/admin queue.  
   Fase successiva: integrazione con provider di fatturazione elettronica o gestionale esterno.

3. **Note credito collegate a rimborsi**  
   Ogni rimborso deve valutare lo stato fiscale: fattura non emessa, fattura emessa, report erogato, credito consumato, abbonamento rinnovato, disputa aperta.

4. **Customer legal pack obbligatorio prima del go-live**  
   Termini, privacy, cookie policy, condizioni servizio, policy rimborsi, uso lecito dei dati e disclaimer report devono essere versionati e accettati.

5. **Nessun legal copy assoluto**  
   Evitare promesse tipo “garantiamo affidabilita”, “zero rischio”, “dati completi e sempre aggiornati”. Usare copy prudente: “supporto decisionale”, “fonti disponibili”, “limiti informativi”.

6. **Profilo fiscale cliente prima di fattura**  
   B2B Italia, B2C Italia, UE, extra UE, PA, regime estero e soggetti con codice destinatario/PEC vanno modellati senza forzare subito automazioni fiscali.

## Scope M10-A

Incluso:

- analisi fiscale vendita servizi digitali/report;
- profilo fiscale cliente;
- fatture, note credito, rimborsi e dispute;
- privacy/legal/customer terms;
- consensi e accettazioni;
- modelli dati preliminari;
- admin/legal operations;
- impatto su checkout, subscription e dashboard;
- readiness checklist per M10-P/M10-S.

Escluso:

- generazione reale XML fattura elettronica;
- invio SDI;
- integrazione commercialista/gestionale;
- testi legali definitivi pronti per pubblicazione senza revisione professionale;
- consulenza fiscale definitiva.

## Output prodotti

- `docs/fiscal-legal/01_FISCAL_PRODUCT_STRATEGY.md`
- `docs/fiscal-legal/02_CUSTOMER_TAX_PROFILE_ANALYSIS.md`
- `docs/fiscal-legal/03_INVOICE_CREDIT_NOTE_REFUND_ANALYSIS.md`
- `docs/fiscal-legal/04_SUBSCRIPTIONS_CREDITS_TAX_ANALYSIS.md`
- `docs/fiscal-legal/05_CUSTOMER_LEGAL_PACK_ANALYSIS.md`
- `docs/fiscal-legal/06_CONSENT_ACCEPTANCE_VERSIONING_ANALYSIS.md`
- `docs/fiscal-legal/07_ADMIN_FISCAL_LEGAL_OPERATIONS_ANALYSIS.md`
- `docs/fiscal-legal/08_DATA_MODEL_AND_INTEGRATION_ANALYSIS.md`
- `docs/fiscal-legal/09_M10P_M10S_READINESS_CHECKLIST.md`
- `docs/research/M10A_FISCAL_LEGAL_SOURCE_NOTES.md`
- TypeScript analysis backend/frontend
- QA script dedicato

## Gate di uscita

M10-A e completato quando:

- esiste una separazione chiara tra pagamento e documento fiscale;
- sono definiti gli stati fattura/nota credito/rimborso;
- sono definiti i dati fiscali cliente minimi;
- sono definite le policy legali da versionare;
- sono definite le accettazioni obbligatorie;
- sono definiti i rischi da validare con commercialista e legale;
- QA antiregressione passa.
