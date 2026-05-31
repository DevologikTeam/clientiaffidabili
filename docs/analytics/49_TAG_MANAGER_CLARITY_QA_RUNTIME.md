# QA runtime GTM/Clarity

Il QA M16B-S verifica:

- presenza endpoint `/analytics/public-config`;
- presenza loader frontend;
- nessun tracking ID reale hardcoded;
- denylist Clarity per route sensibili;
- default consenso `denied`;
- helper `pushCampaignEvent` e `sanitizeCampaignPayload`;
- blocco payload sensibili;
- root layout integrato con `ExternalTrackingProvider`;
- pagina admin settings analytics.

Il controllo generico `qa-source-syntax-smoke` resta obbligatorio prima dello ZIP.
