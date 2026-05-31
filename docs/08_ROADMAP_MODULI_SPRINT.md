# Roadmap evolutiva per moduli e sprint

Metodo richiesto: per ogni modulo si lavora con tre sprint separati:

1. **Sprint Analisi**: requisiti, benchmark, rischio, backlog, criteri di successo.
2. **Sprint Progettazione**: UX, architettura, data model, API contract, test plan.
3. **Sprint Sviluppo**: implementazione, QA, documentazione, pacchetto release.

## Sequenza moduli

### Modulo 0 — Foundation progettuale

- **M0-A Analisi:** validazione strategia, posizionamento, servizi MVP, vincoli legali.
- **M0-P Progettazione:** monorepo, standard repo, ambienti, documentazione base.
- **M0-S Sviluppo:** scaffold Next/Nest/Postgres/Docker/Coolify.

### Modulo 1 — Brand, Design System e UI Kit

- **M1-A Analisi:** review loghi/bozze, competitor visual, accessibilità.
- **M1-P Progettazione:** token, componenti, layout, copy rules, stati UI.
- **M1-S Sviluppo:** component library iniziale, pagine demo, regression visual.

### Modulo 2 — Marketing Site e Funnel pubblico

- **M2-A Analisi:** SEO/GEO, keyword, pagine servizio, funnel.
- **M2-P Progettazione:** landing, pricing, servizi, FAQ, legal entry points.
- **M2-S Sviluppo:** Next.js public site, form lead, analytics privacy-safe.

### Modulo 3 — Account, organizzazioni e ruoli

- **M3-A Analisi:** account B2B, team, permessi, fatturazione.
- **M3-P Progettazione:** auth flow, organization model, RBAC base.
- **M3-S Sviluppo:** login, registrazione, organization, profilo, ruoli base.

### Modulo 4 — Catalogo prodotti e pricing engine

- **M4-A Analisi:** offerte, bundle, margini, servizi Openapi prioritari.
- **M4-P Progettazione:** product schema, pricing, tax, feature flags.
- **M4-S Sviluppo:** CRUD prodotti admin, catalogo pubblico, prezzo dinamico.

### Modulo 5 — Checkout e billing

- **M5-A Analisi:** Stripe/Nexi/Mollie, fiscalità, rimborsi, subscription.
- **M5-P Progettazione:** order lifecycle, webhook, idempotenza, ricevute.
- **M5-S Sviluppo:** Stripe Checkout, webhook, stati ordine, billing profile.

### Modulo 6 — Provider Openapi Core

- **M6-A Analisi:** endpoint, auth OAuth, rate limit, callback, costi.
- **M6-P Progettazione:** adapter, mapping prodotti, retry, normalizzazione.
- **M6-S Sviluppo:** adapter Openapi, mock provider, callback receiver, audit.

### Modulo 7 — Verifiche e report azienda

- **M7-A Analisi:** report azienda essenziale/pro, red flags, fonti.
- **M7-P Progettazione:** report UX, score, evidenze, PDF future.
- **M7-S Sviluppo:** wizard, check azienda, report HTML, storico dashboard.

### Modulo 8 — Antifrode dati e persona light

- **M8-A Analisi:** IBAN/email/mobile/CF, privacy, casi d’uso.
- **M8-P Progettazione:** UX input, validazioni, rischio e disclaimer.
- **M8-S Sviluppo:** check dati, risultato normalizzato, report light.

### Modulo 9 — Piani team, crediti e monitoraggio

- **M9-A Analisi:** usage, crediti, monitoraggio, rinnovi.
- **M9-P Progettazione:** wallet crediti, subscription, alert, limiti piano.
- **M9-S Sviluppo:** piani mensili, consumo crediti, monitoraggio base.

### Modulo 10 — Admin operativo

- **M10-A Analisi:** supporto, retry, gestione errori, prezzi.
- **M10-P Progettazione:** console admin, audit, filtri, stato provider.
- **M10-S Sviluppo:** admin catalogo, ordini, check, retry manuale, logs.

### Modulo 11 — Legal/compliance readiness

- **M11-A Analisi:** GDPR, DPA, T&C, privacy, retention.
- **M11-P Progettazione:** consensi, log uso lecito, policy documents.
- **M11-S Sviluppo:** legal pages, consent tracking, retention jobs.

### Modulo 12 — API Partner

- **M12-A Analisi:** developer target, API key, rate limit, pricing.
- **M12-P Progettazione:** API docs, webhook partner, scopes, billing.
- **M12-S Sviluppo:** API key, endpoint partner, usage metering, docs.

### Modulo 13 — Production hardening

- **M13-A Analisi:** security, backup, SLA, incidenti, performance.
- **M13-P Progettazione:** runbook, monitoring, release gates.
- **M13-S Sviluppo:** monitoring, backup/restore, e2e, release candidate.

### Modulo 14B — Customer Education SEO/GEO Pages

Obiettivo: creare pagine lato cliente/pubbliche ottimizzate SEO/GEO che spieghino valore, garanzie operative, limiti e casi d'uso dei servizi ClientiAffidabili.it.

- **M14B-A Analisi:** keyword/intenti, customer language, competitor content gap, pagine guida prioritarie, rischi claim e KPI SEO/GEO.
- **M14B-P Progettazione:** template guida, copy deck, componenti, metadata, schema JSON-LD, internal linking, FAQ e CTA contestuali.
- **M14B-S Sviluppo:** route `/guide/...`, contenuti MVP, sitemap, canonical, schema, QA contenuti e SEO technical.

Guardrail: le pagine devono comunicare garanzie operative e limiti, non garanzie di pagamento futuro o rischio zero.

## Prossimi 5 sprint consigliati

1. **M1-P Design System Blueprint** — token, componenti, layout, copy rules e stati UI.
2. **M1-S Design System Implementation** — componenti Next riutilizzabili, pagina demo e regression visual.
3. **M2-A Public Funnel Analysis** — SEO/GEO, pagine servizio, funnel e pricing pubblico.
4. **M2-P Public Funnel Design** — wireframe landing, servizi, pricing, checkout entry e FAQ.
5. **M2-S Public Funnel Development** — sito pubblico Next.js, catalogo marketing, lead form e analytics privacy-safe.


## Aggiornamento 0.24.0 — M8-P Admin Operations Design

Completato blueprint admin operations: home queue-first, work item detail, reason modal, audit timeline, RBAC, API contract e componenti UI per M8-S.

- M4B-S Payment Providers & Subscriptions Development — completato in 0.28.0.


## M14B — SEO/GEO Customer Education Pages

- M14B-A SEO/GEO Customer Education Pages Analysis — completato in 0.48.0.
- M14B-P SEO/GEO Customer Education Pages Design.
- M14B-S SEO/GEO Customer Education Pages Development.

## M14B-P — SEO/GEO Customer Education Pages Design

Sprint completato nella release 0.49.0. Lo sprint definisce template CMS, copy deck, FAQ/schema, internal linking, claim guardrails e handoff allo sviluppo M14B-S.
