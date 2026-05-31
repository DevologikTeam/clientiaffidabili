# 41 — Refund Runtime Implementation

`RefundService` applica `evaluateRefundPolicy` prima di inviare un rimborso al provider. Il rimborso puo' essere automatico solo quando la policy restituisce `eligible`; negli altri casi va in `policy_review` o `rejected`.

## Blocchi principali
- Dispute aperta: blocco.
- Importo superiore al massimo rimborsabile: blocco.
- Report pubblicato o scaricato: review/blocco.
- Costi provider sostenuti: review manuale.
