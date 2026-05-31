# ADR-001 — Design System Foundation

## Stato

Accettata per il pacchetto `0.3.0`.

## Contesto

ClientiAffidabili.it deve rivendere servizi dati/API trasformandoli in un'esperienza business semplice, sicura e comprensibile. Il rischio principale è copiare la logica del provider e mostrare un catalogo tecnico invece di un prodotto orientato alla decisione.

## Decisione

Adottare un design system proprietario, basato su:

- palette ricavata dal logo reale;
- componenti React riutilizzabili;
- token CSS e TypeScript allineati;
- copy decisionale;
- guardrail UX/compliance;
- checkout e report come superfici prioritarie.

## Conseguenze positive

- Coerenza visuale su tutte le pagine.
- Minor rischio di UI frammentata.
- Maggiore velocità negli sprint successivi.
- Migliore qualità percepita.
- Base pronta per QA visuale e accessibilità.

## Trade-off

- Serve disciplina: non creare componenti custom per ogni pagina.
- Serve manutenzione del design system.
- Alcune UI veloci dovranno essere rallentate per rispettare accessibilità e copy governance.

## Regola operativa

Ogni nuovo modulo deve dichiarare quali componenti usa, quali stati copre e quali eccezioni richiede.
