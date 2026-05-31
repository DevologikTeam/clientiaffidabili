# Customer/Admin Access Boundaries Analysis

## Separazione superfici

| Superficie | Utenti | Route |
|---|---|---|
| Pubblica | anonimi | `/`, `/servizi`, `/prezzi`, `/legal` |
| Customer | clienti autenticati | `/dashboard/*` |
| Admin interno | operatori interni | `/admin/*` |
| API partner futura | clienti/partner autorizzati | `/api/*`, developer portal |

## Regola dura

Un ruolo customer non deve mai sbloccare una route admin. Un ruolo admin non deve implicare automaticamente accesso customer a un account senza audit/impersonation controllata.

## Impersonation futura

Non MVP. Se necessaria:

- solo super admin/operations autorizzato;
- reason obbligatoria;
- durata breve;
- banner visibile;
- audit dettagliato;
- impossibilità di compiere azioni economiche o scaricare dati sensibili senza escalation.

## Admin MFA

Per produzione:

- MFA obbligatoria per admin;
- sessione admin più breve;
- step-up per rimborsi, pubblicazione report, provider retry e export massivi;
- IP allowlist opzionale per pannello admin in fase successiva.
