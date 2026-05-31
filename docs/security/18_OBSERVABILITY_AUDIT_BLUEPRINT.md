# Observability, Log Redaction & Audit Blueprint

## Obiettivo

Rendere il sistema investigabile senza esporre PII, segreti o raw payload provider.

## Correlation model

Ogni evento rilevante deve avere:

- `requestId`;
- `actorId` se presente;
- `accountId` se applicabile;
- `orderId` / `reportId` / `paymentId` / `providerRequestId` se applicabile;
- `source` (`web`, `api`, `webhook`, `admin`, `worker`);
- timestamp UTC.

## Log redaction

Bloccare nei log:

- authorization header;
- cookie/session token;
- payment secrets;
- provider API key;
- raw provider payload;
- codici fiscali/personali quando non necessari;
- IBAN completo;
- email completa in errori tecnici pubblici.

## Audit events obbligatori

| Evento | Actor | Reason obbligatoria |
|---|---|---|
| login admin fallito ripetuto | system | no |
| price override | admin | si |
| provider retry | operations | si |
| report publish/block | analyst/compliance | si |
| refund approve/reject | billing | si |
| subscription cancel by admin | billing/super_admin | si |
| report download | customer/admin | no, ma audit si |
| data export/delete request | compliance | si |
| secret rotation | super_admin/system | si |

## Metrics minime

- failed login rate;
- 4xx/5xx API;
- webhook failed/duplicated/replayed;
- provider error rate;
- order paid but provider not started;
- report review backlog;
- refund/dispute backlog;
- backup success/failure;
- object auth denials.
