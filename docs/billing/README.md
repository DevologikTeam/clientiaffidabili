# Billing & Checkout

Questa cartella raccoglie analisi, progettazione e implementazione del modulo checkout/billing.

## Release coperte

- `0.11.0` — M4-A Checkout & Billing Analysis
- `0.12.0` — M4-P Checkout & Billing Design
- `0.13.0` — M4-S Checkout & Billing Development

## Principi fissi

- Hosted checkout first.
- Nessun dato carta salvato.
- Provider dati chiamato solo dopo pagamento confermato.
- Webhook firmati e idempotenti.
- Ledger append-only.
- Fatturazione separata dal pagamento.
