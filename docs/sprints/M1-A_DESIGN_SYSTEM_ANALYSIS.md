# Sprint M1-A — Design System Analysis

Versione pacchetto: **0.2.0**  
Tipo sprint: **Analisi**  
Modulo: **M1 — Brand, Design System e UI Kit**  
Output: decisioni di direzione visuale, inventario componenti, criteri UX, vincoli accessibilità, backlog per M1-P.

## 1. Obiettivo dello sprint

Lo sprint M1-A serve a evitare che ClientiAffidabili.it cresca come insieme di pagine isolate. Prima di progettare e sviluppare componenti, viene definita una direzione di design coerente con:

- dominio e promessa: **aiutare imprese e professionisti a scegliere clienti, fornitori e partner più affidabili**;
- categoria: business information, check affidabilità, report e servizi API/documentali;
- percezione richiesta: fiducia, controllo, semplicità, professionalità, non burocrazia;
- stack già impostato: Next.js pubblico/area riservata, NestJS API, Postgres, checkout e provider adapter;
- asset esistenti: logo kit e bozze HTML sito/flusso.

Il risultato non è ancora una libreria componenti definitiva. Il risultato è una **base analitica vincolante** per lo sprint successivo M1-P.

## 2. Materiali analizzati

| Materiale | Percorso | Esito |
|---|---|---|
| Logo kit | `assets/logos/` | Usabile come base brand, da normalizzare in versioni responsive e dark/light. |
| Bozza sito pubblico | `docs/reference/legacy-prototype-sito/` | Buona struttura marketing iniziale, ma da rendere meno generica e più decisionale. |
| Bozza flusso applicativo | `docs/reference/legacy-prototype-flusso/` | Buona base per dashboard/report/checkout, ma serve una UI più premium e meno prototipale. |
| Strategia Foundation | `docs/00_STRATEGIA_EXECUTIVE.md` | Conferma posizionamento “decision platform”, non solo rivendita visure. |
| Pricing/business logic | `docs/03_BUSINESS_LOGIC_E_PRICING.md` | Il design deve sostenere margine, bundle e percezione del valore, non mostrare solo costo documento. |
| Guardrail | `docs/07_GUARDRAIL_COMPLIANCE_SECURITY.md` | Il design deve rendere visibili trasparenza, uso lecito, consensi e limiti dei report. |

## 3. Benchmark visuale e posizionamento

Dall’analisi dei player di categoria emergono tre famiglie visuali:

1. **Enterprise istituzionale**: grandi operatori come Cerved e CRIF comunicano solidità, soluzioni ampie, mercati verticali e decision intelligence. Sono autorevoli ma spesso densi, con linguaggio corporate.
2. **Report/risk platform commerciale**: operatori come Creditsafe puntano su immediatezza, report aziendali, monitoraggio, dati integrati e trial/prova gratuita. Sono più orientati alla conversione.
3. **API marketplace/documenti**: Openapi privilegia catalogo, prezzo per chiamata, evasione e categorie API. È molto chiaro sul servizio, ma meno differenziante come esperienza consulenziale.

ClientiAffidabili.it deve stare in mezzo: **chiarezza da API marketplace + fiducia da business information + UX semplice da tool self-service**.

### Decisione di posizionamento UI

Non dobbiamo sembrare:

- un clone di portale visure;
- una dashboard bancaria troppo fredda;
- un e-commerce di documenti ufficiali senza valore interpretativo;
- un sito “finto enterprise” pieno di claim non dimostrati.

Dobbiamo sembrare:

- una piattaforma che guida l’utente a capire **quale controllo fare, perché farlo, quanto costa, cosa riceverà e cosa potrà decidere dopo**;
- un prodotto B2B pulito, credibile, con report leggibili e checkout senza ambiguità;
- un servizio che dichiara sempre fonte, tempi, prezzo, limiti e uso lecito.

## 4. Diagnosi logo e identità

Il logo usa due colori reali dominanti:

| Colore osservato | Uso consigliato |
|---|---|
| `#083858` circa | brand navy primario, header, testi forti, elementi trust. |
| `#3088C0` circa | accento azione, check, link, focus, elementi progresso. |

La forma “check + cerchio aperto” comunica:

- verifica;
- controllo completato;
- affidabilità misurabile;
- processo in corso, non giudizio assoluto.

Questo è coerente con il prodotto. Va però evitato l’abuso del check come promessa “garantita”: nei report di rischio il design deve parlare di **indicatori, fonti, evidenze e livello di attenzione**, non di certezza assoluta.

## 5. Analisi bozze HTML

### Punti forti

- Palette già coerente con il logo.
- Navigazione pubblica comprensibile: azienda, servizi, prezzi, risorse, login.
- Flussi chiave presenti: servizi, checkout, dashboard, report persona/azienda.
- Uso di card e griglie semplice da portare in Next.js.
- Copy orientato al bisogno: verificare clienti, fornitori, insolvenza, frode.

### Criticità da correggere

| Area | Problema | Correzione richiesta |
|---|---|---|
| Hero | Claim troppo generico e immagini stock non distintive. | Hero più concreto: “Verifica clienti e fornitori prima di esporti a insoluti, frodi o ritardi.” |
| Trust claims | Numeri come “10k+ clienti” o “2.5M+ visure” non devono apparire se non verificati. | In produzione usare solo dati reali o eliminare statistiche. |
| Fonti ufficiali | Copy troppo assoluto: “100% validità legale”. | Usare formulazioni prudenti: “dati provenienti da fonti ufficiali/partner qualificati, quando disponibili”. |
| CTA | Alcune CTA sono generiche. | CTA specifiche: “Verifica un’azienda”, “Controlla una PEC”, “Acquista report azienda”. |
| Report | Report leggibile ma visivamente ancora documento statico. | Aggiungere summary decisionale, evidenze, limiti, data freshness, azione consigliata. |
| Checkout | Buona base ma manca disclosure forte su IVA, diritti, tempi e natura del documento. | Inserire blocco “Prima di acquistare” obbligatorio. |
| Dashboard | Va resa una cabina operativa, non una lista. | Stato crediti, ultimi controlli, report in attesa, prossimo controllo consigliato. |

## 6. Principi UX vincolanti

Ogni pagina deve rispondere in alto a quattro domande:

1. **Cosa posso verificare qui?**
2. **Quali dati devo inserire?**
3. **Quanto costa e quanto tempo serve?**
4. **Che decisione potrò prendere dopo?**

Ogni servizio deve mostrare:

- input richiesti;
- output prodotto;
- prezzo totale prima del checkout;
- tempi stimati;
- limiti/avvertenze;
- fonte/provider o categoria fonte;
- uso consentito;
- CTA primaria unica.

Ogni report deve mostrare:

- riepilogo decisionale;
- indicatori rilevanti;
- evidenze/fatti;
- limiti e data aggiornamento;
- prossima azione suggerita;
- download/storico solo dopo report valido.

## 7. Accessibilità e qualità visuale

Criteri minimi da imporre da M1-P:

- contrasto WCAG AA per testo e CTA;
- focus visibile per tutti i controlli;
- form con label reali;
- stato non comunicato solo dal colore;
- responsive mobile-first per checkout e report;
- nessun testo lungo dentro card strette;
- errori form con messaggio operativo: cosa manca, perché serve, come correggere;
- table/report consultabili da tastiera e leggibili su mobile con layout alternativo.

## 8. Direzione copy

Tono consigliato: **chiaro, prudente, operativo, professionale**.

Evitare:

- “garantito al 100%”;
- “scopri tutto su una persona”;
- “indagini” quando non necessario;
- “accesso a dati sensibili”;
- claim numerici non verificati;
- linguaggio troppo tecnico da API provider.

Preferire:

- “verifica prima di esporti a rischio”;
- “controllo basato sui dati disponibili”;
- “fonte, prezzo e tempi dichiarati prima dell’acquisto”;
- “report pensato per decidere, non solo per scaricare un documento”;
- “usa il servizio solo per finalità lecite e coerenti con il tuo rapporto commerciale”.

## 9. Rischi rilevati

| Rischio | Impatto | Mitigazione design |
|---|---|---|
| Percezione “data broker aggressivo” | Alto | Copy prudente, legal disclosure, uso lecito, niente promesse investigative. |
| Margine basso percepito come semplice rivendita | Alto | Bundle, interpretazione, report decisionale, dashboard/storico, monitoraggio. |
| Checkout ambiguo su IVA/diritti/tempi | Alto | Breakdown prezzo, tempi, condizioni prima del pagamento. |
| Report scambiato per scoring ufficiale assoluto | Medio/Alto | Disclaimer su fonti, aggiornamento, limiti e natura informativa. |
| UI prototipale | Medio | Design system forte, spacing, componenti premium, stato e microcopy coerenti. |

## 10. Backlog per M1-P

Lo sprint successivo deve progettare:

1. token definitivi colore, spacing, radius, shadow, typography;
2. varianti logo: header desktop, header mobile, favicon, dark background, mono;
3. componenti core: Button, Input, Select, Badge, Alert, ServiceCard, PriceBreakdown, CheckoutSummary, RiskSummary, ReportSection, EmptyState, Stepper;
4. layout pubblici: marketing shell, service landing, pricing, FAQ/legal, checkout entry;
5. layout applicativi: dashboard shell, report viewer, order detail, account/credits;
6. copy rules con dizionario parole vietate/consigliate;
7. QA visual checklist e primi test antiregressione;
8. Storybook o pagina interna `/design-system` nello sprint M1-S.

## 11. Definition of Done M1-A

- [x] Analizzati logo e colori reali.
- [x] Analizzate bozze HTML sito/flusso.
- [x] Definita direzione visuale differenziante.
- [x] Identificati rischi di copy, accessibilità e percezione.
- [x] Creato backlog M1-P.
- [x] Aggiornata roadmap di stato.
- [x] Creato pacchetto ZIP incrementale v0.2.0.

## 12. Esito

Sprint **completato**. Si può procedere con **M1-P Design System Blueprint**.
