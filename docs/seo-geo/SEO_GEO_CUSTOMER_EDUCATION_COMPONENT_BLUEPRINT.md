# SEO/GEO Customer Education Component Blueprint

Versione: **0.42.1**

## Componenti futuri

### `GuideHero`

Hero editoriale con problema, promessa prudente, CTA e tempo di lettura.

Props:

- `eyebrow`
- `title`
- `summary`
- `primaryCta`
- `secondaryCta`
- `readingTime`
- `lastReviewedAt`

### `DecisionChecklist`

Checklist operativa per mostrare cosa controllare prima dell'acquisto.

Props:

- `title`
- `items[]`
- `riskLevel?`

### `GuaranteeLimitsBox`

Box obbligatorio nelle pagine ad alto intento commerciale per distinguere garanzie operative e limiti.

Props:

- `guarantees[]`
- `limits[]`

### `ServiceCtaPanel`

CTA contestuale verso prodotto/checkout, con prezzo, tempi e dati richiesti.

Props:

- `serviceSlug`
- `priceLabel`
- `deliveryLabel`
- `requiredData[]`

### `GuideFaq`

FAQ visibili in pagina, eventualmente serializzabili in JSON-LD se rispettano le policy.

Props:

- `items[]`

### `EvidenceExplainer`

Spiega fonti, aggiornamento, limiti e differenza tra dato ufficiale e interpretazione decisionale.

Props:

- `sources[]`
- `limits[]`
- `updatedAt`

## Route future

```txt
/guide
/guide/verificare-affidabilita-azienda
/guide/cliente-non-paga-come-prevenire
/guide/visura-camerale-vs-report-affidabilita
/guide/controllo-fornitore-prima-di-acquisto
/guide/check-iban-email-telefono-azienda
/guide/garanzie-limiti-report-affidabilita
/guide/credit-scoring-azienda-significato
/guide/kyb-aml-controlli-azienda
```

## QA tecnico contenuti

- Ogni guida deve avere `title`, `description`, `canonical`.
- Ogni guida deve avere H1 unico.
- Ogni guida deve avere CTA contestuale ma non aggressiva.
- Ogni guida deve includere blocco limiti se parla di affidabilita'/scoring.
- Nessuna pagina deve usare claim bloccati.
- Schema FAQ solo se le FAQ sono visibili in pagina.
- Sitemap aggiornata.
- Internal linking verso catalogo, prezzi, checkout e pagine legal.
