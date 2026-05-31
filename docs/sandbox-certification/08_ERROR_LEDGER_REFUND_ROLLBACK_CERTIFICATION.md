# Error Ledger, Refund & Rollback Certification

## Error ledger

Ogni errore operativo deve avere:

- categoria;
- severity;
- provider/source;
- entità correlata;
- safe message;
- payload redatto;
- next action;
- owner;
- stato;
- audit.

## Rimborsi

Il test deve coprire:

- rimborso prima della chiamata provider;
- rimborso dopo provider call ma prima del report pubblicato;
- rimborso dopo report pubblicato/scaricato;
- rimborso parziale su crediti residui;
- blocco in caso di dispute aperta.

## Rollback

Il rollback deve documentare:

- release corrente;
- immagine precedente;
- migrazioni eventualmente irreversibili;
- backup database;
- stato provider/payment/email;
- messaggio admin interno.
