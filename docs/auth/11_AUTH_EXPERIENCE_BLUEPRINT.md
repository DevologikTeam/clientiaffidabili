# Auth Experience Blueprint

## Principio UX

L'autenticazione deve sembrare un percorso di protezione, non un ostacolo. Il cliente deve capire sempre perché gli viene chiesto di accedere: vedere report, fatture, storico, abbonamenti o invitare colleghi.

## Pagine pubbliche/auth MVP

| Route | Scopo | Note |
|---|---|---|
| `/login` | accesso area riservata | messaggi neutri, no enumeration |
| `/registrati` | creazione account aziendale | user + account + owner membership |
| `/password-dimenticata` | richiesta reset | sempre risposta neutra |
| `/reset-password` | impostazione nuova password | token monouso, TTL, revoke sessioni precedenti |
| `/inviti/[token]` | accetta invito team | mostra azienda/ruolo prima di accettare |
| `/dashboard/account` | profilo account | dati azienda e stato sicurezza |
| `/dashboard/team` | team e ruoli | owner/admin only per modifiche |
| `/dashboard/sicurezza` | password/sessioni/MFA futura | customer-facing |

## Primo accesso post-checkout

Scenario consigliato:

1. Cliente completa checkout come guest.
2. Riceve email "Attiva la tua area riservata".
3. Imposta password o accede se account già esistente.
4. Viene portato a `/dashboard/verifiche/[id]`.
5. Vede stato richiesta e prossima azione.

## Empty/error states

| Stato | Copy |
|---|---|
| Link reset scaduto | "Il link non è più valido. Richiedi un nuovo link di sicurezza." |
| Invito revocato | "Questo invito non è più attivo. Chiedi a un amministratore di inviartene uno nuovo." |
| Ruolo insufficiente | "Non hai i permessi per questa azione. Puoi chiedere supporto a un amministratore dell'account." |
| Sessione scaduta | "Per proteggere i dati aziendali, effettua nuovamente l'accesso." |

## Azioni sensibili con step-up

Le seguenti azioni devono chiedere re-auth o MFA quando disponibile:

- cambio email;
- cambio password;
- invito o rimozione membri;
- cambio ruolo;
- trasferimento owner;
- creazione/revoca API key futura;
- richiesta rimborso o modifica billing;
- download massivo report futuro.
