# Component inventory analysis

## Obiettivo

Inventariare i componenti necessari prima di progettare il Design System Blueprint. Questo documento non definisce ancora il codice finale: definisce cosa dovrà essere progettato nello sprint M1-P e sviluppato nello sprint M1-S.

## Componenti foundation

| Componente | Priorità | Note UX |
|---|---:|---|
| `Button` | P0 | Varianti primary, secondary, outline, ghost, danger, link. Label sempre specifiche. |
| `TextInput` | P0 | Label visibile, helper text, error, success, disabled. |
| `Select` | P0 | Usare per tipo controllo, paese, piano, categoria. |
| `Checkbox` | P0 | Necessario per consensi e uso lecito. |
| `RadioGroup` | P1 | Scelta piano/report. |
| `Badge` | P0 | Stato ordine/report/rischio. Mai solo colore. |
| `Alert` | P0 | Info, warning, error, success con azione consigliata. |
| `Price` | P0 | Prezzo netto, IVA, diritti, totale. |
| `Stepper` | P1 | Flussi checkout e verifica. |
| `Tabs` | P1 | Report e dashboard. |
| `Table` | P1 | Storico ordini/report. Deve avere variante mobile. |
| `Modal/Drawer` | P1 | Conferme sensibili e dettagli report. |

## Componenti marketing

| Componente | Priorità | Contenuto minimo |
|---|---:|---|
| `HeroDecision` | P0 | Claim, sottotitolo, CTA primaria, proof verificabile. |
| `ServiceCard` | P0 | Nome, domanda, input, output, prezzo, tempo, CTA. |
| `ServiceComparison` | P1 | Base vs Pro vs Monitoraggio. |
| `TrustDisclosure` | P0 | Fonte, tempi, limiti, privacy. |
| `FAQAccordion` | P1 | Domande su tempi, fonti, IVA, privacy, rimborsi. |
| `PricingBlock` | P0 | Pay-per-use, crediti, pacchetti. |
| `UseCaseCard` | P1 | Agenzie immobiliari, studi legali, fornitori, ecommerce B2B. |

## Componenti checkout

| Componente | Priorità | Contenuto minimo |
|---|---:|---|
| `CheckoutSummary` | P0 | Servizio, input, output, prezzo, tempi. |
| `PriceBreakdown` | P0 | Imponibile, IVA, diritti, totale, note. |
| `LegalUseConfirmation` | P0 | Checkbox + testo leggibile. |
| `PaymentStatus` | P0 | In attesa, pagato, fallito, rimborsato. |
| `OrderTimeline` | P1 | Creato, pagato, richiesto provider, pronto, consegnato. |
| `ProviderDelayNotice` | P1 | Per servizi non real-time. |

## Componenti applicativi

| Componente | Priorità | Contenuto minimo |
|---|---:|---|
| `DashboardKpiStrip` | P0 | Credito, report pronti, report in attesa, errori. |
| `RecentChecksList` | P0 | Storico controlli. |
| `RecommendedAction` | P1 | Prossimo controllo suggerito. |
| `ReportRiskSummary` | P0 | Livello, score, motivi, azione. |
| `ReportEvidenceList` | P0 | Evidenze ordinate per importanza. |
| `ReportLimitations` | P0 | Fonti, data, disclaimer, uso consentito. |
| `AuditTrailMini` | P1 | Eventi chiave report/ordine. |

## Stati obbligatori per ogni componente interattivo

- default;
- hover;
- active/pressed;
- focus-visible;
- disabled;
- loading;
- error se applicabile;
- success se applicabile.

## Stato pagine obbligatorio

Ogni pagina o flusso deve avere:

- loading state;
- empty state;
- error state;
- permission/authorization state;
- unavailable/provider down state;
- success state;
- mobile state.

## Regola “no componenti muti”

Ogni componente che mostra blocco, errore o warning deve spiegare:

1. cosa è successo;
2. perché importa;
3. cosa può fare l’utente adesso.
