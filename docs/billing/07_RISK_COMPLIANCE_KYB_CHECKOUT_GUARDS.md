# Guardrail checkout, compliance e uso lecito

## Rischio specifico

ClientiAffidabili.it vende verifiche aziendali, affidabilità, dati di contatto, KYB e potenzialmente dati sensibili/riservati. Il checkout non può sembrare un acquisto consumer senza responsabilità.

## Conferme obbligatorie checkout

Prima del pagamento il cliente deve confermare:

- di usare il servizio per finalità lecite e professionali;
- di avere un interesse legittimo o base giuridica adeguata;
- di non usare i dati per stalking, discriminazione, abuso, profilazione illegittima o finalità investigative non autorizzate;
- di accettare limiti, fonti e tempi del report;
- di sapere che l'esito non è garanzia di pagamento o solvibilità futura.

## Copy checkbox proposto

> Confermo che userò il servizio per una finalità lecita e professionale, con interesse legittimo o altra base giuridica adeguata. Ho letto limiti, fonti e condizioni del report e comprendo che l'esito supporta una decisione, ma non garantisce pagamenti, solvibilità o assenza di rischio.

## Prodotti da bloccare o assistere

| Categoria | Checkout pubblico | Motivo |
|---|---|---|
| Company basic | consentito | rischio basso |
| Credit scoring azienda | consentito con notice | decision support |
| KYB/AML | consentito con notice forte o assisted | compliance-sensitive |
| Persona fisica | non pubblico MVP | privacy/rischio abuso |
| Report patrimoniale persona | escluso MVP | rischio alto |
| Centrale rischi | assisted only | tempi, documenti, compliance |

## Regole dati

- Minimo dato necessario.
- Crittografia campi sensibili se introdotti.
- Retention configurabile.
- Export e cancellazione secondo policy.
- Nessun dato demo nei tenant reali.

## Admin guardrails

- Admin può mettere un prodotto in `assisted_checkout`.
- Super admin può forzare blocco vendite su categoria rischiosa.
- Ogni modifica copy/checkbox compliance è auditata.
- Ogni rimborso dopo report consegnato richiede motivazione.
