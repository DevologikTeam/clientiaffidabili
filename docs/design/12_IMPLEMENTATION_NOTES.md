# Design System — Implementation Notes v0.4.0

## Decisione

Il design system viene implementato come libreria leggera di componenti React server-compatible, senza dipendenze UI esterne nella prima fase.

Motivo: mantenere controllo totale su stile, accessibilità, copy e leggerezza del prodotto, evitando lock-in prematuro su framework componentistici.

## Convenzioni

- Prefisso classi: `ca-*`.
- Componenti: `apps/web/components/ds`.
- Token CSS: `apps/web/app/globals.css`.
- Showcase interno: `/design-system`.
- Componenti business specifici possono comporre componenti DS, ma non duplicarli.

## Regole di implementazione

1. Prima di creare un nuovo componente, verificare se esiste già un DS component componibile.
2. Le varianti devono essere esplicite tramite prop: `tone`, `variant`, `size`, `state`.
3. I componenti per stati sensibili devono accettare testo visibile.
4. Tabelle e progress devono esporre semantica accessibile.
5. Gli empty state devono proporre una prossima azione, non solo dire che non ci sono dati.

## Debito tecnico accettato

- CSS ancora centralizzato in `globals.css` per velocità iniziale.
- Nessun sistema token generato automaticamente.
- Nessun visual regression test browser reale ancora attivo.
- Nessuna integrazione Storybook; la route `/design-system` funge da showroom MVP.

## Debito tecnico da risolvere più avanti

- Separare CSS del design system in file dedicati.
- Aggiungere Playwright per smoke test visuali delle pagine chiave.
- Aggiungere axe/accessibility automation.
- Introdurre snapshot visivi per hero, card prezzo, form e checkout.
