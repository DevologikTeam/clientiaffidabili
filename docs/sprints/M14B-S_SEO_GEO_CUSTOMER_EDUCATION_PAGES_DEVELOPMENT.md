# M14B-S — SEO/GEO Customer Education Pages Development

Data: **2026-05-30**  
Versione: **0.50.0**  
Tipo sprint: **Sviluppo**

## Obiettivo

Implementare le pagine educative SEO/GEO lato cliente previste nel blueprint M14B-P, rendendole pubblicabili via CMS, indicizzabili, collegate al sito di lancio e coerenti con i guardrail di garanzia operativa.

## Scope implementato

- Seed contenuti MVP per 8 guide customer education.
- Runtime frontend `customer-education-runtime.ts` con contenuti strutturati.
- Componenti pubblici riutilizzabili per risposta breve, metadati, checklist, limiti, FAQ, guide correlate e CTA laterale.
- Aggiornamento route `/guide/[slug]` con Article JSON-LD, FAQPage JSON-LD e breadcrumb.
- Aggiornamento CMS runtime e seed backend per pubblicare tutte le guide MVP.
- Sitemap già compatibile tramite `publicPublishedGuides`.
- QA dedicato su slugs, claim vietati, JSON-LD, internal linking e numero pagine.

## Guardrail mantenuti

- Nessuna promessa assoluta su esito commerciale, pagamento, solvibilità o rischio.
- Garanzia comunicata come garanzia operativa: prezzo, fonti, data, limiti, supporto e policy rimborso.
- Guide pubbliche collegate a servizio/prezzi/garanzia operativa.
- Solo contenuti `published` sono eleggibili per sitemap e navigazione pubblica.

## Esito

Sprint completato come scaffold funzionale offline. Build reale, Lighthouse, Rich Results Test e Search Console restano gate successivi.
