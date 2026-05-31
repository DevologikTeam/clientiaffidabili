# 07 — Public Copy & Trust Blueprint

## Scopo

Rendere il sito pubblico credibile per un cliente finale, senza esporre termini interni, dettagli da implementazione o promesse assolute. Il copy deve spiegare cosa fa ClientiAffidabili.it: supporta decisioni commerciali con dati, limiti chiari, pagamenti tracciati e report consultabili.

## Regole copy P0

| Contesto | Evitare | Sostituire con |
|---|---|---|
| Home e hero | MVP, demo, blueprint, foundation | servizio in lancio, piattaforma, percorso operativo |
| Prezzi | margine protetto, scenario interno | prezzo finale, cosa include, tempi indicativi |
| Checkout | provider, webhook, payload, mapping | verifica, pagamento, generazione report, aggiornamento stato |
| Guide | CMS editoriale, seed, runtime | guida, contenuto informativo, aggiornamento periodico |
| API pubblica | go-live tecnico non spiegato | integrazione partner, ambiente di test, attivazione controllata |
| Dashboard pubblica/link | dashboard demo | area cliente o accesso riservato, solo se autenticato |

## Pattern raccomandati

### Hero pubblico

- Titolo: problema + beneficio operativo.
- Sottotitolo: cosa viene analizzato e quali limiti restano.
- CTA primaria: avvia verifica o consulta servizi.
- CTA secondaria: scopri limiti e garanzia operativa.
- Trust row: pagamenti tracciati, report archiviabili, nessun dato carta salvato, fonti e limiti visibili.

### Pagine servizio

Ogni pagina servizio deve mostrare:

1. cosa verifica;
2. quali dati servono;
3. cosa riceve il cliente;
4. tempi indicativi;
5. prezzo prima del checkout;
6. limiti e uso lecito;
7. CTA coerente con il servizio.

### Prezzi

La pagina prezzi deve distinguere:

- servizi acquistabili subito;
- servizi assistiti o non ancora acquistabili;
- bundle o percorsi consigliati;
- tempi, output e condizioni.

## Claim guardrails

Sono vietati claim come:

- rischio zero;
- pagamento garantito;
- solvibilita garantita;
- risultato certo;
- controllo infallibile;
- copertura totale.

Sono ammessi claim prudenti:

- aiuta a valutare;
- riduce incertezza operativa;
- rende visibili fonti e limiti;
- supporta decisioni documentate;
- non sostituisce consulenza legale o decisione commerciale interna.

## M20-S acceptance criteria

- Le route pubbliche P0 non contengono termini interni vietati.
- Ogni CTA pubblica ha label specifica e non generica.
- Ogni servizio mostra prezzo/tempi/limiti prima del checkout.
- Garanzia operativa e limiti sono raggiungibili da home, prezzi, checkout e dettaglio servizio.
