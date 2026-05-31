# 24 — Settings Admin UI Components Blueprint

## Componenti

- `SettingsStatusHero`
- `SettingsNamespaceCard`
- `SettingControlRow`
- `SecretReferenceField`
- `PurchaseKillSwitchPanel`
- `ProviderHealthCard`
- `OpenAiBudgetGuardCard`
- `OperationalErrorTable`
- `OperationalErrorDetailPanel`
- `ErrorResolutionActionPanel`
- `BuyerIpAuditBadge`
- `ReasonRequiredModal`
- `SettingsAuditTimeline`

## Stati UI

Ogni setting puo' essere:

- active;
- disabled;
- requires_review;
- error;
- locked_by_env;
- secret_write_only;
- pending_verification.

## Copy

Evitare:

- “salva env”;
- “token visibile”;
- “forza pagamento”;
- “ignora errore” senza motivo.

Usare:

- “Sospendi nuovi acquisti”;
- “Aggiorna riferimento segreto”;
- “Verifica configurazione provider”;
- “Collega errore a rimborso”;
- “Risolvi con motivazione”.
