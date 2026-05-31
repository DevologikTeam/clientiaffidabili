# PDF secure link email runtime

Il PDF report viene gestito con link sicuro come opzione primaria.

## Regole

- token mai salvato in chiaro;
- salvataggio `tokenHash`;
- scadenza configurabile;
- revoca possibile;
- allegato PDF solo se policy admin lo abilita;
- audit download da implementare nel gate produzione.
