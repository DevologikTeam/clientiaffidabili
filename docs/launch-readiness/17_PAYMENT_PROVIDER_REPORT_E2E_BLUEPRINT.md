# 17 — Payment, Provider and Report E2E Blueprint

## Obiettivo
Validare il percorso economicamente sensibile: pagamento → credito/provider → report → accesso/download → eventuale rimborso.

## Scenario happy path
1. Cliente seleziona `Check Affidabilita Pro`.
2. Checkout crea price snapshot.
3. Cliente accetta uso lecito e legal pack.
4. Pagamento sandbox/mock confermato.
5. Ordine passa a `paid`.
6. Provider request parte una sola volta.
7. Cost ledger registra costo stimato/effettivo.
8. Report composer genera snapshot.
9. Admin pubblica report con reason.
10. Cliente vede report.
11. Accesso report viene auditato.

## Scenario rimborso
- Se provider non chiamato: rimborso possibile.
- Se provider chiamato e report non pubblicato: review manuale.
- Se report pubblicato/scaricato: blocco o override auditato.
- Se dispute aperta: blocco rimborso manuale per evitare doppio rimborso.

## Scenario subscription/credit wallet
1. Cliente acquista piano/crediti.
2. Payment confirmed.
3. Wallet incrementato.
4. Check riserva credito prima del provider.
5. Provider fallito safe: credito rilasciato se non consumato.
6. Ledger immutabile registra ogni movimento.

## Scenario sicurezza
- Replay webhook non deve duplicare pagamenti/crediti/report.
- Provider retry non deve duplicare costo se request gia' completed.
- Idempotency key assente deve bloccare API partner costose.
