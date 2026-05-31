## v0.75.3 — Public Copy Type Guard Fix

Stato aggiornato v0.75.3. Corretto il build blocker TypeScript introdotto dal cleanup copy pubblico: `EducationMetaStrip` non confronta piu valori legacy non presenti in `EducationIntent`, ma usa mappe esaustive tipizzate per intent e cluster. Rafforzato il QA copy pubblico per bloccare regressioni simili.

Prossimi 5 sprint:

1. M22-A Pilot Launch & Operations Analysis
2. M22-P Pilot Launch & Operations Design
3. M22-S Pilot Launch & Operations Development
4. M23-A Post-RC Feedback & Conversion Readiness Analysis
5. M23-P Post-RC Feedback & Conversion Readiness Design


## v0.74.19 — Local Browser Reachable Preflight Patch 18

Stato aggiornato v0.74.19. Il comando `pnpm qa:coolify-preflight` usa ora il compose locale con porte host pubblicate, mantenendo una modalita strict Coolify-like separata.

## v0.74.18 — Web Healthz & Container Healthcheck Patch 17

Stato aggiornato v0.74.18.

Patch preflight Coolify: API e web arrivano al runtime; il controllo web ora usa un endpoint dedicato `/healthz` e Node `fetch` dall interno del container, evitando falsi KO legati alla homepage pubblica o alla presenza di `wget`.

## v0.74.17 — Coolify Preflight DB Schema & Container Health Patch 16

Stato aggiornato v0.74.17.

Patch preflight Coolify: corretto il runtime blocker in cui l API andava in restart su database Postgres locale vuoto per `relation "platform_settings" does not exist`. Il gate locale esporta `DATABASE_SYNCHRONIZE=true` solo per creare lo schema effimero, mentre `docker-compose.coolify.yml` resta production-safe con default `false`. Il preflight controlla ora la health dall interno dei container (`HEALTH_CHECK_MODE=container`) per non dipendere da porte host pubblicate.

Prossimi 5 sprint:

1. M22-A Pilot Launch & Operations Analysis
2. M22-P Pilot Launch & Operations Design
3. M22-S Pilot Launch & Operations Development
4. M23-A Post-RC Feedback & Conversion Readiness Analysis
5. M23-P Post-RC Feedback & Conversion Readiness Design


## v0.74.16 — Docker Builder pnpm CLI Symlink Patch 15

Stato aggiornato v0.74.16.

Patch Docker builder: corretto il build blocker in cui `pnpm --filter @clientiaffidabili/api build` e `pnpm --filter @clientiaffidabili/web build` dentro Docker fallivano con `Cannot find module ... @nestjs/cli/bin/nest.js` e `Cannot find module ... next/dist/bin/next`. Gli stage builder di API e web installano ora le dipendenze direttamente nello stesso filesystem prima del `COPY . .`, evitando symlink pnpm rotti copiati da stage `deps`.

Prossimi 5 sprint:

1. M22-A Pilot Launch & Operations Analysis
2. M22-P Pilot Launch & Operations Design
3. M22-S Pilot Launch & Operations Development
4. M23-A Post-RC Feedback & Conversion Readiness Analysis
5. M23-P Post-RC Feedback & Conversion Readiness Design


## v0.74.14 — Coolify Preflight Windows Standalone Symlink Patch 14

Stato aggiornato v0.74.14.

Patch preflight Coolify: il comando `pnpm qa:coolify-preflight` esegue il build web locale con `NEXT_DISABLE_STANDALONE=1` per evitare il falso KO Windows `EPERM: operation not permitted, symlink ...` durante la generazione di `.next/standalone`. Il build standalone reale resta verificato nel passaggio Docker/Linux `docker compose -f docker-compose.coolify.yml build --no-cache api web`, coerente con Coolify.

Prossimi 5 sprint:

1. M22-A Pilot Launch & Operations Analysis
2. M22-P Pilot Launch & Operations Design
3. M22-S Pilot Launch & Operations Development
4. M23-A Post-RC Feedback & Conversion Readiness Analysis
5. M23-P Post-RC Feedback & Conversion Readiness Design


## v0.74.12 — Docker Optional Shared Node Modules Patch 11

Stato aggiornato v0.74.12.

Patch Docker: corretto il build blocker `COPY --from=prod-deps /app/packages/shared/node_modules` che falliva quando pnpm non creava `packages/shared/node_modules` per il package workspace source-only. I Dockerfile web/API non copiano piu path opzionali non garantiti e i QA Docker/web build bloccano regressioni su COPY fragili.

Prossimi 5 sprint:

1. M22-A Pilot Launch & Operations Analysis
2. M22-P Pilot Launch & Operations Design
3. M22-S Pilot Launch & Operations Development
4. M23-A Post-RC Feedback & Conversion Readiness Analysis
5. M23-P Post-RC Feedback & Conversion Readiness Design


## v0.74.10 — Docker Runtime Next Root Resolution Patch 10

Stato aggiornato v0.74.10.

Patch runtime Docker: corretto il caso in cui il server Next standalone viene emesso come `/app/server.js` e fa `require('next')`, ma il container non ha `next` risolvibile dal root runtime. Il Dockerfile web ora usa `prod-deps`, copia le dipendenze production, imposta `NODE_PATH`, crea symlink root per i package runtime principali e verifica `require.resolve('next')` prima dell'avvio.

Prossimi 5 sprint:

1. M22-A Pilot Launch & Operations Analysis
2. M22-P Pilot Launch & Operations Design
3. M22-S Pilot Launch & Operations Development
4. M23-A Post-RC Feedback & Conversion Readiness Analysis
5. M23-P Post-RC Feedback & Conversion Readiness Design


## v0.74.9 — Docker Runtime Next Dependencies & TypeORM Postgres Metadata Patch 9

Stato aggiornato v0.74.9.

Patch runtime Docker: corretto restart API `MODULE_NOT_FOUND: reflect-metadata` con stage `prod-deps` e corretto restart web `Cannot find module /app/apps/web/server.js` con start command robusto per Next standalone root/monorepo. Aggiunto `qa-docker-runtime-static-guards` e collegato a `release:pre-zip-check`.

Prossimi 5 sprint:

1. M22-A Pilot Launch & Operations Analysis
2. M22-P Pilot Launch & Operations Design
3. M22-S Pilot Launch & Operations Development
4. M23-A Post-RC Feedback & Conversion Readiness Analysis
5. M23-P Post-RC Feedback & Conversion Readiness Design


## v0.74.7 — Web Build Static Guards Patch 7

Stato aggiornato v0.74.7.

Patch QA pre-prossimo sprint: corretto il build blocker `EducationIntent` su `customer-education-runtime`, aggiunto supporto a `intent: informational` e mapping verso `SeoSearchIntent`. Rafforzato `qa-web-build-static-guards` per confrontare i literal usati nei dataset SEO/GEO con le union type dichiarate e le mappe runtime.

Prossimi 5 sprint:

1. M22-A Pilot Launch & Operations Analysis
2. M22-P Pilot Launch & Operations Design
3. M22-S Pilot Launch & Operations Development
4. M23-A Post-RC Feedback & Conversion Readiness Analysis
5. M23-P Post-RC Feedback & Conversion Readiness Design


## v0.74.6 — Web Build Static Guards Patch 5

Stato aggiornato v0.74.6.

Patch QA pre-prossimo sprint: corretto il build blocker `Checklist className` su `SubscriptionPlanCard`, esteso il supporto `className` ai componenti del design system gia usati nelle pagine e rafforzato `qa-web-build-static-guards` contro props `className` non dichiarate.

Prossimi 5 sprint:

1. M22-A Pilot Launch & Operations Analysis
2. M22-P Pilot Launch & Operations Design
3. M22-S Pilot Launch & Operations Development
4. M23-A Post-RC Feedback & Conversion Readiness Analysis
5. M23-P Post-RC Feedback & Conversion Readiness Design


## v0.74.4 — Web Build Static Guards Patch 4

Stato aggiornato v0.74.4.

Patch QA pre-prossimo sprint: corretto il build blocker `DataTable render` con parametro implicito `any`, rafforzato il gate statico web build e mantenuta la RC ancora bloccata finché non arrivano evidenze reali di build/Docker/provider/Playwright/migrazioni.

Prossimi 5 sprint:

1. M22-A Pilot Launch & Operations Analysis
2. M22-P Pilot Launch & Operations Design
3. M22-S Pilot Launch & Operations Development
4. M23-A Post-RC Feedback & Conversion Readiness Analysis
5. M23-P Post-RC Feedback & Conversion Readiness Design


## v0.71.0 — M20-S UX, SEO, Performance & Accessibility Polish Development

Stato aggiornato v0.71.0.

Voce mantenuta per regression gate M20-S.


## v0.75.3 note

Patch copy cliente-finale e Git flow Coolify aggiunti: niente tassonomie interne nelle guide pubbliche, branch develop/main, tag versione e workflow webhook Coolify.


## v0.75.4

Test mode commerce visibility: public pages and checkout clearly show when checkout is disabled for local/Coolify preflight environments.
