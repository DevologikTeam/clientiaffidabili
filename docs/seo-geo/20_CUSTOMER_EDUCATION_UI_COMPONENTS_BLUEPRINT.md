# Customer Education UI Components Blueprint

## Componenti pubblici

### `EducationHero`

Mostra:

- H1;
- excerpt;
- answer summary;
- CTA primaria/secondaria;
- badge categoria/intento.

### `GeoAnswerBox`

Blocco in evidenza per risposta rapida.

Regole:

- 70-120 parole;
- nessuna CTA interna;
- include limite esplicito;
- adatto a snippet/AI answer.

### `OperationalChecklist`

Lista dei controlli consigliati.

Campi:

- titolo controllo;
- perche' conta;
- cosa non dimostra;
- azione suggerita.

### `ComparisonMatrix`

Tabella confronto strumenti/servizi.

Usata soprattutto per:

- visura vs report;
- controllo base vs pro;
- scoring vs KYB;
- IBAN/email/telefono vs report azienda.

### `GuaranteeAndLimitsBlock`

Blocco obbligatorio.

Contiene:

- garanzia operativa;
- limiti;
- policy rimborso sintetica;
- link a pagina completa.

### `RecommendedServiceCard`

Card conversione contestuale.

Campi:

- servizio consigliato;
- prezzo da;
- tempi;
- output;
- CTA.

### `EducationFAQ`

FAQ visibili e schema-ready.

### `RelatedGuides`

Massimo 4 pagine correlate.

## Componenti admin

### `SeoPageTemplatePicker`

Permette di scegliere template:

- guida informativa;
- confronto;
- garanzia/limiti;
- checklist operativa;
- glossary/definizione.

### `SeoGeoChecklistPanel`

Mostra stato:

- SEO;
- GEO;
- compliance;
- conversione;
- sitemap/schema.

### `ClaimRiskPanel`

Evidenzia claim bloccanti o da rivedere.

### `InternalLinkSuggestions`

Suggerisce link in base a cluster/intento.

### `SearchPreviewCard`

Preview title/description.

### `GeoAnswerPreview`

Mostra risposta breve come blocco standalone.

## Regole UI

- Mai sovraccaricare l'articolo con CTA aggressive.
- La CTA primaria appare hero, meta' pagina, fine pagina.
- La garanzia operativa appare prima della CTA finale.
- I limiti devono essere visibili, non nascosti in footer.
- Su mobile la risposta GEO deve stare subito sotto l'hero.
