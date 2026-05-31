# Rimborsi e note credito

M10-S collega la gestione fiscale ai rimborsi gia introdotti nel billing.

## Regola MVP

Se una fattura e' gia stata emessa e il rimborso viene approvato, la coda fiscal/legal deve produrre o richiedere una nota credito prima della chiusura amministrativa.

## Stati rilevanti

- `credit_note_required`
- `requires_review`
- `ready_to_issue`
- `issued`

## Prossimi step

- Collegamento automatico `RefundRequest` -> `FiscalDocument` nota credito.
- Calcolo residuo rimborsabile su wallet crediti.
- Export CSV per commercialista.
