# 12 — M20-S Implementation Handoff

## Obiettivo M20-S

Implementare i blueprint M20-P con modifiche reali su UI, metadata, accessibilita e QA. M20-S dovra essere uno sprint di sviluppo, non una nuova analisi.

## Task P0

1. Metadata/noindex helpers e applicazione route P0.
2. Header mobile accessibile con CTA e link pubblici completi.
3. Skip link, landmark e focus state globali.
4. Copy scrub pubblico su home, servizi, prezzi, checkout, guide, garanzia e API.
5. Checkout form con campi guidati, error summary e copy cliente.
6. Pricing/listini accessibili e tabella semantica.
7. Tracking denylist route sensibili verificabile.
8. Gate QA M20-S: metadata, noindex, copy, a11y static, mobile nav smoke, performance budget scaffold.

## Task P1

- Breadcrumb pubblici e guide.
- Metadata legal pages.
- OG image standard.
- Stati empty/error/loading armonizzati su dashboard e admin.
- Migrazione progressiva di tabelle legacy verso `DataTableColumn<Row>[]`.

## Fix gia incluso da M20-P

M20-P ha gia corretto il blocco `DataTable` che impediva il build Docker web. M20-S deve mantenere il fix e, se possibile, aggiungere test build reale in ambiente con dipendenze installate.

## Done criteria

- `pnpm --filter @clientiaffidabili/web build` non fallisce per `DataTable`.
- Nessun warning Autoprefixer noto su `align-items:end`.
- QA statici M20-A, M20-P e M20-S passano.
- Nessuna route sensibile in sitemap.
- Nessun claim assoluto nel copy pubblico.
- ZIP finale validato.
