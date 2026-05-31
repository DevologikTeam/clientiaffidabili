# Fiscal & Legal Experience Blueprint

## Principio di esperienza

La fiscalita non deve sembrare un modulo tecnico. Per il cliente deve essere una sezione semplice: dati di fatturazione, documenti disponibili, condizioni accettate e richieste in lavorazione.

Per l'operatore interno deve essere una coda chiara: cosa emettere, cosa correggere, cosa rimborsare, cosa bloccare, cosa richiede controllo professionale.

## Superfici utente

| Superficie | Scopo | Stato MVP |
|---|---|---|
| `/checkout` | Raccogliere dati fiscali minimi e accettazioni obbligatorie | Attiva |
| `/dashboard/profilo-fiscale` | Gestire profilo fiscale e indirizzi | Da implementare M10-S |
| `/dashboard/documenti-fiscali` | Vedere documenti e stato emissione | Da implementare M10-S |
| `/dashboard/consensi` | Vedere condizioni accettate e versioni | Da implementare M10-S |
| `/legal/termini` | Termini di servizio | Da implementare M10-S come template revisionabile |
| `/legal/privacy` | Informativa privacy | Da implementare come template revisionabile |
| `/legal/cookie` | Cookie policy e preferenze | Da implementare come template revisionabile |
| `/legal/rimborsi` | Policy rimborsi | Da implementare come template revisionabile |
| `/legal/uso-accettabile` | Regole uso lecito | Da implementare come template revisionabile |
| `/legal/disclaimer-report` | Limiti dei report | Da implementare come template revisionabile |
| `/admin/fiscal-legal` | Coda interna fiscale/legal | Da implementare M10-S |

## Stati cliente leggibili

Non mostrare termini come `requires_review`, `sdI_pending`, `manual_queue`. Usare label operative:

| Stato interno | Stato cliente |
|---|---|
| `queued` | Documento in preparazione |
| `requires_review` | Verifica amministrativa in corso |
| `issued` | Documento disponibile |
| `failed` | Serve una correzione dei dati |
| `credit_note_required` | Rettifica amministrativa in preparazione |
| `legal_blocked` | Condizioni da aggiornare |

## Prima decisione della pagina cliente

Ogni pagina deve rispondere subito a una domanda:

- Profilo fiscale: “I dati sono completi per ricevere i documenti?”
- Documenti fiscali: “Quali documenti sono disponibili o in preparazione?”
- Consensi: “Quali condizioni ho accettato e quando?”

## Guardrail UX

- Non promettere tempi fiscali automatici se serve revisione manuale.
- Non mostrare raw payment/provider payload.
- Non mostrare riferimenti a SDI se il processo non e attivo.
- Non usare copy come “fattura emessa automaticamente” nel MVP.
- Mostrare sempre prossima azione, motivo e impatto.
