# 11 — Email Security and Privacy Analysis

## Rischi principali

1. Token reset/invito esposti o riutilizzabili.
2. Report/PDF inviati a destinatari non autorizzati.
3. Allegati con dati eccessivi.
4. Link permanenti non revocabili.
5. Email enumeration nel reset password.
6. Log email con contenuto sensibile.
7. Provider webhook falsificati.
8. Bounce ignorati e invii ripetuti a indirizzi non validi.

## Regole token

- Token salvati solo come hash.
- Scadenza breve.
- Uso singolo per reset/invito.
- Revoca su cambio password o evento sensibile.
- Rate limit per richiesta.
- Messaggi pubblici neutrali.

## PDF via email

### Preferenza

Link sicuro autenticato o magic link a scadenza, con audit.

### Allegato

Consentito solo se:

- setting admin abilita allegati PDF;
- report e' pubblicato;
- destinatario e' owner/admin/billing autorizzato;
- dimensione e sensibilita' rispettano policy;
- invio e download vengono tracciati.

## Redaction ledger

Nel ledger non salvare:

- token completi;
- API key;
- dati carta;
- IBAN completo;
- raw payload provider;
- prompt/risposte OpenAI integrali;
- allegati PDF in base64.

Salvare invece:

- template key;
- template version;
- recipient hash o email redatta;
- provider message id;
- status;
- error code;
- retry count;
- correlation id;
- related order/report/payment/ticket id.

## Remember me

La funzione ricordami richiede:

- cookie sicuro HTTP-only;
- device/session token hashato;
- scadenza piu' lunga ma revocabile;
- non bypassare MFA/admin step-up;
- alert opzionale per nuova sessione ricordata.
