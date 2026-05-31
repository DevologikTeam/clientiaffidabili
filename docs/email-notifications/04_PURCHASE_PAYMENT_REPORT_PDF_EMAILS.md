# Purchase, Payment, Report e PDF Emails

## Principio

Ogni fase economica e documentale deve avere una notifica tecnica chiara, ma senza sovraccaricare il cliente.

## Flusso acquisto minimo

1. Ordine creato.
2. Pagamento riuscito.
3. Verifica/report in lavorazione.
4. Documento pronto.
5. PDF pronto o link download sicuro.
6. Eventuale fattura/documento fiscale disponibile.

## Email pagamento riuscito

Deve includere:

- riferimento ordine;
- servizio acquistato;
- importo pagato;
- stato: “pagamento ricevuto”;
- prossimo step: “stiamo preparando il report” o “vai alla dashboard”;
- link dashboard;
- supporto.

Non deve includere:

- dati carta;
- token provider;
- ID interni tecnici;
- raw webhook;
- promesse tipo “cliente garantito”.

## Documento pronto

Email `report_ready`:

- oggetto: “Il tuo report e' pronto”;
- CTA: “Apri il report”;
- riepilogo servizio;
- nota su fonti e limiti;
- link alla dashboard;
- se PDF disponibile, secondo CTA o link separato.

## Invio PDF via email

Sono previste due modalita'.

### Modalita' consigliata: link sicuro

- Link firmato;
- scadenza 24/72 ore;
- download auditato;
- revocabile;
- non indicizzato;
- nessun allegato pesante.

### Modalita' allegato

Usare solo se:

- cliente lo richiede o policy lo consente;
- dimensione sotto soglia configurabile;
- contenuto classificato come inviabile;
- email provider supporta allegati;
- invio tracciato in ledger;
- eventuale bounce genera errore operativo.

## Rimborsi

Email rimborso:

- conferma importo;
- riferimento ordine;
- motivazione prudente;
- tempi indicativi dipendenti dal circuito;
- link supporto;
- eventuale nota credito se disponibile.

## Delayed/blocked

Se provider o report sono in ritardo:

- spiegare che la verifica richiede controllo aggiuntivo;
- indicare che l'ordine e' preso in carico;
- non mostrare dettagli tecnici;
- aprire evento admin se supera SLA.
