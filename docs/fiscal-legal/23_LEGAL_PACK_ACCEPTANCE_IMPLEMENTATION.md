# Implementazione legal pack e accettazioni

Il checkout puo procedere solo se il legal pack obbligatorio risulta pubblicato.

## Documenti obbligatori

- Termini di servizio.
- Privacy policy.
- Refund policy.
- Acceptable use policy.
- Disclaimer report.

## Accettazioni

Ogni accettazione salva:

- versione documento;
- content hash;
- finalita esplicite;
- timestamp;
- source (`checkout`, `account`, `api`, `admin_import`);
- snapshot hash.

## Guardrail

La UI pubblica mostra placeholder versionati, ma i testi sono marcati come non definitivi fino a revisione professionale.
