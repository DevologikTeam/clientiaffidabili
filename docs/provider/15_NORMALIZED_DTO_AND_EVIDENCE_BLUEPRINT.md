# Normalized DTO & evidence blueprint

## Principio

Il report non deve consumare direttamente JSON provider. Ogni provider produce un `ProviderNormalizedResult` con evidenze classificate.

## DTO comune

```ts
type ProviderNormalizedResult = {
  riskLevel: 'low' | 'medium' | 'high' | 'unknown';
  summary: string;
  sourceTimestamp: string;
  evidences: ProviderNormalizedEvidence[];
  warnings: ProviderWarning[];
  limitations: string[];
  requiresManualReview: boolean;
};
```

## Evidence

Ogni evidenza deve indicare:

- codice stabile;
- label leggibile;
- valore normalizzato;
- fonte;
- timestamp fonte;
- sensibilità;
- visibilità cliente;
- retention policy.

## Profili di normalizzazione MVP

### `company-basic-profile`

Output cliente:

- denominazione;
- partita IVA/codice fiscale;
- stato attività se disponibile;
- sede legale;
- PEC/SDI se disponibili;
- fonte e data aggiornamento.

### `company-risk-profile`

Output cliente:

- sintesi rischio descrittiva;
- segnali negativi normalizzati;
- coerenza anagrafica;
- score provider se disponibile, ma spiegato come indicatore e non garanzia.

### `company-risk-financial-profile`

Output cliente:

- evidenze bilancio disponibili;
- warning su dati mancanti;
- indicatori sintetici solo se normalizzabili;
- limiti temporali del bilancio.

### `kyb-compliance-profile`

Output cliente:

- stato verifica KYB;
- alert AML/PEP/sanzioni come segnali da approfondire;
- titolare effettivo solo se lecito, disponibile e minimizzato;
- manual review per risultati high-risk.

### `payment-data-profile`

Output cliente:

- validità formale IBAN;
- esito verifica quando disponibile;
- nessuna memorizzazione estesa di IBAN completo se non necessaria.

## Campi vietati nel report cliente

- raw JSON provider;
- token, request id provider interni;
- campi personali non necessari;
- formule di scoring proprietarie non spiegabili;
- claim come “azienda sicuramente affidabile” o “pagherà”.

## Copy risultato

Usare sempre copy prudente:

- “non emergono segnali bloccanti nelle fonti consultate”;
- “sono presenti elementi da approfondire”;
- “dato non disponibile nella fonte consultata”;
- “verifica basata sulle fonti disponibili alla data indicata”.
