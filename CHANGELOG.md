## 0.75.5 - Browser Permission Prompt Guard

- Disabilitati prompt browser automatici legati a passkey/WebAuthn/FedCM sulle pagine pubbliche.
- Aggiunti header `Permissions-Policy` restrittivi.
- Resi espliciti gli autocomplete dei form auth senza `webauthn`.
- Aggiunto QA `qa-browser-permission-public-guards`.


## 0.75.4 - Test Mode Commerce Visibility

- Added visible test-mode notices on public commerce pages when `ENABLE_CHECKOUT=false`.
- Checkout now clearly disables payment action in test mode.
- Added QA gate `qa:test-mode-commerce-visibility`.


## v0.75.3 - Contact Form Senior UX Review

- Migliorato il form contatti pubblico con layout a due colonne, card form piu stretta, fieldset, hint e messaggi success/error.
- Aggiunta route Next server-side per inoltrare il form al backend API tramite INTERNAL_API_URL.
- Aggiornati compose/env per supportare chiamate server-side web -> API.
- Aggiunto QA qa-contact-form-design.

## v0.75.2 - Public copy intent type guard fix

- Corretto `EducationMetaStrip`: rimosso confronto legacy `intent === 'commercial'` non piu compatibile con `EducationIntent`.
- Aggiunte mappe esaustive tipizzate per intent e cluster customer education.
- Rafforzato `qa-public-copy-trust-polish.js` per bloccare confronti impossibili tra literal TypeScript e union runtime.

## 0.75.0 - Public Trust Copy, Logo & Layout Polish

- Sostituito il logo kit pubblico e resa visibile la wordmark `ClientiAffidabili.it` nella topbar.
- Riscritte home, servizi e prezzi con copy da cliente finale: decisione, prezzo, fonti, limiti e supporto.
- Rimossi messaggi interni/sviluppatore dalle superfici pubbliche principali.
- Corretti prezzi dei pacchetti: prezzo diretto invece di “da” quando il singolo servizio ha prezzo definito.
- Aggiunta analisi competitor/copy e QA `qa-public-copy-trust-polish`.

## 0.74.19 - Local Browser Reachable Preflight Patch 18

- `pnpm qa:coolify-preflight` ora usa `docker-compose.yml` di default, pubblicando le porte host per test browser su `http://localhost:3000`.
- Aggiunta modalita strict Coolify-like con `pnpm qa:coolify-preflight:strict`, basata su `docker-compose.coolify.yml` e health container-only.
- Aggiunto `HEALTH_CHECK_MODE=both` in locale per validare sia readiness interna container sia reachability host/browser.
- Il compose locale passa ENV runtime sicure/default all API, incluse `DATABASE_URL`, `DATABASE_SYNCHRONIZE`, `APP_URL`, `API_URL` e feature flag safe-off.
- Aggiornati script Bash/PowerShell, docs e QA statici del preflight.

## 0.74.18 - Web Healthz & Container Healthcheck Patch 17

- Aggiunto endpoint Next dedicato `/healthz` per readiness web.
- Aggiornati Docker Compose e Coolify preflight per usare Node `fetch` su `http://127.0.0.1:3000/healthz`.
- Rimossa la dipendenza da `wget` e dalla homepage pubblica come healthcheck web.
- Rafforzati i QA statici Coolify/Docker per prevenire healthcheck web fragili.

## 0.74.17 - Coolify Preflight DB Schema & Container Health Patch 16

- Il preflight locale abilita `DATABASE_SYNCHRONIZE=true` solo per creare lo schema su volumi Postgres effimeri/vuoti.
- `docker-compose.coolify.yml` espone `DATABASE_SYNCHRONIZE` e `DATABASE_LOGGING` con default production-safe `false`.
- TypeORM ora legge esplicitamente `DATABASE_SYNCHRONIZE`/`DATABASE_LOGGING`, mantenendo `synchronize=false` in produzione salvo override deliberato.
- Il preflight controlla la health dall interno dei container per non dipendere da porte host pubblicate.
- Rafforzati i QA statici Coolify/Docker per prevenire crash `relation "platform_settings" does not exist` e healthcheck non rappresentativi.

## 0.74.16 - Docker Build Context Hygiene & pnpm CLI Shim Fix

- Added `.dockerignore` to keep host `node_modules`, `.next`, `dist`, and cache files out of Docker Linux builders.
- Verified Nest and Next CLI targets inside Docker builder stages before running builds.
- Fixed web runner CMD quoting for `require.resolve('next')`.
- Extended Docker/Coolify QA guards for host artifact overwrite regressions.

## 0.74.15 - Docker Builder pnpm CLI Symlink Patch

- Fixed Docker builder stages for API and web by installing pnpm dependencies directly in each builder stage before source copy and build.
- Prevented broken pnpm CLI binary shims copied from previous Docker stages from causing `MODULE_NOT_FOUND` for `@nestjs/cli/bin/nest.js` and `next/dist/bin/next`.
- Strengthened Docker runtime/static QA to reject builder stages that copy pnpm node_modules from another stage.

## 0.74.14 - Coolify Preflight Windows Standalone Symlink Patch

- Il build web locale del preflight ora usa `NEXT_DISABLE_STANDALONE=1` per evitare errori Windows `EPERM: operation not permitted, symlink ...` durante `.next/standalone`.
- Il build Docker/Coolify continua a validare Next standalone in Linux, quindi il gate resta equivalente al deploy reale.
- `apps/web/next.config.mjs` ora abilita `output: standalone` solo quando `NEXT_DISABLE_STANDALONE` non e impostato.
- `outputFileTracingRoot` e stato spostato sotto `experimental` per evitare il warning Next `Unrecognized key(s)`.
- Rafforzati i QA statici Coolify/Docker contro regressioni su standalone locale Windows e tracing root Next.

## 0.74.12 - Coolify Preflight Gate & Docker Symlink Fix #38

- Corretto Dockerfile web runner: symlink root `node_modules` idempotenti e sicuri contro `ln: File exists`.
- Aggiunti script `coolify-preflight.sh` e `coolify-preflight.ps1`.
- Aggiunto QA `qa-coolify-preflight-static-guards.js`.
- Documentato il gate in `docs/deployment/COOLIFY_PREFLIGHT.md`.


## 0.74.5 - Web Build Static Guards Patch 5

- Fixed `Checklist` className compatibility for `SubscriptionPlanCard`.
- Added className compatibility to design-system components already used with layout classes.
- Extended `qa-web-build-static-guards.js` to detect design-system components used with `className` without a compatible props contract.

# 0.74.4 — Web Build Static Guards Patch 4

- Corretto blocco Docker/Next su `apps/web/app/admin/reports/page.tsx` dovuto a callback `DataTable` con parametro `row` implicitamente `any`.
- Annotate le callback `DataTable render` inline e corretto il contratto `ReadonlyArray` del componente.
- Esteso `qa-web-build-static-guards` per bloccare callback `render` non tipizzate e refusi `ReadonlyReadonlyArray`.

# 0.74.3 — Web Build Static Guards Patch 3

- Corretto blocco Docker/Next su `apps/web/app/dashboard/team/page.tsx` dovuto a dati `as const`/readonly passati a `TeamMembersTable`.
- Resi readonly-safe i contratti array dei componenti web che leggono dati da snapshot runtime, blueprint e seed (`ReadonlyArray<>` invece di array mutabili nei props).
- Esteso `qa-web-build-static-guards` con controllo generico su component prop contracts che non devono più richiedere array mutabili.
- Aggiornato artifact `artifacts/qa/web-build-static-guards-latest.json` con il nuovo guard `Readonly/as const arrays must be accepted by component prop contracts`.

# 0.74.2 — Web Build Static Guards Patch 2

- Corretto blocco Docker/Next su `apps/web/app/checkout/page.tsx` per `Stepper steps/currentStep`.
- Reso `Stepper` compatibile sia con `items` typed sia con props legacy `steps` e `currentStep`.
- Reso `StatusPill` compatibile con `label` e children legacy.
- Reso `ProgressBar` compatibile con prop opzionale `max` e normalizzazione percentuale.
- Esteso `qa-web-build-static-guards` a Stepper, StatusPill, ProgressBar e rimozione cache TypeScript generata.

# 0.74.1 — Web Build Static Guards Patch

- Corretto blocco Docker/Next su `apps/web/app/admin/provider/page.tsx` per `StatCard value` numerico.
- Reso `StatCard` compatibile con valori `ReactNode` e alias legacy `helper`.
- Aggiunto gate generico `qa-web-build-static-guards` per prevenire regressioni su `StatCard`, `DataTable`, CSS `end` e plugin Next in `tsconfig`.
- Inserito il gate nel workflow Production QA e nello script `release:pre-zip-check`.
- Aggiunta documentazione `docs/qa/WEB_BUILD_STATIC_GUARDS.md` e artifact QA.
- Estesa compatibilità DS per `Alert description` e `Checklist` con item `{ label, done }`.

# 0.71.0 — M20-S UX, SEO, Performance & Accessibility Polish Development

- Implementati helper metadata pubblici/sensibili e layout noindex per admin, dashboard, report, checkout e inviti.
- Ripulito copy pubblico P0 da termini interni e dettagli tecnici non utili al cliente.
- Rifatto header mobile con aria-expanded/aria-controls, Escape close e focus trap pragmatico.
- Aggiunti skip link globale, target main stabile e focus state rinforzati.
- Riorganizzato checkout con fieldset, help text, error summary, conferme e copy cliente.
- Convertita la tabella prezzi a markup table semantico con caption e header scope.
- Aggiunti registry runtime, artifact performance budget e QA M20-S.

# 0.70.0 — M20-P UX, SEO, Performance & Accessibility Polish Design

- Completato blueprint operativo M20-P per copy pubblico, metadata/noindex, mobile navigation, checkout/pricing, accessibilita, performance e osservabilita privacy-safe.
- Aggiunti documenti `docs/ux-seo-performance-a11y/07..13`, registry TypeScript e QA dedicato.
- Integrato fix #32: `DataTable` retrocompatibile con colonne legacy stringa, `caption` opzionale e normalizzazione interna.
- Rimosso warning Autoprefixer sostituendo `align-items:end` con `align-items:flex-end`.
- Preparato handoff M20-S con task P0/P1 e gate QA.

# 0.69.0 — M20-A UX, SEO, Performance & Accessibility Polish Analysis

- Completata analisi pre-RC su UX, copy trust, SEO/GEO tecnico, performance, mobile, accessibilita e privacy/indexing.
- Inventariate 72 page route e gap metadata/noindex.
- Aggiunte matrici P0/P1 per pubblico, cliente, partner, admin e superfici sensibili.
- Aggiunti documenti `docs/ux-seo-performance-a11y/*`, registry TypeScript e QA dedicato.
- Preparato handoff a M20-P per blueprint copy, metadata/noindex, mobile header, checkout, pricing/listini accessibili, performance e a11y gate.


## 0.61.0 — M17-P OpenAI Assisted Operations & Content Copilot Design

- Progettato copilot OpenAI interno controllato.
- Aggiunti blueprint settings, secret reference, prompt registry, structured output, redaction, approval e usage/error ledger.
- Aggiunto QA M17-P contro assenza API key hardcoded e presenza guardrail.

# 0.60.0 - M17-A OpenAI Assisted Operations & Content Copilot Analysis

- Analisi use case OpenAI Copilot.
- Guardrail redaction/privacy/costi/approval.
- Prompt registry e output guardrails.
- Usage/error ledger OpenAI.
- Roadmap RC aggiornata.

# Changelog


## 0.59.4 — M16B-S Tag Manager, Clarity & Campaign Event Tracking Development

- Implementato endpoint pubblico redatto `/analytics/public-config`.
- Aggiunti settings admin `analytics.*` per GTM, Clarity, consenso e route policy.
- Aggiunto loader frontend GTM/Clarity con default sicuro e route denylist.
- Aggiunto helper `pushCampaignEvent` con payload sanitizer anti-PII.
- Aggiunta pagina `/admin/settings/analytics`.
- Aggiunto QA anti hardcoded tracking ID e anti PII.


## 0.59.0 - M16-S Analytics, Attribution & Growth Intelligence Development

- Implementato runtime analytics privacy-safe.
- Aggiunto modulo backend AnalyticsModule.
- Aggiunte entità analytics event, attribution snapshot e KPI snapshot.
- Aggiunta dashboard admin /admin/analytics.
- Aggiunti error insights aggregati e guardrail no-PII.

# Changelog


## 0.59.4 — M16B-S Tag Manager, Clarity & Campaign Event Tracking Development

- Implementato endpoint pubblico redatto `/analytics/public-config`.
- Aggiunti settings admin `analytics.*` per GTM, Clarity, consenso e route policy.
- Aggiunto loader frontend GTM/Clarity con default sicuro e route denylist.
- Aggiunto helper `pushCampaignEvent` con payload sanitizer anti-PII.
- Aggiunta pagina `/admin/settings/analytics`.
- Aggiunto QA anti hardcoded tracking ID e anti PII.


## 0.58.0

- Completato M16-P Analytics, Attribution & Growth Intelligence Design.
- Aggiunti blueprint eventi, attribution, KPI, consenso, SEO/GEO measurement ed error insights.

## 0.55.0 — M15B-P Platform Settings Design

- Aggiunto blueprint settings admin trasversale.
- Progettato bootstrap super admin.
- Progettato kill switch acquisti server-side.
- Progettati settings Stripe/PayPal/Openapi/OpenAI con secret reference.
- Progettato operational error ledger e buyer IP audit.
- Aggiunti API contracts e UI blueprint per M15B-S.


## 0.48.0 — 2026-05-30 — M14B-A SEO/GEO Customer Education Pages Analysis

- Aggiunta analisi customer education SEO/GEO.
- Definiti cluster, intenti, architettura pagine, garanzia operativa, limiti e governance CMS.
- Aggiunto registry topic MVP e QA dedicato.

## 0.39.0 — M12-P API Partner & Reseller Portal Design

- Progettato il portale partner/reseller controllato, sandbox-first e live solo su approvazione.
- Definiti API key hashate, scope, rate limit, ambiente sandbox/live, rotazione e revoca.
- Definiti contratti API partner `/api/partner/v1`, error model e Idempotency-Key obbligatoria per richieste costose.
- Progettati usage ledger, credit wallet, billing partner, webhook firmati e reseller pricing guard.
- Aggiunti contratti TypeScript backend/frontend e handoff sviluppo M12-S.
- Aggiunto QA antiregressione `qa-api-partner-reseller-design`.

## 0.37.0 — M11-S Authentication, Accounts & Team Management Development

- Implementato `AuthModule` con account aziendale, membership, inviti, sessioni, token reset/verifica email e audit auth.
- Aggiunti servizi password/token/auth runtime con token hashati e cookie model HttpOnly/Secure/SameSite.
- Aggiunte API register/login/logout/password reset/inviti/team/ruoli/me.
- Aggiunte route frontend `/login`, `/registrati`, `/invito/[token]`, `/dashboard/account`, `/dashboard/team`.
- Aggiunti componenti auth/team e navigazione customer Account/Team.
- Aggiunto QA antiregressione `qa-auth-accounts-development`.

## 0.35.0 — M11-A Authentication, Accounts & Team Management Analysis

- Aggiunta analisi auth/account/team.
- Definito modello `Account` + `AccountMembership` come evoluzione del semplice `organizationId`.
- Analizzati login, registrazione, sessioni, inviti, recupero password, MFA futura e audit auth.
- Definiti ruoli customer `owner`, `admin`, `analyst`, `billing`, `viewer`.
- Aggiunta readiness checklist per M11-P/M11-S.
- Aggiunto QA `scripts/qa-auth-accounts-analysis.js`.


## 0.33.0 — M10-P Fiscalita, Fatturazione e Customer Legal Design

- Progettato blueprint fiscal/legal per profilo fiscale cliente, documenti, note credito e rimborsi.
- Definito legal pack versionato con termini, privacy, cookie, refund policy, uso accettabile e disclaimer report.
- Definite accettazioni checkout e snapshot legale/fiscale.
- Progettate dashboard cliente fiscal/legal e admin fiscal/legal operations.
- Aggiunti TypeScript registry backend/frontend e QA antiregressione `qa-fiscal-legal-design`.


## 0.31.0 — M9-S Security, Compliance & Production Hardening Development

- Implementato `SecurityModule` con production gate, redaction preview, webhook signature preview e object access preview.
- Aggiunti guard RBAC e object-level authorization scaffold.
- Aggiunti servizi redaction, webhook security, production readiness e object authorization.
- Aggiunti script secret scan e production gate statico.
- Aggiunta pagina interna `/admin/security`.
- Aggiunti runbook backup/restore/incident e QA gate produzione.

# 0.30.0 — M9-P Security, Compliance & Production Hardening Design

- Aggiunto blueprint sicurezza/compliance/produzione.
- Definiti RBAC, object-level authorization, secrets, webhook, backup/restore, incident response e production gate.
- Aggiunti contratti TypeScript security e QA M9-P.


## 0.32.0 — M10-A Fiscalita, Fatturazione e Customer Legal Analysis

- Analizzata fiscalita prodotto, profili fiscali cliente, fatture, note credito, rimborsi e dispute.
- Definito legal pack cliente: termini, privacy, cookie, refund policy, acceptable use e disclaimer report.
- Definito versioning documenti legali e accettazioni checkout/report/API.
- Definite code admin fiscal/legal e data model preliminare.
- Aggiunto QA antiregressione `qa-fiscal-legal-analysis`.


## 0.29.0 — M9-A Security, Compliance & Production Hardening Analysis

- Analisi security-first e production readiness.
- Threat model, RBAC, segreti, GDPR, NIS2 readiness, OWASP, API/provider/payment security.
- Analisi Coolify/deploy, backup/restore, incident response, logging, audit e production gate.
- Aggiunto QA script `qa:security-compliance-hardening-analysis`.

## 0.27.0 — M4B-P Payment Providers & Subscriptions Design

- Completato blueprint multi-provider Stripe/PayPal.
- Aggiunto disegno completo rimborsi, rimborsi parziali, dispute e cancellazioni subscription.
- Definito modello credit wallet, entitlement e reconciliation ledger.
- Aggiunti contratti TypeScript e refund policy registry.
- Aggiunto QA script `qa-payment-providers-subscriptions-design`.

## 0.26.0 — M4B-A Payment Providers & Subscriptions Analysis

- Aggiunta analisi Stripe/PayPal per pagamenti one-shot e subscription.
- Definito modello crediti, subscription ed entitlement interno.
- Analizzato impatto fee payment su margini e pricing.
- Definito flusso webhook/reconciliation multi-provider.
- Aggiunti guardrail no-unlimited, no-provider-call-without-entitlement e admin reason/audit.
- Aggiunto QA script `qa-payment-providers-subscriptions-analysis`.

## 0.25.0 - M8-S Admin Operations Development

- Implementata console admin operations queue-first.
- Aggiunti modulo backend, entità work item/audit, API, route e componenti frontend.
- Aggiunti reason/idempotency guardrail e QA M8-S.

# Changelog


## 0.59.4 — M16B-S Tag Manager, Clarity & Campaign Event Tracking Development

- Implementato endpoint pubblico redatto `/analytics/public-config`.
- Aggiunti settings admin `analytics.*` per GTM, Clarity, consenso e route policy.
- Aggiunto loader frontend GTM/Clarity con default sicuro e route denylist.
- Aggiunto helper `pushCampaignEvent` con payload sanitizer anti-PII.
- Aggiunta pagina `/admin/settings/analytics`.
- Aggiunto QA anti hardcoded tracking ID e anti PII.


## 0.24.0 — M8-P Admin Operations Design

- Completato sprint di progettazione admin operations.
- Definita esperienza queue-first per `/admin/operations`.
- Progettati work queue, filtri, dettaglio item, snapshot e action panel.
- Definita reason modal per azioni critiche e audit timeline redatta.
- Definiti RBAC permission groups e API contract admin.
- Aggiunti blueprint TypeScript backend/frontend e QA antiregressione `qa-admin-operations-design`.



## 0.23.0 — M8-A Admin Operations Analysis

- Analizzata console interna Admin Operations queue-first.
- Definite code operative per pagamenti, provider, report, fatture, rimborsi, supporto e anomalie.
- Definita IA admin con home operations, ordini, billing, provider, report, supporto e audit.
- Definita matrice ruoli/permessi MVP e regole RBAC.
- Definiti audit event obbligatori e guardrail per azioni critiche.
- Definito data model preliminare `AdminWorkItem`, `AdminActionRequest`, `AdminAuditEvent`.
- Aggiunti file TypeScript di analisi backend/frontend.
- Aggiunto QA antiregressione `qa-admin-operations-analysis`.


## 0.22.0 — M7-S Customer Dashboard Development

- Implementata area cliente MVP con dashboard, storico verifiche, dettaglio verifica, fatture e supporto.
- Aggiunto modulo backend `CustomerDashboardModule` con API customer-facing.
- Aggiunte entità customer notification, task e support ticket.
- Aggiunti componenti React dedicati area cliente.
- Aggiunte route `/dashboard/verifiche`, `/dashboard/verifiche/[id]`, `/dashboard/fatture`, `/dashboard/supporto`.
- Aggiunto QA antiregressione `qa-customer-dashboard-development`.

## 0.21.0 — M7-P Customer Dashboard Design

- Completato sprint di progettazione area cliente.
- Definita dashboard post-acquisto con prossima azione, verifiche recenti, report pronti, ordini/fatture e supporto.
- Definiti blueprint per storico verifiche, dettaglio verifica, report access, download futuro, billing e subscription future-ready.
- Aggiunti API contract customer e componenti UI da sviluppare in M7-S.
- Aggiunto QA antiregressione `qa-customer-dashboard-design`.


## 0.16.0 — M5-S Provider Integration Development

- Runtime provider Openapi-first/mock-safe.

## 0.17.0 - M6-A Report Composer Analysis

- Aggiunta analisi modulo Report Composer.
- Definite sezioni report MVP, evidence model, scoring prudente e copy compliance.
- Definiti admin review, snapshot immutabile, export/download analysis e QA.
- Aggiornata roadmap verso M6-P/M6-S.

## 0.18.0 — M6-P Report Composer Design

- Aggiunto blueprint template report web/PDF-ready.
- Definite score bands e decision copy prudenti.
- Definito evidence component model con raw payload interno non esposto.
- Definiti API contract customer/internal/admin.
- Definito admin review workflow con audit obbligatorio.
- Definiti versioning, snapshot immutabile ed export PDF futuro.
- Aggiunto QA antiregressione `qa-report-composer-design`.

## 0.19.0 - M6-S Report Composer Development

- Implementato runtime iniziale Report Composer.
- Aggiunti servizi backend report/score, API customer/admin e UI report.
- Aggiunta valutazione Stripe + PayPal per pagamenti una tantum e abbonamenti futuri.
- Aggiunto QA antiregressione M6-S.

## 0.20.0 — M7-A Customer Dashboard Analysis

- Analizzata dashboard cliente post-acquisto.
- Definita IA customer: panoramica, verifiche, report, ordini/fatture, supporto.
- Definiti stati customer-facing e mapping da segnali tecnici.
- Analizzati accesso report, download futuro, notifiche/task, supporto, RBAC/privacy/audit.
- Aggiunti file di analisi frontend/backend e QA antiregressione M7-A.


## 0.28.0 — M4B-S Payment Providers & Subscriptions Development
- Implementati adapter Stripe/PayPal mock/sandbox-ready.
- Aggiunti abbonamenti, wallet crediti, credit ledger, refund request e dispute.
- Aggiunta UI customer/admin per billing portal, rimborsi e ledger.
- Aggiornato QA antiregressione con script M4B-S.

## 0.34.0 — M10-S Fiscalita, Fatturazione e Customer Legal Development

- Implementato `FiscalLegalModule` con profilo fiscale, documenti fiscali, legal pack, accettazioni e audit.
- Aggiunte route cliente `/dashboard/profilo-fiscale` e `/dashboard/legale`.
- Aggiunta route admin `/admin/fiscal-legal`.
- Aggiunte pagine legal pubbliche placeholder versionate.
- Aggiunto QA antiregressione `qa-fiscal-legal-development`.

## 0.36.0 — M11-P Authentication, Accounts & Team Management Design

- Aggiunto blueprint auth/account/team.
- Progettati account aziendali, membership, inviti, ruoli, permessi, sessioni, password, MFA/step-up e audit.
- Aggiunti contract TypeScript e QA antiregressione `qa-auth-accounts-design`.
- Prossimo sprint: M11-S sviluppo runtime autenticazione/account/team.


## 0.38.0 — M12-A API Partner & Reseller Portal Analysis

- Analizzato portale partner/reseller API.
- Definito modello sandbox-first e production manual-approved.
- Definiti API key, scopes, rate limit, idempotency, webhook, usage ledger e credit wallet.
- Analizzati pricing partner, sconti reseller, margini e guardrail.
- Analizzato onboarding partner, KYB/legal, admin operations e developer experience OpenAPI.
- Aggiunto QA antiregressione `qa-api-partner-reseller-analysis`.

## 0.40.0 — M12-S API Partner & Reseller Portal Development

- Implementato runtime `PartnerPortalModule`.
- Aggiunte entita' partner/API key/webhook/usage ledger/rate limit/live request/idempotency.
- Aggiunti controller partner portal, partner API e admin partners.
- Aggiunti servizi API key hash, usage ledger, rate limit, webhook signing e sandbox.
- Aggiunte pagine dashboard partner, API key, docs, usage, webhook, go-live e admin partners.
- Aggiunta specifica OpenAPI scaffold `apps/api/openapi/partner.v1.yaml`.
- Aggiunto QA antiregressione `qa-api-partner-reseller-development`.

## 0.41.0 — M13-A Production QA, Browser E2E & Launch Readiness Analysis

- Analizzata readiness produzione e lancio.
- Definita matrice journey critici P0/P1/P2.
- Definita strategia Playwright/browser E2E.
- Analizzato gate build/typecheck/lint/Docker.
- Analizzati smoke test Coolify e rollback.
- Analizzata readiness Stripe/PayPal sandbox e provider API.
- Definita policy seed/sandbox/production.
- Aggiunto QA antiregressione `qa-production-qa-launch-readiness-analysis`.
- Prossimo sprint: M13-P Production QA, Browser E2E & Launch Readiness Design.

## 0.42.0 — M13-P Production QA, Browser E2E & Launch Readiness Design

- Added M13-P production QA and browser E2E design blueprint.
- Added Playwright architecture blueprint and E2E test matrix.
- Added CI/artifacts, Docker/Coolify smoke, seed/fixture, payment/provider/report E2E and rollback/sign-off blueprints.
- Added `playwright.config.blueprint.ts` and E2E blueprint folder.
- Added QA script `qa-production-qa-launch-readiness-design.js`.

## 0.42.1 — SEO/GEO Customer Education Roadmap Insert

- Aggiunto modulo roadmap M14B per pagine customer education SEO/GEO.
- Aggiunti documenti per copywriting senior, garanzie operative, limiti report, FAQ, JSON-LD, sitemap e component blueprint.
- Aggiunto QA script dedicato `qa-seo-geo-customer-education-roadmap.js`.

## 0.43.0

- Added SEO/GEO CMS admin module.
- Added Tiptap-based React editor scaffold.
- Added admin pages for listing, creating and editing SEO/GEO guide pages.
- Added public `/guide/[slug]` runtime.
- Added NestJS `SeoCmsModule`, entities, DTOs and service/controller scaffold.
- Added SEO/GEO copy guardrails, publish checklist and QA script.


## 0.44.0 — M13-S Production QA, Browser E2E & Launch Readiness Development

- Aggiunto `playwright.config.ts` e suite E2E scaffold.
- Aggiunti smoke test, production gate script e healthcheck Docker/Coolify.
- Aggiunto modulo backend `LaunchReadinessModule` e pagina admin `/admin/launch-readiness`.
- Aggiunto workflow CI production QA e runbook release/rollback.
- Stato: gate implementato, produzione non ancora certificata.


## 0.45.0 — M14-A Launch Website, SEO/GEO & Commercial Readiness Analysis

Stato: completato.

Aggiunto:
- strategia sito di lancio;
- analisi SEO/GEO e intenti commerciali;
- inventory pagine e modelli contenuto;
- guardrail copy su garanzia operativa, rischio e claim vietati;
- tracking privacy-safe;
- analisi schema, metadata, sitemap e CMS governance;
- content gap e sales enablement;
- QA M14-A.

Prossimo sprint: M14-P Launch Website, SEO/GEO & Commercial Readiness Design.

## 0.46.0 — 2026-05-30

### Added
- M14-P launch website design blueprint.
- SEO/GEO page template, copy/guarantee rules, metadata/schema/sitemap rules.
- Privacy-safe conversion tracking blueprint.
- CMS editorial governance blueprint.
- Sales enablement blueprint and M14-S handoff.
- QA script `qa-launch-website-commercial-readiness-design.js`.

## 0.47.0 — M14-S Launch Website, SEO/GEO & Commercial Readiness Development

- Implementata home di lancio SEO/GEO e commerciale.
- Aggiunti componenti `launch-website`.
- Aggiunte pagine `/guide` e `/garanzia-operativa`.
- Aggiunti JSON-LD helpers, sitemap e robots metadata route.
- Aggiunto tracking placeholder privacy-safe.
- Aggiunto QA antiregressione M14-S.


## 0.49.0 — M14B-P SEO/GEO Customer Education Pages Design

- Progettato template pagine educative SEO/GEO gestite da CMS.
- Aggiunto copy deck MVP per 8 guide customer education.
- Aggiunto blueprint FAQ, schema JSON-LD e internal linking.
- Aggiunto modello campi CMS, checklist pubblicazione e claim guardrails.
- Aggiunto component blueprint pubblico/admin.
- Aggiunti registry TypeScript frontend/backend e QA script.
- Prossimo sprint: M14B-S SEO/GEO Customer Education Pages Development.

## 0.50.0 — M14B-S SEO/GEO Customer Education Pages Development

- Implementate 8 pagine educative SEO/GEO MVP come runtime strutturato e seed CMS.
- Aggiunti componenti customer education per risposta breve, checklist, limiti, FAQ, guide correlate e CTA laterale.
- Aggiornata route `/guide/[slug]` con Article, FAQPage e Breadcrumb JSON-LD.
- Aggiornato seed backend SEO CMS per pubblicare le guide MVP.
- Aggiunto QA antiregressione `qa-seo-geo-customer-education-development.js`.
- Prossimo sprint: M15-A Sales CRM, Lead Management & Support Operations Analysis.


### Build fix incluso in 0.50.0

- Corretto errore Docker/Nest build API su `AdminOperationsService.workItems`.
- Corrette incompatibilità TypeScript JSONB/cast su checks e report.
- Allineata firma `OpenapiAdapterService.estimateCost`.


## 0.52.0 — M15-P Sales CRM Design + Settings Roadmap + Web Build Fix

- Designed CRM/contact inbox/support operations blueprint.
- Added settings admin roadmap for bootstrap admin, purchase kill switch, payment/Openapi/OpenAI settings, operational error ledger and buyer IP audit.
- Fixed `DeveloperQuickstart.tsx` JSX/string newline build error.
- Added generic source syntax QA smoke check.

## 0.54.0 — M15B-A Platform Settings, Bootstrap Admin & Operational Error Ledger Analysis

- Analizzato modulo settings admin trasversale.
- Definito bootstrap admin sicuro.
- Definito kill switch acquisti server-side.
- Analizzati settings Stripe/PayPal/Openapi/OpenAI.
- Definito operational error ledger per pagamenti, provider, OpenAI, email, webhook, checkout e report.
- Definito salvataggio IP acquisto con privacy/audit.
- Aggiunto QA `qa-settings-admin-analysis.js`.
- Prossimo sprint: M15B-P Platform Settings, Bootstrap Admin & Operational Error Ledger Design.

## 0.57.0 — M16-A Analytics, Attribution & Growth Intelligence Analysis

- Aggiunta analisi analytics privacy-safe e growth intelligence.
- Definita event taxonomy per funnel, checkout, provider/OpenAI, report, CRM/supporto e SEO/GEO.
- Definito modello attribution first-touch/last-touch e content assist.
- Definita misurazione SEO/GEO per guide CMS e cluster contenuti.
- Definiti guardrail privacy: no PII, no raw payload, no card/IBAN/API key/token negli eventi.
- Aggiunto QA `qa-analytics-growth-analysis`.


## 0.57.1 — Email & Customer Notifications Roadmap Patch

- Aggiunto modulo M18 rafforzato per tutte le email tecniche cliente.
- Inclusi registrazione, verifica email, recupero password, remember-me, acquisti, pagamenti, report pronto, PDF via email/link, rimborsi, fatture, supporto e partner/API.
- Aggiunti ledger invii, webhook provider, retry, suppression e integrazione Operational Error Ledger.
- Aggiunta roadmap fino alla Release Candidate in `docs/roadmap/ROADMAP_TO_RC.md`.



## 0.59.1 - Tag Manager, Clarity & Campaign Event Roadmap

- Aggiunto modulo roadmap M16B per Google Tag Manager e Microsoft Clarity configurabili da admin/backend.
- Aggiunta tassonomia dataLayer per campagne e analisi funnel.
- Aggiunti guardrail no-PII, consenso privacy-safe, esclusione pagine sensibili e QA dedicato.


## 0.59.2

- Added M16B-A Tag Manager, Clarity & Campaign Event Tracking Analysis.
- Added admin/backend settings analysis for GTM and Clarity.
- Added Consent Mode v2 baseline, campaign event taxonomy, Clarity sensitive route denylist, and QA anti-PII checks.


## 0.59.3

- Added M16B-P Tag Manager, Clarity & Campaign Event Tracking Design.
- Added GTM/Clarity settings, consent, route guards, dataLayer and anti-PII QA blueprints.


## 0.63.0 - M18-A Email & Customer Notifications Analysis

- Added analysis for technical customer/admin emails, deliverability, PDF delivery, template/event ledger, webhook handling and email admin operations.
- Added QA script `qa-email-notifications-analysis.js`.

## 0.64.0 - M18-P Email & Customer Notifications Design

- Added blueprint for customer/admin technical email system.
- Added account, auth, remember-me, team invitation, payment, refund, report, PDF, invoice, support and partner API email designs.
- Added email delivery ledger, webhook, bounce, complaint and suppression blueprint.
- Added secure PDF link first policy.
- Added email admin monitor and provider settings blueprint.
- Added QA script for M18-P.


## 0.65.0 - M18-S Email & Customer Notifications Development

- Added email notifications runtime and admin monitor.
- Added delivery/event ledger, suppression list, secure links and provider adapter.
- Added M18-S QA checks.

## 0.66.0

- Added M19-A Sandbox Certification Analysis.
- Added sandbox certification docs for Stripe, PayPal, Openapi/provider, OpenAI, email/PDF, fixture data, error ledger, refunds and rollback.
- Added sandbox certification QA script.

## 0.68.0 - M19-S Sandbox Certification Development

- Implementato runtime backend `SandboxCertificationModule` con run, risultati, evidenze e waiver auditati.
- Aggiunto runner mock-first e static gate per certificazione sandbox senza chiamate provider reali.
- Integrato `OperationalErrorEvent` per scenari falliti o bloccati.
- Aggiunta UI admin `/admin/launch-readiness/sandbox-certification` con scenari, blocker, evidence ledger e runbook.
- Aggiunti QA `qa-sandbox-certification-development`, `sandbox-certification-static-gate` e `sandbox-certification-runner`.
- Prossimo sprint: M20-A UX, SEO, Performance & Accessibility Polish Analysis.

## 0.72.0 - M21-A RC Hardening Analysis

- Aggiunta analisi Release Candidate hardening.
- Definiti blocchi P0/P1 per build, Docker, CI, lockfile, migrazioni, provider sandbox, E2E, security/privacy, demo data e release governance.
- Aggiunti registry, baseline JSON, risk register, handoff M21-P e QA `qa-rc-hardening-analysis.js`.
- Prossimo sprint: M21-P RC Hardening Design.

## 0.73.0 - M21-P RC Hardening Design

- Aggiunti blueprint operativi per gate RC, build/typecheck/Docker/CI, dependency freeze, ENV/secrets/feature flag, demo data, migrazioni/backup/restore, provider sandbox/live cutover, osservabilita, support runbook, evidence bundle e sign-off.
- Aggiunti registry TypeScript web/API e artifact JSON `m21p-rc-hardening-design-blueprint.json`.
- Aggiunto QA `qa-rc-hardening-design.js`.
- Prossimo sprint: M21-S RC Hardening Development.

## 0.74.0 - M21-S RC Hardening Development

- Implementato runtime RC hardening con command center admin, API summary/evidence bundle, runner e production env guard.
- Aggiunti artifact `m21s-rc-gate-run.json`, `m21s-rc-evidence-bundle.json` e `m21s-production-env-guard.sample.json`.
- Aggiunti slot artifact per build/Docker, database restore, provider sandbox e Playwright reale.
- Aggiunto QA `qa-rc-hardening-development.js`.
- RC ancora blocked finche i P0 non hanno evidenze reali o waiver feature-off validi.
- Prossimo sprint: M22-A Pilot Launch & Operations Analysis.

## 0.74.11 - Docker Optional Shared Node Modules Patch 11

- Corretto il build Docker web che falliva su `COPY --from=prod-deps /app/packages/shared/node_modules` quando pnpm non generava quel path per il package shared source-only.
- Rimosse le copie fragili di `packages/shared/node_modules` dai Dockerfile web/API.
- Mantenuto il supporto workspace tramite manifest, source package, root/app `node_modules`, `transpilePackages` e path alias.
- Rafforzati `qa-docker-runtime-static-guards.js` e `qa-web-build-static-guards.js` per bloccare COPY da path opzionali/non garantiti.
- Aggiornate versioni package a `0.74.11`.

## 0.74.10 - Docker Runtime Next Root Resolution Patch 10

- Corretto runtime web Docker che continuava a fallire da `/app/server.js` con `Cannot find module 'next'`.
- Aggiunto stage `prod-deps` nel Dockerfile web per installare dipendenze production.
- Il runner web ora copia i `node_modules` da `prod-deps`, imposta `NODE_PATH=/app/node_modules:/app/apps/web/node_modules` e crea symlink root per `next`, `react`, `react-dom` e `styled-jsx` quando necessari.
- Aggiunta verifica Docker build-time/start-time `require.resolve('next')` per fallire in modo esplicito se il runtime non puo risolvere Next.
- Rafforzato `qa-docker-runtime-static-guards.js` per bloccare regressioni `MODULE_NOT_FOUND next` da root standalone server.
- Aggiornate versioni package a `0.74.10`.

## 0.74.9 - Docker Runtime Next Dependencies & TypeORM Postgres Metadata Patch 9

- Corretto runtime web Docker che avviava `/app/server.js` ma falliva con `Cannot find module 'next'`.
- Aggiunto `outputFileTracingRoot` al Next config per tracing standalone monorepo.
- Il Dockerfile web ora copia anche i `node_modules` runtime da `deps` per supportare root e monorepo standalone server.
- Corretto runtime API TypeORM/Postgres: le colonne basate su union type, literal type, type alias o indexed-access ora dichiarano esplicitamente `type: 'varchar'`.
- Corretto il caso reale `SupportTicket.category` che veniva visto da reflect-metadata come `Object`.
- Aggiunto QA `qa-api-typeorm-postgres-static-guards.js`.
- Rafforzato QA Docker runtime per intercettare anche `MODULE_NOT_FOUND next`.
- Aggiornate versioni package a `0.74.9`.

## 0.74.8 - Docker Runtime Static Guards Patch 8

- Corretto `apps/api/Dockerfile` con stage `prod-deps` per installare dipendenze production e prevenire `MODULE_NOT_FOUND: reflect-metadata`.
- Corretto `apps/web/Dockerfile` con start command robusto per `apps/web/server.js` oppure `server.js` generato da Next standalone.
- Copiati asset static/public Next in entrambi i layout runtime.
- Aggiunto `scripts/qa-docker-runtime-static-guards.js`.
- Collegato `qa:docker-runtime-static-guards` a `release:pre-zip-check`.
- Aggiornate versioni package a `0.74.8`.

## 0.74.7 - Web Build Static Guards Patch 7

- Corretto il build Docker/Next web su `EducationIntent`: i dataset customer education usavano `intent: 'informational'` ma la union type non lo dichiarava.
- Aggiunto mapping `informational -> informational` in `seo-cms-runtime`.
- Rafforzato `qa-web-build-static-guards.js` per bloccare literal runtime non dichiarati nelle union type e intent non mappati nel bridge SEO CMS.
- Prossimo sprint: M22-A Pilot Launch & Operations Analysis.

## 0.74.6 - Web Build Static Guards Patch 6

- Corretto il build Docker/Next web che non risolveva `@clientiaffidabili/shared`.
- Aggiunta dipendenza workspace `@clientiaffidabili/shared` ad `apps/web/package.json`.
- Aggiunto path alias TypeScript e `transpilePackages` Next per il package condiviso.
- Rafforzato `qa-web-build-static-guards.js` per bloccare import shared non risolvibili prima dello ZIP.
