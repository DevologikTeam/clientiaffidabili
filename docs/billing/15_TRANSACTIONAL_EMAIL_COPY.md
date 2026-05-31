# 15 — Transactional Email Copy

## Principi

- Email brevi, operative, senza promesse assolute.
- Oggetto chiaro e riconoscibile.
- Nessun dato sensibile completo nel corpo email.
- Link a dashboard per dettagli.
- Distinguere pagamento, lavorazione, report e fattura.

## Email 1 — Checkout avviato ma non completato

Oggetto: `Completa il pagamento della tua verifica`

Corpo:

```text
Ciao,

hai avviato una verifica su ClientiAffidabili.it ma il pagamento non risulta ancora completato.

Servizio: {{serviceName}}
Totale: {{totalAmount}}

Puoi riprendere il checkout dal riepilogo ordine.

Se non riconosci questa richiesta, ignora questa email.
```

CTA: `Riprendi checkout`

## Email 2 — Pagamento confermato

Oggetto: `Pagamento confermato per {{serviceName}}`

```text
Ciao,

il pagamento per la verifica {{serviceName}} è stato confermato.

Abbiamo registrato l'ordine e avvieremo la lavorazione secondo i tempi indicati nel riepilogo del servizio.

Puoi seguire lo stato dalla dashboard.
```

CTA: `Vedi stato ordine`

## Email 3 — Verifica in lavorazione

Oggetto: `Verifica in lavorazione`

```text
La tua richiesta è stata presa in carico.

Stiamo preparando il report sulla base delle fonti disponibili per il servizio acquistato.

Ti avviseremo appena il risultato sarà pronto o se servirà un controllo manuale.
```

## Email 4 — Report pronto

Oggetto: `Il report è pronto`

```text
Il report richiesto è disponibile nella tua area riservata.

Ricorda: il report fotografa le informazioni disponibili al momento della richiesta e non costituisce una garanzia assoluta sul comportamento futuro del soggetto verificato.
```

CTA: `Apri report`

## Email 5 — Dati fatturazione incompleti

Oggetto: `Completa i dati di fatturazione`

```text
Per preparare correttamente il documento fiscale relativo al tuo ordine, abbiamo bisogno di completare alcuni dati di fatturazione.

Puoi aggiornarli dalla tua area riservata.
```

CTA: `Completa dati fatturazione`

## Email 6 — Rimborso ricevuto

Oggetto: `Richiesta di rimborso ricevuta`

```text
Abbiamo ricevuto la tua richiesta di rimborso per l'ordine {{orderNumber}}.

Verificheremo lo stato della lavorazione e ti aggiorneremo appena la richiesta sarà gestita.
```

## Email 7 — Rimborso eseguito

Oggetto: `Rimborso eseguito`

```text
Il rimborso relativo all'ordine {{orderNumber}} è stato registrato.

I tempi di accredito dipendono dal metodo di pagamento e dal circuito utilizzato.
```

## Email 8 — Anomalia pagamento

Oggetto: `Azione richiesta sul pagamento`

```text
Non siamo riusciti a confermare correttamente il pagamento del tuo ordine.

Nessuna verifica verrà avviata finché il pagamento non sarà confermato.

Puoi riprovare il pagamento o contattare il supporto.
```

CTA: `Controlla ordine`
