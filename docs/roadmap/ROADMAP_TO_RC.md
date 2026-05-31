# Roadmap fino alla Release Candidate

Versione aggiornata: **0.69.0**  
Data: **2026-05-30**

Questa roadmap consolida i moduli già completati e la sequenza finale fino alla prima **Release Candidate**.

## Stato attuale

- Ultimo sprint completato: **M20-A UX, SEO, Performance & Accessibility Polish Analysis**.
- Patch roadmap: **0.57.1 Email & Customer Notifications Requirements**.
- Prossimo sprint operativo: **M20-P UX, SEO, Performance & Accessibility Polish Design**.

## Sequenza fino alla RC

| Versione indicativa | Sprint | Obiettivo |
|---|---|---|
| 0.58.0 | M16-P Analytics & Growth Design | Progettare eventi, funnel, attribuzione, KPI, dashboard growth e privacy guardrail. |
| 0.59.0 | M16-S Analytics & Growth Development | Implementare event tracker interno, dashboard KPI, funnel, attribution e insight aggregati. |
| 0.59.2 | M16B-A Tag Manager & Clarity Analysis | Analizzare Tag Manager, Clarity, event tagging, consenso, campaign analytics e privacy guardrail. |
| 0.59.3 | M16B-P Tag Manager & Clarity Design | Progettare settings admin/backend, dataLayer taxonomy, Clarity config, QA e CMP integration. |
| 0.59.4 | M16B-S Tag Manager & Clarity Development | Implementare runtime GTM/Clarity, settings admin, eventi campagna e controlli anti-PII. |
| 0.60.0 | M17-A OpenAI Assisted Operations Analysis | Capire dove usare AI in modo sicuro: CMS, supporto, error ledger, report/admin. |
| 0.61.0 | M17-P OpenAI Assisted Operations Design | Progettare copilot, prompt, redaction, budget, audit, settings OpenAI e approval flow. |
| 0.62.0 | M17-S OpenAI Assisted Operations Development | Implementare AI copilot interno, content assistant, support assistant ed error summary assistant. |
| 0.63.0 | M18-A Email & Customer Notifications Analysis | Analizzare tutte le email tecniche cliente, deliverability, template, allegati, retry e ledger. |
| 0.64.0 | M18-P Email & Customer Notifications Design | Progettare provider email, template, code, webhook, PDF delivery, remember-me/security emails. |
| 0.65.0 | M18-S Email & Customer Notifications Development | Implementare email runtime, template, log invii, retry, webhook provider e admin monitor. |
| 0.66.0 | M19-A Sandbox Certification Analysis | Analizzare test reali Stripe/PayPal/Openapi/OpenAI/email in sandbox/staging. |
| 0.67.0 | M19-P Sandbox Certification Design | Progettare checklist di certificazione integrata, fixture, smoke test e rollback. |
| 0.68.0 | M19-S Sandbox Certification Development | Implementare test sandbox, script di verifica e fix dei blocchi principali. |
| 0.69.0 | M20-A UX/SEO/Performance/Accessibility Analysis | Audit finale UX, SEO/GEO, performance, accessibilita, mobile e copy. |
| 0.69.1 | M20-P UX/SEO/Performance/Accessibility Design | Blueprint rifinitura pre-RC. |
| 0.69.2 | M20-S UX/SEO/Performance/Accessibility Development | Implementazione polish, accessibility fixes, performance and content readiness. |
| 0.70.0 | M21-A RC Hardening Analysis | Analisi finale build, security, E2E, dati, rollback, compliance e supporto. |
| 0.70.1 | M21-P RC Hardening Design | Piano tecnico di chiusura Release Candidate. |
| 0.70.2 | M21-S RC Hardening Development | Ultimo hardening e pacchetto candidato. |
| 1.0.0-rc.1 | Release Candidate 1 | Prima release candidate completa, pronta per staging finale e sign-off. |

## Perche M18 e' stato rafforzato

Le email tecniche non sono un dettaglio accessorio: sono parte del prodotto. Senza email affidabili, il cliente non riceve conferme, reset password, documenti pronti, ricevute, link report/PDF e comunicazioni di rimborso.

M18 diventa quindi un modulo obbligatorio prima della RC, non un backlog opzionale.

## Criteri minimi per RC

La RC potra' essere dichiarata solo se:

- login, registrazione, verifica email, reset password e remember-me sono testati;
- checkout e pagamenti sandbox generano email corrette;
- report/documento pronto genera notifica cliente;
- PDF report puo' essere inviato via email o come link sicuro;
- email ledger registra invii, errori, bounce, complaint, retry e provider message id;
- email tecniche non contengono dati sensibili non necessari;
- domain authentication SPF/DKIM/DMARC e' documentata;
- admin puo' vedere stato invii e reinviare comunicazioni quando sicuro;
- error ledger e email ledger sono collegabili a rimborso/fix/supporto;
- build, E2E, smoke, secret scan e production gate sono passati.

## Aggiornamento 0.58.0

Completato **M16-P Analytics, Attribution & Growth Intelligence Design**.

Roadmap residua verso RC:

1. M16-S Analytics, Attribution & Growth Intelligence Development.
2. M17-A/P/S OpenAI Assisted Operations & Content Copilot.
3. M18-A/P/S Email & Customer Notifications.
4. M19-A/P/S Sandbox Certification.
5. M20-A/P/S UX, SEO, Performance & Accessibility Polish.
6. M21-A/P/S RC Hardening.
7. v1.0.0-rc.1 Release Candidate.


## Patch 0.59.1 - Tag Manager, Clarity e campaign event tagging

Aggiunto modulo **M16B - Tag Manager, Clarity & Campaign Event Tracking** prima del modulo OpenAI.

Motivazione: prima di introdurre AI/copilot e ulteriori automazioni, il prodotto deve poter misurare correttamente funnel, campagne, conversioni, contenuti SEO/GEO, checkout, pagamenti e punti di blocco.

Feature inserite in roadmap:

- settings admin/backend per Google Tag Manager;
- settings admin/backend per Microsoft Clarity;
- dataLayer event taxonomy su tutto il funnel;
- tagging passaggi: pagina, guida, servizio, CTA, contatto, checkout, pagamento, report pronto, PDF, account, supporto;
- Clarity configurabile con masking strict e pagine escluse;
- consenso privacy-safe con default denied;
- QA anti-PII per eventi marketing;
- blocco strumenti esterni su admin/report/checkout per default;
- aggiornamento privacy/cookie policy richiesto prima della RC.


## Aggiornamento 0.60.0 - M17-A OpenAI Assisted Operations Analysis

Completato lo sprint di analisi per introdurre OpenAI come assistente interno controllato.

Decisioni consolidate:

- AI solo lato admin/backend nel MVP;
- nessun chatbot pubblico;
- OpenAI disabilitato di default;
- settings, budget e secret reference gestiti da admin;
- redaction obbligatoria prima di ogni richiesta;
- prompt registry versionato;
- output sempre come bozza da approvare;
- error ledger e usage ledger obbligatori;
- nessuna azione sensibile automatica.

Roadmap residua:

1. 0.61.0 M17-P OpenAI Assisted Operations & Content Copilot Design.
2. 0.62.0 M17-S OpenAI Assisted Operations & Content Copilot Development.
3. 0.63.0 M18-A Email & Customer Notifications Analysis.
4. 0.64.0 M18-P Email & Customer Notifications Design.
5. 0.65.0 M18-S Email & Customer Notifications Development.
6. 0.66.0 M19-A Sandbox Certification Analysis.
7. 0.67.0 M19-P Sandbox Certification Design.
8. 0.68.0 M19-S Sandbox Certification Development.
9. 0.69.x M20 UX/SEO/Performance/Accessibility Polish.
10. 0.70.x M21 RC Hardening.
11. 1.0.0-rc.1 Release Candidate.


## Aggiornamento 0.63.0 - M18-A Email & Customer Notifications Analysis

Completata analisi del sistema email tecnico cliente/admin. Consolidati inventario eventi, deliverability SPF/DKIM/DMARC, reset password, remember-me, inviti team, acquisti, pagamenti, rimborsi, documento pronto, PDF via link sicuro o allegato policy-driven, fatture, ticket supporto e partner API.

Roadmap residua:

1. 0.64.0 M18-P Email & Customer Notifications Design.
2. 0.65.0 M18-S Email & Customer Notifications Development.
3. 0.66.0 M19-A Sandbox Certification Analysis.
4. 0.67.0 M19-P Sandbox Certification Design.
5. 0.68.0 M19-S Sandbox Certification Development.

## Aggiornamento 0.64.0 - M18-P Email & Customer Notifications Design

Completata la progettazione del sistema email tecnico cliente/admin.

Consolidati:

- eventi email account/security;
- registrazione, verifica email, recupero password e remember-me;
- inviti team e cambio ruolo;
- notifiche ordine, pagamento, rimborso e dispute;
- report/documento pronto;
- PDF via link sicuro first e allegato policy-driven;
- fatture e note credito;
- abbonamenti e crediti;
- supporto e partner API;
- ledger consegne, webhook provider, bounce, complaint, suppression, retry;
- admin monitor `/admin/email`;
- collegamento con Operational Error Ledger.

Roadmap residua:

1. 0.65.0 M18-S Email & Customer Notifications Development.
2. 0.66.0 M19-A Sandbox Certification Analysis.
3. 0.67.0 M19-P Sandbox Certification Design.
4. 0.68.0 M19-S Sandbox Certification Development.
5. 0.69.x M20 UX/SEO/Performance/Accessibility Polish.
6. 0.70.x M21 RC Hardening.
7. 1.0.0-rc.1 Release Candidate.

## Aggiornamento M19-P — Sandbox Certification Design

La roadmap verso RC richiede ora che M19-S implementi un sistema di certificazione sandbox con scenari, evidenze, error ledger e waiver auditati. Ogni feature non certificata deve restare disabilitata o fuori dalla RC.

Sequenza confermata:

```text
v0.67.0 M19-P Sandbox Certification Design
v0.68.0 M19-S Sandbox Certification Development
v0.69.0 M20-A UX, SEO, Performance & Accessibility Polish Analysis
v0.69.1 M20-P UX, SEO, Performance & Accessibility Polish Design
v0.69.2 M20-S UX, SEO, Performance & Accessibility Polish Development
v0.70.0 M21-A RC Hardening Analysis
v0.70.1 M21-P RC Hardening Design
v0.70.2 M21-S RC Hardening Development
v1.0.0-rc.1 Release Candidate 1
```

## Aggiornamento M19-S — Sandbox Certification Development

Completato runtime mock-first della certificazione sandbox. Il sistema ora dispone di modulo backend, entita run/scenari/evidenze/waiver, endpoint admin, runner CLI, static gate, UI launch readiness e collegamento Operational Error Ledger.

Sequenza prossima confermata:

```text
v0.69.0 M20-A UX, SEO, Performance & Accessibility Polish Analysis
v0.69.1 M20-P UX, SEO, Performance & Accessibility Polish Design
v0.69.2 M20-S UX, SEO, Performance & Accessibility Polish Development
v0.70.0 M21-A RC Hardening Analysis
v0.70.1 M21-P RC Hardening Design
```

Nota: la suite M19-S non sostituisce provider sandbox reali, Docker/Coolify smoke, Playwright reale o migrazioni DB. Questi restano gate prima della Release Candidate.


## Aggiornamento 0.69.0 - M20-A UX, SEO, Performance & Accessibility Polish Analysis

Completata l'analisi pre-RC dedicata a UX, copy pubblico, SEO/GEO tecnico, performance, mobile, accessibilita e privacy/indexing.

Decisioni consolidate:

- M20 deve rifinire le feature gia presenti, non aggiungere nuove aree funzionali.
- Le pagine pubbliche non devono mostrare parole interne da sviluppo o gestione tecnica.
- Le route sensibili devono avere noindex page-level oltre alla protezione robots/sitemap.
- Metadata, sitemap, schema, mobile nav, checkout e listini devono diventare gate verificabili.
- Accessibility e performance devono produrre evidenze salvate in repository/artifacts durante M20-S.

Prossima sequenza:

1. v0.69.1 M20-P UX, SEO, Performance & Accessibility Polish Design.
2. v0.69.2 M20-S UX, SEO, Performance & Accessibility Polish Development.
3. v0.70.0 M21-A RC Hardening Analysis.
4. v0.70.1 M21-P RC Hardening Design.
5. v0.70.2 M21-S RC Hardening Development.
