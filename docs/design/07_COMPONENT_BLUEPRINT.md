# Component Blueprint

## 1. Componenti fondamentali

### Button

Varianti:

- `primary`: azione principale della pagina;
- `secondary`: azione secondaria ma visibile;
- `outline`: azione alternativa;
- `ghost`: navigazione o azioni leggere;
- `danger`: azione distruttiva o bloccante.

Regola: una pagina dovrebbe avere una sola CTA primaria dominante sopra la piega.

### Badge

Usi:

- categoria servizio;
- stato commerciale;
- requisito;
- rischio;
- disponibilità.

Badge vietati: “best seller”, “garantito”, “sicuro al 100%” se non supportati da basi oggettive.

### Card

Tipologie:

- `default`: contenuto standard;
- `interactive`: selezione servizio;
- `elevated`: contenuto importante;
- `danger`: blocco rischio o azione sensibile.

### Field

Ogni field deve avere:

- label;
- help text se il dato può essere ambiguo;
- errore contestuale;
- `aria-invalid` quando necessario.

### StatusPill

Stati ammessi:

- `success`;
- `warning`;
- `danger`;
- `info`;
- `neutral`.

Ogni stato deve avere label testuale. Il colore non basta.

### TrustNotice

Componente per comunicare limiti, uso lecito, fonti e privacy.

Deve comparire nei flussi:

- checkout;
- report;
- verifica persona;
- KYB/AML;
- download documenti.

### PriceCard

Deve mostrare:

- nome servizio;
- descrizione pratica;
- prezzo IVA esclusa/inclusa secondo contesto;
- tempi;
- cosa include;
- CTA specifica.

## 2. Componenti da progettare nei prossimi sprint

- ReportScore;
- RiskSignalList;
- ProviderSourceList;
- CheckoutSummary;
- LegalUseConfirmation;
- OrderTimeline;
- TeamUsageMeter;
- AdminProviderHealth;
- APIProductMatrix;
- SubscriptionPlanCard.

## 3. Regole di composizione

Le pagine devono essere costruite con questa gerarchia:

1. Page shell;
2. Hero/page header;
3. Decision panel;
4. Primary action;
5. Supporting cards;
6. Help/limits/caveat;
7. Secondary navigation.

## 4. Componenti vietati o da evitare

- Tabelle dense senza sintesi sopra.
- Modali per informazioni essenziali.
- Alert permanenti non prioritizzati.
- Card tutte uguali nella dashboard.
- CTA generiche come “Apri”, “Vai”, “Dettagli”.
