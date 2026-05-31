# Openapi Service Mapping Analysis

## Metodo

Il mapping non parte dagli endpoint, ma dal prodotto venduto al cliente.

Ogni prodotto pubblico deve definire:

- input cliente;
- servizi provider candidati;
- costo stimato;
- modalità di evasione;
- normalizzazione attesa;
- limiti da mostrare nel report;
- fallback/manual review.

## Mapping MVP

### COMPANY_ESSENTIAL — Verifica azienda essenziale

**Obiettivo cliente:** capire se l'azienda esiste, è coerente e dispone di dati base verificabili.

Provider candidati:

- Company Start/Advanced Italia;
- PEC Imprese Italia;
- Codice Destinatario SDI;
- eventuale negatività light solo se economicamente sostenibile.

Input minimi:

- partita IVA o codice fiscale impresa;
- ragione sociale come fallback;
- email cliente per consegna report.

Output normalizzato:

- identità azienda;
- sede;
- stato attività;
- PEC/SDI se disponibili;
- evidenze e data fonte;
- limiti del controllo.

### COMPANY_PRO — Check Affidabilità Pro

**Obiettivo cliente:** avere una valutazione più completa prima di lavorare con un cliente/fornitore.

Provider candidati:

- Company Full Italia;
- Credit Scoring Start/Advanced/Top secondo costo e disponibilità;
- negatività impresa;
- stakeholder/titolare effettivo solo se previsto dal bundle.

Output normalizzato:

- sintesi decisionale;
- indicatori affidabilità;
- red flag;
- evidenze;
- raccomandazione prudente: "procedi", "procedi con cautela", "richiedi approfondimento".

Non deve mai dire: "pagherà", "non pagherà", "garantito".

### COMPANY_PRO_BALANCE — Affidabilità Pro + Bilancio

Provider candidati:

- Company Full;
- bilancio imprese italiane;
- eventuale credit scoring.

Rischi:

- costo provider alto;
- disponibilità bilancio non garantita;
- tempi potenzialmente superiori.

Decisione:

- tenerlo come add-on o pacchetto superiore;
- mostrare tempi e limiti prima del checkout;
- prevedere manual review se il bilancio non è disponibile.

### KYB_COMPLIANCE

Provider candidati:

- AML Italia;
- titolare effettivo;
- sanctions list;
- PEP/adverse media se previsto e legalmente coerente.

Rischi:

- compliance elevata;
- possibili falsi positivi;
- dati personali/sensibili;
- necessità di scopo lecito forte.

Decisione:

- non venderlo come controllo investigativo;
- richiedere dichiarazione uso lecito;
- attivare review manuale su risultati critici;
- conservare evidenze minime e fonte.

### IBAN_VERIFY

Provider candidato:

- IBAN Start.

Decisione:

- prodotto veloce;
- utile come add-on nel checkout;
- validazione formato locale prima del provider;
- mascheramento IBAN nella UI e nei log.

### CONTACT_VERIFY

Provider candidati:

- Verifica Email Start/Advanced;
- Verifica Numero Cellulare Start/Advanced.

Decisione:

- add-on o micro prodotto;
- non usarlo per marketing senza base giuridica;
- output semplice: valido, incerto, non verificato, errore.

## Criteri di esclusione

Un servizio provider non entra nel catalogo MVP se:

- è principalmente per persone fisiche in ambito delicato;
- richiede pratica manuale lunga;
- ha costo/margine poco prevedibile;
- ha output non normalizzabile;
- può essere percepito come investigazione privata;
- richiede licenze/mandati non chiariti.

