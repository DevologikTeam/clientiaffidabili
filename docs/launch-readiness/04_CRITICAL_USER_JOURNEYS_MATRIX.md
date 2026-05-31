# 04 — Critical User Journeys Matrix

| Journey | Priorita' | Attore | Precondizione | Esito atteso | Blocco go-live se fallisce |
|---|---:|---|---|---|---|
| Acquisto report azienda | P0 | Cliente | servizio pubblicato | pagamento confermato e ordine creato | Si |
| Provider call post-payment | P0 | Sistema | pagamento paid | una sola provider request idempotente | Si |
| Report pubblicato | P0 | Admin/Sistema | provider completed | report snapshot visibile al cliente giusto | Si |
| Cross-account report access | P0 | Attaccante logico | altro account | 403/404 senza leak | Si |
| Rimborso prima provider call | P0 | Billing admin | provider non chiamato | refund + ledger coerente | Si |
| Rimborso dopo report pubblicato | P1 | Billing admin | report scaricato | blocco o manual review | Si |
| Subscription renewal | P1 | Cliente | piano attivo | crediti/entitlement aggiornati | Si per go-live subscription |
| Partner sandbox API | P1 | Partner | API key sandbox | risposta sandbox + usage ledger | No se portale partner non pubblico |
| Live API partner | P0 | Partner | approvazione live | blocco se non approvato | Si |
| Legal acceptance checkout | P0 | Cliente | checkout | versioni legal salvate | Si |
| Fattura manual-assisted | P1 | Billing admin | pagamento paid | documento fiscale pending/issued coerente | Si |
| Admin reason action | P0 | Admin | action sensibile | reason obbligatoria + audit | Si |
| Backup restore staging | P0 | Ops | backup disponibile | restore verificato | Si |
| Coolify redeploy | P0 | Ops | immagine pronta | app torna healthy | Si |

## Regola
Ogni journey P0 deve avere almeno:

- test E2E o integration test;
- seed dati dedicato;
- criterio pass/fail oggettivo;
- owner di correzione;
- evidenza salvata nel report QA.
