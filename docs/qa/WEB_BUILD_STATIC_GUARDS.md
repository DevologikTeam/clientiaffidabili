# Web build static guards

Questo gate nasce dal blocco Docker/Next intercettato su `pnpm --filter @clientiaffidabili/web build`, dove TypeScript ha fermato la build per prop JSX non coerenti con i contratti dei componenti design system.

## Errori coperti

- `StatCard value`: il componente deve accettare valori renderizzabili (`ReactNode`), inclusi numeri, stringhe e contenuti JSX. Questo evita il ritorno dell'errore `Type 'number' is not assignable to type 'string'` quando una pagina passa conteggi come `providerRuntimeDemoQueue.length`.
- `StatCard helper`: il componente mantiene `helper` come alias retrocompatibile di `description`, così le pagine legacy non rompono il typecheck.
- `DataTable columns`: il componente mantiene la compatibilità con colonne legacy `string[]`, oltre alle colonne typed, per evitare l'errore già visto su `columns={['Ordine', ...]}`.
- CSS `end`: il gate blocca `align-items:end`, `justify-content:end` e varianti simili perché generano warning Autoprefixer in Docker; va usato `flex-end`.
- `apps/web/tsconfig.json`: il plugin Next deve essere committato (`{ "name": "next" }`) per evitare che `next build` modifichi il file durante la build Docker.

- `Stepper steps/currentStep`: il componente deve accettare anche la forma legacy usata dal checkout (`steps={...}` e `currentStep={...}`), normalizzandola in item typed.
- `StatusPill children`: il componente deve supportare anche `<StatusPill>Testo</StatusPill>` oltre a `label`, perché diversi componenti legacy usano la forma con children.
- `ProgressBar max`: il componente deve accettare `max` opzionale e normalizzare `value/max` in percentuale per pannelli wallet/usage.
- `tsconfig.tsbuildinfo`: le cache TypeScript generate non devono essere incluse nello ZIP perché possono preservare diagnostiche stale e confondere i build successivi.
- Alert `description`: `Alert` supporta anche contenuto semplice tramite `description` oltre ai `children`, evitando errori quando una pagina usa la variante compatta.
- Checklist status items: `Checklist` supporta sia stringhe sia oggetti `{ label, done }`, usati dalle checklist di QA/review.

- DataTable render callbacks: le colonne inline devono tipizzare il parametro della callback `render` oppure usare una definizione colonna tipizzata. Questo evita l'errore `Parameter 'row' implicitly has an 'any' type`, emerso su `/admin/reports`.
- DataTable readonly contract typo: il gate blocca refusi tipo `ReadonlyReadonlyArray`, che renderebbero il componente non compilabile in build reale.

- Readonly/as const arrays: i componenti che ricevono liste da snapshot runtime, seed, blueprint o registry devono accettare `ReadonlyArray<>` o `readonly ...[]`, non array mutabili. Questo evita l'errore `readonly ... cannot be assigned to the mutable type ...[]`, emerso su `TeamMembersTable members={authRuntimeSnapshot.members}`.

## Script

```bash
node scripts/qa-web-build-static-guards.js
```

Lo script produce anche:

```text
artifacts/qa/web-build-static-guards-latest.json
```

## Quando va eseguito

Va eseguito prima di ogni ZIP consegnato e dentro il gate CI prima di `pnpm build`. Non sostituisce il build reale Next/Docker, ma intercetta rapidamente i pattern che hanno già causato fallimenti in ambiente target.
