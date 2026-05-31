# QA Report — M1-S Design System Implementation

## Scope

Verifica della prima implementazione React/CSS del design system.

## Controlli automatici introdotti

Script: `scripts/qa-design-system.js`

Controlla:

- presenza dei componenti principali;
- presenza dei token/classi CSS minime;
- export centralizzato in `components/ds/index.ts`;
- presenza dei componenti nella route `/design-system`;
- presenza del documento sprint.

## Esito locale

Lo script è progettato per essere eseguito con:

```bash
pnpm qa:design-system
```

oppure:

```bash
node scripts/qa-design-system.js
```

## Test manuali richiesti quando verranno installate dipendenze

1. Avviare `pnpm install`.
2. Avviare `pnpm --filter @clientiaffidabili/web dev`.
3. Aprire `/`, `/servizi`, `/checkout`, `/dashboard`, `/design-system`.
4. Verificare desktop/tablet/mobile.
5. Verificare focus visibile su link e bottoni.
6. Verificare leggibilità stati senza affidarsi al colore.
7. Verificare assenza overflow su card e tabelle.

## Gate antiregressione per sprint futuri

Ogni sprint che tocca UI pubblica o area cliente deve aggiornare, se necessario:

- `/design-system`;
- `docs/design/*`;
- `docs/qa/*`;
- `scripts/qa-design-system.js` se introduce nuovi componenti obbligatori.
