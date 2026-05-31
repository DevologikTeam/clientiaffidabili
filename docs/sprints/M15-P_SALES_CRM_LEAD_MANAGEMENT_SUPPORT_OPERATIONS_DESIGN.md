# M15-P — Sales CRM, Lead Management & Support Operations Design

## Obiettivo

Trasformare l'analisi M15-A in un blueprint operativo per CRM commerciale, contatti, lead, opportunità, ticket, supporto, consenso e admin operations.

Questo sprint recepisce anche i nuovi requisiti trasversali:

- utente admin di bootstrap;
- kill switch temporaneo per disabilitare acquisti;
- settings admin per metodi di pagamento, Openapi e OpenAI;
- modulo contatti che salva sempre il messaggio in admin, oltre a tentare invio email;
- error ledger tracciabile per pagamenti, provider/Openapi, OpenAI e webhook;
- salvataggio IP acquisto con privacy guardrail;
- QA generico per intercettare errori sorgente/JSX prima di rilasciare lo ZIP.

## Decisione architetturale

Il CRM non deve essere isolato: deve dialogare con Admin Operations, Billing, Provider, Report, SEO/GEO CMS, Auth e Settings Admin.

La nuova roadmap introduce un modulo trasversale **M15B Platform Settings, Bootstrap Admin & Operational Error Ledger**.

## Output progettati

- CRM admin queue-first.
- Contact inbox persistente.
- Lead/opportunity/ticket blueprint.
- Settings roadmap insert.
- Bootstrap admin blueprint.
- Purchase kill switch blueprint.
- Payment/Openapi/OpenAI settings blueprint.
- Error ledger blueprint.
- Purchase IP audit blueprint.
- QA source syntax smoke check.

## Criteri di accettazione

- Ogni messaggio pubblico deve essere salvato prima dell'invio email.
- Gli acquisti devono poter essere sospesi da admin senza deploy.
- Le configurazioni operative devono stare in settings admin, non solo ENV.
- Gli errori devono avere owner, categoria, severità, payload redatto e collegamento a ordine/pagamento/provider/report.
- Gli IP di acquisto devono essere salvati con finalità antifrode/audit, retention e accesso limitato.
- Lo ZIP deve includere QA generico per errori di stringhe multilinea/JSX come quello rilevato nel build web.

## Stato

Completato come blueprint + fix sorgente/QA.
