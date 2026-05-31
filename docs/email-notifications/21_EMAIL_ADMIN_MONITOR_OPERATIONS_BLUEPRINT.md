# 21 — Email Admin Monitor & Operations Blueprint

## Admin monitor

Route prevista: `/admin/email`.

Viste:

- overview consegne;
- delivery queue;
- failed deliveries;
- suppression list;
- template versions;
- webhook events;
- provider status;
- retry/replay audit.

## Metriche principali

- queued;
- sent;
- delivered;
- failed;
- bounced;
- complained;
- suppressed;
- retry pending;
- provider latency;
- top failing templates;
- top failing modules.

## Azioni admin

| Azione | Requisiti |
|---|---|
| Retry delivery | errore temporaneo, reason obbligatoria |
| Regenera link PDF | permesso billing/support, audit |
| Marca come risolto | reason obbligatoria |
| Sopprimi indirizzo | bounce/complaint/manual, audit |
| Rimuovi suppression | super admin o compliance, reason |
| Preview template | nessun dato reale non redatto |
| Disabilita template | super admin, reason |

## Error ledger integration

Gli errori email devono collegarsi al ledger operativo quando:

- email pagamento fallisce;
- email documento pronto fallisce;
- email PDF fallisce;
- email fattura fallisce;
- bounce su email cliente con ordine/report attivo;
- provider webhook fallisce;
- template rendering fallisce.

## Support workflow

Quando un cliente dice "non ho ricevuto l'email", l'admin deve poter vedere:

- evento originale;
- delivery attempts;
- provider message id;
- stato bounce/suppression;
- link sicuro rigenerabile se consentito;
- ticket collegabile.
