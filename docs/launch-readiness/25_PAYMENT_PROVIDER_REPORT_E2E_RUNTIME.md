# Payment, Provider & Report E2E Runtime

## Obiettivo

Preparare il percorso browser completo:

1. scelta servizio;
2. checkout con consenso uso lecito;
3. pagamento sandbox;
4. webhook idempotente;
5. richiesta provider mock/sandbox;
6. normalizzazione;
7. report snapshot;
8. pubblicazione report;
9. dashboard cliente;
10. fattura/documento fiscale manual-assisted.

## Rimborsi e dispute

I test futuri devono coprire:

- rimborso prima della chiamata provider;
- rimborso bloccato dopo report pubblicato/scaricato;
- dispute aperta con blocco doppio rimborso;
- nota credito manual-assisted quando documento fiscale già emesso.

## Stato M13-S

La suite contiene smoke e guardrail. Il full E2E con provider/payment sandbox reale resta attività di certificazione M13 final.
