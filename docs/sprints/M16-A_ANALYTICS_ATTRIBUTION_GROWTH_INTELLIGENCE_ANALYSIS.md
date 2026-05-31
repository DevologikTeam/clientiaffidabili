# M16-A — Analytics, Attribution & Growth Intelligence Analysis

Versione: 0.57.0  
Tipo sprint: Analisi  
Stato: completato

## Obiettivo

Definire una strategia analytics privacy-safe per ClientiAffidabili.it che permetta di capire:

- quali pagine generano interesse commerciale;
- quali contenuti SEO/GEO portano lead qualificati;
- quali servizi convertono meglio;
- dove il funnel perde utenti;
- quali errori operativi impattano vendite, rimborsi e supporto;
- quali decisioni di crescita prendere senza esporre dati sensibili.

Lo sprint non implementa ancora tracking reale. Definisce perimetro, eventi, metriche, governance, guardrail e readiness per M16-P/M16-S.

## Principio guida

Analytics sì, sorveglianza no.

Il progetto tratta dati ad alto rischio commerciale: verifiche aziendali, report, pagamenti, errori provider, rimborsi, contatti e richieste partner. Per questo l'analytics deve misurare il comportamento aggregato del prodotto senza registrare PII, contenuti report, raw payload provider, dati fiscali, IBAN, token, API key, query sensibili o payload checkout.

## Scope M16

In scope:

- eventi prodotto privacy-safe;
- funnel pubblico e checkout;
- misurazione SEO/GEO e CMS guide;
- attribution first-party;
- dashboard growth interna;
- collegamento con CRM, contact inbox e error ledger;
- KPI commerciali e operativi;
- feature flags analytics;
- consent mode/readiness CMP;
- data retention e minimizzazione.

Fuori scope M16-A:

- implementazione reale GA4/Matomo/server analytics;
- setup Google Tag Manager;
- campagne Ads;
- data warehouse avanzato;
- attribution multi-touch complessa;
- scoring lead automatico con AI.

## Decisione strategica

Per MVP usare un modello ibrido:

1. **Product analytics interno first-party** per eventi critici business e operativi.
2. **GA4 opzionale e consent-aware** per traffico pubblico/SEO, se abilitato da admin e CMP.
3. **Matomo opzionale/self-hosted** come alternativa più controllabile per analytics privacy-oriented.
4. **Search Console manual/connector future** per misurare performance organica senza duplicare dati personali.

## Gate non negoziabili

- Nessun tracking senza consenso dove richiesto.
- Nessun evento con PII.
- Nessun payload provider/Openapi/OpenAI nei log analytics.
- Nessun dato carta, IBAN, codice fiscale, partita IVA completa o email in chiaro negli eventi.
- Nessun contenuto report nel tracking.
- Eventi economici tracciati con importi aggregabili e order/report IDs interni non esposti al client pubblico.
- Errori tecnici dettagliati nel **Operational Error Ledger**, non in analytics marketing.

## Output sprint

- strategia analytics/growth;
- event taxonomy;
- funnel attribution model;
- SEO/GEO measurement model;
- dashboard KPI blueprint preliminare;
- privacy/data governance;
- readiness checklist per M16-P/M16-S.
