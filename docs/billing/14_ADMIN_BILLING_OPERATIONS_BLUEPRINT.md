# 14 — Admin Billing Operations Blueprint

## Obiettivo

Dare al team interno una cabina di regia semplice per controllare pagamenti, fatture, anomalie, rimborsi e webhook senza esporre complessità al cliente.

## Dashboard admin billing

### KPI sopra la piega

- pagamenti da verificare;
- ordini pagati non processati;
- webhook falliti;
- fatture da emettere;
- rimborsi da approvare;
- dispute aperte.

### Code operative

#### Pagamenti pendenti

Mostra:

- ordine;
- cliente;
- importo;
- provider;
- sessione creata;
- scadenza;
- ultimo evento.

Azioni:

- apri ordine;
- invia promemoria;
- annulla sessione scaduta;
- crea nuova sessione.

#### Webhook falliti

Mostra:

- provider;
- evento;
- errore;
- tentativi;
- ordine collegato;
- receivedAt.

Azioni:

- riprova elaborazione;
- marca ignorato con motivo;
- apri audit;
- crea ticket tecnico.

#### Fatture da emettere

Mostra:

- ordine;
- cliente;
- imponibile;
- IVA;
- totale;
- dati fiscali mancanti.

Azioni:

- marca emessa;
- richiedi dati al cliente;
- segnala errore dati;
- carica riferimento/PDF.

#### Rimborsi

Mostra:

- ordine;
- importo;
- motivo;
- provider dati eseguito sì/no;
- policy suggerita.

Azioni:

- approva rimborso;
- rifiuta con motivo;
- richiedi revisione;
- marca nota credito richiesta.

#### Dispute

Mostra:

- provider;
- importo;
- scadenza risposta;
- ordine/report;
- evidenze disponibili.

Azioni:

- raccogli evidenze;
- esporta pacchetto supporto;
- marca gestita;
- sospendi cliente se abuso.

## Regole UI admin

- mai mostrare segreti provider;
- payload raw solo a utenti tecnici autorizzati;
- default: informazioni operative normalizzate;
- ogni azione rischiosa chiede motivo;
- azioni irreversibili con conferma esplicita.

## Stati alert

| Priorità | Caso |
|---|---|
| Alta | pagamento riuscito ma ordine non processato da oltre 15 minuti |
| Alta | webhook fallito su pagamento riuscito |
| Alta | dispute nuova |
| Media | fattura pending oltre 24h |
| Media | sessione checkout scaduta con cliente attivo |
| Bassa | evento provider ignorato perché non supportato |

## Empty states

- `Nessun pagamento da verificare. Gli ordini pagati sono allineati.`
- `Nessun webhook fallito. Gli eventi provider sono stati elaborati correttamente.`
- `Nessuna fattura in sospeso.`
- `Nessun rimborso da approvare.`
