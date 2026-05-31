# M1-S — Design System Implementation

Versione progetto: `0.4.0`  
Tipo sprint: sviluppo  
Modulo: `M1 Design System Foundation`

## Obiettivo

Trasformare il blueprint del design system in una prima implementazione reale e riutilizzabile dentro il frontend Next.js.

Lo sprint non deve limitarsi alla documentazione: deve introdurre componenti React, classi CSS, pagina demo interna e controlli QA minimi per impedire regressioni grossolane.

## Deliverable completati

- Libreria componenti in `apps/web/components/ds`.
- Route interna `/design-system` aggiornata come showroom del sistema UI.
- Homepage riallineata ai componenti del design system.
- Header e card servizi convertiti progressivamente verso componenti `ca-*`.
- Script QA antiregressione `scripts/qa-design-system.js`.
- Comando root `pnpm qa:design-system`.
- Documentazione tecnica e QA aggiornata.

## Componenti implementati

| Componente | Uso |
|---|---|
| `Alert` | Messaggi operativi, limiti, blocchi e avvisi compliance. |
| `Badge` | Categorie, delivery time, tag informativi. |
| `Button` | CTA primarie/secondarie/ghost/danger. |
| `Card` | Container standard con varianti. |
| `Checklist` | Inclusioni servizi, requisiti, pre-checkout. |
| `DataTable` | Tabelle dashboard/report con caption accessibile. |
| `EmptyState` | Stati senza dati con prossima azione. |
| `Field` | Input con label, help, error e `aria-invalid`. |
| `KeyValueList` | Riepiloghi report, checkout, dati azienda. |
| `PageHero` | Hero coerente per landing e pagine principali. |
| `PriceCard` | Card commerciale servizio/prezzo. |
| `ProgressBar` | Completezza dati, avanzamento processo, KPI. |
| `SectionHeader` | Titoli sezione coerenti. |
| `StatCard` | KPI dashboard e report. |
| `StatusPill` | Stati leggibili con testo e simbolo. |
| `Stepper` | Flussi guidati checkout/report/onboarding. |
| `TrustNotice` | Note fiducia, legalità, limiti, fonti. |

## Guardrail applicati

1. Nessuno stato affidato solo al colore.
2. Ogni componente sensibile espone testo leggibile.
3. Il cliente non vede concetti tecnici come provider, endpoint, raw payload o margine.
4. Le pagine demo devono restare chiaramente demo/interne.
5. Ogni CTA primaria deve indicare l'azione specifica, non label generiche.
6. La UI non promette affidabilità assoluta: parla di verifiche, segnali, limiti e supporto decisionale.

## QA eseguito nello sprint

Comando:

```bash
node scripts/qa-design-system.js
```

Esito atteso:

```text
Design system QA passed. Components, tokens, exports and internal showcase are present.
```

## Criteri di accettazione

- La route `/design-system` mostra componenti e stati principali.
- La homepage usa `PageHero`, `Button`, `Card`, `Stepper`, `Alert`, `StatCard` e altri componenti base.
- Lo script QA fallisce se mancano componenti, token CSS, export o showroom.
- Il pacchetto resta avviabile come scaffold Next.js/NestJS/Docker/Coolify.

## Note per lo sprint successivo

Il prossimo modulo può iniziare il lavoro sul funnel pubblico usando componenti già consolidati. Qualsiasi nuova pagina dovrà riutilizzare i componenti del design system, evitando nuove classi isolate salvo necessità documentata.
