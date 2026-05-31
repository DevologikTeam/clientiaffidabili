# M4-P — Checkout & Billing Design

Versione pacchetto: `0.12.0`  
Tipo sprint: **Progettazione**  
Modulo: **M4 Checkout & Billing**

## Obiettivo

Trasformare l'analisi M4-A in un blueprint esecutivo per lo sviluppo M4-S: flusso checkout, contratti API, data model, webhook, fatturazione, ledger, admin operations, email transazionali e QA antiregressione.

Il checkout deve restare semplice per il cliente e rigoroso lato piattaforma: il cliente vede prezzo, dati richiesti, uso lecito, pagamento e stato ordine; il backend conserva snapshot, ledger, audit, idempotenza e blocchi provider.

## Decisione di progetto

Per l'MVP si conferma **Stripe Checkout hosted first**, tramite adapter `PaymentProviderAdapter`. La piattaforma non salva carte, non esegue provider dati prima del pagamento confermato e non promette affidabilità assoluta.

La progettazione resta provider-agnostic per poter aggiungere in futuro Nexi, Mollie, PayPal o bonifico assistito senza riscrivere ordini, fatture e ledger.

## Scope incluso

- esperienza checkout pubblica e autenticata;
- stati ordine, sessione checkout, pagamento, fattura e rimborso;
- data model `Payment`, `PaymentLedgerEntry`, `BillingProfile`, `Invoice`, `PaymentWebhookEvent`;
- API contract checkout/billing;
- webhook idempotenti e firmati;
- workflow fatturazione;
- coda admin pagamenti/anomalie/rimborsi;
- email transazionali minime;
- copy UX e microcopy per errori/blocchi;
- QA antiregressione.

## Scope escluso da M4-P

- implementazione SDK Stripe reale;
- fiscalità definitiva e invio SDI reale;
- gestione subscription completa;
- bonifico manuale operativo;
- integrazione provider dati Openapi oltre il blocco pre-pagamento.

## Output creati

- `docs/billing/09_CHECKOUT_EXPERIENCE_BLUEPRINT.md`
- `docs/billing/10_PAYMENT_DATA_MODEL_BLUEPRINT.md`
- `docs/billing/11_CHECKOUT_API_CONTRACTS.md`
- `docs/billing/12_WEBHOOK_AND_IDEMPOTENCY_BLUEPRINT.md`
- `docs/billing/13_BILLING_PROFILE_INVOICE_BLUEPRINT.md`
- `docs/billing/14_ADMIN_BILLING_OPERATIONS_BLUEPRINT.md`
- `docs/billing/15_TRANSACTIONAL_EMAIL_COPY.md`
- `docs/billing/16_CHECKOUT_UI_COPY_AND_COMPONENTS.md`
- `apps/web/lib/billing/checkout-design.ts`
- `docs/qa/M4-P_QA_REPORT.md`
- `scripts/qa-checkout-billing-design.js`

## Gate per M4-S

- [x] flusso checkout disegnato end-to-end;
- [x] data model billing disegnato;
- [x] API contract definiti;
- [x] webhook/idempotenza definiti;
- [x] admin operations definite;
- [x] email transazionali definite;
- [x] QA antiregressione disegnato.

## Guardrail confermati

1. Nessuna chiamata a Openapi/provider dati prima di pagamento confermato.
2. Nessun dato carta salvato nel database.
3. Webhook firmati e idempotenti.
4. Snapshot prezzo immutabile nell'ordine.
5. Conferma uso lecito obbligatoria.
6. Report e checkout non promettono incasso, solvibilità o assenza rischio.
7. Rimborsi automatici consentiti solo se il provider dati non è stato ancora eseguito.
8. Ogni cambio stato sensibile genera audit log.
