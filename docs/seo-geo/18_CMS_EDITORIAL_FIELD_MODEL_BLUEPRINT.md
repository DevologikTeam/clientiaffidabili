# CMS Editorial Field Model Blueprint

## Obiettivo

Rendere il CMS admin abbastanza semplice per creare nuove pagine, ma abbastanza strutturato per evitare contenuti rischiosi, duplicati o non ottimizzati.

## Field groups

### Identita' pagina

- `title`
- `slug`
- `status`
- `contentCluster`
- `contentType`
- `audience`
- `searchIntent`
- `reviewOwner`

### SEO/GEO

- `seoTitle`
- `seoDescription`
- `primaryKeyword`
- `secondaryKeywords`
- `geoAnswerFocus`
- `canonicalUrl`
- `noIndex`

### Contenuto

- `answerSummary`
- `heroClaim`
- `contentJson`
- `contentHtml`
- `faqItems`
- `comparisonTable`
- `operationalGuaranteeBlock`
- `limitationsBlock`

### Conversione

- `recommendedServiceSlug`
- `primaryCtaLabel`
- `primaryCtaHref`
- `secondaryCtaLabel`
- `secondaryCtaHref`
- `relatedPageSlugs`

### Governance

- `reviewStatus`
- `seoReviewedAt`
- `complianceReviewedAt`
- `legalReviewedAt`
- `lastContentAuditAt`
- `changeReason`
- `publishChecklist`

## Publish checklist

Una pagina puo' passare a `published` solo se:

- title e H1 sono coerenti;
- meta description presente;
- answer summary presente;
- garanzia operativa presente;
- limiti presenti;
- nessun claim vietato;
- almeno 2 link interni;
- CTA primaria presente;
- FAQ visibili se FAQ schema attivo;
- stato review completato;
- contenuto non e' duplicato da altra pagina.

## Versioning

Ogni salvataggio importante deve creare `SeoPageVersion` con:

- snapshot contenuto;
- autore;
- motivo modifica;
- diff summary;
- stato precedente e successivo;
- hash contenuto.

## Nuove pagine admin

Lo sprint M14B-S deve estendere il CMS con:

- template selector;
- cluster selector;
- publish checklist visiva;
- preview snippet Google-like;
- preview GEO answer;
- blocco claim vietati;
- suggerimenti link interni;
- stato sitemap/robots.
