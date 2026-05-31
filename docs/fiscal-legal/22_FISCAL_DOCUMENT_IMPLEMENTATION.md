# Implementazione documenti fiscali

`FiscalDocument` gestisce fatture, ricevute, note credito, proforma e rettifiche manuali.

## Lifecycle

- `draft`
- `queued`
- `requires_review`
- `ready_to_issue`
- `issued`
- `delivered`
- `credit_note_required`
- `adjusted`
- `failed`
- `cancelled`

## Regole

- Il documento conserva sempre lo snapshot fiscale.
- Gli importi sono salvati in centesimi.
- `documentHash` protegge l'integrita dello snapshot.
- L'emissione reale resta manual-assisted fino alla validazione fiscale.
