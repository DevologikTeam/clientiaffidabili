# 05 — Accessibility WCAG AA Audit

## Scopo

Preparare un audit WCAG AA pragmatico per le superfici P0. M20-A non esegue axe, browser test o screen reader reale.

## Rischi rilevati

| Area | Evidenza | Rischio | Priorita |
|---|---|---|---|
| Skip link | Non presente nel root layout | Utenti tastiera devono saltare header ripetuto | P0 |
| Header mobile | Nav link nascosti sotto 900px | Mancanza menu alternativo mobile | P0 |
| Focus legacy | `.btn` legacy non ha focus-visible dedicato | Focus meno chiaro su componenti non DS | P1 |
| Pricing table | `div role=table` senza ruoli cell/header completi | Lettura screen reader fragile | P0 |
| Checkout form | Campo unico e sezioni non raggruppate in `fieldset` | Comprensione e validazione da migliorare | P0 |
| Error summary | Non standardizzato | Errori form non sempre annunciabili | P0 |
| Reduced motion | Hover/transform globali senza media query | Utenti sensibili al movimento | P1 |
| Landmarks | Main presente, ma serve coerenza su admin/dashboard | Navigazione assistiva migliorabile | P1 |
| Status badges | Colore + testo presenti in molti casi | Positivo, ma serve verifica contrasto | P1 |

## Test matrix M20-P/M20-S

| Route | Test tastiera | Axe | Mobile | Screen reader smoke | Priorita |
|---|---|---|---|---|---|
| `/` | si | si | si | headline/CTA | P0 |
| `/servizi` | si | si | si | card/CTA | P0 |
| `/prezzi` | si | si | si | tabella/listino | P0 |
| `/checkout` | si | si | si | form/errori/conferme | P0 |
| `/guide/[slug]` | si | si | si | article/FAQ | P1 |
| `/dashboard` | si | si | si | stato/prossima azione | P1 |
| `/reports/[id]` | si | si | si | report sections | P1 |
| `/admin/launch-readiness/sandbox-certification` | si | si | desktop/tablet | tabelle/evidenze | P1 |

## Acceptance criteria

- Skip link visibile al focus e collegato al main content.
- Header mobile con menu accessibile, stato `aria-expanded`, chiusura tastiera e focus management minimo.
- Tabelle pricing/admin con semantica nativa o ruoli completi.
- Form checkout con fieldset/legend, descrizioni, error summary e `aria-describedby`.
- Focus visibile su tutti i componenti interattivi.
- Nessuna azione solo colore.
- Motion ridotta quando `prefers-reduced-motion` e' attivo.
- Axe smoke senza violazioni critiche sulle route P0.

## Handoff a design

M20-P deve produrre component blueprint, non solo lista bug: `AccessibleHeader`, `SkipLink`, `MetadataPolicy`, `AccessiblePriceTable`, `CheckoutFormStepper`, `ErrorSummary`, `NoindexRoutePolicy`.
