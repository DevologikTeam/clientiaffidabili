# Security Product Strategy

## Posizionamento

ClientiAffidabili.it vende fiducia operativa: verifiche, report e monitoraggi per aiutare PMI, agenzie, consulenti e team amministrativi a prendere decisioni piu' consapevoli. Per questo la sicurezza non e' un requisito laterale, ma parte del valore commerciale.

## Principi security-first

1. **Least privilege**: ogni utente vede solo cio' che serve al suo ruolo.
2. **Object-level authorization**: ogni report, ordine, pagamento e verifica deve controllare ownership e scope.
3. **No raw payload exposure**: il dato provider grezzo non e' mai prodotto cliente.
4. **No provider call without entitlement**: pagamento confermato o credito prenotato prima di chiamare il provider.
5. **Audit-first**: azioni sensibili tracciate con actor, reason, target, timestamp e outcome.
6. **Data minimization**: raccogliere solo dati necessari alla verifica e alla fatturazione.
7. **Human review where risk is ambiguous**: compliance-sensitive, provider errors e rimborsi complessi vanno in admin queue.
8. **Secure by default**: feature rischiose disattivate finche' non validate in sandbox/production gate.

## Superfici protette

| Superficie | Protezione richiesta |
|---|---|
| Public funnel | CSP, anti-abuse, rate limit soft, no sensitive data |
| Checkout | provider hosted, webhook firmati, snapshot immutabile |
| Customer dashboard | RBAC account-level, report access auditabile |
| Admin operations | RBAC forte, reason modal, audit append-only |
| Provider runtime | server-side only, idempotenza, cost ledger, raw vault |
| Report composer | snapshot immutabile, copy compliance, fonti/limiti |
| Billing/subscription | ledger append-only, dispute/refund controls |

## Priorita' MVP produzione

P0: auth/RBAC, object ownership, secret management, webhook verification, provider idempotency, log redaction, backup/restore, incident response.

P1: SAST/SCA, CSP avanzata, automated dependency alerts, admin session hardening, report download watermark/audit.

P2: SIEM, WAF, dual control admin, anomaly detection, bug bounty/private disclosure policy.
