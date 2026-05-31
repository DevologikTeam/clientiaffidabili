# 44 — Payment Security Guardrails Implementation

## Guardrail implementati
- Reason obbligatoria su rimborsi e cancellazioni.
- PayPal feature-flagged.
- Mock solo sviluppo.
- Raw payload redatti nelle viste operative.
- Wallet e ledger separati dal provider esterno.
- Nessuna chiamata Openapi/provider dati prima di pagamento confermato o credito prenotato.

## Regression keyword

Guardrail esplicito: no provider call prima di pagamento confermato o credito riservato.
