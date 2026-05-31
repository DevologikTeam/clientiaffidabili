# Admin RBAC and action matrix blueprint

## Ruoli MVP

- `support_agent`;
- `operations_agent`;
- `billing_agent`;
- `compliance_reviewer`;
- `analyst`;
- `super_admin`.

## Principi

1. Least privilege.
2. Backend enforcement obbligatorio.
3. UI hiding solo come comodità, non sicurezza.
4. Reason obbligatoria su azioni economiche/compliance/provider/report.
5. Audit append-only su ogni azione critica.

## Permission groups

| Gruppo | Descrizione |
|---|---|
| `admin.queue.read` | leggere queue operative |
| `admin.order.read` | leggere snapshot ordine |
| `admin.billing.read` | leggere pagamenti/fatture |
| `admin.billing.refund.request` | proporre rimborso |
| `admin.billing.refund.approve` | approvare rimborso |
| `admin.provider.read` | leggere richiesta provider normalizzata |
| `admin.provider.retry.safe` | ripetere retry sicuro |
| `admin.provider.raw.request_access` | richiedere accesso payload tecnico |
| `admin.report.review` | revisionare report |
| `admin.report.publish` | pubblicare report |
| `admin.report.block` | bloccare report |
| `admin.support.reply` | rispondere ticket |
| `admin.audit.read` | leggere audit parziale |
| `admin.audit.full_read` | leggere audit completo |
| `admin.override.execute` | override controllato |

## Matrice ruoli sintetica

| Permission | Support | Ops | Billing | Compliance | Analyst | Super admin |
|---|---:|---:|---:|---:|---:|---:|
| queue read | sì | sì | sì | sì | sì | sì |
| order read | parziale | sì | sì | sì | sì | sì |
| billing read | no | parziale | sì | parziale | no | sì |
| refund request | no | no | sì | no | no | sì |
| refund approve | no | no | no | no | no | sì |
| provider retry safe | no | sì | no | sì | no | sì |
| report review | no | no | no | sì | sì | sì |
| report publish | no | no | no | sì | no | sì |
| support reply | sì | parziale | parziale | parziale | no | sì |
| audit full read | no | no | no | no | no | sì |
| override execute | no | no | no | no | no | sì |

## UI behaviour

- Se l'utente non ha permesso: azione nascosta o mostrata come non disponibile se utile alla comprensione.
- Se l'azione richiede ruolo superiore: mostra `Richiede approvazione compliance` o `Richiede super admin`.
- Se l'azione è vietata da stato: mostra motivo operativo, non messaggio tecnico.

## Backend contract

Ogni endpoint azione deve validare:

- autenticazione;
- ruolo;
- permission;
- stato sorgente;
- guardrail di business;
- reason quando richiesta;
- idempotency quando azione esterna/costosa.
