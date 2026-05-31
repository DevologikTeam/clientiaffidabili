# Scoring and decision logic analysis

## Regola fondamentale

Lo score MVP non deve essere presentato come modello predittivo proprietario. Deve essere un **indice descrittivo di attenzione**, calcolato da segnali disponibili e spiegabili.

## Nomenclatura consigliata

Usare:

- Livello di attenzione basso.
- Livello di attenzione medio.
- Livello di attenzione alto.
- Dati insufficienti.
- Richiede verifica manuale.

Evitare:

- Affidabile/non affidabile.
- Approvato/rifiutato.
- Pagherà/non pagherà.
- Rischio zero.

## Fasce MVP

| Fascia | Range indicativo | Label pubblica | Uso |
|---|---:|---|---|
| low | 75-100 | Attenzione bassa | Nessun segnale critico evidente. |
| medium | 45-74 | Attenzione media | Alcuni elementi da verificare. |
| high | 0-44 | Attenzione alta | Segnali importanti o dati critici. |
| unknown | n/a | Dati insufficienti | Fonti assenti, incomplete o ambigue. |
| review | n/a | Revisione richiesta | Output provider non sicuro da pubblicare. |

## Componenti score

Lo score può derivare da componenti pesate, ma nel MVP deve restare semplice e auditable:

- stato attività;
- coerenza anagrafica;
- presenza negatività;
- presenza protesti/pregiudizievoli se richiesti;
- credit scoring provider se incluso;
- completezza fonti;
- anzianità dato;
- coerenza tra dati dichiarati e dati provider.

## Esempio pesi iniziali

| Componente | Peso | Note |
|---|---:|---|
| Stato impresa attiva/coerente | 20 | Non basta da solo. |
| Negatività/protesti assenti | 25 | Solo se servizio incluso. |
| Credit scoring provider | 25 | Va citata la fonte. |
| Completezza anagrafica | 10 | Utile per qualità report. |
| Bilancio/indicatori disponibili | 10 | Solo add-on. |
| Compliance clear | 10 | Solo KYB. |

## Explainability

Ogni score deve avere:

- “Perché questo livello?”;
- lista segnali che hanno inciso;
- fonti usate;
- segnali non disponibili;
- data e limite.

## Governance

I pesi devono essere versionati:

- `scoreModelVersion`;
- `templateVersion`;
- `mappingVersion`;
- `providerResultVersion`.

Una modifica dei pesi non deve cambiare report già generati.

## Blocco automatico pubblicazione

Il report deve andare in `review_required` se:

- manca il soggetto identificato;
- provider restituisce risposta ambigua;
- provider segnala errore paid;
- dati personali/compliance-sensitive non sono minimizzati;
- score e segnali sono incoerenti;
- fonte/timestamp mancano;
- il testo generato contiene claim vietati.
