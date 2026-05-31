# 02 — Customer Tax Profile Analysis

## Obiettivo

Definire i dati minimi per fatturare e gestire correttamente clienti B2B/B2C, Italia/estero, senza bloccare il checkout con complessita non necessaria.

## Entita concettuale

`CustomerTaxProfile`

Campi preliminari:

- `customerId`
- `profileType`: `business_it`, `consumer_it`, `business_eu`, `consumer_eu`, `business_extra_eu`, `consumer_extra_eu`, `public_administration`, `requires_review`
- `legalName`
- `firstName`
- `lastName`
- `vatNumber`
- `taxCode`
- `country`
- `province`
- `city`
- `postalCode`
- `addressLine1`
- `addressLine2`
- `sdiCode`
- `pecEmail`
- `vatValidationStatus`
- `taxProfileStatus`: `draft`, `complete`, `requires_review`, `locked`, `archived`
- `lastValidationAt`
- `lockedReason`

## Segmenti fiscali MVP

### B2B Italia

Dati richiesti:

- ragione sociale;
- partita IVA;
- indirizzo sede;
- codice destinatario o PEC;
- email amministrativa.

UX:

- spiegare perche servono i dati;
- consentire salvataggio bozza;
- bloccare fattura se mancano codice destinatario/PEC.

### B2C Italia

Dati richiesti:

- nome e cognome;
- codice fiscale se richiesto dal processo fiscale;
- indirizzo;
- email.

UX:

- non mostrare linguaggio contabile complesso;
- spiegare che alcuni servizi potrebbero essere pensati principalmente per uso professionale.

### UE/extra UE

MVP:

- raccogliere paese, dati anagrafici e partita IVA estera se presente;
- marcare come `requires_review` prima della fatturazione automatica;
- non promettere regole IVA automatiche finche non validate.

### PA

MVP:

- non self-service;
- invito a contatto assistito;
- dati PA da trattare in flusso separato.

## Validazioni tecniche

- formato email;
- paese obbligatorio;
- P.IVA/codice fiscale con validazione sintattica base, non sostitutiva di verifica ufficiale;
- `sdiCode` o `pecEmail` almeno uno per B2B Italia;
- indirizzo completo prima di fattura;
- `taxProfileStatus=complete` necessario per fatturazione automatica.

## Stati

| Stato | Significato | Azione |
|---|---|---|
| `draft` | dati incompleti | completare profilo |
| `complete` | dati sufficienti | fattura possibile |
| `requires_review` | estero/PA/anomalia | review admin |
| `locked` | usato in documento fiscale | modifiche con nuova versione |
| `archived` | non piu usato | solo storico |

## Regola di immutabilita

Quando un profilo fiscale viene usato per una fattura, creare snapshot immutabile:

`TaxProfileSnapshot`

La modifica futura del profilo cliente non deve alterare documenti gia emessi.
