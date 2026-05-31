# Invitations, Roles & Permissions Blueprint

## Ruoli customer MVP

| Ruolo | Può fare |
|---|---|
| owner | tutto; gestisce account, team, billing, report, supporto |
| admin | gestisce team operativo, verifiche, report, supporto; no ownership transfer |
| analyst | acquista/consulta verifiche e report secondo policy account |
| billing | vede fatture, profilo fiscale, abbonamento, rimborsi; no report sensibili se non autorizzato |
| viewer | vede solo report/verifiche assegnate o pubblicate all'account |

## Matrice permessi MVP

| Azione | owner | admin | analyst | billing | viewer |
|---|---:|---:|---:|---:|---:|
| Vedere dashboard | sì | sì | sì | sì | sì |
| Acquistare verifica | sì | sì | sì | no | no |
| Vedere report | sì | sì | sì | no* | sì* |
| Scaricare report | sì | sì | sì | no* | sì* |
| Gestire fatture | sì | no | no | sì | no |
| Gestire abbonamento | sì | no | no | sì | no |
| Invitare membro | sì | sì | no | no | no |
| Cambiare ruolo | sì | sì** | no | no | no |
| Trasferire ownership | sì | no | no | no | no |

`*` solo se policy account abilita visione/report assegnati.  
`**` admin non può creare/modificare owner.

## Invitation lifecycle

1. Owner/admin inserisce email e ruolo.
2. Sistema crea token random e salva `tokenHash`.
3. Email invito con link.
4. Utente accetta; se non ha user, imposta password.
5. Membership diventa active.
6. Audit event creato.

## Guardrail inviti

- Non invitare domini usa-e-getta se blacklist attiva.
- Non inviare inviti duplicati attivi per stessa email/account.
- Revoca invito sempre auditata.
- Cambio ruolo owner richiede step-up.
- Impossibile rimuovere ultimo owner.
