# M6-A QA report

Sprint: **M6-A Report Composer Analysis**  
Versione: **0.17.0**

## QA scope

Questo QA verifica che l'analisi report composer sia coerente con i guardrail già definiti:

- pagamento prima di provider/report;
- raw payload non esposto;
- report con fonti e limiti;
- no claim assoluti;
- review manuale per casi ambigui;
- snapshot immutabile;
- audit log per eventi sensibili.

## Controlli eseguiti

- Presenza documenti sprint/report.
- Presenza analisi data model.
- Presenza evidence/source model.
- Presenza scoring prudente.
- Presenza copy vietato/consentito.
- Presenza admin review analysis.
- Presenza export/download analysis.
- Presenza checklist M6-P/M6-S.
- Presenza script QA.

## Esito

**Passed**.

## Note

Non sono state implementate chiamate reali, generazione PDF o scoring runtime: M6-A è sprint di analisi. Queste attività sono demandate a M6-P/M6-S.
