# Auth UI Components Blueprint

## Componenti da sviluppare in M11-S

| Componente | Scopo |
|---|---|
| `AuthShell` | layout login/registrazione/reset |
| `LoginForm` | email/password, remember device futuro |
| `RegisterAccountForm` | dati utente + dati azienda minimi |
| `ForgotPasswordForm` | richiesta reset con risposta neutra |
| `ResetPasswordForm` | nuova password + conferma |
| `InviteAcceptPanel` | riepilogo invito e accettazione |
| `AccountSwitcher` | cambio account se user multi-account |
| `TeamMemberTable` | membri, ruoli, stati, azioni |
| `InviteMemberForm` | invito con ruolo e spiegazione permessi |
| `RoleBadge` | badge ruoli customer |
| `SessionList` | sessioni/device attivi |
| `SecuritySettingsPanel` | password, MFA futuro, session revoke |
| `PermissionDeniedState` | errore autorizzazione leggibile |

## Regole visuali

- Layout auth semplice, centrato, con logo e trust copy.
- Form brevi, errori vicino ai campi.
- CTA chiare: "Accedi", "Crea area riservata", "Invia link di sicurezza".
- Niente linguaggio tecnico tipo "session token" nella UI cliente.
- Stati bloccati spiegano cosa fare, non mostrano stack/errori tecnici.

## Copy standard

### Login

Headline: `Accedi alla tua area riservata`  
Subcopy: `Consulta verifiche, report, fatture e stato delle richieste in modo protetto.`

### Registrazione

Headline: `Crea l'area riservata della tua azienda`  
Subcopy: `Ti servirà per acquistare verifiche, ricevere report e gestire documenti fiscali.`

### Team

Headline: `Gestisci chi può accedere ai dati aziendali`  
Subcopy: `Assegna ruoli diversi a chi consulta report, gestisce fatture o coordina il team.`
