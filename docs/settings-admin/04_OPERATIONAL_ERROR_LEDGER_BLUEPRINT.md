# 04 — Operational Error Ledger Blueprint

## Obiettivo

Tutti gli errori rilevanti devono essere tracciabili, analizzabili e collegabili ad azioni operative come fix, retry, rimborso, escalation o comunicazione cliente.

## Error categories

- `payment`
- `refund`
- `subscription`
- `openapi_provider`
- `openai_api`
- `email_delivery`
- `webhook`
- `report_generation`
- `checkout`
- `auth`
- `crm_contact`
- `partner_api`
- `cms_publish`

## Campi `OperationalErrorEvent`

- `id`
- `category`
- `severity`: info, warning, error, critical
- `status`: new, investigating, waiting_provider, fix_pending, refunded, resolved, ignored
- `sourceModule`
- `sourceAction`
- `accountId?`
- `orderId?`
- `paymentId?`
- `refundId?`
- `providerRequestId?`
- `reportId?`
- `contactMessageId?`
- `externalReference?`
- `safeMessage`
- `technicalSummary`
- `redactedPayload`
- `stackHash?`
- `ownerUserId?`
- `resolutionReason?`
- `createdAt`
- `resolvedAt?`

## Refund/fix workflow

Un errore pagamento/provider/report può generare:

- retry tecnico;
- ticket supporto;
- blocco report;
- proposta rimborso;
- rimborso manuale;
- fix codice/configurazione;
- escalation provider.

## Guardrail

- raw payload mai visibile nelle viste base;
- dati carta mai salvati;
- segreti redatti;
- stack trace solo in pannello tecnico interno;
- reason obbligatoria per chiusura/rimborso/ignore.
