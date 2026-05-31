# Admin Operations — QA & Guardrail

## QA antiregressione M8-S

Lo script `qa-admin-operations-development.js` verifica:

- presenza modulo backend;
- presenza entità work item e audit;
- presenza controller/service;
- presenza route frontend;
- presenza componenti UI;
- reason obbligatoria;
- idempotency key;
- audit append-only;
- raw payload bloccato;
- versione pacchetto `0.25.0`;
- script release check aggiornato.

## Blocchi release futuri

Una release production-ready dovrà bloccare se:

- endpoint admin non protetti;
- azioni sensibili senza reason;
- retry provider senza idempotency;
- raw payload visibile in UI;
- rimborso possibile dopo costo provider senza review;
- publish report senza review/audit.
