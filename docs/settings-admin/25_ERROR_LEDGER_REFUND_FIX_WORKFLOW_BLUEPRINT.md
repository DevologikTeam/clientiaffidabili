# 25 — Error Ledger Refund/Fix Workflow Blueprint

## Workflow errore pagamento

1. Webhook o checkout genera errore.
2. Ledger registra evento redatto.
3. Se severity critical, crea work item admin.
4. Admin valuta: retry, rimborso, escalation provider, fix tecnico.
5. Se rimborso necessario, collega `refundRequestId`.
6. Alla chiusura, salva reason e outcome.

## Workflow errore Openapi

- Se provider non addebitato: retry sicuro.
- Se provider addebitato ma output assente: review manuale.
- Se report non pubblicabile: blocco report + possibile rimborso.

## Workflow errore OpenAI

- Fail closed per use case critici.
- Nessun contenuto pubblicato automaticamente.
- Ledger con costo stimato/effettivo se disponibile.
- Possibile disattivazione automatica se budget superato.

## Workflow errore email contatto

- Il messaggio resta salvato in inbox.
- Email failed non perde il contenuto.
- Admin puo' rispondere o reinviare.

## Regola di chiusura

Nessun errore `critical` puo' essere chiuso senza:

- owner;
- reason;
- outcome;
- link a refund/fix/ticket se pertinente.
