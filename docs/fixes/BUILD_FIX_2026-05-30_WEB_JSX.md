# Build Fix — 2026-05-30 — Web JSX multiline string

## Errore rilevato

Durante `pnpm --filter @clientiaffidabili/web build` il build Next.js falliva su:

```text
./components/partner-portal/DeveloperQuickstart.tsx
Unexpected token `Card`. Expected jsx identifier
```

La causa era una stringa spezzata su più righe dentro:

```tsx
partnerPortalRuntime.docs.headers.join('
')
```

che nel sorgente era stata generata come newline reale dentro apici singoli.

## Fix applicato

Il file `apps/web/components/partner-portal/DeveloperQuickstart.tsx` ora usa:

```tsx
partnerPortalRuntime.docs.headers.join('\n')
```

ed è stato riscritto con JSX più leggibile.

## QA aggiunto

Sono stati aggiunti due controlli:

- `scripts/qa-build-fix-2026-05-30-web-jsx.js`, specifico sul file rotto;
- `scripts/qa-source-syntax-smoke.js`, generico su file `.ts/.tsx/.js/.jsx` per intercettare stringhe single/double quote che attraversano newline, template literal non chiusi e parentesi non bilanciate.

## Regola futura

Prima di rilasciare lo ZIP, eseguire almeno:

```bash
node scripts/qa-source-syntax-smoke.js
node scripts/qa-build-fix-2026-05-30-web-jsx.js
```

In ambiente con dipendenze installate, il gate corretto resta anche:

```bash
pnpm --filter @clientiaffidabili/web build
pnpm --filter @clientiaffidabili/api build
```
