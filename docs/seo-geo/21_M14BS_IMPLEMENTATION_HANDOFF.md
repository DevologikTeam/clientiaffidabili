# M14B-S Implementation Handoff

## Sprint successivo

**M14B-S SEO/GEO Customer Education Pages Development**

## Obiettivo sviluppo

Implementare il runtime delle pagine educative SEO/GEO usando il CMS esistente, con template pubblico, seed contenuti MVP, metadata, schema, internal linking, publish checklist e QA antiregressione.

## Task backend

1. Estendere `SeoPage` con campi education se non gia' presenti.
2. Aggiungere template type e content cluster.
3. Aggiungere validazione publish checklist.
4. Aggiungere claim scanner lato backend.
5. Aggiungere endpoint admin per preview checklist.
6. Aggiungere seed contenuti MVP in stato `draft` o `review`.

## Task frontend pubblico

1. Creare componenti `EducationHero`, `GeoAnswerBox`, `OperationalChecklist`, `ComparisonMatrix`, `GuaranteeAndLimitsBlock`, `RecommendedServiceCard`, `EducationFAQ`, `RelatedGuides`.
2. Aggiornare `/guide/[slug]` per renderizzare template educativi.
3. Generare JSON-LD Article/FAQ/Breadcrumb coerente.
4. Aggiornare `/guide` con cluster e filtri.
5. Assicurare CTA contestuali verso servizi/prezzi/garanzia.

## Task frontend admin

1. Aggiungere template picker.
2. Aggiungere checklist SEO/GEO/compliance/conversione.
3. Aggiungere claim risk panel.
4. Aggiungere preview snippet e GEO answer.
5. Aggiungere related link suggestions.
6. Impedire pubblicazione se checklist bloccante.

## Task QA

1. QA script dedicato M14B-S.
2. Test presenza pagine MVP.
3. Test assenza claim vietati nei contenuti seed.
4. Test sitemap solo per pagine `published`.
5. Test schema solo coerente con contenuto visibile.
6. Test noindex per draft/review/archived.

## Criteri di completamento

- Tutte le 8 pagine MVP hanno blueprint/seed.
- CMS puo' creare nuove pagine educative.
- Admin vede checklist e claim risk.
- Pubblico vede template coerente e responsive.
- Metadata/schema generati.
- QA M14B-S passa.
- Nessuna pagina non pubblicata finisce in sitemap.
