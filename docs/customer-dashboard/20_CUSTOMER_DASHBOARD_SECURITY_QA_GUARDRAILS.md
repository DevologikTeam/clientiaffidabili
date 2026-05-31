# Customer Dashboard — Security, QA & Guardrail

## Guardrail customer-facing

- Il cliente vede solo DTO normalizzati.
- Nessun payload provider grezzo in UI.
- Nessun dato carta in dashboard.
- Nessuna promessa assoluta di affidabilità o pagamento.
- Apertura report e futuro download PDF devono essere auditabili.
- Le fatture sono separate dai pagamenti.
- Subscription e crediti non sono dichiarati attivi finché non implementati.

## QA antiregressione

Lo script `qa-customer-dashboard-development.js` verifica:

- presenza componenti customer dashboard;
- presenza route MVP;
- presenza modulo backend;
- presenza endpoint principali;
- assenza di termini tecnici vietati nella UI customer;
- presenza documentazione sprint e QA.

## Gate produzione futuri

- Autenticazione reale.
- Scope organization/user da sessione.
- RBAC customer.
- Audit apertura report.
- Audit download report.
- E2E browser reale post-payment.
