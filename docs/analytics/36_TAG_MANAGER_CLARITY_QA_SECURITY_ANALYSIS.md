# 36 — Tag Manager & Clarity QA/Security Analysis

## QA richiesti

1. Nessun tracking ID hardcoded.
2. Nessun evento esterno con campi vietati.
3. Nessun Clarity su route sensibili.
4. Nessun GTM se `externalTags.enabled=false`.
5. Consent default `denied` documentato.
6. Route checkout/report/admin escluse da session recording.
7. Event taxonomy whitelistata.
8. QA source syntax smoke sempre attivo prima dello ZIP.

## Pattern vietati nei payload evento

- `email`;
- `phone`;
- `taxCode`;
- `vatNumber`;
- `iban`;
- `ip`;
- `token`;
- `apiKey`;
- `prompt`;
- `rawPayload`;
- `reportContent`;
- `documentBody`.

## Handoff QA per M16B-S

Lo sviluppo dovrà includere almeno:

- `qa-tag-manager-clarity-development.js`;
- scansione route denylist;
- scansione event registry;
- test settings default disabled;
- test redaction payload.
