# SEO/GEO Customer Education Pages — Roadmap Insert

Versione: **0.42.1**  
Stato: **inserito in roadmap**  
Modulo target: **M14B — Customer Education SEO/GEO Pages**

## Decisione

Aggiungere alla roadmap un modulo dedicato alle pagine pubbliche/customer-facing ottimizzate SEO/GEO che spieghino il valore del servizio, le garanzie operative, i limiti, i casi d'uso e il perche' acquistare una verifica tramite ClientiAffidabili.it.

Queste pagine non devono essere semplici landing generiche. Devono essere contenuti editoriali/commerciali scritti come da un senior SEO/GEO copywriter, con forte attenzione a:

- intento di ricerca reale;
- leggibilita' per imprenditori, uffici acquisti, amministrativi, commerciali e consulenti;
- contenuti non commodity, non copiati dai competitor e non generati in massa;
- struttura chiara per motori di ricerca, AI Overviews, answer engine e LLM;
- claim prudenti, senza promesse assolute su solvibilita', pagamenti o rischio zero;
- CTA verso il catalogo/checkout/report, ma solo dopo aver spiegato valore, limiti e condizioni.

## Perche' serve

ClientiAffidabili.it non vende solo una chiamata API: vende riduzione dell'incertezza decisionale prima di lavorare con un cliente, fornitore o partner. Le pagine educative devono quindi intercettare ricerche informative e commerciali come:

- come verificare se un'azienda e' affidabile;
- come controllare un nuovo cliente prima di concedere pagamento a 30/60 giorni;
- quali dati controllare prima di lavorare con un fornitore;
- differenza tra visura, report affidabilita', credit scoring e verifica compliance;
- cosa significa rischio commerciale medio/alto;
- quali garanzie offre un report e quali limiti mantiene;
- perche' una verifica non puo' garantire che un cliente paghera'.

## Pagine consigliate MVP

| Pagina | Intento | Obiettivo |
|---|---|---|
| `/guide/verificare-affidabilita-azienda` | Informativo/commerciale | Spiegare cosa controllare prima di lavorare con un'azienda. |
| `/guide/cliente-non-paga-come-prevenire` | Pain/problem | Intercettare chi ha problemi di insoluti e cerca prevenzione. |
| `/guide/visura-camerale-vs-report-affidabilita` | Comparativo | Chiarire differenza tra documento ufficiale e report decisionale. |
| `/guide/controllo-fornitore-prima-di-acquisto` | B2B procurement | Parlare a uffici acquisti e amministrazione. |
| `/guide/check-iban-email-telefono-azienda` | Data validation | Spiegare il valore di verifiche leggere e anti errore. |
| `/guide/garanzie-limiti-report-affidabilita` | Trust/compliance | Spiegare garanzie operative, limiti e uso lecito. |
| `/guide/credit-scoring-azienda-significato` | Education | Spiegare scoring prudente e non predittivo assoluto. |
| `/guide/kyb-aml-controlli-azienda` | Compliance | Spiegare quando servono controlli KYB/AML. |

## Struttura pagina standard

Ogni pagina dovra' seguire una struttura riutilizzabile:

1. **Hero orientato al problema**: promessa prudente e concreta.
2. **Sintesi rapida**: cosa imparerai e quando usare il servizio.
3. **Scenario reale**: esempio B2B non inventato come dato, ma verosimile e chiaramente generico.
4. **Cosa controllare**: checklist operativa.
5. **Come aiuta ClientiAffidabili.it**: valore del report, evidenze, fonti e limiti.
6. **Garanzie operative**: pagamento sicuro, report tracciato, fonti dichiarate, dati trattati con prudenza.
7. **Limiti chiari**: nessun report garantisce pagamento futuro o rischio zero.
8. **FAQ**: domande reali, non keyword stuffing.
9. **CTA contestuale**: servizio consigliato, prezzo, tempi, cosa serve per iniziare.
10. **Schema/metadata**: Article, Breadcrumb, Organization, FAQ dove appropriato.

## Modulo roadmap da inserire

### M14B-A — SEO/GEO Customer Education Pages Analysis

Analisi keyword/intenti, competitor contenutistici, query informative/commerciali, pain point, customer language, rischi di claim, pagine prioritarie, opportunita' GEO/AI discovery, piano contenuti e KPI.

Output attesi:

- mappa keyword/intenti;
- content gap analysis;
- pagina inventory MVP;
- regole copy e claim consentiti/bloccati;
- schema strategy;
- KPI SEO/GEO e conversione.

### M14B-P — SEO/GEO Customer Education Pages Design

Blueprint contenutistico e UX delle pagine: template pagina, sezioni, componenti, metadati, structured data, internal linking, CTA, FAQ, microcopy garanzie/limiti e wireframe.

Output attesi:

- template editoriale pagina guida;
- copy deck per prime 6-8 pagine;
- component blueprint;
- internal linking map;
- schema JSON-LD blueprint;
- QA copy/compliance checklist.

### M14B-S — SEO/GEO Customer Education Pages Development

Implementazione Next.js delle pagine guida, sitemap, metadata, schema, componenti guide, CTA, linking, QA SEO tecnico e smoke content.

Output attesi:

- route `/guide/...`;
- contenuti MVP pubblicabili;
- metadata e canonical;
- JSON-LD;
- sitemap aggiornata;
- QA SEO/GEO script;
- release notes.

## Guardrail copy e garanzie

Consentito:

- "aiuta a prendere decisioni piu' informate";
- "riduce il rischio di lavorare al buio";
- "fonti e limiti indicati nel report";
- "pagamento sicuro e report tracciato";
- "supporto in caso di dati incompleti o dubbi".

Bloccato:

- "garantisce che il cliente paghera'";
- "rischio zero";
- "azienda sicuramente affidabile/non affidabile";
- "protezione totale dagli insoluti";
- "dati investigativi";
- "controllo persona" senza perimetro legale e consenso.

## Garanzia da comunicare

La garanzia deve essere commerciale-operativa, non predittiva:

- garanzia di chiarezza del prezzo prima dell'acquisto;
- garanzia di indicazione delle fonti disponibili;
- garanzia di spiegazione dei limiti del report;
- garanzia di non chiamare provider prima di pagamento/credito valido;
- garanzia di supporto se la richiesta non puo' essere evasa;
- policy rimborso coerente con stato provider/report gia' definita nel billing.

Non si deve mai comunicare una garanzia sul comportamento futuro dell'azienda verificata.

## KPI

- impression organiche su query informative e commerciali;
- CTR da SERP/AI answer surfaces quando misurabile;
- tempo pagina e scroll depth;
- click su CTA "Avvia verifica";
- conversione guida -> dettaglio servizio -> checkout;
- richieste supporto generate dalla pagina;
- query Search Console con intenti emergenti;
- citazioni/menzioni in fonti esterne autorevoli.

## Handoff alla roadmap

Inserire M14B dopo M14-S o, se M14 viene ampliato, fondere M14 e M14B in una macrofase:

**M14 — Launch Website, SEO/GEO & Customer Education Commercial Readiness**

La preferenza operativa e' mantenere M14 per sito/lancio tecnico-commerciale e M14B per pagine guida/educational scalabili.
