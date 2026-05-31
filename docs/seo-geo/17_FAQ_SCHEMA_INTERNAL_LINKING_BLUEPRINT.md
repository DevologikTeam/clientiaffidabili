# FAQ, Schema & Internal Linking Blueprint

## FAQ model

Ogni pagina educativa deve avere FAQ specifiche, non generiche.

### Campi FAQ CMS

- `question`
- `answer`
- `intent`
- `riskLevel`
- `includeInSchema`
- `lastReviewedAt`

### Regole FAQ

- massimo 8 FAQ per pagina;
- risposta breve, 40-90 parole;
- niente claim assoluti;
- niente frasi legali definitive non validate;
- FAQ schema solo se visibili nella pagina;
- FAQ escluse dallo schema se troppo commerciali o non informative.

## Schema JSON-LD

### Tipologie previste

- `Article` per guide educative;
- `FAQPage` se FAQ visibili;
- `BreadcrumbList` su ogni guida;
- `Organization` e `WebSite` ereditate dal launch website;
- `Service` solo per pagine servizio, non per guide puramente informative.

## Campi Article

- `headline`
- `description`
- `datePublished`
- `dateModified`
- `author` come Organization;
- `publisher` come Organization;
- `mainEntityOfPage`

## Internal linking

### Regola base

Ogni guida deve avere massimo 4 link interni primari:

1. servizio consigliato;
2. pagina garanzia operativa;
3. guida correlata con intento vicino;
4. pagina prezzi o catalogo se purchase-aware.

### Hub consigliati

- `/guide` come hub guide;
- `/garanzia-operativa` come pagina trust;
- `/servizi` come catalogo commerciale;
- `/prezzi` come conversione trasparente.

## Link map MVP

| Pagina | Link 1 | Link 2 | Link 3 | Link 4 |
|---|---|---|---|---|
| verificare-affidabilita-azienda | /servizi/check-affidabilita-pro | /garanzia-operativa | /guide/visura-camerale-vs-report-affidabilita | /prezzi |
| cliente-non-paga-come-prevenire | /servizi/check-affidabilita-pro | /guide/credit-scoring-azienda-significato | /garanzia-operativa | /prezzi |
| visura-camerale-vs-report-affidabilita | /servizi | /guide/verificare-affidabilita-azienda | /garanzia-operativa | /prezzi |
| controllo-fornitore-prima-di-acquisto | /servizi/verifica-azienda-essenziale | /guide/check-iban-email-telefono-azienda | /garanzia-operativa | /prezzi |
| check-iban-email-telefono-azienda | /servizi/verifica-iban | /servizi/verifica-email-telefono | /guide/controllo-fornitore-prima-di-acquisto | /prezzi |
| garanzie-limiti-report-affidabilita | /garanzia-operativa | /servizi | /guide/verificare-affidabilita-azienda | /legal/rimborsi |
| credit-scoring-azienda-significato | /servizi/check-affidabilita-pro | /guide/cliente-non-paga-come-prevenire | /garanzia-operativa | /prezzi |
| kyb-aml-controlli-azienda | /servizi/kyb-compliance | /legal/uso-consentito | /garanzia-operativa | /prezzi |

## Anti-pattern

- linkare tutte le guide da ogni guida;
- usare anchor text sempre uguali;
- inserire CTA prima di aver risposto alla domanda;
- usare FAQ schema per contenuti non visibili;
- usare schema non coerente con la pagina.
