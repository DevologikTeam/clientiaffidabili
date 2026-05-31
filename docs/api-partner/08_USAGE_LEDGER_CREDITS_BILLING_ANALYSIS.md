# 08 — Usage Ledger, Credits & Billing Analysis

## Fonte di verità

La fonte di verità per consumo partner deve essere il `PartnerUsageLedger`, non i log provider.

Ogni evento di consumo deve includere:

- partner account;
- API key hash reference;
- endpoint;
- product code;
- idempotency key;
- request id;
- credit reservation;
- provider cost snapshot;
- partner price snapshot;
- result status;
- timestamp;
- correlation id.

## Credit reservation

Prima di chiamare provider:

1. valida API key;
2. valida scope;
3. valida rate limit;
4. valida product enablement;
5. riserva credito;
6. crea usage ledger pending;
7. chiama provider;
8. conferma o rilascia credito secondo esito.

## Billing partner

MVP:

- crediti prepagati;
- fatturazione manual-assisted;
- export usage mensile;
- admin review per contestazioni.

Post-MVP:

- abbonamenti partner;
- overage automatico;
- fattura mensile usage-based;
- revenue share/payout.

## Rimborsi/crediti partner

Se una chiamata fallisce prima del provider, credito rilasciato. Se fallisce dopo provider paid, review manuale. Se report pubblicato, credito consumato salvo eccezione auditata.
