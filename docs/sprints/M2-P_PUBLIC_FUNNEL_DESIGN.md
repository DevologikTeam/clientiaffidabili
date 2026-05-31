# M2-P — Public Funnel Design

Versione pacchetto: **0.6.0**  
Tipo sprint: **Progettazione**  
Stato: **Completato**  
Prerequisito: `M2-A Public Funnel Analysis` completato.

## Obiettivo

Trasformare l'analisi del funnel pubblico in un blueprint pronto per lo sprint di sviluppo `M2-S`.
Lo sprint non introduce ancora un redesign completo in produzione: definisce struttura, copy, componenti, stati, eventi e criteri QA per implementare pagine pubbliche coerenti, leggibili e orientate alla conversione.

## Direzione strategica confermata

ClientiAffidabili.it deve posizionarsi come **piattaforma operativa B2B per verifiche, report e segnali di affidabilità**, non come semplice marketplace di visure o database investigativo.

Promessa centrale:

> Prima di concedere credito, spedire merce o accettare un nuovo cliente, controlla segnali societari, fiscali, reputazionali e documentali in un unico flusso guidato.

## Principi di design pubblico

1. **Fiducia prima della vendita**: ogni CTA deve essere accompagnata da limiti, fonti, tempi e uso corretto.
2. **Zero claim assoluti**: mai promettere certezza di pagamento, solvibilità garantita o assenza di rischio.
3. **Scenari prima del catalogo**: l'utente parte dal problema operativo, non dal nome tecnico dell'API.
4. **Checkout trasparente**: prezzo, tempi, dati richiesti e condizioni devono essere visibili prima del pagamento.
5. **Report comprensibile**: la pagina pubblica deve mostrare un esempio di output leggibile, non solo una lista di endpoint.
6. **Design professionale ma noob-ready**: linguaggio semplice, layout ordinato, pochi concetti per sezione.
7. **Compliance-by-design**: trattamento dati, finalità lecite e fonti vanno normalizzati già nel funnel.

## Target prioritari tradotti in funnel

| Target | Primo bisogno | Pagina/entry point | CTA primaria |
|---|---|---|---|
| PMI B2B | Valutare nuovo cliente prima di credito/spedizione | Hero + scenario "Nuovo cliente" | Avvia verifica azienda |
| Studi commercialisti/legali | Recuperare dati ufficiali e segnalazioni societarie | Scenario "Cliente o fornitore da controllare" | Scegli report |
| Software house/gestionali | Integrare verifiche via API o flussi white-label | Blocco API/integrations | Parla con un consulente |
| Credit/operations manager | Monitorare rischio e storico controlli | Report preview + dashboard tease | Crea account business |

## Funnel blueprint MVP

### 1. Homepage pubblica

Sequenza obbligatoria:

1. Hero con promessa operativa e CTA doppia.
2. Trust strip con messaggi verificabili.
3. Scenario selector: "Che controllo devi fare?".
4. Pacchetti/report suggeriti.
5. Anteprima report.
6. Come funziona in 4 step.
7. Pricing transparency strip.
8. Compliance e uso corretto.
9. FAQ orientate a obiezioni.
10. CTA finale verso catalogo/checkout.

### 2. Pagina servizi/catalogo pubblico

La pagina catalogo deve essere organizzata per **use case** e non per categorie tecniche del provider.

Gruppi MVP:

- Verifica azienda e affidabilità B2B.
- Documenti ufficiali e visure.
- Verifiche identità e contatto.
- Immobiliare/catasto, solo se separato e con finalità chiara.
- API e integrazioni per software.

### 3. Pagina dettaglio servizio/report

Ogni dettaglio servizio deve includere:

- cosa controlla;
- quando usarlo;
- dati richiesti;
- tempi stimati;
- fonti/limiti;
- prezzo finale visibile;
- esempio di risultato;
- CTA checkout;
- conferma finalità lecita prima del pagamento.

### 4. Pagina prezzi/pacchetti

La pagina prezzi non deve sembrare un listino tecnico. Deve combinare:

- pacchetti a consumo per utenti self-service;
- bundle consigliati per scenari;
- opzione API/volume per clienti B2B;
- nota chiara su IVA, diritti, imposte o costi provider esterni.

### 5. Checkout entry

Il checkout deve essere raggiunto solo dopo che l'utente ha visto:

- servizio scelto;
- prezzo;
- tempi;
- dati necessari;
- finalità ammessa;
- informativa breve trattamento dati;
- conferma esplicita dei dati inseriti.

## Componenti da progettare per M2-S

| Componente | Scopo | Priorità |
|---|---|---|
| `ScenarioCard` | Trasformare bisogno operativo in scelta servizio | Alta |
| `TrustStrip` | Mostrare elementi di affidabilità senza claim eccessivi | Alta |
| `ReportPreview` | Far capire il valore del risultato | Alta |
| `HowItWorks` | Spiegare il flusso acquisto → verifica → report | Alta |
| `ComplianceNotice` | Normalizzare limiti e uso corretto | Alta |
| `PublicFAQ` | Gestire obiezioni e ridurre supporto pre-sale | Media |
| `PackageComparison` | Preparare pricing/bundle futuri | Media |
| `CheckoutEntryCard` | Collegare pagina dettaglio e pagamento | Alta |
| `AudiencePathCard` | Separare PMI, studi, software house | Media |
| `LeadCapturePanel` | Lead consulenza/API/volumi | Media |

## Copy definitivo MVP

### Hero

**Headline:**  
Verifica clienti, aziende e segnali di affidabilità prima di prendere decisioni rischiose.

**Subheadline:**  
ClientiAffidabili.it ti guida nella scelta del controllo giusto, mostra costi e tempi prima dell'acquisto e raccoglie i risultati in report leggibili per il tuo team.

**CTA primaria:**  
Avvia una verifica azienda

**CTA secondaria:**  
Esplora i servizi

### Trust strip

- Prezzi e tempi visibili prima dell'acquisto.
- Report leggibili, con fonti e limiti dichiarati.
- Flussi pensati per uso professionale B2B.
- API e integrazioni per volumi e gestionali.

### Scenario selector

Titolo: **Che controllo devi fare oggi?**

Card MVP:

1. **Devo valutare un nuovo cliente**  
   Controlla dati aziendali, segnali negativi e documenti utili prima di concedere credito o avviare una fornitura.

2. **Devo verificare un fornitore**  
   Raccogli informazioni societarie e documentali prima di inserire un partner nel tuo processo operativo.

3. **Devo recuperare una visura o un documento**  
   Trova il servizio più adatto, verifica tempi e costi e scarica il risultato quando disponibile.

4. **Voglio integrare le verifiche nel mio software**  
   Disegna un flusso API controllato, con audit, permessi e gestione dei costi.

## Stati UI richiesti

Ogni sezione pubblica deve prevedere:

- default state;
- loading state solo dove serve;
- empty state per catalogo/ricerca;
- error state leggibile;
- disabled state per CTA non disponibili;
- compliance-blocked state se la finalità non è ammessa;
- mobile stacked state.

## Analytics privacy-safe

Eventi MVP da progettare e poi implementare:

- `public_home_viewed`
- `scenario_selected`
- `service_card_viewed`
- `service_detail_viewed`
- `checkout_entry_started`
- `legal_purpose_confirmed`
- `lead_api_requested`
- `faq_opened`

Regola: non inviare PII negli eventi. Usare ID servizio, categoria, fascia prezzo, posizione CTA e percorso pubblico.

## QA gate M2-P

- [x] Wireframe homepage definito.
- [x] Wireframe catalogo definito.
- [x] Wireframe dettaglio servizio definito.
- [x] Wireframe pricing/pacchetti definito.
- [x] Copy hero/scenari/trust/FAQ definito.
- [x] Componenti pubblici da sviluppare elencati.
- [x] Stati UI e responsive rules definiti.
- [x] Eventi analytics privacy-safe definiti.
- [x] Guardrail claim/compliance confermati.
- [x] QA matrix creata.

## Decisione finale

Lo sprint `M2-S Public Funnel Development` può partire. Dovrà sviluppare le pagine pubbliche usando i componenti DS esistenti, aggiungendo solo i componenti funnel mancanti e senza introdurre claim commerciali non approvati.

## Nota copy compliance

Il funnel deve usare sempre l'espressione **uso professionale lecito** quando spiega finalità, limiti e responsabilità prima del checkout.
