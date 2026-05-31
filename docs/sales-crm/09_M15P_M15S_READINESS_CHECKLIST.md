# 09 — M15-P/M15-S Readiness Checklist

## Pronto per M15-P quando

- [x] Sono definiti touchpoint lead.
- [x] Sono definiti form MVP.
- [x] Sono definiti stati lead/opportunità/ticket.
- [x] Sono definiti ruoli interni e visibilità dati.
- [x] Sono definiti guardrail privacy/anti-abuse.
- [x] Sono definiti oggetti dati candidati.
- [x] Sono definiti collegamenti con dashboard, billing, report, partner e admin operations.

## Da progettare in M15-P

- schermate admin CRM;
- form pubblici e customer support;
- data model definitivo;
- API contract;
- componenti UI;
- reason modal e audit;
- template email;
- privacy/consent copy;
- handoff con Admin Operations;
- handoff checkout/proposta.

## Da sviluppare in M15-S

- `SalesCrmModule` NestJS;
- entità `Lead`, `Contact`, `SalesOpportunity`, `SupportTicket`, `CrmActivity`;
- controller customer/public/admin;
- form contatto/demo/partner/support;
- console admin CRM;
- ticket queue;
- lead detail;
- opportunity list;
- template risposta base;
- QA antiregressione.

## Blocchi da non superare senza validazione

- email outbound reali;
- marketing newsletter;
- WhatsApp/SMS;
- allegati ticket;
- sconti automatici;
- enrichment automatico;
- cancellazione/anonymization dati senza policy definitiva.
