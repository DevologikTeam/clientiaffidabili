# Report Export & PDF Blueprint

## Obiettivo futuro

Preparare il report web a una futura generazione PDF coerente, senza introdurre nello sprint M6-P la dipendenza runtime per PDF.

## Requisiti PDF futuri

- Layout A4 leggibile.
- Header con logo ClientiAffidabili.it.
- ID report e data generazione.
- Soggetto verificato.
- Livello attenzione e sintesi.
- Evidenze principali.
- Fonti e limiti.
- Disclaimer.
- Footer con versione template e hash snapshot.

## Regole export

- PDF generato solo da report `ready`.
- Ogni download produce audit log.
- Link download temporanei.
- Nessuna esposizione raw payload.
- PDF rigenerato solo da snapshot, non da provider live.

## Stato MVP

In M6-S si potrà implementare:

- pagina web report completa;
- endpoint download placeholder;
- data model già compatibile con PDF;
- `pdfReadySections` nel template.

La generazione PDF reale può essere uno sprint successivo dedicato.
