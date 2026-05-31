# 21 — Operational Error Ledger Data Model Blueprint

## Obiettivo

Tutti gli errori importanti devono essere tracciabili, analizzabili e collegabili a una decisione operativa: retry, rimborso, fix, ticket, escalation o ignorato con motivo.

## Categorie MVP

- payment;
- refund;
- subscription;
- openapi_provider;
- openai_api;
- email_delivery;
- webhook;
- checkout;
- report_generation;
- partner_api;
- crm_contact;
- cms_publish;
- auth/security.

## Entita' `OperationalErrorEvent`

Campi principali:

- id;
- category;
- severity;
- status;
- sourceModule;
- sourceAction;
- safeMessage;
- technicalSummary;
- redactedPayload;
- providerReference;
- orderId;
- paymentId;
- refundId;
- reportId;
- customerAccountId;
- partnerId;
- buyerIpHash;
- occurredAt;
- resolvedAt;
- ownerId;
- resolutionReason.

## Regole

- Nessun payload raw non redatto.
- Ogni errore critical crea work item admin.
- Errori pagamento/rimborso/provider devono essere collegabili al rimborso.
- Ogni cambio stato richiede audit.
