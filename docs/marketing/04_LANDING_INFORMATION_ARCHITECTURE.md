# Landing Information Architecture

## Struttura raccomandata landing v1

### 1. Header

- Logo.
- Servizi.
- Come funziona.
- Prezzi.
- FAQ.
- Accedi.
- CTA: `Verifica ora`.

Nota: `Design system` deve restare route interna/non pubblica in produzione.

### 2. Hero

**Eyebrow:** `Verifiche B2B per decisioni prudenti`  
**Title:** `Prima di vendere, spedire o concedere credito, verifica chi hai davanti.`  
**Subtitle:** `Report leggibili su aziende, fornitori e dati operativi, con prezzo chiaro, limiti dichiarati e storico consultabile.`  
**CTA primaria:** `Verifica un'azienda`  
**CTA secondaria:** `Guarda esempio report`

### 3. Scenario selector

Titolo: `Cosa devi decidere oggi?`

Card:

- Accettare un nuovo cliente.
- Verificare un fornitore.
- Controllare IBAN o dati pagamento.
- Validare email/telefono.
- Fare controllo compliance partner.

### 4. Servizi consigliati

Mostrare solo servizi MVP, con badge:

- più scelto;
- tempo reale;
- per PMI;
- compliance;
- dati operativi.

### 5. Come funziona

Quattro step:

1. Scegli controllo.
2. Inserisci dati e finalità lecita.
3. Paga in checkout sicuro.
4. Ricevi report e prossima azione.

### 6. Report preview

Blocchi:

- stato soggetto;
- segnali rilevati;
- fonti/limiti;
- suggerimento prudente;
- data richiesta;
- storico.

### 7. Trust area

- Prezzo prima dell'acquisto.
- Chiavi provider non esposte.
- Uso lecito obbligatorio.
- Report con fonti e limiti.
- Audit interno richieste.
- Privacy e condizioni chiare.

### 8. Pricing

- Controlli singoli.
- Pacchetti crediti.
- Volumi business su richiesta.

### 9. FAQ

FAQ minime:

- Che dati mi servono?
- Quanto tempo ci vuole?
- Il report garantisce il pagamento?
- Posso verificare una persona?
- Posso scaricare il report?
- Come funziona IVA/fattura?
- Cosa succede se il provider non risponde?
- Posso usare API direttamente?

### 10. Footer

- Privacy.
- Termini.
- Uso lecito.
- Contatti.
- Stato servizio.
- Informazioni aziendali quando definite.

## Layout mobile

Sul mobile la priorità è:

1. headline;
2. CTA primaria;
3. scenario selector;
4. servizi consigliati;
5. report preview;
6. checkout trust.

No tabelle larghe in homepage mobile.

## Componenti richiesti

| Componente | Esiste? | Azione M2-P |
|---|---:|---|
| PageHero | sì | adattare copy e aside report |
| Card | sì | usare per scenario selector |
| Badge | sì | badge servizio |
| Stepper | sì | come funziona |
| PriceCard | sì | pacchetti |
| TrustNotice | sì | trust/legal |
| FAQ accordion | no | progettare |
| ScenarioCard | no | progettare |
| ReportPreview | parziale | progettare |
