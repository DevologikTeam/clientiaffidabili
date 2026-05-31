# 12 — Operational Error Ledger Analysis

## Problema

Pagamenti, rimborsi, provider dati, report, email, OpenAI, partner API e CMS possono fallire in modi diversi. I log tecnici non bastano: serve un ledger business-operativo consultabile da admin per decidere azioni.

## Obiettivo

Creare un registro errori con correlazioni business:

- chi e' impattato;
- quale ordine/report/pagamento e' coinvolto;
- cosa e' successo in modo leggibile;
- se serve retry, rimborso, fix o comunicazione cliente;
- chi ha gestito l'errore e con quale esito.

## Categorie MVP

- `payment`;
- `refund`;
- `subscription`;
- `openapi_provider`;
- `openai_api`;
- `email_delivery`;
- `webhook`;
- `report_generation`;
- `checkout`;
- `auth`;
- `crm_contact`;
- `partner_api`;
- `cms_publish`;
- `settings_change`.

## Severity

- `info`: evento utile ma non bloccante;
- `warning`: possibile degrado;
- `error`: operazione fallita ma recuperabile;
- `critical`: impatto economico, sicurezza, pagamento, dati o reputazione.

## Status workflow

- `new`;
- `triaged`;
- `investigating`;
- `waiting_provider`;
- `fix_pending`;
- `refund_review`;
- `refunded`;
- `resolved`;
- `ignored_with_reason`.

## Collegamenti

Ogni evento puo' collegarsi a:

- account;
- utente;
- ordine;
- checkout session;
- pagamento;
- rimborso;
- subscription;
- provider request;
- report;
- fattura;
- contact message;
- partner;
- API key;
- CMS page.

## Payload

- `safeMessage`: visibile a operations;
- `technicalSummary`: visibile a admin tecnico;
- `redactedPayload`: mai raw;
- `stackHash`: per raggruppare errori ricorrenti;
- `externalReference`: payment intent, webhook id, provider request id, OpenAI request id se disponibile;
- `recommendedAction`: retry, refund_review, contact_customer, fix_config, escalate_provider.

## Operazioni admin

- assegnare owner;
- cambiare stato;
- collegare ticket;
- proporre rimborso;
- segnare fix deploy necessario;
- ignorare con reason;
- chiudere con outcome.

## Anti-pattern vietati

- usare solo console log;
- salvare stack trace con segreti;
- mostrare raw payload in UI;
- chiudere errori critical senza reason;
- rimborsare automaticamente senza check stato report/provider.
