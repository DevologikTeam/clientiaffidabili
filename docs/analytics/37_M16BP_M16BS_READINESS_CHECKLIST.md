# 37 — M16B-P/M16B-S Readiness Checklist

## Pronto per M16B-P quando

- Settings necessari definiti.
- Consent model definito.
- Event taxonomy MVP definita.
- Denylist Clarity definita.
- Parametri vietati definiti.
- Route coverage MVP definita.
- QA security definito.

## Pronto per M16B-S quando

- Componenti `TagManagerProvider` e `ClarityProvider` progettati.
- Admin UI settings progettata.
- API settings progettata.
- Event registry TypeScript progettato.
- Data layer helper progettato.
- Consent banner/state integration progettata.
- Test QA definiti.

## Bloccanti produzione

- Tag esterni attivi senza consenso valido.
- Clarity attivo in checkout/dashboard/admin/report/fatture.
- Payload evento con PII o dati sensibili.
- Tracking ID hardcoded.
- Mancanza audit sui settings.
