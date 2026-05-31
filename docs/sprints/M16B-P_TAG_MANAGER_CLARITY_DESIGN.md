# M16B-P — Tag Manager, Clarity & Campaign Event Tracking Design

Versione: `0.59.3`  
Tipo sprint: Progettazione  
Stato: completato

## Obiettivo

Trasformare l'analisi M16B-A in un blueprint operativo per configurare da admin/backend Google Tag Manager, Microsoft Clarity e il campaign event tagging, mantenendo un approccio privacy-safe e coerente con gli analytics interni gia' implementati.

Lo sprint progetta:

- settings admin e API backend;
- loader frontend GTM/Clarity;
- Consent Mode v2;
- dataLayer event registry;
- route allowlist/denylist per Clarity;
- masking e blocchi aree sensibili;
- attribuzione campagne;
- QA anti-PII;
- handoff sviluppo M16B-S.

## Decisione

Il progetto adottera' un modello **server-configured, consent-aware, deny-by-default**:

1. GTM e Clarity sono disabilitati di default;
2. i tracking ID non sono hardcoded;
3. il backend espone solo configurazione redatta e pubblicabile;
4. il frontend carica script esterni solo se settings, ambiente, route e consenso lo permettono;
5. gli eventi esterni passano da registry e sanitizer;
6. Clarity e' escluso dalle aree sensibili anche se abilitato;
7. gli analytics interni rimangono fonte primaria.

## Output

- Blueprint esperienza admin.
- Blueprint API/settings.
- Blueprint loader GTM/Clarity.
- Event registry TypeScript.
- Route policy e masking.
- Attribution e UTM snapshot.
- QA anti-PII.
- Handoff M16B-S.
