# Admin Fiscal & Legal Operations Blueprint

## Route admin

- `/admin/fiscal-legal`
- `/admin/fiscal-legal/documents`
- `/admin/fiscal-legal/refunds`
- `/admin/fiscal-legal/legal-pack`
- `/admin/fiscal-legal/privacy-requests`

## Code operative

| Coda | Descrizione | Owner |
|---|---|---|
| Documenti da preparare | Pagamenti confermati senza documento fiscale completato | Billing |
| Dati fiscali da verificare | Profili PA/estero/incompleti/mismatch | Billing |
| Note credito da valutare | Rimborsi con fattura gia emessa | Billing |
| Rimborsi bloccati fiscalmente | Refund che richiedono review | Billing + Operations |
| Legal pack review | Documenti legali in bozza/approvazione | Compliance/Legal |
| Riaccettazioni richieste | Utenti che devono accettare nuove versioni | Support |
| Privacy requests | Accesso/rettifica/cancellazione/export | Compliance |

## Detail work item

Sezioni:

- Riepilogo cliente e ordine.
- Snapshot pagamento.
- Snapshot profilo fiscale.
- Documento fiscale collegato.
- Stato rimborso/nota credito.
- Accettazioni legali.
- Audit timeline.
- Azioni disponibili/bloccate.

## Azioni sensibili

Richiedono reason obbligatoria:

- segnare documento come emesso;
- allegare documento fiscale;
- richiedere correzione dati al cliente;
- approvare rimborso con nota credito;
- rifiutare rimborso;
- pubblicare documento legale;
- archiviare documento legale;
- forzare riaccettazione.

## RBAC

| Ruolo | Permessi |
|---|---|
| `billing` | gestisce documenti, note credito, rimborsi fiscali |
| `support` | vede stati cliente, apre ticket, non emette documenti |
| `compliance` | gestisce legal pack, privacy request, disclaimer |
| `operations` | vede ordini/report ma non modifica fiscalita |
| `super_admin` | override con reason obbligatoria |

## Guardrail admin

- Raw payment/provider payload redatto.
- Azioni irreversibili con conferma.
- Export documenti solo per ruoli autorizzati.
- Audit append-only.
- Nessuna modifica silenziosa di snapshot fiscale.
