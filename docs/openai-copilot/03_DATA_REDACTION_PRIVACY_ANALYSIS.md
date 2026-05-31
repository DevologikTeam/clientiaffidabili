# OpenAI Data Redaction & Privacy Analysis

## Dati vietati verso OpenAI

Non devono essere inviati:

- numeri carta;
- IBAN completo;
- API key;
- token sessione/reset/invito;
- raw payload provider;
- password;
- secret reference risolti;
- cookie;
- IP in chiaro;
- documenti fiscali completi;
- report integrale se non necessario;
- prompt/output di altri tenant;
- dati personali non necessari.

## Dati ammessi solo se redatti

- email -> mascherata;
- telefono -> mascherato;
- P.IVA/CF -> mascherato o parziale;
- ragione sociale -> ammessa se necessaria, altrimenti alias;
- messaggi contatto -> ammessi dopo rimozione dati sensibili;
- errori tecnici -> ammessi senza token, URL firmati o payload.

## Tecnica prevista

Prima di ogni richiesta:

1. costruire input minimo;
2. applicare `AiRedactionService`;
3. validare con denylist pattern;
4. salvare snapshot redatto;
5. inviare a OpenAI;
6. salvare output come draft;
7. auditare operatore, use case, prompt version e cost estimate.

## Retention

- Prompt redatti: retention breve configurabile.
- Output approvati: retention legata all'oggetto business.
- Errori OpenAI: retention operativa.
- Raw prompt non redatto: vietato.

## Privacy-by-design

Il modulo deve essere utile anche con dati minimizzati. Se un'attivita' richiede troppi dati sensibili, va spostata fuori MVP o resa manuale.
