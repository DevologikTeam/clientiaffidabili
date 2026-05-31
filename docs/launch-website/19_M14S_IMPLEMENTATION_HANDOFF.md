# 19 — M14-S Implementation Handoff

## Obiettivo M14-S

Sviluppare il sito di lancio coerente con blueprint M14-P, integrando CMS SEO/GEO, metadata dinamici, schema JSON-LD, sitemap, robots, componenti conversione, tracking privacy-safe e QA antiregressione.

## Task sviluppo

### Frontend

- aggiornare homepage;
- aggiornare `/servizi`, `/prezzi`, `/api` con copy M14-P;
- creare componenti launch website;
- creare `JsonLd` helper;
- creare `metadata` builder per pagine statiche e CMS;
- creare sitemap dinamica;
- creare robots policy;
- collegare guide CMS pubblicate;
- aggiungere FAQ e guarantee panel.

### Backend/CMS

- esporre endpoint per pagine CMS published;
- aggiungere publish checklist runtime;
- aggiungere schema metadata fields se mancanti;
- bloccare pubblicazione con claim vietati;
- aggiungere versioning publish/rollback se incompleto.

### QA

- test sitemap non include admin/dashboard/draft;
- test robots;
- test claim guard;
- test metadata obbligatori;
- test JSON-LD visibile/coerente;
- test nessuna PII nel tracking;
- test pagine P0 renderizzano.

## Feature flags

- `ENABLE_SEO_CMS_PUBLIC_GUIDES=true`
- `ENABLE_PRIVACY_SAFE_ANALYTICS=false` di default
- `ENABLE_MARKETING_TRACKING=false`
- `ENABLE_DYNAMIC_SITEMAP=true`

## Done criteria

- build locale reale da eseguire in ambiente con dipendenze;
- QA script M14-S passed;
- E2E smoke P0;
- sitemap generata;
- robots generato;
- nessun claim bloccato;
- nessuna pagina draft indicizzata;
- release notes aggiornate.
