# M20-P — UX, SEO, Performance & Accessibility Polish Design

## Obiettivo

M20-P trasforma l'audit M20-A in un blueprint operativo per lo sviluppo M20-S. Lo sprint definisce cosa cambiare nelle superfici pubbliche, customer, partner e admin prima della RC: copy, metadata, noindex, navigazione mobile, checkout, listini/tabelle, performance budget, accessibilita e QA.

Durante lo sprint e' stato integrato anche il fix **#32 Docker web build / DataTable columns** segnalato dal log reale: il build `pnpm --filter @clientiaffidabili/web build` falliva perche alcune pagine usavano ancora la forma legacy `columns={['...']}` mentre `DataTable` richiedeva solo oggetti `DataTableColumn<Row>`. Il design sprint include quindi una correzione compatibile e un QA statico dedicato, senza rimandare il blocco al successivo sviluppo.

## Perimetro

- Home, servizi, dettaglio servizi, prezzi, checkout, guide, garanzia operativa, contatti, API pubblica.
- Dashboard cliente, report, fatture, profilo fiscale, supporto e inviti.
- Partner portal, API key, usage, webhook e go-live.
- Admin operations, billing, provider, reports, settings, CRM, analytics, email, OpenAI copilot, sandbox certification.
- Layer globali: `layout.tsx`, `robots.ts`, `sitemap.ts`, `Header`, `DataTable`, `globals.css`, metadata helpers e QA script.

## Decisioni principali

1. Le pagine pubbliche devono usare copy commerciale prudente e comprensibile: niente linguaggio da sprint, blueprint, provider interno, demo o MVP.
2. Le route sensibili devono avere doppia protezione SEO: robots/sitemap e metadata page-level `noindex`.
3. Il menu mobile deve essere accessibile, tastierabile e non deve nascondere link critici.
4. Checkout e prezzi devono spiegare prima cosa si compra, quale dato serve, quali limiti esistono e cosa succede dopo il pagamento.
5. Tabelle e listini devono restare semantici. `DataTable` deve supportare temporaneamente la forma legacy per non rompere build storiche, ma i nuovi componenti dovranno usare colonne oggetto typed.
6. Performance e accessibilita devono avere budget verificabili, non solo raccomandazioni.
7. Nessun provider reale, dato reale, tracking esterno o claim assoluto viene attivato da M20-P.

## Fix #32 incluso

### Problema rilevato

Nel build Docker web il compilatore Next.js si interrompeva su:

```tsx
<DataTable
  columns={['Ordine', 'Stato', 'Provider', 'Importo', 'Prossima azione']}
  rows={billingOperationsSeed.map((item) => [item.order, item.status, item.provider, item.amount, item.nextAction])}
/>
```

`DataTable` accettava solo `DataTableColumn<Row>[]`; alcune superfici precedenti usavano ancora colonne stringa e righe array. Il problema e' emerso in `/admin/billing`, ma lo stesso pattern era presente anche in altri componenti.

### Correzione applicata

- `apps/web/components/ds/DataTable.tsx` ora accetta sia colonne typed sia colonne legacy stringa.
- `caption` e' opzionale, per compatibilita con componenti gia esistenti.
- Le colonne legacy vengono normalizzate internamente con `key`, `label` e `render` sicuro su righe array.
- `apps/web/app/globals.css` sostituisce `align-items:end` con `align-items:flex-end` per rimuovere il warning Autoprefixer segnalato dal build.
- `scripts/qa-m20p-docker-build-fix-32.js` verifica che il fix resti presente e che il warning CSS non ritorni.

## Output M20-P

- Blueprint copy/trust pubblico.
- Blueprint metadata, canonical, robots e noindex.
- Blueprint header mobile, skip link, focus e landmark.
- Blueprint checkout, pricing e table/list pattern.
- Blueprint performance budget, Lighthouse, axe e osservabilita.
- Handoff M20-S con task ordinati P0/P1.
- Registry TypeScript `ux-seo-performance-a11y-design.ts`.
- QA M20-P + QA fix #32.

## QA previsto

- `node scripts/qa-ux-seo-performance-accessibility-design.js`
- `node scripts/qa-m20p-docker-build-fix-32.js`
- `node scripts/qa-ux-seo-performance-accessibility-analysis.js`
- `node scripts/qa-source-syntax-smoke.js`
- `node scripts/security-secret-scan.js`

## Stato

Sprint completato come progettazione con fix build mirato. M20-P non esegue Lighthouse reale, axe reale, Playwright reale, Docker/Coolify reale o provider sandbox reali. Questi gate restano handoff a M20-S/M21, ma il blocco TypeScript `DataTable` segnalato e' stato corretto nel codice.
