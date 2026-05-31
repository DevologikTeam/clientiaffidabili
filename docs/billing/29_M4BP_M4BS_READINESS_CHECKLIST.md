# 29 — M4B-P / M4B-S readiness checklist

## Pronto per M4B-P quando

- [x] Provider strategy definita.
- [x] Stripe confermato come provider primario.
- [x] PayPal definito come provider secondario feature-flagged.
- [x] Modello subscription/crediti/entitlement analizzato.
- [x] Fee e margini considerati.
- [x] Webhook/reconciliation flow analizzato.
- [x] Admin operations billing analizzato.
- [x] Guardrail no-unlimited definiti.

## Da progettare in M4B-P

- data model definitivo:
  - `PaymentProviderAccount`;
  - `PaymentProviderCustomer`;
  - `SubscriptionPlan`;
  - `CustomerSubscription`;
  - `CreditWallet`;
  - `CreditLedgerEntry`;
  - `EntitlementSnapshot`;
  - `ProviderWebhookEvent` normalizzato.
- adapter contract Stripe/PayPal;
- mapping piani provider esterni <-> piani interni;
- checkout UX per one-shot, credit pack e subscription;
- customer billing area;
- admin reconciliation queue;
- API contracts;
- QA matrix.

## Da sviluppare in M4B-S

- adapter provider multipli;
- Stripe runtime reale/sandbox;
- PayPal adapter sandbox-ready;
- wallet crediti;
- entitlement gate;
- webhook idempotenti;
- admin reconciliation queue;
- aggiornamento dashboard cliente;
- script QA antiregressione.

## Blocchi prima della produzione

- credenziali live Stripe/PayPal configurate in Coolify secrets;
- verifica webhook signature reale;
- test sandbox end-to-end;
- policy rimborsi pubblica;
- informativa subscription/cancellazione;
- IVA/fatturazione elettronica valutata;
- monitoraggio fallimenti webhook;
- backup/restore del ledger testato.
