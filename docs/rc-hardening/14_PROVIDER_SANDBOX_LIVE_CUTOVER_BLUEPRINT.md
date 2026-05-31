# 14 — Provider Sandbox & Live Cutover Blueprint

## Obiettivo

Portare Stripe, PayPal, Openapi, OpenAI, email/PDF da runtime mock-first a certificazione sandbox reale e definire il passaggio controllato al live.

## Provider coperti

- Stripe checkout, subscription, refund, dispute, webhook idempotente.
- PayPal order/subscription, capture, refund, webhook.
- Openapi/listino/report: richiesta, stato, errore, documento.
- OpenAI assisted operations: prompt sicuro, rate limit, fallback, error ledger.
- Email/PDF: invio sandbox, bounce/complaint, secure PDF link.

## Stati cutover

1. `mock_only` — non candidato live.
2. `sandbox_ready` — credenziali sandbox configurabili.
3. `sandbox_passed` — scenari passati con evidenze.
4. `live_ready_feature_off` — live configurato ma flag off.
5. `live_enabled_limited` — abilitato per perimetro controllato.
6. `live_blocked` — errore o rischio aperto.

## Waiver

Un provider puo essere `waived_with_feature_off` solo se:

- la feature non e' promessa nel perimetro RC;
- il flag e' off in produzione;
- la UI non guida l'utente verso una funzione non disponibile;
- esiste nota in evidence bundle;
- esiste owner per sblocco futuro.

## Evidenze

- Run sandbox M19-S reale o export equivalente.
- Error ledger filtrato per provider.
- Webhook replay/idempotency log.
- Refund/rollback/dispute log per pagamenti.
- Secure link email/PDF log.

## Uscita gate

`rc-provider-sandbox-certification` passa solo con sandbox reale passata o waiver feature-off per ogni provider non incluso nella RC.
