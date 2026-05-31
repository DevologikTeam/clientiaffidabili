# Customer Fiscal & Legal Dashboard Blueprint

## Route customer

- `/dashboard/profilo-fiscale`
- `/dashboard/documenti-fiscali`
- `/dashboard/consensi`
- `/dashboard/rimborsi`

## Profilo fiscale

Blocchi UI:

1. Stato dati: completi, da completare, in verifica.
2. Dati principali: ragione sociale/nome, P.IVA/CF, indirizzo, paese.
3. Recapito documento: email, PEC, codice destinatario se presente.
4. Azione primaria: “Aggiorna dati di fatturazione”.
5. Nota: “Le modifiche valgono per i prossimi documenti, non per quelli gia emessi.”

## Documenti fiscali

Colonne tabella:

- data ordine;
- servizio;
- importo;
- tipo documento;
- stato leggibile;
- azione: scarica/vedi dettagli/correggi dati.

Stati vuoti:

“Nessun documento disponibile. Dopo il primo acquisto prepareremo qui i documenti collegati.”

## Consensi e condizioni

Mostrare:

- documento;
- versione accettata;
- data accettazione;
- stato: attuale/sostituita/riaccettazione richiesta;
- link alla versione pubblica.

## Rimborsi

Mostrare:

- richiesta;
- importo;
- stato;
- motivo sintetico;
- prossima azione;
- eventuale documento amministrativo collegato.

## Regole UX

- Nessun dettaglio tecnico su provider pagamento.
- Nessun raw payload fiscale o di pagamento.
- Stato, motivo e prossima azione sempre presenti.
- Linguaggio rassicurante ma non assoluto.
