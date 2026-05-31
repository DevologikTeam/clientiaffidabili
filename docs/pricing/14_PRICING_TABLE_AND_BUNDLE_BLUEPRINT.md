# Pricing table & bundle blueprint

## Obiettivo

Disegnare una pagina prezzi chiara per PMI, evitando di esporre il dettaglio API/provider e mantenendo margini protetti.

## Tabella prezzi MVP

| Pacchetto | Prezzo netto | Ideale per | Include | CTA |
|---|---:|---|---|---|
| Essenziale | €14,90 | primo controllo azienda | dati aziendali principali, stato, sintesi | Avvia verifica |
| Pro | €24,90 | decisioni B2B ricorrenti | score, segnali, soggetti, sintesi | Scegli Pro |
| Pro + Bilancio | €34,90 | importi più rilevanti | Pro + dati/documento bilancio se disponibile | Aggiungi bilancio |
| KYB Compliance | €49,90 | partner e fornitori sensibili | assetti, soggetti, segnali compliance | Avvia KYB |
| Antifrode dati | da €4,90 | IBAN, email, telefono | validità tecnica e segnale operativo | Controlla dati |

## Comparazione feature

| Feature | Essenziale | Pro | Pro + Bilancio | KYB |
|---|---|---|---|---|
| Dati aziendali principali | sì | sì | sì | sì |
| Score/sintesi rischio | base | sì | sì | sì |
| Segnali negativi | limitati | sì | sì | sì |
| Soggetti collegati | no/base | sì | sì | sì |
| Bilancio | no | add-on | incluso se disponibile | add-on |
| Assetti/KYB | no | no/base | no/base | sì |
| Uso consigliato | pre-check | decisione commerciale | decisione più rilevante | compliance partner |

## Bundle suggeriti nel checkout

### Da Essential a Pro

Trigger:

- importo dichiarato > €1.000;
- pagamento differito;
- nuovo cliente;
- fornitura continuativa.

Copy:

> Per questa decisione potrebbe essere utile un controllo più completo. Con Check Pro aggiungi segnali e sintesi operativa.

### Da Pro a Pro + Bilancio

Trigger:

- importo dichiarato > €5.000;
- contratto annuale;
- cliente/fornitore strategico.

Copy:

> Se la decisione ha un valore economico rilevante, puoi aggiungere un approfondimento di bilancio quando disponibile.

### Da Pro/KYB a monitoraggio futuro

Trigger:

- rapporto ricorrente;
- vendor onboarding;
- report con segnali da seguire.

Copy:

> In futuro potrai ricevere avvisi sulle variazioni rilevanti. Il monitoraggio sarà attivabile quando il piano ricorrente sarà disponibile.

## Regole di bundle

- Un bundle non deve nascondere costi obbligatori.
- Gli add-on devono avere prezzo separato e conferma esplicita.
- Gli add-on non devono abbassare margine sotto soglia.
- Nessun add-on high-risk automatico.
- Il bundle scelto deve finire nello snapshot ordine.

## UI prezzi

### Desktop

- hero con promessa e nota “prezzi netti + IVA”;
- 3 card principali in evidenza: Essential, Pro, KYB;
- tabella comparativa sotto;
- add-on antifrode dati;
- FAQ prezzi/IVA/tempi/limiti.

### Mobile

- card verticali;
- comparazione ridotta a accordion;
- CTA sticky non invasiva solo nella pagina dettaglio;
- prezzi sempre leggibili senza scroll orizzontale.

## Note fiscali e trasparenza

Copy da mostrare:

> I prezzi sono indicati al netto IVA. Eventuali imposte, bolli, diritti o costi dovuti per specifici documenti vengono mostrati separatamente prima del pagamento.

## Anti-pattern

- tabella con decine di endpoint;
- prezzo “a partire da” senza spiegare cosa include;
- claim “più economico del mercato” non dimostrabile;
- confronto diretto col costo provider;
- bundle opaco con servizi non richiesti.
