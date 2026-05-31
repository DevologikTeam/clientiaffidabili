# M14B-S — SEO/GEO Customer Education CMS Development

## Obiettivo sprint
Rendere le pagine SEO/GEO di educazione cliente modificabili da admin come un piccolo CMS proprietario, mantenendo qualità copy, sicurezza, versioning, pubblicazione controllata e guardrail commerciali.

## Decisione editor
La scelta MVP è **Tiptap React** perché consente un editor ricco ma controllabile, basato su contenuto strutturato e trasformabile in HTML/JSON. È più adatto a SEO/GEO rispetto a un textarea semplice e più governabile rispetto a un page builder visuale completo.

## Ambito implementato
- Modulo backend `SeoCmsModule`.
- Entità `SeoPage` e `SeoPageVersion`.
- API admin per creare, aggiornare, pubblicare e archiviare pagine.
- API pubblica per leggere pagine pubblicate tramite slug.
- Editor React Tiptap lato admin.
- Lista pagine admin.
- Creazione nuova pagina admin.
- Editing pagina esistente admin.
- Runtime pubblico `/guide/[slug]`.
- Guardrail SEO/GEO e claim non consentiti.
- QA antiregressione dedicato.

## Fuori ambito intenzionale
- Workflow editoriale multi-step avanzato.
- AI writer automatico.
- Media library completa.
- Preview autenticata con link firmato.
- Sitemap dinamica reale.
- Build reale con dipendenze installate.

## Regole prodotto
Le pagine possono spiegare valore, limiti, garanzia operativa e casi d'uso, ma non devono promettere rischio zero, solvibilità garantita o certezza di pagamento.

## Stato
Completato come scaffold operativo MVP. Prima del go-live servono build reale, test editor browser, sanitizzazione HTML production-grade, revisione legale dei claim e approvazione SEO finale.
