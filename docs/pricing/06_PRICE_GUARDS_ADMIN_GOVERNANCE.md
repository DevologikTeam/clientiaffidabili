# Price guards & admin governance

## Problema

Un catalogo di rivendita API può perdere marginalità o generare rischi se un admin:

- pubblica un prezzo sotto costo;
- dimentica IVA/diritti/imposte;
- abilita un endpoint non consentito;
- promette tempi errati;
- include un add-on costoso senza consenso cliente;
- modifica un prezzo senza audit.

## Guardrail admin obbligatori

### 1. Blocco sotto margine minimo

Ogni prodotto deve avere:

- costo provider stimato;
- costo checkout stimato;
- buffer retry/supporto;
- prezzo minimo pubblicabile;
- margine target.

Se `publicPriceNet < minimumAllowedPriceNet`, la pubblicazione viene bloccata.

### 2. Separazione prezzo pubblico/costo interno

Il frontend pubblico non deve mai ricevere:

- costo provider;
- margine;
- endpoint provider grezzi;
- chiavi o nomi interni di contratto;
- note di rischio interne.

### 3. Workflow modifica prezzo

Per MVP:

1. admin propone variazione;
2. sistema calcola margine stimato;
3. se sopra soglia, pubblicazione consentita con audit;
4. se sotto soglia o high-risk, richiesta approvazione super admin;
5. ogni modifica salva snapshot precedente.

### 4. Prodotti high-risk

Un prodotto è high-risk se riguarda:

- persone fisiche;
- AML/KYB;
- PEP/Sanctions/Adverse Media;
- dati patrimoniali;
- documenti ufficiali con tempi lunghi;
- fonti sensibili o uso potenzialmente invasivo.

Regole:

- non visibile pubblicamente senza revisione;
- checkout con finalità lecita obbligatoria;
- testo “cosa non garantisce” obbligatorio;
- report con data/fonte/limiti;
- audit log sempre attivo.

### 5. Price snapshot per ordine

Ogni ordine deve salvare lo snapshot del prezzo al momento dell'acquisto:

```json
{
  "productCode": "COMPANY_PRO",
  "publicPriceNet": 24.90,
  "vatRate": 22,
  "providerCostEstimated": 2.20,
  "minimumAllowedPriceNet": 12.90,
  "targetMarginRatio": 0.70,
  "catalogVersion": "2026-05-M3A"
}
```

Non basta referenziare il prodotto corrente: il prezzo può cambiare dopo l'ordine.

## Audit log

Eventi minimi:

- `catalog.product.created`
- `catalog.product.updated`
- `catalog.product.published`
- `catalog.product.unpublished`
- `catalog.price.changed`
- `catalog.price.below_margin_blocked`
- `catalog.provider_cost.changed`
- `catalog.high_risk_review_required`

## Output per M3-P

Nel prossimo sprint bisogna progettare:

- schermata admin prodotti;
- tab prezzo/margine;
- price guard visuale;
- anteprima pubblica;
- storico modifiche;
- workflow approvazione;
- separazione fields pubblici/privati.
