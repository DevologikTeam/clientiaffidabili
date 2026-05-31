# 34 — Clarity Session Recording & Sensitive Areas Analysis

## Rischio

Clarity registra sessioni, heatmap e comportamento utente. Anche con masking di default, il rischio prodotto è alto se viene caricato su pagine con dati personali, pagamenti, documenti, report, fatture o admin.

## Default MVP

Clarity è disabilitato di default e, quando abilitato, è permesso solo su:

- homepage;
- pagine servizio pubbliche;
- pagine prezzi pubbliche;
- guide pubbliche;
- garanzia operativa;
- contatti, solo prima dell'inserimento dati o con masking forzato.

## Aree escluse sempre

- `/admin/*`;
- `/dashboard/*`;
- `/checkout/*`;
- `/reports/*`;
- `/fatture/*`;
- `/legal/*` se contiene dati consenso/account;
- `/api/*`;
- pagine PDF/report/documenti;
- pagine invito/reset token.

## Regole tecniche future

- componente ClarityProvider con allowlist route;
- route denylist server-side;
- feature flag globale;
- consent marketing/analytics richiesto;
- masking CSS su campi input;
- audit settings quando Clarity viene attivato.
