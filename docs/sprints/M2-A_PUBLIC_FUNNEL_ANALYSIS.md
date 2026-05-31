# M2-A — Public Funnel Analysis

Versione pacchetto: **0.5.0**  
Data: **2026-05-29**  
Tipo sprint: **Analisi**  
Modulo: **M2 Public Funnel**

## Obiettivo

Definire la strategia del funnel pubblico di ClientiAffidabili.it prima di progettare wireframe e pagine definitive. Lo sprint non deve ancora “abbellire” la landing: deve chiarire cosa deve comunicare, a chi, con quale ordine, quali CTA usare, quali prove di fiducia mostrare, quali frizioni ridurre e quali guardrail legali/commerciali rispettare.

## Decisione senior

ClientiAffidabili.it deve essere posizionato come **piattaforma operativa per decidere se fidarsi di clienti, fornitori e partner**, non come marketplace generico di API, non come sito di visure economiche e non come “scorciatoia” per promettere certezze assolute.

La value proposition pubblica deve restare:

> Prima di vendere, spedire, concedere credito o attivare una collaborazione, verifica i segnali essenziali e ricevi un report leggibile per prendere una decisione prudente.

## Perché questo sprint è necessario

Il rischio principale del progetto è comunicare troppi servizi tecnici contemporaneamente. Il provider può avere centinaia di API, ma il cliente finale non compra “endpoint”: compra una decisione più sicura.

Questo sprint blocca tre errori:

1. **Catalogo troppo largo**: troppe card, troppe categorie, poca scelta guidata.
2. **Copy troppo assoluto**: parole come “garantito”, “certifica affidabilità”, “zero rischio” sono vietate.
3. **Checkout troppo presto**: il funnel deve portare all'acquisto solo dopo finalità lecita, limiti del report e dati necessari.

## Segmenti prioritari

### 1. PMI B2B che vendono con pagamento differito

**Problema:** devono decidere se concedere dilazioni, spedire merce o attivare un nuovo cliente.  
**Messaggio:** verifica il cliente prima di esporti economicamente.  
**CTA primaria:** `Verifica un'azienda`.

### 2. Agenzie, consulenti e studi professionali

**Problema:** devono fare controlli rapidi su clienti, fornitori, controparti, immobili o soggetti collegati.  
**Messaggio:** raccogli segnali ordinati in un report leggibile senza usare console tecniche.  
**CTA primaria:** `Scegli il controllo adatto`.

### 3. E-commerce e operatori con dati sporchi/frodi operative

**Problema:** email, telefono, IBAN, dati fiscali o indirizzi errati generano costi, bounce, frodi e consegne sbagliate.  
**Messaggio:** riduci errori operativi prima di attivare pagamenti, spedizioni o account.  
**CTA primaria:** `Controlla dati e contatti`.

### 4. Team amministrativi e credit manager non enterprise

**Problema:** non hanno budget/tempo per piattaforme complesse enterprise.  
**Messaggio:** acquisti singoli controlli o pacchetti chiari, con report e storico.  
**CTA primaria:** `Guarda i pacchetti`.

## Jobs-to-be-done prioritari

| Job | Domanda cliente | Pagina/Sezione necessaria |
|---|---|---|
| Valutare nuovo cliente | Posso accettare ordine/pagamento differito? | Hero + Company Check |
| Valutare fornitore | È prudente iniziare a lavorare con questo soggetto? | Use case fornitori |
| Pulire dati operativi | Email, telefono, IBAN e dati fiscali sono corretti? | Antifrode dati |
| Fare controllo compliance base | Ci sono segnali AML/PEP/sanzioni quando lecito? | Compliance/KYB |
| Conservare evidenza | Posso scaricare e ritrovare il report? | Dashboard/report preview |

## Architettura funnel raccomandata

1. **Hero decisionale**: promettere decisione prudente, non dato tecnico.
2. **Scelta guidata per scenario**: cliente, fornitore, dati pagamento, compliance.
3. **Servizi MVP**: 4-6 servizi iniziali, con spiegazione di cosa controllano e cosa non controllano.
4. **Come funziona**: dati richiesti → finalità lecita → checkout → report.
5. **Trust & compliance**: uso lecito, fonti, limiti, privacy, audit.
6. **Preview report**: non dati reali; mostra struttura e chiarezza del risultato.
7. **Pricing/bundle**: singolo controllo + pacchetti crediti.
8. **FAQ anti-obiezione**: tempi, IVA, rimborsi, limiti, fonti, uso consentito.
9. **Checkout entry point**: solo da servizio/pacchetto con riepilogo completo.

## CTA hierarchy

| Livello | CTA | Uso |
|---|---|---|
| Primaria | Verifica un'azienda | Hero, navbar, sezione company |
| Secondaria | Scegli il controllo adatto | Dopo use case/segmenti |
| Terziaria | Guarda esempio report | Per utenti freddi |
| Trust | Leggi limiti e uso lecito | Vicino al checkout |
| Conversione soft | Parla con noi per volumi | Per clienti con alto utilizzo |

## Messaggi chiave da usare

- `Verifica prima di esporti economicamente.`
- `Report leggibile, storico verifiche e prossima azione chiara.`
- `Prezzi visibili prima dell'acquisto.`
- `Controlli usabili anche senza competenze API.`
- `Ogni report indica fonti, limiti e data di aggiornamento.`

## Messaggi vietati

- `Garantiamo che il cliente pagherà.`
- `Affidabilità certificata al 100%.`
- `Zero rischio.`
- `Controllo illimitato su chiunque.`
- `Scopri tutto su una persona.`
- `Dati sempre aggiornati in assoluto.`

## Competitor insight sintetico

- **Openapi** comunica ampiezza, developer tooling, trasparenza prezzi e disponibilità di oltre 400 servizi API. ClientiAffidabili.it deve usare questa ampiezza dietro le quinte, ma semplificare molto l'esperienza finale.
- **Cerved** comunica autorevolezza enterprise e soluzioni per crescita, compliance, lending, credit management e asset. ClientiAffidabili.it deve differenziarsi per semplicità e acquisto rapido.
- **CRIF** comunica information, intelligence, platform e outsourcing su mercati verticali. ClientiAffidabili.it deve evitare posizionamento da bureau/enterprise e puntare a micro-decisioni operative.
- **Creditsafe** comunica report aziendali, monitoraggio, API, integrazioni e tempi rapidi. ClientiAffidabili.it può prendere come riferimento la chiarezza su report/monitoraggio, ma con checkout più diretto e pacchetti più semplici.

## Opportunità di differenziazione

1. **Non vendere dati, vendere decisioni**: il report deve sempre concludere con “cosa puoi fare adesso”.
2. **No console API per il cliente base**: API e provider restano nel backend/admin.
3. **Checkout singolo e pacchetti chiari**: ridurre frizione rispetto a contratti enterprise.
4. **Verticalizzare messaggi per scenario**: vendite, fornitori, frodi dati, compliance.
5. **Spiegare limiti con eleganza**: aumenta fiducia e riduce rischio legale.

## Funnel KPI da misurare dal modulo sviluppo

| KPI | Perché conta | Evento analytics privacy-safe |
|---|---|---|
| Hero CTA click | Interesse primario | `hero_primary_cta_clicked` |
| Use case selection | Chiarezza scenario | `use_case_selected` |
| Service detail view | Interesse servizio | `service_detail_viewed` |
| Checkout start | Intento acquisto | `checkout_started` |
| Legal use confirmation | Compliance | `lawful_use_confirmed` |
| Payment success | Conversione | `payment_succeeded` |
| Report viewed | Valore consegnato | `report_opened` |

## Output per M2-P

Lo sprint successivo dovrà produrre:

- wireframe landing pubblica;
- wireframe pagina servizi;
- wireframe pagina dettaglio servizio;
- wireframe pricing/pacchetti;
- wireframe checkout entry;
- componenti richiesti al design system;
- copy finale per hero, use case, FAQ e trust area;
- mappa eventi analytics privacy-safe;
- criteri QA responsive/accessibilità/conversione.

## Gate superati

- [x] Segmenti prioritari definiti.
- [x] Jobs-to-be-done definiti.
- [x] CTA hierarchy definita.
- [x] Messaggi consentiti e vietati definiti.
- [x] Competitor insight integrato.
- [x] Funnel KPI iniziali definiti.
- [x] Output di progettazione M2-P definiti.
