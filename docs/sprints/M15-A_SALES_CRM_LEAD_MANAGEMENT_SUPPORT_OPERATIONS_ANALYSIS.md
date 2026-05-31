# M15-A — Sales CRM, Lead Management & Support Operations Analysis

Data: **2026-05-30**  
Versione: **0.51.0**  
Tipo sprint: **Analisi**

## Obiettivo

Analizzare il modulo commerciale e supporto operativo per ClientiAffidabili.it: acquisizione lead, richieste contatto, richieste demo, CRM interno, pipeline commerciale, support ticket, follow-up, handoff da pagine SEO/GEO/CMS, collegamento a ordini/report/abbonamenti e governance privacy-safe.

Lo sprint prepara M15-P e M15-S, senza implementare ancora una soluzione CRM completa.

## Perché serve

Dopo il sito pubblico, il CMS SEO/GEO, il checkout, i report e l'area cliente, il progetto ha bisogno di una superficie interna per non perdere opportunità commerciali e richieste di supporto. La piattaforma deve distinguere:

- lead commerciali non ancora clienti;
- clienti con ordini/report attivi;
- partner/API reseller;
- richieste di supporto tecnico/amministrativo;
- richieste sensibili collegate a pagamenti, rimborsi, fatture, report o provider.

## Domande analizzate

1. Come si acquisisce un lead dal sito pubblico senza raccogliere dati eccessivi?
2. Quali form servono nel MVP?
3. Quali stati deve avere un lead?
4. Quando una richiesta diventa opportunità commerciale?
5. Quando una richiesta deve diventare ticket di supporto?
6. Come collegare CRM, account cliente, billing, report e admin operations?
7. Quali notifiche interne servono senza creare rumore operativo?
8. Quali dati devono essere esclusi da tracking e CRM per privacy/compliance?
9. Quale pipeline vendite è adatta a un servizio B2B di verifiche e report?
10. Quali guardrail impediscono abuso, spam, scraping e uso improprio dei form?

## Esito analisi

La decisione MVP è creare un **CRM operativo leggero e interno**, non un clone di HubSpot/Salesforce. Deve rispondere a quattro bisogni:

- raccogliere lead e richieste dal sito;
- assegnare e seguire opportunità commerciali;
- trasformare richieste operative in ticket;
- dare al team una lista prioritaria di attività commerciali/supporto.

## Moduli impattati

- Public launch website
- SEO/GEO customer education pages
- CMS editoriale
- Checkout
- Customer Dashboard
- Admin Operations
- Billing/refunds/subscriptions
- Partner Portal/API reseller
- Authentication/team management

## Deliverable

- Strategia CRM/supporto MVP.
- Analisi form e touchpoint.
- Pipeline lead/opportunità.
- Analisi support ticket e handoff operativo.
- Data model preliminare.
- Analisi privacy, consenso e anti-abuse.
- Readiness checklist M15-P/M15-S.

## Stato

Sprint completato come analisi. Nessuna modifica runtime obbligatoria al prodotto finale, oltre a registry/metadata di analisi e QA statico.
