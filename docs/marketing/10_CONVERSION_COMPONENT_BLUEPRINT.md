# Conversion Component Blueprint

## `ScenarioCard`

### Props proposte

```ts
interface ScenarioCardProps {
  title: string;
  description: string;
  recommendedServiceLabel: string;
  href: string;
  badge?: string;
}
```

### Regole

- Titolo orientato al problema, non al servizio tecnico.
- Una sola CTA.
- Deve indicare il servizio consigliato senza forzare l'acquisto.

## `TrustStrip`

### Messaggi consentiti

- Prezzi e tempi visibili prima dell'acquisto.
- Report con fonti e limiti dichiarati.
- Flussi pensati per uso professionale.
- API disponibili per integrazioni controllate.

### Messaggi vietati

- Cliente affidabile al 100%.
- Pagamento garantito.
- Rischio zero.
- Indagini su chiunque.

## `ReportPreview`

### Blocchi

- Sintesi soggetto.
- Indicatori principali.
- Documenti disponibili.
- Segnali da verificare.
- Fonti e limiti.
- Data richiesta.

### Nota

La preview deve usare dati dimostrativi chiaramente non riferiti a persone o aziende reali, oppure contenuto astratto senza identificativi.

## `HowItWorks`

Step obbligatori:

1. Scegli il controllo.
2. Inserisci i dati richiesti.
3. Confermi finalità e prezzo.
4. Ricevi il report o lo stato di evasione.

## `ComplianceNotice`

Deve comparire in:

- homepage;
- dettaglio servizio;
- checkout;
- footer o pagina legale.

Copy base:

> I servizi sono pensati per finalità professionali lecite. I risultati dipendono dalle fonti disponibili e non costituiscono garanzia di pagamento, solvibilità o assenza di rischio.

## `PublicFAQ`

### Domande MVP

1. I report garantiscono che un cliente pagherà?
2. Quali dati devo inserire?
3. Quando ricevo il risultato?
4. Posso usare le API nel mio gestionale?
5. Come vengono trattati i dati?
6. Il prezzo è visibile prima del pagamento?

## `PackageComparison`

Colonne MVP:

- A cosa serve.
- Include.
- Tempo stimato.
- Prezzo.
- Ideale per.
- CTA.

## `CheckoutEntryCard`

### Campi obbligatori

- servizio;
- prezzo;
- tempo;
- dati richiesti;
- finalità ammessa;
- checkbox conferma uso lecito;
- link condizioni/informativa;
- CTA `Continua al checkout`.

## Accessibilità componenti

- Tutte le card cliccabili devono avere anche link/CTA esplicita.
- FAQ deve usare button con `aria-expanded`.
- Stepper deve avere ordine semantico.
- Price card non deve comunicare priorità solo con colore.
- Compliance notice deve essere leggibile e non nascosta in tooltip.
