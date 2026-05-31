# M16B - Tag Manager, Clarity & Campaign Event Tracking Roadmap Insert

Versione: **0.59.1**  
Data: **2026-05-30**

## Perche inserirlo ora

Il modulo analytics interno M16 ha creato la base privacy-safe per KPI, funnel, attribution e insight. Per campagne marketing, SEO/GEO e analisi UX serve ora un livello controllato di integrazione con strumenti esterni configurabili da admin, senza modifiche codice a ogni cambio container.

Questa roadmap introduce un modulo dedicato: **M16B - Tag Manager, Clarity & Campaign Event Tracking**.

## Obiettivi

- Configurare da backend/admin Google Tag Manager.
- Configurare da backend/admin Microsoft Clarity.
- Esporre nel frontend solo settings pubblicabili e non sensibili.
- Inserire dataLayer events nei passaggi importanti del funnel.
- Permettere campagne e analisi conversione senza inviare PII o dati sensibili.
- Collegare Tag Manager/Clarity a consenso cookie/marketing/analytics.
- Bloccare strumenti esterni in staging/non-production se non esplicitamente abilitati.
- Disabilitare Tag Manager/Clarity da admin in caso di problemi privacy, performance o tracking errato.

## Sequenza sprint

| Versione | Sprint | Obiettivo |
|---|---|---|
| 0.59.1 | Roadmap patch | Inserire feature in roadmap e definire requisiti base. |
| 0.59.2 | M16B-A Tag Manager & Clarity Analysis | Analizzare configurazioni, privacy, eventi, consenso, rischi, dati vietati. |
| 0.59.3 | M16B-P Tag Manager & Clarity Design | Progettare settings, dataLayer taxonomy, componenti, API e QA. |
| 0.59.4 | M16B-S Tag Manager & Clarity Development | Implementare runtime frontend/backend, settings admin, eventi e QA. |

## Decisione roadmap

Il modulo M16B va inserito **prima di M17 OpenAI Copilot**, perche' gli eventi analytics/campagne saranno utili anche per capire dove l'AI puo' aiutare senza diventare invasiva.

## Strumenti previsti

### Google Tag Manager

Da admin si potranno configurare:

- enable/disable globale;
- container ID web, esempio `GTM-XXXXXXX`;
- eventuale server-side tagging endpoint;
- ambiente `sandbox`, `staging`, `production`;
- consent mode integration;
- allowlist eventi esportabili;
- blocco su pagine sensibili;
- note operative e audit.

### Microsoft Clarity

Da admin si potranno configurare:

- enable/disable globale;
- project ID;
- load only after analytics consent;
- masking mode strict;
- esclusione pagine sensibili;
- blocco su admin/report/checkout se necessario;
- note operative e audit.

## Guardrail obbligatori

- Niente PII negli eventi.
- Niente email, telefono, CF/P.IVA, IBAN, API key, token, report payload, prompt OpenAI, raw provider payload.
- Niente dati carta o identificativi pagamento completi.
- Niente IP in chiaro negli eventi marketing.
- Niente Clarity su pagine admin e aree contenenti report/documenti sensibili, salvo futura review legale/tecnica.
- Default `disabled` in produzione finche' non viene approvato il legal/privacy check.
- Ogni modifica settings deve richiedere reason e audit.

## Collegamento ai moduli esistenti

- **M15B Settings Admin**: ospita settings, kill switch, audit e reason.
- **M16 Analytics**: mantiene il ledger interno privacy-safe.
- **M18 Email**: traccia conversioni aggregate senza contenuto email.
- **M19 Sandbox Certification**: include test di non-leak PII e consent mode.
- **M21 RC Hardening**: Tag Manager/Clarity devono passare QA prima della RC.
