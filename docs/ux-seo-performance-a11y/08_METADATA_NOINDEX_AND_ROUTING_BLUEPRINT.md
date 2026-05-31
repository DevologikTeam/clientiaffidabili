# 08 — Metadata, Noindex & Routing Blueprint

## Scopo

Definire una strategia SEO/GEO e privacy-indexing coerente prima della RC. Le pagine pubbliche devono essere indicizzabili con metadata curati; le superfici sensibili devono essere escluse in modo esplicito.

## Classi route

| Classe | Esempi | Index | Sitemap | Metadata richiesti |
|---|---|---:|---:|---|
| Public commercial | `/`, `/servizi`, `/prezzi`, `/garanzia-operativa`, `/contatti` | Si | Si | title, description, canonical, OG, robots index |
| Public educational | `/guide`, `/guide/[slug]` | Si se published | Si se published | title, description, article/schema, reviewed date |
| Public API | `/api` | Si | Si | title, description, canonical, no secret examples |
| Checkout flow | `/checkout`, success, cancel | No | No | robots noindex, nofollow prudente |
| Customer | `/dashboard/*`, `/reports/*`, `/invito/*` | No | No | robots noindex, no external tracking |
| Partner console | `/dashboard/partner/*` | No | No | robots noindex, no secret examples |
| Admin | `/admin/*` | No | No | robots noindex, internal-only copy |

## Helper proposti per M20-S

- `buildPublicMetadata({ title, description, path, ogType })`
- `buildSensitiveMetadata({ title, description })`
- `buildGuideMetadata(guide)`
- `buildServiceMetadata(service)`

## Policy canonical

- Canonical assoluto su route pubbliche P0.
- Nessun canonical indicizzabile per route sensibili.
- Evitare parametri tracking in canonical.
- Guide in sitemap solo se `published` e con slug stabile.

## Noindex P0

Route da proteggere subito in M20-S:

- `/admin` e tutte le sotto-route;
- `/dashboard` e tutte le sotto-route;
- `/reports/[id]`;
- `/checkout`, `/checkout/success`, `/checkout/cancel`;
- `/invito/[token]`;
- console partner autenticata.

## QA M20-S

- Static scan su `metadata` o helper per route P0.
- Static scan sitemap: nessuna route sensibile inclusa.
- Static scan robots: admin/dashboard/report bloccati.
- Browser smoke: pagine sensibili espongono `noindex` via metadata Next.
