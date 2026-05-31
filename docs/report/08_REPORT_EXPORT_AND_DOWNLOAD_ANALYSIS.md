# Report export and download analysis

## MVP

Nel MVP lo stato `ready` deve rendere disponibile:

- pagina web report;
- report snapshot consultabile;
- preparazione tecnica per export PDF.

L'export PDF definitivo può essere sviluppato in M6-S o in uno sprint successivo, ma M6-P deve disegnare template e vincoli.

## PDF strategy

Il PDF deve essere generato da snapshot, non da dati live.

Opzioni future:

- HTML-to-PDF server-side;
- Playwright/Puppeteer print;
- servizio esterno HTML in PDF;
- storage privato con signed URL temporaneo.

## Download guardrail

- Download solo utente autorizzato.
- Link firmato e temporaneo.
- Nessun path storage pubblico indovinabile.
- Audit log download.
- Watermark opzionale con report id e data.

## Layout PDF

- Cover.
- Executive summary.
- Segnali.
- Dettaglio evidenze.
- Fonti e limiti.
- Footer legale.

## Accessibilità

Il report web resta fonte primaria accessibile. Il PDF deve essere utile, ma non deve sostituire completamente la fruizione web.

## Email report ready

Email consigliata:

> Il report richiesto è pronto. Accedi alla tua area riservata per consultarlo e scaricarlo. Ricorda che il report fotografa i dati disponibili alla data della richiesta.
