# M15B-P Source Notes

## OpenAI Platform

La progettazione dei settings OpenAI mantiene API key e project configuration fuori dal frontend e dal repository. Le chiavi devono essere gestite tramite environment/secret manager o secret reference, con separazione staging/production, budget, rate limit e monitoraggio usage.

## Applicazione al progetto

- OpenAI disabilitato di default.
- Secret write-only.
- Budget guard obbligatorio.
- Error ledger per errori/costi.
- Nessun output AI pubblicato automaticamente.
