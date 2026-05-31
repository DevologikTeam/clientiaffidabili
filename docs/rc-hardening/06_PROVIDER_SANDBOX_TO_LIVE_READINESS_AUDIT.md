# 06 — Provider Sandbox to Live Readiness Audit

## Provider coperti

- Stripe e PayPal per checkout, subscription, wallet, refund e dispute.
- Openapi per report/verifiche e callback.
- OpenAI per copilot interno con approval workflow.
- Email provider per notifiche tecniche e link sicuri.
- PDF/report delivery.

## Stato

M19-S ha introdotto sandbox certification mock-first con scenari, run, evidenze, waiver e error ledger. Questa e' una base corretta, ma non sostituisce provider sandbox reali.

## Gate live

| Provider | Prima del live |
|---|---|
| Stripe | pagamento sandbox, webhook firmato, refund, dispute/errore, ledger e invoice |
| PayPal | checkout sandbox, webhook, cancel, refund e failure |
| Openapi | token, richiesta, mapping, callback, errore credito/timeout, cost ledger |
| OpenAI | budget, redaction, approval, output schema, errore quota/rate limit |
| Email | invio sandbox, bounce/complaint, suppression, secure link, retry |
| PDF | generazione, download, link scaduto, email link e no raw payload |

## Waiver

Un provider puo' essere waived solo se:

- il servizio resta disabilitato;
- il waiver contiene owner, motivo, scadenza e impatto;
- il gate mostra chiaramente che la RC non include quella capacita live.

## Output M21-P

Disegno del provider live readiness gate con mapping scenario -> feature flag -> evidenza -> go/no-go.
