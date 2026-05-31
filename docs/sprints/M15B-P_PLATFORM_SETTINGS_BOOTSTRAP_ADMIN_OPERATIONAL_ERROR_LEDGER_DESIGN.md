# M15B-P — Platform Settings, Bootstrap Admin & Operational Error Ledger Design

**Versione:** 0.55.0  
**Tipo sprint:** Progettazione  
**Modulo:** M15B — Platform Settings, Bootstrap Admin & Operational Error Ledger  
**Stato:** completato

## Obiettivo

Trasformare l'analisi M15B-A in un blueprint operativo per governare la piattaforma da pannello admin, senza dipendere da modifiche manuali continue su ambiente/Coolify per ogni parametro funzionale.

Lo sprint progetta:

- bootstrap sicuro del primo super admin;
- settings platform/admin con scope, stato, audit e reason obbligatoria;
- kill switch acquisti server-side;
- configurazioni Stripe, PayPal, Openapi e OpenAI da admin;
- operational error ledger leggibile e azionabile;
- salvataggio e protezione IP acquisti;
- flussi di rimborso/fix collegati agli errori;
- API contract e UI blueprint per M15B-S.

## Decisione architetturale

I settings diventano una capability trasversale di piattaforma. Non devono essere semplici record key/value senza governance: ogni impostazione ha categoria, visibilita', sorgente del valore, stato, ambiente, effetto operativo, ultimo cambio, motivo, audit e, se sensibile, secret reference invece di valore in chiaro.

## Cosa resta fuori da M15B-P

- Implementazione runtime reale.
- UI funzionante.
- Migrazioni database definitive.
- Gestione segreti tramite vault esterno.
- Test Docker/Coolify reali.

Questi elementi vanno nello sprint **M15B-S**.

## Gate per lo sviluppo M15B-S

Prima dello sviluppo devono essere chiari:

1. quali settings sono modificabili da admin e quali restano solo bootstrap/env;
2. quali modifiche richiedono reason obbligatoria;
3. quali settings sono segreti e quindi mai leggibili in chiaro;
4. quali errori generano automaticamente work item admin;
5. quando un errore puo' portare a retry, rimborso, fix o escalation;
6. come viene salvato l'IP acquisto in modo proporzionato e access-controlled.
