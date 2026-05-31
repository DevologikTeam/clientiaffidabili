# Sprint M1-P — Design System Blueprint

**Prodotto:** ClientiAffidabili.it  
**Versione pacchetto:** 0.3.0  
**Tipo sprint:** Progettazione  
**Modulo:** M1 — Design System & Brand Foundation  
**Sprint precedente:** M1-A Design System Analysis  
**Sprint successivo:** M1-S Design System Implementation

## 1. Obiettivo

Trasformare l'analisi visuale e strategica del modulo M1-A in un blueprint operativo di design system riutilizzabile per tutto il progetto ClientiAffidabili.it.

Lo sprint non deve ancora completare l'intera UI definitiva, ma deve fissare le regole che guideranno ogni sviluppo futuro: token, componenti, layout, form, stati, microcopy, accessibilità, QA antiregressione e guardrail.

## 2. Decisione di direzione

La direzione approvata è **trust fintech operativo**:

- autorevole, ma non fredda;
- semplice per PMI, agenzie, consulenti e amministrazioni;
- adatta a dati sensibili, report, checkout e verifica soggetti;
- lontana da estetiche aggressive da recupero crediti;
- focalizzata sulla decisione: “posso fidarmi prima di vendere, acquistare, collaborare o concedere pagamento differito?”.

## 3. Deliverable completati

- Definizione token colore, tipografia, spaziatura, radius, shadow e stati.
- Component blueprint per bottoni, card, badge, form, notice, pricing e stati report.
- Layout blueprint per landing, catalogo servizi, checkout, dashboard, report e area admin.
- Regole microcopy per convertire linguaggio API/documentale in copy decisionale.
- Checklist QA visuale/accessibilità/antiregressione.
- Prima struttura frontend riutilizzabile in `apps/web/components/ds`.
- Showcase interno in `apps/web/app/design-system/page.tsx`.

## 4. Ambito incluso

### 4.1 Brand e token

Il logo reale usa una base blu navy e un accento azzurro. I token principali sono quindi:

- `trust-navy`: colore istituzionale e di affidabilità;
- `trust-blue`: colore operativo/CTA;
- `trust-gold`: accento premium/attenzione positiva;
- slate neutrali per superfici, testo e bordi;
- semantica rigida per esiti: success, warning, danger, info.

### 4.2 Componenti base

Componenti progettati e scaffoldati:

- Button;
- Badge;
- Card;
- SectionHeader;
- Field;
- StatusPill;
- TrustNotice;
- PriceCard;
- Checklist.

### 4.3 Stati obbligatori

Ogni area dovrà prevedere:

- loading;
- empty state;
- errore recuperabile;
- errore bloccante;
- stato in attesa;
- stato completato;
- stato con rischio;
- stato che richiede azione utente.

## 5. Regole UX vincolanti

1. Ogni pagina deve chiarire **cosa posso fare adesso** entro i primi 5 secondi.
2. Ogni CTA deve indicare un'azione specifica, non generica.
3. I termini tecnici da provider/API non devono dominare la UI cliente.
4. Le informazioni sensibili devono essere mostrate solo se utili alla decisione.
5. Ogni prezzo deve indicare cosa include, cosa non include e tempi stimati.
6. Il checkout deve sempre mostrare riepilogo, uso consentito, IVA/costi extra e conferma esplicita.
7. Ogni report deve distinguere chiaramente: esito, fonte, data, limiti, prossima azione.

## 6. Regole accessibilità

- Contrasto minimo WCAG AA.
- Focus visibile su ogni controllo.
- Nessuna informazione affidata solo al colore.
- Label sempre presenti nei form.
- Errori collegati al campo.
- Navigazione tastiera verificabile.
- Layout mobile-first per landing, checkout e report.

## 7. Guardrail prodotto

- Nessun dato demo/fake nei tenant reali.
- Nessuna verifica sensibile senza conferma uso lecito.
- Nessun prezzo hardcoded non tracciato lato backend in produzione.
- Nessun esito di affidabilità presentato come “garanzia assoluta”.
- Ogni decisione automatica deve essere spiegabile e auditabile.
- Provider esterni sostituibili tramite adapter.
- Checkout hosted o PSP compliant: non gestire carte direttamente.

## 8. Output tecnico creato

```text
apps/web/lib/design-system/tokens.ts
apps/web/lib/design-system/copy.ts
apps/web/lib/design-system/navigation.ts
apps/web/components/ds/Button.tsx
apps/web/components/ds/Badge.tsx
apps/web/components/ds/Card.tsx
apps/web/components/ds/SectionHeader.tsx
apps/web/components/ds/Field.tsx
apps/web/components/ds/StatusPill.tsx
apps/web/components/ds/TrustNotice.tsx
apps/web/components/ds/PriceCard.tsx
apps/web/components/ds/Checklist.tsx
apps/web/components/ds/index.ts
apps/web/app/design-system/page.tsx
```

## 9. Criteri di accettazione

| Area | Criterio | Stato |
|---|---|---|
| Token | Palette e semantica documentate | OK |
| Componenti | Blueprint e componenti base scaffoldati | OK |
| Layout | Template principali definiti | OK |
| Copy | Regole operative e parole vietate definite | OK |
| QA | Checklist antiregressione definita | OK |
| Accessibilità | Baseline WCAG AA definita | OK |
| Codice | Showcase interno aggiunto | OK |

## 10. Prossimo sprint

**M1-S Design System Implementation**

Obiettivo: trasformare lo scaffold in componenti realmente usati nelle pagine principali, sostituendo classi duplicate, aggiungendo test automatici, pagina catalogo componenti completa e prime verifiche responsive/accessibilità.
