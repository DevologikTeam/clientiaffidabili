# Customer Education Runtime — Implementation Notes

Lo sprint introduce un runtime dedicato alle guide educative, separato dal solo HTML CMS.

## Perché un runtime strutturato

Le pagine SEO/GEO non devono essere solo blocchi HTML. Devono contenere dati leggibili dal frontend e dai controlli QA:

- intento di ricerca;
- cluster contenuto;
- risposta breve GEO;
- checklist operativa;
- note di garanzia/limiti;
- FAQ strutturate;
- link correlati;
- CTA primaria/secondaria.

## File

- `apps/web/lib/seo-geo/customer-education-runtime.ts`
- `apps/web/components/customer-education/*`
- `apps/web/app/guide/[slug]/page.tsx`
- `apps/api/src/modules/seo-cms/customer-education.seed.ts`

## Nota CMS

Il runtime attuale è seed/scaffold. In produzione i contenuti dovranno arrivare dal database, ma mantenendo lo stesso modello logico e gli stessi guardrail.
