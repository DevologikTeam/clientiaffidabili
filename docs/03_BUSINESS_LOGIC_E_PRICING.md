# Business logic e pricing

## Entità commerciali

### Product

Un prodotto è un servizio vendibile al cliente:

- Verifica azienda essenziale;
- Affidabilità Pro;
- KYB Compliance;
- Antifrode IBAN/email/mobile/CF;
- credito mensile incluso nei piani.

Campi chiave:

- `code`
- `name`
- `description`
- `category`
- `publicPriceCents`
- `estimatedProviderCostCents`
- `taxRate`
- `deliveryMode`
- `requiresLegalBasis`
- `providerProductCodes[]`

### Bundle

Un bundle aggrega più chiamate provider e produce un report unico. Esempio:

`AFFIDABILITA_PRO = credit_score_start + company_full + negativity + stakeholders`

### Order

L’ordine rappresenta l’acquisto. Può contenere uno o più check.

### Check

Il check rappresenta la verifica eseguita su un soggetto.

## Regole pricing MVP

1. Il prezzo pubblico non deve mostrare il costo provider.
2. Ogni prodotto deve avere margine minimo target del 65% lordo operativo.
3. I prodotti one-shot devono spingere verso piano team o monitoraggio.
4. I piani ricorrenti devono includere crediti non monetari, non “euro wallet”, almeno in MVP.
5. I crediti non usati scadono a fine periodo salvo scelta commerciale diversa.
6. Il prezzo deve essere configurabile da admin, non hardcoded.

## Prezzi proposti

| Codice | Prodotto | Prezzo consigliato |
|---|---|---:|
| COMPANY_ESSENTIAL | Verifica azienda essenziale | €14,90 + IVA |
| COMPANY_PRO | Check Affidabilità Pro | €24,90 + IVA |
| KYB_COMPLIANCE | Check KYB Compliance | €49,90 + IVA |
| IBAN_CHECK | Verifica IBAN | €4,90 + IVA |
| EMAIL_PHONE_CHECK | Verifica contatti | €4,90 + IVA |
| PERSON_LIGHT | Verifica persona light | €9,90 + IVA |
| TEAM_START | Piano Team Start | €29/mese + IVA |
| TEAM_PRO | Piano Team Pro | €99/mese + IVA |
| API_PARTNER | Piano API Partner | da €299/mese + IVA |

## Marginalità

La piattaforma deve salvare per ogni check:

- prezzo incassato allocato;
- costo provider stimato;
- costo provider effettivo se disponibile;
- fee checkout stimata;
- margine lordo.

Questi dati servono per capire quali servizi spingere e quali togliere dal catalogo.

## Regola di catalogo

Non pubblicare decine di servizi nella prima fase. Pubblicare massimo 4 famiglie e 6-8 prodotti. Gli altri endpoint restano configurabili internamente.
