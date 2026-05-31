# Contact form senior UX review — v0.75.3

## Problema rilevato

Il form contatti precedente era troppo largo, poco leggibile e comunicava ancora logiche interne invece di rassicurare il cliente finale. La pagina non guidava abbastanza l'utente nel descrivere il problema commerciale e non spiegava con chiarezza cosa succede dopo l'invio.

## Principi applicati

- larghezza massima controllata per il form, evitando campi lunghi su desktop;
- layout a due colonne: rassicurazione e processo a sinistra, richiesta guidata a destra;
- form diviso in fieldset leggibili: dati di contatto e scenario da valutare;
- label sempre visibili, hint brevi e placeholder orientati al caso reale;
- CTA unica, chiara e non tecnica;
- messaggi success/error comprensibili e non legati a dettagli implementativi;
- endpoint Next server-side per inviare al backend senza esporre dettagli tecnici al browser.

## Copy cliente-finale

La pagina deve parlare di decisioni concrete: controllare un nuovo cliente, valutare un fornitore, verificare un dato operativo o capire quale servizio scegliere. Sono vietate frasi su provider, admin, payload, debug, email delivery o workflow interni.

## Impaginazione

Il form usa una card massima di 720px, campo messaggio full width, griglia 2 colonne solo dove migliora la lettura e fallback mobile in colonna singola. La colonna informativa chiarisce promessa, tempi e limiti senza appesantire il form.

## Full stack

Il form POST resta progressivo e accessibile: invia a una route Next dedicata che normalizza i dati e inoltra al backend API tramite `INTERNAL_API_URL`, con fallback a `NEXT_PUBLIC_API_URL` in sviluppo.
