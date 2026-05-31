# 25 — M18-S Implementation Handoff

## Obiettivo M18-S

Implementare il runtime email tecnico cliente/admin:

- modulo backend `EmailNotificationsModule`;
- entity `EmailEvent`, `EmailTemplate`, `EmailDelivery`, `EmailWebhookEvent`, `EmailSuppression`, `EmailSecureLink`;
- adapter provider mock-first;
- registry eventi/template;
- delivery service;
- webhook controller;
- admin monitor `/admin/email`;
- secure PDF link service;
- QA dedicato.

## Priorita' implementazione

1. data model e registry;
2. mock provider;
3. event creation + delivery ledger;
4. template rendering base HTML/text;
5. admin monitor;
6. webhook normalization scaffold;
7. secure PDF link blueprint/runtime scaffold;
8. integration hooks con auth, billing, reports e support;
9. QA statico.

## Eventi minimi da implementare

- `account.email_verification_requested`;
- `auth.password_reset_requested`;
- `auth.password_changed`;
- `auth.remember_me_enabled`;
- `team.invite_sent`;
- `order.created`;
- `payment.succeeded`;
- `payment.failed`;
- `refund.approved`;
- `report.ready`;
- `report.pdf_ready`;
- `invoice.available`;
- `support.ticket_created`.

## Gate M18-S

Lo sprint e' accettabile se:

- nessun controller invia email direttamente senza ledger;
- token/link sono modellati come hash + scadenza;
- delivery status e retry sono tracciati;
- admin puo' vedere errori e retry sicuri;
- PDF e report usano link sicuro first;
- provider reale resta disabilitato finche non validato;
- QA source syntax smoke passa.
