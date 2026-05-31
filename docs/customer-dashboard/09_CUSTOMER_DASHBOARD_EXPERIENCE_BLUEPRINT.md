# Customer dashboard experience blueprint

## Visione

L'area cliente di ClientiAffidabili.it non è una dashboard analytics complessa: è un luogo operativo dove il cliente controlla verifiche, report, pagamenti e prossime azioni. Il tono deve essere rassicurante, preciso e prudente.

## Struttura homepage customer

### 1. Hero operativo

Contenuto:

- saluto contestuale;
- numero report pronti;
- numero verifiche in corso;
- eventuali azioni richieste;
- CTA primaria: **Avvia una nuova verifica** oppure **Consulta report pronti**.

Esempio copy:

> Hai 2 report pronti e 1 verifica in corso. Controlla i risultati disponibili o avvia una nuova verifica quando hai i dati dell'azienda da analizzare.

### 2. Prossima azione consigliata

Regola: una sola priorità.

Priorità in ordine:

1. richiesta bloccata che richiede input cliente;
2. report appena pubblicato non letto;
3. fattura disponibile;
4. profilo azienda incompleto;
5. nuova verifica suggerita.

### 3. Verifiche recenti

Ogni item deve mostrare:

- nome azienda verificata;
- servizio acquistato;
- stato cliente;
- data richiesta;
- azione principale;
- eventuale warning sintetico.

### 4. Report pronti

Solo report pubblicati e autorizzati. Nessun report in bozza, review interna o fallito deve essere mostrato come disponibile.

### 5. Ordini e fatture

Vista sintetica:

- ultimo ordine;
- stato pagamento;
- stato fattura;
- link a dettaglio.

### 6. Supporto contestuale

Supporto non generico. Il cliente deve poter aprire una richiesta associata a una verifica, report, fattura o ordine.

## Layout desktop

```text
[Sidebar customer]
[Header account]

[Hero stato operativo] [CTA nuova verifica]
[Prossima azione consigliata]

[Verifiche recenti]        [Report pronti]
[Ordini/Fatture]           [Supporto e profilo]
```

## Layout mobile

```text
[Topbar logo/account]
[Hero stato]
[CTA primaria]
[Prossima azione]
[Verifiche recenti]
[Report pronti]
[Ordini/Fatture]
[Supporto]
```

## Metriche UX

- Il cliente deve arrivare a un report pronto in massimo 2 click dalla dashboard.
- Il cliente deve capire perché una verifica non è pronta senza vedere dettagli tecnici.
- Il cliente deve poter recuperare fattura e ricevuta senza contattare supporto.
- Le azioni devono sempre spiegare impatto e prossima fase.
