# Approval, Audit & Error Ledger Analysis

## Workflow approvazione

1. Admin richiede suggerimento.
2. Backend valida use case e settings.
3. Redaction input.
4. Chiamata OpenAI.
5. Output salvato come draft.
6. Output passa guardrail automatici.
7. Admin puo' approvare, modificare, rigenerare o scartare.
8. Ogni azione viene auditata.

## Audit events

- `ai.generate.requested`;
- `ai.generate.completed`;
- `ai.generate.failed`;
- `ai.output.approved`;
- `ai.output.edited`;
- `ai.output.discarded`;
- `ai.output.published`;
- `ai.safety.blocked`;
- `ai.budget.blocked`;
- `ai.settings.updated`.

## Error ledger

Errori da tracciare:

- API key mancante;
- provider disabled;
- budget exceeded;
- rate limit;
- timeout;
- invalid output schema;
- forbidden claim detected;
- redaction failed;
- safety blocked;
- provider unavailable.

## Collegamenti operativi

Un errore AI deve poter aprire:

- ticket interno;
- action item admin;
- escalation tecnica;
- fix prompt;
- retry manuale;
- disabilitazione temporanea use case.

## Regola

L'errore AI non deve bloccare workflow critici: deve degradare in modo sicuro, mostrando messaggio operativo e permettendo azione manuale.
