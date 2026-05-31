# Admin Catalog Implementation — Preview

La preview `/admin/catalog` serve a validare il modello informativo prima del backoffice reale.

## Dati mostrati

- servizio;
- codice;
- stato pubblicazione;
- rischio;
- prezzo netto;
- totale indicativo;
- nota interna margine.

## Da sviluppare nei moduli futuri

- autenticazione e RBAC;
- filtri per stato/rischio/categoria;
- workflow `draft -> review -> published`;
- approvazione override margine;
- audit log completo;
- versioning prezzi;
- sync frontend/backend da sorgente unica.
