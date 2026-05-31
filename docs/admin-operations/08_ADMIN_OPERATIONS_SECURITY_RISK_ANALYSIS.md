# Admin Operations — Security and risk analysis

## Rischi principali

1. Pubblicazione report a cliente non autorizzato.
2. Rimborso non autorizzato.
3. Retry provider non idempotente con costo doppio.
4. Accesso eccessivo a dati sensibili.
5. Esposizione raw payload.
6. Override prezzo/margine senza controllo.
7. Modifica manuale stato ordine senza audit.
8. Ticket supporto con dati personali non necessari.

## Mitigazioni

- RBAC backend obbligatorio.
- Audit append-only.
- Reason obbligatoria su azioni ad alto rischio.
- Idempotenza provider e pagamento.
- Raw payload vault separato.
- UI con azioni consentite e bloccate spiegate.
- Alert per anomalie critiche.
- Separazione customer-facing/admin-facing copy.

## Azioni sempre bloccate nel MVP

- Eliminazione audit.
- Modifica diretta di snapshot prezzo/report.
- Provider call prima del pagamento confermato.
- Pubblicazione report senza controllo autorizzazione cliente.
- Rimborso automatico dopo provider call completata senza review.
- Accesso raw payload da support_agent.

## QA security admin

Ogni sprint admin deve verificare:

- nessuna rotta admin esposta come customer route;
- nessun dato sensibile in liste aggregate;
- azioni critiche con conferma e reason;
- audit event generato;
- errore gestito con messaggio operativo, non stack trace.
