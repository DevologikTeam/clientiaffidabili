# Implementazione profilo fiscale cliente

Il profilo fiscale e' la base per creare snapshot immutabili su ordini e documenti.

## Regole implementate

- `organizationId` obbligatorio.
- `profileType` distingue aziende italiane, clienti UE/extra UE, PA e casi da verificare.
- Clienti extra Italia, PA o profili `requires_review` finiscono in verifica amministrativa.
- Ogni salvataggio genera `latestSnapshot` e `snapshotHash`.

## Prossimi miglioramenti

- Validazione formale di P.IVA/codice fiscale.
- Verifica PEC/SDI tramite servizio dedicato.
- Storico versioni profilo fiscale.
- Lock snapshot usato da fattura emessa.
