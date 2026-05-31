# 09 — Partner Admin Operations Analysis

## Code operative admin

- Partner access requests;
- Production access requests;
- API key incidents;
- Credit disputes;
- Rate limit exceptions;
- Suspicious usage;
- Webhook failures;
- Partner billing review;
- Legal/compliance review.

## Azioni admin sensibili

| Azione | Reason | Audit | Ruolo |
|---|---|---|---|
| Approva partner | sì | sì | operations/compliance |
| Attiva production | sì | sì | super admin/compliance |
| Revoca API key | sì | sì | operations/security |
| Aumenta rate limit | sì | sì | super admin |
| Applica credito manuale | sì | sì | billing |
| Sblocca prodotto KYB | sì | sì | compliance |
| Sospendi partner | sì | sì | super admin |

## Monitoraggio rischio

- spike chiamate;
- error rate alto;
- crediti quasi esauriti;
- produzione usata senza webhook;
- stesso IP per più partner;
- richieste ripetute stesso soggetto;
- uso prodotti non coerente col contratto.

## UI admin consigliata

La console admin deve essere queue-first, come M8, con card per partner e detail view con timeline, key, credit, usage e compliance status.
