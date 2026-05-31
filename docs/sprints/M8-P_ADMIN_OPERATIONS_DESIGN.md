# M8-P — Admin Operations Design

## Obiettivo sprint

Trasformare l'analisi M8-A in un blueprint operativo pronto per M8-S. La console admin deve guidare il team interno nel lavoro quotidiano senza diventare una superficie tecnica dispersiva.

## Ambito

- Home operations queue-first.
- Work queue unificata.
- Dettaglio work item.
- Pannello azioni sicure.
- Reason modal per azioni critiche.
- Timeline audit.
- RBAC e visibilità per ruolo.
- API contract admin.
- Componenti UI da implementare in M8-S.

## Decisione prodotto

La console admin viene progettata come **control tower operativa**. La prima schermata non deve chiedere all'operatore dove andare, ma deve mostrare cosa è urgente, perché è bloccato, chi deve agire e quale azione è sicura.

## Guardrail confermati

- Nessuna chiamata provider prima del pagamento confermato.
- Nessun raw payload provider nelle liste admin.
- Azioni critiche con motivazione obbligatoria.
- Audit append-only.
- RBAC backend, non solo UI.
- Nessuna modifica diretta a snapshot prezzo/report.
- Report pubblicabile solo se autorizzazione cliente e review sono coerenti.
- Rimborsi e retry provider mai automatici se possono generare costo o rischio.

## Output

- Blueprint esperienza admin.
- Blueprint code e filtri.
- Blueprint dettaglio e azioni.
- Blueprint RBAC.
- Blueprint audit/reason modal.
- API contract.
- Componenti UI.
- Handoff sviluppo M8-S.

## Esito

Sprint completato. M8-S può implementare il primo runtime admin operations senza ridisegnare flussi, stati o componenti.
