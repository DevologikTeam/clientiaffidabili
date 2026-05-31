# M14-A — Launch Website, SEO/GEO & Commercial Readiness Analysis

Stato: **completato**  
Release: **0.45.0**  
Tipo sprint: **Analisi**  
Data: **2026-05-30**

## Obiettivo

Analizzare il sito di lancio pubblico di ClientiAffidabili.it come superficie commerciale completa: posizionamento, SEO/GEO, contenuti di valore, pagine di conversione, pagine guida, tracking privacy-safe, CMS editoriale, fiducia, limiti, garanzie operative, sales enablement e readiness prima del blueprint M14-P.

Questo sprint non sviluppa ancora le pagine finali: stabilisce il perimetro decisionale e i guardrail per evitare un sito generico, sovra-promettente o non indicizzabile.

## Principio guida

ClientiAffidabili.it non deve sembrare un portale generico di visure. Deve comunicare:

> "Aiutiamo aziende, professionisti e team commerciali ad acquistare, vendere e collaborare con piu' consapevolezza, usando report chiari, fonti tracciabili e limiti spiegati prima di prendere una decisione."

## Decisioni principali

1. **SEO/GEO people-first**: niente pagine create solo per intercettare keyword; ogni pagina deve rispondere a una domanda commerciale reale.
2. **Garanzia operativa, non garanzia di esito**: comunicare prezzo chiaro, fonti, limiti, supporto e policy rimborso; mai promettere pagamento certo o rischio zero.
3. **Launch website modulare**: homepage, servizi, prezzi, guide, legal/trust, API partner, checkout e dashboard devono raccontare lo stesso prodotto.
4. **CMS come acceleratore controllato**: le pagine SEO/GEO editabili da admin vanno governate con workflow bozza/review/pubblicazione, claim guard e checklist SEO.
5. **Tracciamento privacy-safe**: eventi aggregati e business-oriented, senza salvare dati sensibili dei soggetti verificati.
6. **Commercial readiness**: prima del lancio devono esistere pitch, FAQ vendita, objection handling, policy rimborsi, esempi report e script demo.

## Superfici analizzate

- `/` homepage.
- `/servizi` catalogo servizi.
- `/servizi/[slug]` dettaglio servizio.
- `/prezzi` prezzi e pacchetti.
- `/api` API partner/reseller.
- `/guide/[slug]` pagine SEO/GEO education gestite dal CMS.
- `/legal/*` legal pack.
- `/checkout` entry commerciale.
- `/dashboard/*` post-acquisto, usata come proof del valore.
- `/admin/seo-pages` CMS editoriale.

## Output consegnati

- strategia sito di lancio;
- analisi SEO/GEO e keyword intent;
- inventory pagine e priorita';
- regole copy valore/garanzia/trust;
- tracking privacy-safe;
- metadati/schema/sitemap analysis;
- competitor/content gap;
- readiness commerciale e sales enablement;
- governance CMS/editoriale;
- checklist M14-P/M14-S.

## Gate per passare a M14-P

- [x] Chiarezza posizionamento commerciale.
- [x] Page inventory prioritaria.
- [x] Guardrail claim e garanzie.
- [x] SEO/GEO content model.
- [x] Privacy-safe tracking model.
- [x] CMS governance collegata al sito.
- [x] Sales readiness checklist.
- [x] QA antiregressione M14-A.

## Non incluso

- sviluppo pagine finali;
- copy definitivo completo;
- sitemap reale generata dal CMS;
- dati Search Console/GA reali;
- test browser reali;
- validazione legale definitiva dei testi.
