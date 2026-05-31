# Partner Admin Operations Blueprint

## Code admin
- Partner onboarding review.
- Live access requests.
- API key anomalies.
- Usage/margin anomalies.
- Webhook delivery failures.
- Credit wallet disputes.
- Rate limit escalation requests.
- Compliance review.

## Detail view admin
Ogni partner deve avere:
- profilo aziendale;
- use case dichiarato;
- stato onboarding;
- ambiente sandbox/live;
- API key redatte;
- rate limit profile;
- scopes;
- usage summary;
- ledger summary;
- webhook status;
- audit timeline;
- decisioni compliance.

## Azioni admin
- approva sandbox;
- approva live;
- richiedi modifiche;
- sospendi live;
- revoca API key;
- cambia rate limit profile;
- aggiorna pricing tier;
- crea adjustment crediti;
- replay webhook;
- blocca partner.

## Reason obbligatoria
Richiesta per: approvazione live, sospensione, revoca key, cambio prezzi, adjustment crediti, replay webhook, override margin guard.

## Audit
Ogni azione admin deve salvare:
- actor;
- role;
- reason;
- before/after redatto;
- timestamp;
- correlazione con partner/account/key/usage se presente.
