# Customer Tax Profile Blueprint

## Obiettivo

Definire un profilo fiscale cliente abbastanza completo per vendite Italia/UE/extra UE senza forzare automazioni non validate.

## Campi MVP

| Campo | Obbligo | Note |
|---|---|---|
| `profileType` | Si | `business_it`, `consumer_it`, `business_eu`, `consumer_eu`, `extra_eu`, `pa`, `requires_review` |
| `legalName` | Si | Ragione sociale o nome/cognome |
| `vatNumber` | B2B | Partita IVA, validazione formale solo soft nel MVP |
| `taxCode` | Italia | Codice fiscale dove richiesto |
| `email` | Si | Recapito amministrativo |
| `pec` | B2B Italia opzionale/consigliata | Necessaria se usata per recapito elettronico |
| `sdiCode` | B2B Italia opzionale | Valore default non forzato senza validazione |
| `country` | Si | ISO country |
| `addressLine1` | Si | Indirizzo fiscale |
| `postalCode` | Si | CAP o codice postale |
| `city` | Si | Comune/citta |
| `province` | Italia consigliato | Sigla provincia se applicabile |
| `requiresFiscalReview` | Calcolato | True per PA, estero, dati incompleti, mismatch |

## Snapshot

Ogni ordine e documento fiscale deve salvare:

```json
{
  "taxProfileSnapshot": {
    "profileType": "business_it",
    "legalName": "Cliente Srl",
    "vatNumber": "IT00000000000",
    "taxCode": "00000000000",
    "pec": "cliente@pec.it",
    "sdiCode": "ABC1234",
    "country": "IT",
    "address": "Via Roma 1, 00100 Roma"
  },
  "snapshotCreatedAt": "2026-05-30T00:00:00.000Z"
}
```

## Regole di validazione MVP

- Validazione sintattica, non certificazione fiscale definitiva.
- Se `profileType` e PA, UE, extra UE o dati incompleti: `requiresFiscalReview=true`.
- Il cliente puo modificare il profilo futuro, non i documenti gia emessi.
- Il checkout puo procedere con `requires_review`, ma il documento resta in coda interna.

## Copy cliente

Titolo: “Dati di fatturazione”

Testo: “Useremo questi dati per preparare i documenti relativi ai tuoi acquisti. Se servono verifiche amministrative, ti avviseremo prima dell'emissione.”

Errore dati incompleti: “Mancano dati necessari per preparare il documento fiscale. Completa i campi evidenziati o chiedi supporto.”
