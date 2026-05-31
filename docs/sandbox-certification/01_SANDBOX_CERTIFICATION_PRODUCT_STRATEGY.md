# Sandbox Certification — Product Strategy

## Principio

La sandbox non serve solo a vedere se una API risponde. Serve a verificare che il prodotto possa gestire un ciclo reale senza perdere soldi, dati, report, fatture, notifiche o fiducia del cliente.

## Cosa deve certificare

1. Un cliente può registrarsi, acquistare e pagare in ambiente test.
2. Il pagamento genera un ordine tracciabile e nessun provider dati viene chiamato prima del pagamento confermato.
3. Il provider dati genera un risultato normalizzato o un errore gestibile.
4. Il report viene creato, revisionato se necessario e pubblicato.
5. Il cliente riceve email, vede il report e può scaricarlo tramite link sicuro.
6. Un errore di pagamento/provider/email/OpenAI produce un evento nel ledger operativo.
7. Un rimborso può essere avviato solo se la policy lo consente e viene auditato.
8. Tutti i flussi possono essere bloccati da settings admin o feature flag.

## Criterio di blocco

Se un flusso coinvolge soldi, provider esterni, dati aziendali, documento PDF o email cliente e non produce audit/error ledger coerente, non può entrare in Release Candidate.
