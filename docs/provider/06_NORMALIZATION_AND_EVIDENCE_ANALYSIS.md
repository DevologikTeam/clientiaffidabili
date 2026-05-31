# Normalization & Evidence Analysis

## Perché normalizzare

Il cliente non deve ricevere payload provider grezzi. Deve ricevere un report leggibile con:

- sintesi;
- dati verificati;
- indicatori;
- red flag;
- fonti;
- data richiesta;
- limiti del controllo.

## Modello normalizzato base

```ts
NormalizedCheckResult {
  riskLevel: 'low' | 'medium' | 'high' | 'unknown';
  summary: string;
  redFlags: Array<{ code; label; severity }>;
  evidences: Array<{ label; value; source }>;
  sourceTimestamp: string;
}
```

M6 dovrà estenderlo in un report composer più ricco, ma M5 deve già progettare il confine.

## Evidence model

Ogni evidenza deve avere:

- etichetta leggibile;
- valore normalizzato;
- fonte/provider;
- data rilevazione se disponibile;
- livello confidenza se applicabile;
- sezione report;
- indicazione se è dato input, dato provider o calcolo interno.

## Red flag

Esempi:

- azienda cessata;
- PEC assente o non coerente;
- negatività/protesti disponibili;
- score sotto soglia descrittiva;
- bilancio non disponibile;
- soggetto ambiguo;
- IBAN formalmente non valido;
- contatto non verificabile.

## Linguaggio vietato

- "garantito";
- "solvibile al 100%";
- "pagherà";
- "non pagherà";
- "certificato definitivo";
- "indagine privata";
- "scopri tutto su una persona".

## Linguaggio ammesso

- "dati disponibili dalle fonti consultate";
- "elementi da approfondire";
- "segnali coerenti";
- "profilo da verificare con cautela";
- "non sono emersi elementi bloccanti nelle fonti consultate";
- "report informativo, non sostituisce valutazione professionale".

## Raw payload

Il payload grezzo può essere conservato solo se serve a debug/audit, con accesso limitato, retention e mascheramento. Per default:

- non esporlo al frontend;
- non inserirlo nel report;
- non inviarlo via email;
- non indicizzarlo in log testuali;
- mascherare dati personali non necessari.

