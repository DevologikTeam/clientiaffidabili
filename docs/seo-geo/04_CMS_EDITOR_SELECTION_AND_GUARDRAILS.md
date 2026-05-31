# CMS SEO/GEO — scelta editor e guardrail

## Editor scelto: Tiptap React

Tiptap è stato scelto perché permette di costruire un editor React controllato, con toolbar proprietaria, estensioni selezionate e output serializzabile. Nel progetto viene usato come base admin, non come contenuto libero senza vincoli.

## Perché non un page builder completo nel MVP
Un page builder visuale completo aumenterebbe il rischio di UI incoerente, HTML sporco, performance instabili e pagine difficili da validare lato SEO/GEO. Per il primo rilascio servono pagine editoriali solide, non landing altamente custom.

## Estensioni MVP
- StarterKit.
- Link.
- Placeholder.

## Output contenuto
Ogni pagina salva:
- `bodyHtml` per rendering pubblico.
- `bodyJson` per editing/versioning futuro.
- `excerpt` per snippet/anteprime.
- `seoTitle`, `seoDescription`, `canonicalPath`.
- `schemaType`, `targetKeyword`, `searchIntent`, `geoAnswerFocus`.

## Guardrail copy
Bloccati o segnalati:
- rischio zero;
- solvibilità garantita;
- pagamento garantito;
- cliente sicuro al 100%;
- report infallibile;
- dati sempre aggiornati in tempo reale, se non dimostrabile.

## Guardrail SEO/GEO
Ogni pagina deve avere:
- titolo unico;
- slug stabile;
- meta description non generica;
- intento di ricerca dichiarato;
- sezione “cosa puoi sapere”;
- sezione “limiti del report”;
- CTA coerente verso servizio/checkout;
- FAQ brevi e utili.
