# M14-P — Launch Website, SEO/GEO & Commercial Readiness Design

Stato: **completato**  
Release: **0.46.0**  
Tipo sprint: **Progettazione**  
Data: **2026-05-30**

## Obiettivo

Trasformare l'analisi M14-A in un blueprint operativo per il sito di lancio di ClientiAffidabili.it: pagine pubbliche, copy commerciale, architettura SEO/GEO, metadati, schema JSON-LD, sitemap, tracking privacy-safe, CMS governance e sales enablement.

Lo sprint non dichiara il sito pronto al go-live: definisce cosa andra' sviluppato in M14-S e quali controlli dovranno bloccare pubblicazione, indicizzazione o claim rischiosi.

## Decisione di design

Il sito di lancio deve essere una **conversion machine prudente**: vendere fiducia e chiarezza, non paura. Ogni pagina deve rispondere a una domanda operativa del cliente e guidare verso una scelta sicura:

- quale verifica scegliere;
- cosa contiene il report;
- quanto costa;
- quando ha senso usarlo;
- quali limiti ha;
- quale garanzia operativa offre la piattaforma;
- cosa succede dopo pagamento, provider, report e supporto.

## Superfici progettate

| Area | Output M14-P |
|---|---|
| Homepage | Hero, trust strip, servizi, come funziona, garanzia operativa, guide, FAQ, CTA checkout |
| Servizi | Catalogo scenario-first, cards, filtri, confronto servizi |
| Dettaglio servizio | Scheda commerciale, dati richiesti, output, limiti, prezzo, CTA |
| Prezzi | Pacchetti, add-on, abbonamenti futuri, garanzia prezzo, refund note |
| API partner | Entry sandbox, developer trust, API governance |
| Guide SEO/GEO | Template CMS, struttura answer-first, FAQ, internal linking, schema |
| Trust/legal | Limiti report, rimborsi, uso consentito, privacy e fonti |
| Tracking | Eventi aggregati senza PII |
| CMS | Workflow bozza/review/pubblicazione, claim guard, SEO checklist |

## Principi SEO/GEO

1. Nessuna pagina creata solo per keyword: ogni contenuto deve avere utilita' commerciale reale.
2. Ogni guida parte con una risposta breve e chiara.
3. Ogni pagina include limiti, fonti e prossima azione.
4. I dati strutturati devono riflettere il contenuto visibile.
5. Sitemap solo per pagine `published`.
6. Pagine non mature o duplicate: `noindex` fino a review.
7. Nessun claim assoluto: il report supporta la decisione, non garantisce l'esito.

## Output consegnati

- blueprint esperienza sito di lancio;
- blueprint SEO/GEO page template;
- blueprint copy e garanzia operativa;
- blueprint metadata, schema e sitemap;
- blueprint tracking privacy-safe;
- blueprint CMS workflow e governance;
- blueprint commercial readiness e sales enablement;
- blueprint componenti UI;
- handoff M14-S;
- registry TypeScript per web/API;
- QA script dedicato.

## Gate M14-S

- [x] Pagine P0/P1 definite.
- [x] Template SEO/GEO definito.
- [x] Claim guard definito.
- [x] Schema e metadata definiti.
- [x] Sitemap policy definita.
- [x] Tracking privacy-safe definito.
- [x] CMS governance collegata.
- [x] Handoff sviluppo pronto.
