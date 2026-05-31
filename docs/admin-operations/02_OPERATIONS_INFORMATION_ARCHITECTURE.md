# Admin Operations — Information architecture

## Navigazione proposta

- **Home operations**: priorità del giorno e code aggregate.
- **Ordini**: ordini pagati, in attesa, falliti, bloccati.
- **Pagamenti e fatture**: checkout session, ledger, fatture, rimborsi, dispute.
- **Provider**: richieste in corso, fallite, in retry, manual review.
- **Report**: report generati, in revisione, pubblicati, bloccati.
- **Supporto**: ticket clienti collegati a ordine/report/fattura.
- **Audit**: eventi critici filtrabili.
- **Impostazioni operative**: future soglie e policy, solo super admin.

## Home operations

La home deve mostrare al massimo poche aree:

1. **Da lavorare ora**: item che bloccano cliente o ricavo.
2. **A rischio SLA**: provider/report/fatture oltre soglia.
3. **Richiede approvazione**: refund, override, pubblicazione manuale, escalation compliance.
4. **Monitoraggio**: volumi giornalieri e anomalie.

## Pattern pagina lista

Ogni lista deve avere:

- filtro per stato operativo;
- filtro per tipo servizio;
- filtro per urgenza;
- owner assegnato;
- motivo blocco;
- prossima azione;
- link al dettaglio contestuale.

## Pattern dettaglio operativo

Ogni dettaglio deve mostrare:

- riepilogo customer-safe;
- timeline eventi;
- snapshot economico;
- snapshot provider/report;
- documenti/fatture collegati;
- ticket collegati;
- audit essenziale;
- pannello azioni consentite.

## Riduzione rumore

I dati tecnici devono essere progressivamente rivelati. L'operatore vede prima impatto e azione, poi dettagli tecnici solo se necessari.
