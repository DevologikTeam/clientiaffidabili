# Admin roles and permissions analysis

## Ruoli interni MVP

| Ruolo | Permessi principali | Limitazioni |
|---|---|---|
| `support_agent` | leggere ordini customer-safe, aprire/rispondere ticket | no refund, no raw payload, no override |
| `operations_agent` | lavorare code ordini/provider/report non sensibili | no refund, no publish compliance-sensitive |
| `billing_agent` | vedere pagamenti, fatture, rimborsi in bozza | no provider raw, no report publish |
| `compliance_reviewer` | approvare/bloccare richieste e report sensibili | no modifica prezzi, no refund diretto |
| `analyst` | revisionare report ed evidenze normalizzate | no raw payload diretto salvo permesso speciale |
| `super_admin` | override, impostazioni, audit completo | azioni ad alto rischio sempre motivate |

## Regole di autorizzazione

- Least privilege.
- Azioni economiche sempre tracciate.
- Accesso raw payload eccezionale, motivato e auditato.
- Publish report compliance-sensitive solo da ruolo autorizzato.
- Override prezzo/provider/report solo super admin o doppia approvazione futura.

## Matrice azioni

| Azione | Support | Ops | Billing | Compliance | Analyst | Super admin |
|---|---:|---:|---:|---:|---:|---:|
| Vedere lista ordini | sì | sì | sì | sì | sì | sì |
| Vedere dettagli pagamento | no | parziale | sì | parziale | no | sì |
| Avviare retry provider sicuro | no | sì | no | sì | no | sì |
| Approvare report | no | no | no | sì | sì* | sì |
| Pubblicare report | no | no | no | sì | no | sì |
| Emettere rimborso | no | no | proposta | no | no | sì |
| Vedere audit completo | no | parziale | parziale | parziale | no | sì |

`analyst` può approvare solo report non compliance-sensitive e se la policy lo consente.

## Guardrail RBAC

L'UI deve nascondere azioni non consentite, ma il backend deve comunque bloccarle.
