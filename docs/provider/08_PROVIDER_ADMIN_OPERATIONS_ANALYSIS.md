# Provider Admin Operations Analysis

## Esigenza

Il Super Admin deve poter controllare il provider senza modificare codice o variabili in modo rischioso.

## Funzioni admin future

### Provider status

- provider attivo/disattivo;
- ambiente corrente;
- ultimo health check;
- error rate;
- servizi degradati;
- credito/costi se API disponibili;
- ultimi webhook/callback.

### Service mapping registry

- prodotto pubblico;
- mapping provider;
- versione mapping;
- costo stimato;
- delivery mode;
- stato: draft/review/published/paused;
- note compliance;
- ultimo test.

### Provider request queue

- richieste in attesa;
- richieste fallite;
- retry scheduled;
- manual review;
- costo stimato/effettivo;
- impatto cliente;
- prossima azione.

### Raw payload vault

Accesso solo admin autorizzato, con audit. Non deve essere una pagina di consultazione normale.

## Azioni sicure

| Azione | Ruolo | Guardrail |
|---|---|---|
| pausa servizio provider | admin | richiede motivo |
| retry richiesta | support/admin | solo se retry decision lo consente |
| marca review completata | admin | richiede nota |
| cambia mapping | super admin | approval + versione |
| abilita production provider | super admin | checklist + conferma |

## Copy admin

Usare copy operativo, non tecnico puro:

- "Il provider non ha ancora restituito il risultato";
- "La richiesta potrebbe aver consumato credito: verifica prima del retry";
- "Il servizio è in pausa per proteggere margini e clienti";
- "Serve confermare il mapping prima di attivare la vendita".

