# 15 — M15-S Implementation Handoff

## Da sviluppare nel prossimo sprint M15-S

- `SalesCrmModule` NestJS.
- Entità `ContactMessage`, `Lead`, `SalesOpportunity`, `SupportTicket`, `CrmActivity`.
- Public contact/demo/partner endpoints.
- Customer support endpoints.
- Admin CRM inbox e ticket queue.
- Persistenza messaggio prima dell'email.
- Collegamento error ledger quando email/pagamenti/provider/OpenAI falliscono.
- UI admin CRM.
- Form pubblici collegati alla inbox.
- QA antiregressione CRM.

## Da non sviluppare ancora

- Marketing automation complessa.
- Newsletter massiva.
- WhatsApp/SMS.
- Arricchimenti automatici.
- Sconti automatici.
- Rimborsi automatici dal ticket senza policy billing.

## Dipendenze trasversali

Il modulo M15-S può usare settings e error ledger come interfacce provvisorie, ma il runtime completo settings/error ledger sarà consolidato nel modulo M15B.
