# M20-A — UX, SEO, Performance & Accessibility Polish Analysis

## Obiettivo

M20-A trasforma lo stato prodotto v0.68.0 in un audit operativo pre-RC su UX, copy, SEO/GEO tecnico, performance, mobile e accessibilita. Lo sprint non cambia ancora i flussi applicativi: prepara il backlog ordinato per M20-P e M20-S.

## Perimetro analizzato

- Sito pubblico: `/`, `/servizi`, `/servizi/[slug]`, `/prezzi`, `/guide`, `/guide/[slug]`, `/garanzia-operativa`, `/contatti`, `/api`.
- Conversione: catalogo, pricing, checkout, trust/limiti, pagine post-checkout.
- Cliente: `/dashboard`, verifiche, report, fatture, profilo fiscale, team, supporto.
- Partner: dashboard partner, API docs, chiavi, usage, go-live, webhooks.
- Admin: operations, billing, provider, reports, settings, CRM, analytics, SEO pages, email notifications, OpenAI copilot, sandbox certification.
- Tecnico: `layout.tsx`, `robots.ts`, `sitemap.ts`, global CSS, design system, tracking esterno privacy-safe.

## Evidenze statiche principali

- Rilevate **72 page route** in `apps/web/app`.
- Solo **6 route** hanno metadata espliciti o `generateMetadata`.
- Sitemap e robots sono presenti; robots blocca admin/dashboard in produzione, ma manca una strategia page-level `noindex` per superfici sensibili.
- La home ha metadata, JSON-LD, copy prudente e componenti di lancio; altre pagine pubbliche chiave richiedono rifinitura.
- Alcune stringhe pubbliche sono ancora orientate a sviluppo/prodotto interno, ad esempio riferimenti a MVP, margine protetto, CMS editoriale, dashboard demo e provider mapping.
- Il catalogo e il pricing sono funzionali, ma devono diventare piu noob-ready e conversion-ready.
- Il checkout e' comprensibile per chi conosce il progetto, ma va reso piu semplice per un cliente finale.
- Le aree admin possono mantenere visibilita tecnica, ma devono restare escluse da crawling, tracking esterno e copy pubblico.

## Gap P0

| Area | Gap | Perche blocca la RC | Output richiesto in M20-P |
|---|---|---|---|
| Copy pubblico | Termini interni ancora visibili in pagine commerciali | Riduce fiducia e sembra prodotto non finito | Copy matrix con sostituzioni approvate |
| Metadata route | Pagine chiave senza metadata/canonical specifici | Indebolimento SEO/GEO e anteprime social incoerenti | Policy metadata per public/internal/sensitive |
| Noindex sensibile | Admin/dashboard/report affidati quasi solo a robots | Meglio doppio livello di protezione SEO | Strategy `robots: { index:false }` per route sensibili |
| Mobile navigation | Nav link nascosti sotto 900px senza menu alternativo | Accesso mobile incompleto | Header mobile accessibile con menu controllato |
| Checkout | Campo unico troppo generico e copy tecnico residuo | Conversione e comprensione non ottimali | Checkout copy/form blueprint con step e stati errore |
| Tabelle/listini | `role=table` su div e azioni non sempre semanticamente forti | Accessibilita e lettura assistiva da migliorare | Pattern tabella/listino accessibile |
| Performance | Nessun budget Lighthouse/Next tracciato in repo | Il polish non e' misurabile | Budget e script di misurazione per M20-S |
| Accessibility | Mancano gate axe/keyboard/focus su superfici P0 | RC non certificabile sul fronte WCAG AA | Matrice test WCAG e criteri pass/fail |

## Gap P1

- OpenGraph image e social preview non ancora sistematiche.
- Breadcrumb e schema non uniformi su servizi/prezzi/legal.
- Legal pages pubbliche senza metadata dedicati.
- Focus style legacy `.btn` meno robusto rispetto a `.ca-button`.
- Copy dashboard cliente da separare tra demo commerciale, area reale e stati vuoti.
- Tracking provider globale da misurare: anche con default disattivo effettua bootstrap client-side.
- Need di skip link e landmarks piu espliciti.
- Stati empty/error/loading da armonizzare tra dashboard, admin e checkout.

## Decisioni M20-A

1. M20 non deve introdurre nuove feature commerciali; deve rendere credibili quelle gia presenti.
2. Il copy pubblico non deve mostrare parole da sprint, implementazione, blueprint, CMS interno o margine tecnico.
3. Admin e dashboard possono restare tecnici solo dove l'utente atteso e' interno o autenticato.
4. Ogni modifica M20-S dovra avere test statico o browser: metadata, noindex, mobile nav, checkout, table semantics, accessibility smoke, performance budget.
5. Nessun dato reale, nessun provider live, nessun tracking marketing esterno senza consenso e settings validi.

## Deliverable aggiunti

- `docs/ux-seo-performance-a11y/01_SURFACE_INVENTORY_AND_JOURNEY_ANALYSIS.md`
- `docs/ux-seo-performance-a11y/02_UX_COPY_AND_TRUST_GAP_MATRIX.md`
- `docs/ux-seo-performance-a11y/03_SEO_GEO_TECHNICAL_AUDIT.md`
- `docs/ux-seo-performance-a11y/04_PERFORMANCE_BUDGET_AND_NEXTJS_AUDIT.md`
- `docs/ux-seo-performance-a11y/05_ACCESSIBILITY_WCAG_AA_AUDIT.md`
- `docs/ux-seo-performance-a11y/06_M20P_POLISH_DESIGN_HANDOFF.md`
- `apps/web/lib/ux-polish/ux-seo-performance-a11y-analysis.ts`
- `scripts/qa-ux-seo-performance-accessibility-analysis.js`

## QA M20-A

Il QA M20-A verifica presenza deliverable, coerenza con il conteggio route, presenza gap P0/P1, assenza di claim assoluti nei nuovi documenti, aggiornamento versione e handoff a M20-P.

## Stato

Sprint completato come analisi. Non sono stati eseguiti Lighthouse reale, axe reale, Playwright reale, build Next.js, Docker/Coolify o modifiche UI runtime.
