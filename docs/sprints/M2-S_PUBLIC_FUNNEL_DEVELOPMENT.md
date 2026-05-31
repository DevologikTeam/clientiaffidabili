# M2-S — Public Funnel Development

Versione pacchetto: `0.7.0`  
Tipo sprint: sviluppo  
Data: 2026-05-29

## Obiettivo

Implementare il funnel pubblico progettato in M2-P trasformando wireframe, copy e componenti in pagine Next.js reali, riutilizzabili e pronte per essere collegate nei prossimi moduli a catalogo, pricing e checkout billing.

## Output sviluppati

- Homepage pubblica riallineata al funnel decision-led.
- Pagina catalogo `/servizi` con scenario selector, categorie e trust strip.
- Route dettaglio servizio `/servizi/[slug]` con dati richiesti, output, uso consigliato e checkout entry.
- Pagina `/prezzi` con pacchetti MVP e listino singoli servizi.
- Pagina `/api` per partner e integrazioni future.
- Checkout demo aggiornato per leggere `?service=CODE` e mantenere conferma uso lecito.
- Componenti pubblici riutilizzabili in `apps/web/components/public-funnel`.
- Contenuto strutturato in `apps/web/lib/content.ts`.
- CSS responsive specifico per funnel pubblico.
- QA script `qa:public-funnel-development`.

## Componenti implementati

| Componente | Scopo |
|---|---|
| `ScenarioCard` | Fa partire il cliente dal problema da risolvere, non dall’endpoint. |
| `TrustStrip` | Espone trust/compliance signals in alto nel funnel. |
| `ReportPreview` | Mostra una preview non reale del valore del report. |
| `HowItWorks` | Spiega il flusso in 4 step. |
| `ComplianceNotice` | Ripete in modo prudente i limiti del servizio. |
| `PublicFAQ` | Gestisce obiezioni e limiti commerciali. |
| `CheckoutEntryCard` | Connette dettaglio servizio e checkout. |

## Decisioni di sviluppo

1. Il funnel resta statico/server-rendered in questa fase, così da essere veloce, SEO-friendly e facile da revisionare.
2. Il contenuto commerciale è centralizzato in `apps/web/lib/content.ts` per evitare duplicazioni tra homepage, catalogo, prezzi e checkout.
3. I dati demo mostrati nella landing sono solo preview testuali/visuali, non dati generati da verifiche reali.
4. Le note interne di margine sono presenti nel dettaglio servizio solo come scaffold da spostare in admin/backoffice nei prossimi sprint.
5. Le CTA puntano al checkout demo, ma non attivano pagamento reale o chiamate provider.

## Guardrail rispettati

- Nessun claim di pagamento garantito, solvibilità garantita o rischio zero.
- Nessuna chiave provider nel frontend.
- Nessun pagamento reale automatico.
- Conferma uso professionale lecito nel checkout.
- Copy prudente su persone fisiche, AML e compliance.
- Prezzo e output visibili prima della simulazione checkout.
- Report preview chiaramente dimostrativa.

## QA eseguito

```bash
node scripts/qa-design-system.js
node scripts/qa-public-funnel-analysis.js
node scripts/qa-public-funnel-design.js
node scripts/qa-public-funnel-development.js
```

Esito atteso: passed.

## Limiti rimasti

- Non è stato eseguito `pnpm install` o build reale perché il pacchetto è preparato come scaffold offline.
- Il checkout è ancora demo; nel modulo M4 servirà integrazione reale con provider pagamento.
- Il catalogo non è ancora database-backed; verrà affrontato in M3.
- I prezzi sono contenuti statici; regole margine, soglie e listino admin saranno progettati in M3.

## Prossimo sprint

**M3-A Service Catalog & Pricing Analysis** — analisi catalogo, bundle, marginalità, soglie, listino rivendita, regole prezzo e governance admin.
