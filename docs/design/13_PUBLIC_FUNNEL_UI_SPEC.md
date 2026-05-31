# Public Funnel UI Spec

## Visual mood

Il funnel pubblico deve usare la direzione già approvata: **trust fintech operativo**.

Caratteristiche:

- fondo chiaro, professionale, con superfici bianche e blu scuro;
- accenti azzurri derivati dal logo;
- gerarchia tipografica forte ma sobria;
- card con bordi leggeri e radius coerente;
- icone semplici, non cartoon;
- nessuna estetica aggressiva da lead generation estrema.

## Above the fold

### Desktop

- Header alto massimo 76px.
- Hero a due colonne.
- Colonna testo: 58%.
- Colonna mock report: 42%.
- CTA primaria piena, secondaria outline/ghost.
- Trust mini-row sotto CTA.

### Mobile

- Hero a colonna singola.
- Mock report sotto il testo, opzionalmente ridotto.
- CTA primaria full-width.
- CTA secondaria link/button secondario.

## Card scenario

Dimensione desktop:

- 4 card su griglia 2x2 o 4 colonne se spazio sufficiente.
- Altezza coerente.
- Titolo max 2 righe.
- Descrizione max 3 righe.
- CTA in basso.

Dimensione mobile:

- stack verticale;
- card piena larghezza;
- CTA sempre visibile.

## Report preview

La preview deve sembrare un output reale ma non deve contenere dati reali.

Blocchi visivi:

- intestazione report;
- riepilogo stato;
- lista indicatori;
- tabella fonti/limiti;
- timestamp richiesta.

Colori semantici:

- verde: nessun segnale critico rilevato;
- giallo: elementi da verificare;
- rosso: blocchi o criticità dichiarate;
- blu: informazione neutra;
- grigio: non disponibile/non richiesto.

## Pricing strip

Non deve mostrare prezzi inventati non validati. In M2-S può usare:

- `Da €...` solo se collegato a catalogo controllato;
- `Prezzo visibile prima del checkout` se il prezzo non è ancora collegato al backend;
- note IVA/imposte/diritti obbligatorie.

## Footer pubblico

Deve contenere:

- descrizione sintetica piattaforma;
- link servizi;
- link prezzi;
- link API;
- privacy/cookie/termini;
- contatti;
- nota su uso professionale e limiti.

## Error/empty states pubblici

### Ricerca senza risultato

Titolo: `Non trovi il servizio giusto?`  
Testo: `Descrivi il controllo che devi fare: ti aiuteremo a scegliere il percorso più adatto.`  
CTA: `Richiedi supporto`

### Servizio non disponibile

Titolo: `Servizio non disponibile in questo momento`  
Testo: `Non procedere al pagamento. Puoi lasciare una richiesta e ricevere aggiornamenti quando il servizio sarà riattivato.`

### Finalità non ammessa

Titolo: `Non possiamo procedere con questa finalità`  
Testo: `Il servizio può essere usato solo per finalità professionali lecite e coerenti con le condizioni previste.`

## Responsive QA

Breakpoints minimi:

- 360px mobile small;
- 768px tablet;
- 1024px laptop;
- 1440px desktop.

Ogni sezione deve essere verificata senza overflow orizzontale.
