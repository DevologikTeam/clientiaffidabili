# 13 — Build Fix #32: DataTable Columns & Autoprefixer

## Log di riferimento

Il build Docker web falliva durante:

```bash
RUN pnpm --filter @clientiaffidabili/web build
```

Errore bloccante:

```text
./app/admin/billing/page.tsx:23:23
Type error: Type 'string' is not assignable to type 'DataTableColumn<string[]>'.
```

Warning collegato:

```text
autoprefixer: end value has mixed support, consider using flex-end instead
```

## Root cause

`DataTable` era stato irrigidito verso colonne oggetto typed, ma alcune pagine storiche continuavano a usare colonne stringa e righe array. La build TypeScript in Docker intercettava il mismatch.

## Fix applicato

- `DataTable` accetta `Array<DataTableColumn<Row> | string>`.
- Le colonne stringa vengono normalizzate internamente.
- Le righe array legacy vengono renderizzate per indice.
- `caption` e' opzionale per retrocompatibilita.
- `align-items:end` e' stato sostituito da `align-items:flex-end`.

## Perche non migrare tutto subito

Lo sprint M20-P e' di design/polish. La scelta piu sicura per non bloccare Docker e' introdurre un bridge retrocompatibile. La migrazione completa delle tabelle legacy resta possibile in M20-S/M21-S con build reale e browser smoke.

## QA

`scripts/qa-m20p-docker-build-fix-32.js` verifica:

- supporto legacy in `DataTable`;
- `caption` opzionale;
- presenza della normalizzazione;
- assenza di `align-items:end`;
- presenza dello scenario `/admin/billing` che ha generato l'errore.
