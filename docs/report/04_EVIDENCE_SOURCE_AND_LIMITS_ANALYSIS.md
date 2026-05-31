# Evidence, source and limits analysis

## Evidence model

Ogni informazione rilevante del report deve essere rappresentata come evidenza normalizzata.

Campi minimi:

- `code`;
- `label`;
- `value`;
- `sourceName`;
- `sourceType`;
- `sourceTimestamp`;
- `retrievedAt`;
- `confidence`;
- `sensitivity`;
- `displayPolicy`;
- `limitation`.

## Tipi fonte

| Tipo | Esempi | Nota |
|---|---|---|
| registry | Registro imprese, company data | Preferire per dati aziendali. |
| provider_score | scoring provider | Esporre con fonte e limite. |
| document | bilancio, visura, fascicolo | Può essere add-on. |
| compliance | PEP/sanctions/adverse media | Richiede cautela e legittimo uso. |
| technical_validation | IBAN/email/telefono | Non trasformare in giudizi commerciali. |
| internal | snapshot ordine, mapping, scoring | Non visibile come fonte cliente. |

## Sensibilità

| Sensibilità | UI cliente | Admin |
|---|---|---|
| public_business | visibile | visibile |
| business_confidential | visibile se pertinente | visibile |
| personal_data | minimizzata | accesso limitato |
| payment_data | mai nel report | accesso billing limitato |
| compliance_sensitive | sintesi prudente | accesso limitato/review |

## Limiti obbligatori

Ogni report deve dichiarare:

- il report fotografa dati disponibili alla data di richiesta;
- le fonti possono aggiornarsi con ritardi;
- il report non garantisce solvibilità futura;
- non sostituisce consulenza professionale;
- eventuali score provider sono riportati secondo disponibilità e condizioni fonte;
- dati non disponibili non equivalgono automaticamente ad assenza di rischio.

## Raw payload

Il raw payload resta nel vault tecnico e non viene esposto al cliente.

Nel report si espongono solo:

- campi normalizzati;
- evidenze selezionate;
- sintesi leggibile;
- limiti.

## Retention

Analisi raccomandata per M6-P/M6-S:

- report snapshot conservato secondo policy account/contratto;
- raw payload con retention limitata;
- audit log non alterabile;
- download PDF rigenerabile da snapshot, non da provider live.
