# ClientiAffidabili.it

Versione: `0.29.0`pacchetto: 0.18.0

Progetto iniziale per una piattaforma B2B di verifica affidabilità clienti/fornitori, rivendita servizi Open API, checkout self-service e dashboard report.

## Obiettivo prodotto

ClientiAffidabili.it non deve essere un semplice catalogo di visure. Il prodotto deve guidare PMI, studi professionali e software house a rispondere a domande operative:

- posso lavorare con questa azienda?
- ci sono segnali di rischio prima di concedere credito o spedire merce?
- chi sono soci, amministratori e titolari effettivi?
- posso fidarmi di IBAN, email, telefono o codice fiscale inseriti?
- posso conservare uno storico controllabile delle verifiche fatte dal team?

## Stack previsto

- **Frontend:** Next.js App Router, React, TypeScript, CSS design tokens.
- **Backend:** NestJS, TypeORM, PostgreSQL.
- **Pagamenti:** Stripe Checkout come primo provider, con adapter pronto a supportare Nexi/Mollie in futuro.
- **Provider dati:** adapter Openapi server-side, con normalizzazione, audit e report composer.
- **Deploy:** Docker Compose locale e template Coolify.

## Avvio locale

```bash
cp .env.example .env
pnpm install
pnpm dev
```

Oppure con Docker Compose:

```bash
docker compose up --build
```

Servizi locali:

- Frontend: http://localhost:3000
- API: http://localhost:3001
- PostgreSQL: localhost:5432

## Contenuto del pacchetto

- `apps/web`: prototipo Next.js con landing, catalogo, checkout, dashboard e report.
- `apps/api`: backend NestJS con moduli iniziali per prodotti, ordini, check, billing, provider, report e audit.
- `packages/shared`: tipi condivisi frontend/backend.
- `docs`: strategia, architettura, design system, QA, guardrail, roadmap e deploy.
- `assets/logos`: kit logo ricevuto.
- `docs/reference`: bozze HTML e pacchetti originali ricevuti.

## Stato

Questa è una base progettuale e tecnica iniziale, non un prodotto production-ready. Le integrazioni reali con Openapi e Stripe sono protette da adapter e variabili ambiente; nessuna chiave o dato reale deve essere committato.


## Sprint corrente

**M1-P Design System Blueprint** — progettazione senior del design system: token, componenti, layout, checkout UX, microcopy, QA antiregressione e prima route interna `/design-system`.

Output principali:

- `docs/sprints/M1-P_DESIGN_SYSTEM_BLUEPRINT.md`
- `docs/design/06_DESIGN_TOKENS_BLUEPRINT.md`
- `docs/design/07_COMPONENT_BLUEPRINT.md`
- `docs/design/08_LAYOUT_AND_RESPONSIVE_BLUEPRINT.md`
- `docs/design/09_FORM_STATES_AND_CHECKOUT_UX.md`
- `docs/design/10_UI_CONTENT_GOVERNANCE.md`
- `docs/design/11_DESIGN_SYSTEM_QA_CHECKLIST.md`
- `docs/adr/ADR-001-design-system-foundation.md`
- `docs/qa/DESIGN_SYSTEM_REGRESSION_MATRIX.md`
- `apps/web/components/ds`
- `apps/web/app/design-system/page.tsx`

## Prossimo sprint

**M1-S Design System Implementation** — applicare i componenti DS alle pagine principali, consolidare CSS duplicato, introdurre test automatici e completare la prima QA responsive/accessibilità.


## Stato release corrente

Versione: **0.9.0** — sprint completato: **M2-P Public Funnel Design**.

Prossimo sprint: **M2-S Public Funnel Development**.

Output principali M2-P:

- `docs/sprints/M2-P_PUBLIC_FUNNEL_DESIGN.md`
- `docs/marketing/08_PUBLIC_FUNNEL_WIREFRAMES.md`
- `docs/marketing/09_PAGE_BY_PAGE_BLUEPRINT.md`
- `docs/marketing/10_CONVERSION_COMPONENT_BLUEPRINT.md`
- `docs/content/PUBLIC_FUNNEL_FINAL_COPY.md`
- `docs/design/13_PUBLIC_FUNNEL_UI_SPEC.md`
- `docs/analytics/PUBLIC_FUNNEL_EVENTS.md`
- `apps/web/lib/public-funnel/blueprint.ts`


## Public funnel 0.44.0

La release `0.7.0` implementa il funnel pubblico: homepage decision-led, catalogo servizi, dettaglio servizio, prezzi, API partner e checkout demo collegato al parametro `service`.

QA dedicato:

```bash
node scripts/qa-public-funnel-development.js
```


## Versione 0.9.0

Aggiunta progettazione catalogo servizi e pricing: esperienza pubblica, admin catalog, price guard, snapshot checkout e copy servizi MVP.


## Stato attuale 0.11.0

Sprint completato: **M4-A Checkout & Billing Analysis**.

Output principali: analisi provider checkout, billing/fatturazione, stati pagamento, ledger, webhook idempotenti, rimborsi/dispute e guardrail compliance per acquisti B2B.


## Aggiornamento 0.12.0

**M4-P Checkout & Billing Design** completato: sono stati progettati flusso checkout, data model pagamenti/fatturazione, API contract, webhook idempotenti, admin billing queue, email transazionali e QA antiregressione.

Prossimo sprint: **M4-S Checkout & Billing Development**.


## Aggiornamento 0.13.0

**M4-S Checkout & Billing Development** completato: implementate entità billing, adapter provider pagamento mock/Stripe-ready, creazione sessione checkout, webhook idempotenti, ledger append-only, fattura pending, UI checkout/success/cancel e admin billing queue.

Prossimo sprint: **M5-A Provider Integration Analysis**.


## 0.16.0 — M5-S Provider Integration Development

Runtime provider, adapter Openapi mock/sandbox-ready, cost ledger, raw payload vault, callback e admin queue.


## Stato pacchetto 0.17.0

La foundation include ora l'analisi del Report Composer: strategia report, scoring prudente, evidence model, copy compliance, admin review e preparazione export/download.


## Stato release corrente

Versione: **0.18.0** — sprint completato: **M6-P Report Composer Design**.

Il pacchetto include ora il blueprint operativo dei report: template versionati, score bands prudenti, evidence card, API contract, review workflow admin, versioning/audit e handoff per lo sviluppo M6-S.

Prossimo sprint: **M6-S Report Composer Development**.

QA dedicato:

```bash
node scripts/qa-report-composer-design.js
```

## Release 0.21.0

Sprint completato: **M7-A Customer Dashboard Analysis**.  
La dashboard cliente viene progettata come cabina di regia post-acquisto: verifica stato, report pronti, ordini/fatture, notifiche/task, supporto e accesso report con audit.


## Release 0.21.0

Completato M7-P Customer Dashboard Design: blueprint area cliente, verifiche, report access, fatture/supporto, subscription future-ready, API contract e handoff M7-S.

## Release 0.23.0

Sprint completato: **M8-A Admin Operations Analysis**. Sono stati aggiunti analisi, guardrail, ruoli, code operative, audit e readiness per il futuro pannello admin interno queue-first.

Prossimo sprint: **M8-P Admin Operations Design**.


### Admin Operations

La release 0.28.0 introduce la console interna `/admin/operations` per gestione queue-first di ordini, provider, report, billing, supporto e audit.


## Release 0.28.0

Completata analisi M4B-A su Stripe, PayPal, subscription, crediti, entitlement, webhook e margini. Prossimo sprint: M4B-P Payment Providers & Subscriptions Design.


## Release 0.28.0

Aggiunto blueprint M4B-P per Stripe, PayPal, subscription, crediti, entitlement, rimborsi, dispute e riconciliazione ledger.


## Release 0.28.0
M4B-S Payment Providers & Subscriptions Development: runtime Stripe/PayPal, abbonamenti, credit wallet, rimborsi, dispute e billing portal.


## Ultimo sprint

M9-A Security, Compliance & Production Hardening Analysis — threat model, privacy/GDPR, OWASP/API security, segreti, backup/restore, incident response e production gate.


## Release 0.31.0

Include M9-P Security, Compliance & Production Hardening Design: RBAC, object-level authorization, secrets, webhook security, backup/restore, incident response, observability e production gate.


## Release 0.31.0

M9-S aggiunge il primo runtime security/hardening: `SecurityModule`, production gate, secret scan, redaction, webhook security, RBAC/object authorization scaffold e pagina interna `/admin/security`.


### Release 0.35.0

Aggiunta analisi M11-A Authentication, Accounts & Team Management: modello account aziendale, team, ruoli, sessioni, inviti, recupero password, MFA futura, audit e guardrail auth.

## Release 0.38.0

M12-A introduces the analysis baseline for the API Partner & Reseller Portal. The portal is designed as sandbox-first, production-review-gated, credit-wallet-first and API-key-scope-limited.


## Latest sprint — 0.39.0
M12-P API Partner & Reseller Portal Design: blueprint per portale partner, API key sandbox/live, usage ledger, webhook e handoff sviluppo M12-S.

## Latest sprint — 0.41.0
M12-S API Partner & Reseller Portal Development: runtime MVP per portale partner/reseller/API con API key hashate, sandbox, usage ledger, webhook firmati e console admin.


## Release 0.41.0 — M13-A Production QA, Browser E2E & Launch Readiness Analysis

Questa release aggiunge l'analisi per trasformare il progetto da scaffold evoluto a prodotto certificabile: build reale, Playwright E2E, smoke test Coolify, payment/provider sandbox, backup/restore, rollback e launch gate.

Nota: il prodotto resta non dichiarato production-ready finche' M13-S non implementa ed esegue i gate reali.

## 0.43.0 — CMS pagine SEO/GEO

Le guide pubbliche possono ora essere gestite da admin tramite `/admin/seo-pages`, create da `/admin/seo-pages/nuova` e pubblicate su `/guide/[slug]`. L'editor React scelto è Tiptap, con guardrail su claim commerciali e metadata SEO/GEO.


## M13-S Production QA

La release 0.44.0 aggiunge Playwright scaffold, smoke test, production gate, healthcheck Docker/Coolify e pagina admin di launch readiness. Il progetto resta scaffold offline: prima del go-live servono installazione dipendenze, build reale, test E2E browser, deploy staging, provider/payment sandbox e restore drill.


## Release 0.45.0

M14-A completa l'analisi del sito di lancio: SEO/GEO, copy commerciale, garanzia operativa, CMS governance, tracking privacy-safe, schema/sitemap e sales readiness.

## 0.46.0 — Launch Website Design

La release 0.46.0 aggiunge il blueprint del sito di lancio: pagine pubbliche, SEO/GEO, copy commerciale, garanzia operativa, schema/sitemap, CMS governance e tracking privacy-safe. Lo sviluppo reale delle superfici e' previsto in M14-S.


## Release 0.48.0

Aggiunta analisi **M14B-A SEO/GEO Customer Education Pages**: cluster contenuti, intenti, garanzia operativa, limiti, governance CMS e QA.


## Release 0.50.0

Sprint M14B-S: implementate pagine educative SEO/GEO lato cliente con seed CMS, componenti pubblici, FAQ/schema, internal linking e QA dedicato.


## Added in 0.52.0

- M15-P Sales CRM design completed.
- M15B Platform Settings, Bootstrap Admin & Operational Error Ledger added to roadmap.
- Contact inbox must save messages in admin before email delivery.
- Purchases can be disabled from admin through a server-side kill switch.
- Payment/Openapi/OpenAI settings are planned as admin-managed settings with redacted secrets.
- Operational errors for payments, Openapi/OpenAI, email and webhooks must be ledgered for refund/fix analysis.
- Buyer IP audit requirements added with privacy/retention guardrails.
- Generic source syntax QA added to catch multiline string/JSX scaffold errors before ZIP release.


### 0.57.1 — Analytics & Growth Analysis

Aggiunta analisi del futuro modulo analytics/growth: eventi privacy-safe, attribution, misurazione SEO/GEO, KPI dashboard e collegamento con error ledger operativo.


## 0.57.1 — Email & Customer Notifications Roadmap Patch

- Aggiunto modulo M18 rafforzato per tutte le email tecniche cliente.
- Inclusi registrazione, verifica email, recupero password, remember-me, acquisti, pagamenti, report pronto, PDF via email/link, rimborsi, fatture, supporto e partner/API.
- Aggiunti ledger invii, webhook provider, retry, suppression e integrazione Operational Error Ledger.
- Aggiunta roadmap fino alla Release Candidate in `docs/roadmap/ROADMAP_TO_RC.md`.

## Release 0.68.0 — M19-S Sandbox Certification Development

Aggiunto il runtime mock-first per certificare i flussi critici prima della Release Candidate: backend `SandboxCertificationModule`, runner CLI, evidence ledger, waiver auditato, integrazione Operational Error Ledger e UI admin `/admin/launch-readiness/sandbox-certification`.

Il runtime non esegue provider reali: Stripe, PayPal, Openapi, OpenAI, email, Docker/Coolify e Playwright devono essere certificati in ambiente sandbox/staging con secret esterne al repository.
