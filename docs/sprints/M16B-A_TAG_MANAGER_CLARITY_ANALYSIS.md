# M16B-A — Tag Manager, Clarity & Campaign Event Tracking Analysis

Versione: `0.59.2`  
Tipo sprint: Analisi  
Stato: completato

## Obiettivo

Analizzare come introdurre una governance centralizzata da admin/backend per Google Tag Manager, Microsoft Clarity e un sistema di tagging eventi utile a campagne, funnel, SEO/GEO e analisi commerciali, senza violare i guardrail privacy/security del progetto.

Questo sprint non implementa ancora lo script GTM/Clarity in produzione. Definisce cosa va tracciato, cosa va escluso, quali settings servono, quali consensi sono necessari e quali controlli QA devono bloccare eventi rischiosi prima del rilascio.

## Decisione architetturale

ClientiAffidabili.it adotterà un modello **Tagging Governance First**:

1. i provider esterni di tracking sono configurabili da admin/backend;
2. nessun tag esterno è attivo se il relativo setting non è abilitato;
3. il consenso utente governa gli eventi marketing/analytics esterni;
4. gli eventi tecnici necessari rimangono nel ledger interno e non vengono inviati a GTM/Clarity;
5. Clarity è escluso per default da aree sensibili come admin, checkout, report, fatture, dashboard account e pagine con documenti;
6. ogni evento esterno passa da una whitelist di nomi e proprietà consentite;
7. QA statico e runtime devono bloccare PII, API key, token, payload provider, dati report, prompt OpenAI e dati di pagamento.

## Ambiti analizzati

- Settings admin per GTM container ID.
- Settings admin per Microsoft Clarity project ID.
- Consenso analytics/marketing con default prudente.
- Data layer event taxonomy.
- Campaign attribution parameters.
- Event tagging per funnel pubblico, guide, servizi, pricing, contatti, checkout, pagamento, report e supporto.
- Aree sensibili da escludere.
- Errori da mandare solo in forma aggregata o interna.
- QA anti-PII e QA configurazioni.
- Handoff a M16B-P e M16B-S.

## Output prodotti

- Analisi strategica M16B.
- Tassonomia eventi campagna.
- Blueprint settings backend/admin.
- Analisi privacy/consenso.
- Analisi Clarity e aree escluse.
- Analisi QA security.
- Readiness checklist per sprint di design e sviluppo.
