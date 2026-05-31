# Admin Operations — Implementation Notes

La console admin è stata implementata come superficie interna queue-first. L'obiettivo non è mostrare tabelle tecniche, ma dare agli operatori una risposta immediata a:

1. cosa è bloccato;
2. perché è bloccato;
3. quale impatto ha sul cliente o sul margine;
4. chi deve agire;
5. quale azione è sicura adesso.

## Runtime backend

Il modulo `AdminOperationsModule` espone:

- summary operativo;
- lista work item;
- dettaglio work item;
- esecuzione azione con reason/idempotency;
- audit timeline.

In assenza di dati reali restituisce item demo controllati, utili per lo sviluppo UI senza simulare dati di produzione.

## Runtime frontend

Il frontend usa `admin-operations-runtime.ts` come sorgente locale temporanea API-ready. Quando il backend sarà collegato via fetch protetto, i componenti resteranno riutilizzabili.

## Decisione UX

La console non espone raw payload, endpoint tecnici o oggetti database. Mostra snapshot redatti e azioni operative.
