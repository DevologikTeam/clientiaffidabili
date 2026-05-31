
## v0.75.6 — Local Network Access Prompt Fix

- Rimosse chiamate browser dirette verso API locali/interne.
- Aggiunta route same-origin `/api/analytics/public-config`.
- Rimosso `NEXT_PUBLIC_API_URL` da Docker/compose web.
- Aggiunto `qa-local-network-access-guards`.

## 0.75.5 - Browser Permission Prompt Guard

- Disabilitati prompt browser automatici legati a credenziali/passkey sulle pagine pubbliche.


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

- Logo pubblico reso leggibile con mark + wordmark.
- Riscritti home, servizi e prezzi per cliente finale.
- Aggiunto QA `qa-public-copy-trust-polish`.

## 0.74.19 - Local Browser Reachable Preflight Patch 18

- `pnpm qa:coolify-preflight` usa ora `docker-compose.yml` di default e pubblica le porte host.
- Aggiunta modalita strict Coolify-like con `pnpm qa:coolify-preflight:strict`.
- Health locale in modalita `both`: container + host/browser.

## 0.74.16 - Docker Build Context Hygiene & pnpm CLI Shim Fix

- Added `.dockerignore` to keep host `node_modules`, `.next`, `dist`, and cache files out of Docker Linux builders.
- Verified Nest and Next CLI targets inside Docker builder stages before running builds.
- Fixed web runner CMD quoting for `require.resolve('next')`.
- Extended Docker/Coolify QA guards for host artifact overwrite regressions.

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

# 0.74.10 — Docker Runtime Next Root Resolution Patch 10

- Corretto runtime web Docker che continuava a fallire con `Cannot find module 'next'` da `/app/server.js`.
- Aggiunto stage `prod-deps` nel Dockerfile web e copia runtime deps production.
- Impostato `NODE_PATH=/app/node_modules:/app/apps/web/node_modules`.
- Aggiunti symlink root per `next`, `react`, `react-dom` e `styled-jsx` quando il package esiste solo in `apps/web/node_modules`.
- Aggiunta verifica `require.resolve('next')` nella build del runner e prima dell'avvio server.
- Rafforzato `qa-docker-runtime-static-guards` contro regressioni `MODULE_NOT_FOUND next`.

# 0.74.5 — Web Build Static Guards Patch 5

- Corretto blocco Docker/Next su `apps/web/components/billing/SubscriptionPlanCard.tsx` dovuto a `Checklist className` non dichiarata nel contratto props.
- Reso `Checklist` compatibile con `className` mantenendo la classe base `ca-checklist`.
- Esteso il supporto `className` a componenti design-system gia usati nelle pagine: `Alert`, `Badge`, `KeyValueList`, `PageHero`, `PriceCard`, `ProgressBar`, `SectionHeader`, `StatCard`, `StatusPill`, `Stepper`, `TrustNotice`.
- Esteso `qa-web-build-static-guards` con controllo generico sui componenti DS usati con `className` senza props compatibili.
- Aggiornato artifact `artifacts/qa/web-build-static-guards-latest.json` con il nuovo guard `Design system className usages must be backed by props contracts`.

# 0.74.4 — Web Build Static Guards Patch 4

- Corretto blocco Docker/Next su `apps/web/app/admin/reports/page.tsx` dovuto a callback `DataTable` con `render: (row) => ...` senza tipo esplicito in strict mode.
- Annotate le callback `DataTable render` inline con parametro tipizzato per evitare regressioni `Parameter ... implicitly has an any type`.
- Corretto refuso nel contratto `DataTable`: `ReadonlyReadonlyArray` → `ReadonlyArray`.
- Esteso `qa-web-build-static-guards` con controllo generico contro callback `render` non tipizzate e refusi `ReadonlyReadonlyArray`.
- Aggiornato artifact `artifacts/qa/web-build-static-guards-latest.json` con il nuovo guard `DataTable render callbacks must not recreate implicit-any build failures`.

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

## 0.37.0 — M11-S Authentication, Accounts & Team Management Development

- Implementato runtime auth/account/team.
- Aggiunti backend module, entita, servizi, controller, UI e QA M11-S.

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


## 0.23.0 — M8-A Admin Operations Analysis

- Analizzata console interna Admin Operations queue-first.
- Definite code operative per pagamenti, provider, report, fatture, rimborsi, supporto e anomalie.
- Definita IA admin con home operations, ordini, billing, provider, report, supporto e audit.
- Definita matrice ruoli/permessi MVP e regole RBAC.
- Definiti audit event obbligatori e guardrail per azioni critiche.
- Definito data model preliminare `AdminWorkItem`, `AdminActionRequest`, `AdminAuditEvent`.
- Aggiunti file TypeScript di analisi backend/frontend.
- Aggiunto QA antiregressione `qa-admin-operations-analysis`.

## 0.15.0 — M5-P Provider Integration Design

- Completato sprint di progettazione provider integration.
- Aggiunto blueprint adapter `ProviderAdapter` Openapi-first e multi-provider-ready.
- Aggiunto blueprint data model provider: request, eventi, cost ledger e raw payload vault.
- Aggiunto registry mapping servizi MVP con versioning e production disabled di default.
- Aggiunti blueprint lifecycle post-payment, callback, polling e idempotenza.
- Aggiunti blueprint DTO/evidence normalizzati, admin operations, security/secrets/retention e handoff M5-S.
- Aggiunti tipi condivisi e file TypeScript di design backend/frontend.
- Aggiunto QA statico `qa:provider-integration-design`.
- Aggiornate versioni pacchetto a `0.15.0`.

# Changelog


## 0.59.4 — M16B-S Tag Manager, Clarity & Campaign Event Tracking Development

- Implementato endpoint pubblico redatto `/analytics/public-config`.
- Aggiunti settings admin `analytics.*` per GTM, Clarity, consenso e route policy.
- Aggiunto loader frontend GTM/Clarity con default sicuro e route denylist.
- Aggiunto helper `pushCampaignEvent` con payload sanitizer anti-PII.
- Aggiunta pagina `/admin/settings/analytics`.
- Aggiunto QA anti hardcoded tracking ID e anti PII.


## 0.13.0 — M4-S Checkout & Billing Development

- Completato sprint di sviluppo checkout e billing.
- Implementate entità TypeORM `BillingProfile`, `CheckoutSession`, `Payment`, `PaymentLedgerEntry`, `PaymentWebhookEvent`, `Invoice`.
- Aggiunto `PaymentProviderAdapter` con modalità mock e Stripe-ready.
- Implementata creazione checkout session da ordine valido.
- Implementato webhook pagamento idempotente con ledger append-only.
- Implementata fattura pending manual-assisted dopo pagamento confermato.
- Aggiunti componenti UI checkout e pagine `/checkout/success`, `/checkout/cancel`, `/admin/billing`.
- Aggiunto script `qa:checkout-billing-development`.
- Aggiornate versioni pacchetto a `0.13.0`.

## 0.12.0 — M4-P Checkout & Billing Design

- Completato sprint di progettazione checkout e billing.
- Disegnato flusso checkout cliente step-by-step con dati soggetto, billing profile, conferme legali e hosted checkout.
- Disegnato data model `CheckoutSession`, `Payment`, `PaymentLedgerEntry`, `BillingProfile`, `Invoice`, `PaymentWebhookEvent`.
- Definiti API contract per ordini, sessioni checkout, webhook provider, rimborsi e admin billing queue.
- Definita pipeline webhook firmata, idempotente e append-only ledger.
- Definito workflow fatturazione MVP manual-assisted con futura evoluzione contabile/SDI.
- Definite code admin per pagamenti pendenti, webhook falliti, fatture, rimborsi e dispute.
- Definiti copy email transazionali e componenti UI checkout/admin da sviluppare in M4-S.
- Aggiunto blueprint TypeScript `apps/web/lib/billing/checkout-design.ts`.
- Aggiunto script `qa:checkout-billing-design`.
- Aggiornate versioni pacchetto a `0.12.0`.

## 0.11.0 — M4-A Checkout & Billing Analysis

- Completato sprint di analisi checkout e billing.
- Selezionato Stripe Checkout hosted come provider MVP con adapter provider-ready.
- Definiti stati ordine, pagamento, fattura, rimborso e dispute.
- Definito ledger finanziario concettuale e regole di riconciliazione.
- Definiti webhook firmati, idempotenza e blocco doppia esecuzione provider.
- Analizzato impatto commissioni pagamento su margini e price guard.
- Definiti guardrail checkout per uso lecito, KYB e servizi high-risk.
- Aggiunto blueprint TypeScript `apps/web/lib/billing/checkout-analysis.ts`.
- Aggiunto script `qa:checkout-billing-analysis`.
- Aggiornate versioni pacchetto a `0.11.0`.

## 0.10.0

- Implementato M3-S Service Catalog & Pricing Development.
- Aggiunti catalogo frontend, componenti servizio, price snapshot, price guard backend e preview admin catalog.

# Changelog


## 0.59.4 — M16B-S Tag Manager, Clarity & Campaign Event Tracking Development

- Implementato endpoint pubblico redatto `/analytics/public-config`.
- Aggiunti settings admin `analytics.*` per GTM, Clarity, consenso e route policy.
- Aggiunto loader frontend GTM/Clarity con default sicuro e route denylist.
- Aggiunto helper `pushCampaignEvent` con payload sanitizer anti-PII.
- Aggiunta pagina `/admin/settings/analytics`.
- Aggiunto QA anti hardcoded tracking ID e anti PII.


## 0.9.0 — M3-P Service Catalog & Pricing Design

- Completato sprint di progettazione catalogo servizi e pricing.
- Definita esperienza pubblica catalogo per scenari e non per endpoint tecnici.
- Definito admin catalog con stati draft/review/published/paused/assisted/archived.
- Definito price guard con soglie, blocchi, warning e override super admin.
- Definito snapshot prezzo checkout/ordine per preservare prezzo, versione prodotto e disclaimer.
- Definito copy pubblico dei servizi MVP con linguaggio prudente e anti-claim.
- Definita tabella prezzi/bundle/add-on e regole di suggerimento in checkout.
- Aggiunto `apps/web/lib/catalog/catalog-blueprint.ts` come blueprint TypeScript per M3-S.
- Aggiunto script `qa:service-catalog-pricing-design`.
- Aggiornate versioni pacchetto a `0.9.0`.


## 0.8.0 — M3-A Service Catalog & Pricing Analysis

- Completato sprint di analisi catalogo servizi e pricing.
- Selezionati prodotti MVP: Verifica azienda essenziale, Check Affidabilità Pro, Pro + Bilancio, KYB Compliance, Verifica IBAN, Verifica email/telefono.
- Definiti costi provider stimati, prezzi consigliati, margini target e soglie minime.
- Documentata strategia bundle/add-on e posizionamento competitor.
- Definiti guardrail admin per prezzi sotto costo, servizi high-risk e separazione pubblico/privato.
- Aggiunta analisi data model catalogo/prezzi e snapshot prezzo ordine.
- Aggiunto file `apps/web/lib/catalog/pricing-analysis.ts` come baseline seed/analisi.
- Aggiunto script `qa:service-catalog-pricing-analysis`.
- Aggiornate versioni pacchetto a `0.8.0`.


## 0.7.0 — M2-S Public Funnel Development

- Completato sprint di sviluppo del funnel pubblico.
- Implementate pagine `/`, `/servizi`, `/servizi/[slug]`, `/prezzi`, `/api`.
- Aggiornato checkout demo con query `service` e conferma uso lecito.
- Aggiunti componenti pubblici: ScenarioCard, TrustStrip, ReportPreview, HowItWorks, ComplianceNotice, PublicFAQ, CheckoutEntryCard.
- Arricchito `apps/web/lib/content.ts` con scenari, FAQ, pacchetti, slug, output e dati richiesti.
- Aggiunto CSS responsive per funnel pubblico.
- Aggiunto script `qa:public-funnel-development`.
- Aggiornate versioni pacchetto a `0.7.0`.

## 0.6.0 — M2-P Public Funnel Design

- Completato sprint di progettazione del funnel pubblico.
- Aggiunti wireframe homepage/catalogo/dettaglio/prezzi.
- Definita architettura pagina-per-pagina per homepage, servizi, dettaglio servizio, prezzi, API e checkout entry.
- Definiti componenti funnel da sviluppare in M2-S.
- Aggiunto copy MVP finale per hero, scenari, trust strip, pacchetti e FAQ.
- Aggiunta UI spec pubblica e matrice QA design funnel.
- Aggiunti eventi analytics privacy-safe senza PII.
- Aggiunto blueprint TypeScript in `apps/web/lib/public-funnel/blueprint.ts`.
- Aggiunto script `qa:public-funnel-design`.
- Aggiornate versioni pacchetto a `0.6.0`.

## 0.5.0 — M2-A Public Funnel Analysis

- Completato sprint di analisi del funnel pubblico.
- Aggiunti documenti marketing su audit funnel, posizionamento, conversion architecture, information architecture, trust/compliance, checkout entry e SEO/GEO.
- Aggiunto copy brief per hero, scenario selector, trust strip, report preview e FAQ.
- Aggiunte note competitor M2-A su Openapi, Cerved, CRIF e Creditsafe.
- Aggiunta matrice QA del funnel pubblico.
- Aggiunto script `qa:public-funnel-analysis`.
- Aggiornate versioni pacchetto a `0.5.0`.

## 0.3.0 — M1-P Design System Blueprint

- Completato sprint di progettazione M1-P.
- Aggiunti documenti blueprint per token, componenti, layout, form/checkout, microcopy e QA design system.
- Aggiunta ADR-001 per formalizzare la decisione di design system proprietario.
- Aggiunta matrice QA antiregressione per componenti, checkout, report e copy.
- Scaffoldati componenti React riutilizzabili in `apps/web/components/ds`.
- Aggiunta route interna `/design-system` con preview di token, bottoni, stati, form, notice e pricing card.
- Aggiornati manifest, roadmap status e package version a `0.3.0`.

## 0.2.0 — M1-A Design System Analysis

- Completata analisi senior di logo, bozze HTML sito/flusso e direzione visuale.
- Aggiunti documenti di brand identity audit, visual direction, component inventory, accessibilità/QA e microcopy.
- Confermata direzione UI: trust fintech operativo.
- Riallineata palette proposta ai colori reali del logo (`#083858`, `#3088C0`).
- Aggiornata roadmap: prossimo sprint M1-P Design System Blueprint.
- Aggiornati manifest e package version a `0.2.0`.

## 0.1.0 — Foundation package

- Creato monorepo Next.js + NestJS + PostgreSQL/TypeORM.
- Inclusi loghi e bozze HTML originali come reference.
- Aggiunta documentazione strategica, design system, architettura, QA, guardrail, roadmap e Coolify.
- Creati flussi demo: landing, servizi, checkout, dashboard, report.
- Creati moduli backend iniziali: products, orders, checks, provider, billing, reports, audit.

## 0.4.0 — M1-S Design System Implementation

- Implementata prima libreria UI React riutilizzabile.
- Aggiunti componenti Alert, DataTable, EmptyState, KeyValueList, PageHero, ProgressBar, StatCard e Stepper.
- Aggiornata route interna `/design-system` come showroom MVP.
- Riallineata homepage ai componenti del design system.
- Aggiunto script QA antiregressione `qa:design-system`.
- Aggiornata documentazione sprint, QA e release.

## 0.14.0 — M5-A Provider Integration Analysis

- Aggiunta strategia provider Openapi-first.
- Aggiunto mapping servizi MVP verso provider candidati.
- Aggiunto lifecycle provider request post-payment.
- Aggiunti cost tracking, error taxonomy, retry/fallback e normalizzazione evidenze.
- Aggiunta security/privacy/compliance analysis provider.
- Aggiunta admin operations analysis e readiness checklist M5-P/M5-S.
- Aggiunti tipi condivisi e costanti TypeScript di analisi provider.
- Aggiunto QA statico `qa:provider-integration-analysis`.

## 0.17.0 - M6-A Report Composer Analysis

- Aggiunta analisi modulo Report Composer.
- Definite sezioni report MVP, evidence model, scoring prudente e copy compliance.
- Definiti admin review, snapshot immutabile, export/download analysis e QA.
- Aggiornata roadmap verso M6-P/M6-S.

## 0.19.0 - M6-S Report Composer Development

- Runtime report composer con snapshot, score prudente, evidenze, fonti e limiti.
- UI customer report e admin queue.
- Addendum payment strategy Stripe/PayPal + subscription.

## 0.20.0 — M7-A Customer Dashboard Analysis

- Aggiunta analisi completa customer dashboard.
- Aggiornata roadmap status a M7-P come prossimo sprint.
- Aggiunta release note 0.20.0 e QA report M7-A.

## 0.21.0 — M7-P Customer Dashboard Design

- Completato sprint di progettazione area cliente.
- Definita dashboard post-acquisto con prossima azione, verifiche recenti, report pronti, ordini/fatture e supporto.
- Definiti blueprint per storico verifiche, dettaglio verifica, report access, download futuro, billing e subscription future-ready.
- Aggiunti API contract customer e componenti UI da sviluppare in M7-S.
- Aggiunto QA antiregressione `qa-customer-dashboard-design`.


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

## 0.41.0 — M13-A Production QA, Browser E2E & Launch Readiness Analysis

- Aggiunti documenti `docs/launch-readiness`.
- Aggiunti scaffold analysis API/Web.
- Aggiunto script QA M13-A.

## 0.42.0 — M13-P Production QA, Browser E2E & Launch Readiness Design

- Progettato il gate produzione M13-P.
- Progettata architettura Playwright e matrice E2E.
- Progettati smoke test Docker/Coolify, CI artifact, seed policy e rollback/sign-off.

## 0.42.1 — SEO/GEO Customer Education Roadmap Insert

- Inserita la nuova macro-direzione M14B per contenuti SEO/GEO educativi lato cliente.
- Definiti guardrail copy: garanzie operative, limiti espliciti, nessun claim assoluto.
- Aggiunti blueprint e runtime registry per future pagine `/guide/...`.


## 0.44.0 — M13-S Production QA, Browser E2E & Launch Readiness Development

- Implementato gate QA/lancio con Playwright scaffold, smoke test, healthcheck, CI workflow e runbook.
- Aggiunti file runtime `LaunchReadinessModule` e pagina admin dedicata.
- Produzione ancora bloccata fino a build/E2E/smoke reali.


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

## 0.46.0 — M14-P Launch Website, SEO/GEO & Commercial Readiness Design

Completato blueprint sito di lancio SEO/GEO, garanzia operativa, CMS governance, metadata/schema/sitemap, tracking privacy-safe e handoff sviluppo.

## 0.47.0 — M14-S Launch Website, SEO/GEO & Commercial Readiness Development

- Implementata home di lancio SEO/GEO e commerciale.
- Aggiunti componenti `launch-website`.
- Aggiunte pagine `/guide` e `/garanzia-operativa`.
- Aggiunti JSON-LD helpers, sitemap e robots metadata route.
- Aggiunto tracking placeholder privacy-safe.
- Aggiunto QA antiregressione M14-S.


## 0.49.0 — M14B-P SEO/GEO Customer Education Pages Design

- Blueprint operativo per customer education SEO/GEO.
- Copy deck MVP, schema, internal linking, CMS field model e claim guardrails.
- Handoff M14B-S pronto.

## 0.51.0 — M15-A Sales CRM, Lead Management & Support Operations Analysis

- Aggiunta analisi CRM commerciale e support operations.
- Definiti lead, opportunità, ticket, attività e pipeline MVP.
- Definiti form pubblici, consensi, anti-abuse e guardrail privacy.
- Definita integrazione con SEO/GEO pages, checkout, dashboard, partner portal e admin operations.
- Aggiunto QA statico M15-A.

## 0.54.0 — M15B-A Platform Settings, Bootstrap Admin & Operational Error Ledger Analysis

- Analizzato modulo settings admin trasversale.
- Definito bootstrap admin sicuro.
- Definito kill switch acquisti server-side.
- Analizzati settings Stripe/PayPal/Openapi/OpenAI.
- Definito operational error ledger per pagamenti, provider, OpenAI, email, webhook, checkout e report.
- Definito salvataggio IP acquisto con privacy/audit.
- Aggiunto QA `qa-settings-admin-analysis.js`.
- Prossimo sprint: M15B-P Platform Settings, Bootstrap Admin & Operational Error Ledger Design.


## 0.59.1 - Tag Manager, Clarity & Campaign Event Roadmap

- Aggiunto modulo roadmap M16B per Google Tag Manager e Microsoft Clarity configurabili da admin/backend.
- Aggiunta tassonomia dataLayer per campagne e analisi funnel.
- Aggiunti guardrail no-PII, consenso privacy-safe, esclusione pagine sensibili e QA dedicato.


## 0.59.2

- Completato M16B-A Tag Manager, Clarity & Campaign Event Tracking Analysis.


## 0.59.3

- Completato M16B-P Tag Manager, Clarity & Campaign Event Tracking Design.


## 0.63.0 - M18-A Email & Customer Notifications Analysis

- Added analysis for technical customer/admin emails, deliverability, PDF delivery, template/event ledger, webhook handling and email admin operations.
- Added QA script `qa-email-notifications-analysis.js`.

## 0.64.0 - M18-P Email & Customer Notifications Design

- Progettato sistema email event-driven.
- Progettati template tecnici cliente/admin.
- Progettato delivery ledger, provider webhook, retry, bounce, complaint e suppression.
- Progettata consegna PDF via link sicuro e allegato policy-driven.
- Progettato admin monitor email.


## 0.65.0 - M18-S Email & Customer Notifications Development

- Added email notifications runtime and admin monitor.
- Added delivery/event ledger, suppression list, secure links and provider adapter.
- Added M18-S QA checks.

## 0.66.0

- Completato M19-A Sandbox Certification Analysis.
- Aggiunti documenti e QA per certificazione sandbox verso RC.

## 0.68.0 - M19-S Sandbox Certification Development

- Runtime mock-first per sandbox certification.
- Backend module, entities, endpoints, waiver, evidence ledger e Operational Error Ledger integration.
- Admin UI launch readiness per scenari, blocker, evidenze e runbook.
- Runner CLI/static gate/QA dedicati.

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

- Runtime RC hardening operativo.
- Command center admin `/admin/launch-readiness/rc-hardening`.
- API summary/evidence bundle.
- Runner ed env guard per produzione.
- Evidence bundle bloccante e slot artifact per prove reali.
- Prossimo sprint: M22-A Pilot Launch & Operations Analysis.

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
