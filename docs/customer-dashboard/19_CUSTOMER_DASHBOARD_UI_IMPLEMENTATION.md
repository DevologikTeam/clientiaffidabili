# Customer Dashboard — UI Implementation

## Principi UI

- Prima informazione: stato operativo.
- Seconda informazione: prossima azione.
- Terza informazione: storico e supporto.

## Copy

La UI usa parole operative:

- Report pronto
- Verifica in corso
- Controllo interno
- Documento in preparazione
- Apri richiesta supporto

Sono esclusi termini interni come payload grezzo, callback, coda tecnica, retry provider, idempotenza e vault.

## Responsive

Le griglie dashboard passano a colonna singola sotto `900px`. Timeline, notifiche e supporto restano leggibili su mobile.

## Stati disabilitati

Il download PDF è visibile come funzione prevista ma disabilitata fino allo sprint export/report PDF.
