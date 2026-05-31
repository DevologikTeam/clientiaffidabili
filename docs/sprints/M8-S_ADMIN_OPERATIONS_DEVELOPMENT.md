# M8-S — Admin Operations Development

Versione: `0.25.0`  
Tipo sprint: sviluppo  
Modulo: M8 Admin Operations

## Obiettivo

Implementare la prima console operativa interna di ClientiAffidabili.it: una cabina di regia queue-first per governare ordini, pagamenti, provider, report, fatture, rimborsi, supporto e anomalie.

## Esito

Lo sprint completa lo sviluppo MVP della console admin:

- modulo backend `AdminOperationsModule`;
- entità `AdminWorkItem` e `AdminActionAudit`;
- API admin operations;
- runtime UI mock/API-ready;
- pagina `/admin/operations`;
- pagina dettaglio `/admin/operations/[id]`;
- action panel con azioni consentite e bloccate;
- reason modal preview;
- audit timeline redatta;
- QA antiregressione M8-S.

## Guardrail confermati

- nessuna chiamata provider prima del pagamento confermato;
- nessun raw payload nelle liste admin;
- reason obbligatoria per retry provider, pubblicazione report, blocco report, rimborsi e override;
- idempotency key obbligatoria per azioni ripetibili/sensibili;
- RBAC backend, non solo UI;
- audit append-only;
- azioni non sicure disabilitate con motivo operativo.

## Stato

Completato come scaffold funzionale offline. Build reale e test end-to-end browser restano gate successivi.
