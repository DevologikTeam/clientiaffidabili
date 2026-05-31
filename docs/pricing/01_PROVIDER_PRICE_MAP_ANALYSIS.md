# Provider price map analysis

## Fonte di partenza

La base provider iniziale è il listino Openapi raccolto nella fase strategica. Il listino espone categorie API estese: AI, Automotive, Business Information, Comunicazione, Digital Transformation, Documenti Ufficiali, ID & Trust, Persona, Real Estate e Altre API.

Per ClientiAffidabili.it, la sezione più rilevante è **Business Information**, affiancata da alcuni servizi **ID & Trust** e pochi servizi **Digital Transformation** utili come verifica dati.

## Endpoint/provider da usare come building block

### Anagrafica e dati impresa

| Endpoint provider | Costo chiamata indicativo | Uso nel prodotto |
|---|---:|---|
| Company Search - Italia | €0,01 | Ricerca preliminare, autocomplete avanzato, match azienda. |
| Company Start - Italia | €0,05 | Base anagrafica essenziale. |
| Company Advanced - Italia | €0,10 | Arricchimento scheda. |
| Company Full - Italia | €0,30 | Base per report Pro e KYB. |
| PEC Imprese - Italia | €0,03 | Recapito certificato nel report. |
| Codice Destinatario SdI | €0,03 | Dato fiscale-operativo utile per B2B. |
| European VAT | €0,02 | Verifica VAT/VIES-like nel contesto europeo. |
| Indirizzo Sede Legale | €0,01 | Dato essenziale. |

### Rischio e affidabilità

| Endpoint provider | Costo chiamata indicativo | Uso nel prodotto |
|---|---:|---|
| Credit Scoring Start - Italia | €0,19 | Indicatore entry. |
| Credit Scoring Advanced - Italia | €0,51 | Core del prodotto Pro. |
| Credit Scoring Top - Italia | €1,10 | Add-on o piano premium. |
| Negatività Impresa - Italia | €0,45 | Segnale rischio. |
| Visura Protesti Società | €0,90 | Add-on rischio/Pro. |
| Bilancio Imprese Italiane | €4,50 | Add-on Pro Plus. |
| Report Azienda - Italia | €9,60 | Alternativa quando serve documento più completo. |

### Assetti e compliance

| Endpoint provider | Costo chiamata indicativo | Uso nel prodotto |
|---|---:|---|
| Elenco Soci - Italia | €0,03 | Struttura societaria base. |
| Stakeholders Company - Italia | €0,20 | KYB e Pro. |
| Titolare Effettivo | €1,10 | KYB Compliance. |
| Antiriciclaggio AML - Italia | €0,20 | KYB Compliance. |
| PEP / Sanctions / Adverse Media | €0,31 cad. | Solo dove applicabile e con base lecita. |

### Antifrode dati

| Endpoint provider | Costo chiamata indicativo | Uso nel prodotto |
|---|---:|---|
| IBAN Start | €0,09 | Verifica IBAN. |
| Verifica Email Advanced | €0,049 | Verifica contatti. |
| Verifica Numero Cellulare Advanced | €0,049 | Verifica contatti. |
| Verifica Codice Fiscale - Italia | €0,045 | Solo in flussi consentiti. |
| Verifica Dominio PEC | €0,005 | Add-on dati aziendali. |

## Nota sulle fasce abbonamento

Alcuni endpoint hanno costo “da abbonamento” inferiore al costo a chiamata. Il modello deve quindi salvare due valori distinti:

- `providerUnitCostList`: costo pubblico/listino a chiamata;
- `providerUnitCostCommitted`: costo atteso con abbonamento/volume;
- `providerUnitCostEffective`: costo effettivo registrato dopo la chiamata.

Il prezzo pubblico non deve essere legato rigidamente al costo minimo. Nella prima fase conviene usare il costo più prudente, poi ottimizzare quando i volumi reali giustificano un piano provider.

## Classificazione economica

| Classe | Costo provider | Prezzo pubblico consigliato | Strategia |
|---|---:|---:|---|
| Micro-cost | < €0,10 | €4,90-€14,90 | Vendere come utilità/report, non come chiamata. |
| Low-cost | €0,10-€1,00 | €14,90-€29,90 | Ideale per bundle e report decisionali. |
| Mid-cost | €1,00-€7,00 | €24,90-€59,90 | Proteggere margine con add-on e soglie. |
| High-cost/manual | > €7,00 | Prezzo dedicato o add-on | Evitare in MVP self-service se tempi lunghi. |

## Decisione

Il catalogo MVP usa solo endpoint micro/low/mid-cost con output automatico o semi-automatico. I servizi manuali, lenti o costosi vengono rimandati o trattati come richiesta assistita.
