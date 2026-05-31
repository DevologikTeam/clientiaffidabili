# M16-P — Analytics, Attribution & Growth Intelligence Design

Versione: 0.58.0  
Tipo sprint: Progettazione  
Stato: Completato

## Obiettivo

Trasformare l'analisi M16-A in un blueprint operativo per misurare crescita, conversioni, SEO/GEO, errori e marginalità senza introdurre tracking invasivo o dati sensibili negli analytics.

Il modulo deve aiutare l'admin a rispondere a domande operative:

- quali guide SEO/GEO portano traffico e lead;
- quali servizi convertono di più;
- dove si blocca il checkout;
- quali errori pagamenti, provider, OpenAI o email generano perdita economica;
- quali contenuti assistono una vendita;
- quali campagne o fonti portano utenti con margine sostenibile;
- quali aree necessitano intervento commerciale, UX o tecnico.

## Decisione di progettazione

Analytics è **internal-first**. GA4, Matomo o altri strumenti esterni sono integrazioni opzionali, governate da consenso e settings admin. La fonte di verità operativa resta il database interno con eventi minimizzati e aggregabili.

## Cosa viene progettato

1. Event taxonomy privacy-safe.
2. Data model per eventi, sessioni anonime, attribution snapshot, KPI snapshot e funnel snapshot.
3. Dashboard growth admin.
4. SEO/GEO measurement per guide CMS.
5. Checkout and revenue funnel.
6. Provider, OpenAI, email e payment error insights aggregati.
7. Consent state model.
8. API contract per tracking server-side e dashboard admin.
9. Handoff tecnico per M16-S.

## Guardrail

- Non salvare email, telefono, codice fiscale, partita IVA, IBAN, dati carta o messaggi contatto negli analytics.
- Non salvare raw payload Openapi, OpenAI, Stripe, PayPal o webhook.
- Non usare analytics per profilazione aggressiva individuale.
- Non duplicare IP acquisto negli analytics: l'IP resta nel `PurchaseIpAudit` privacy-aware.
- Non usare eventi client-side per confermare azioni economiche.
- Eventi economici importanti devono essere server-side.
- Errori dettagliati restano nell'Operational Error Ledger; analytics vede solo codici normalizzati e aggregabili.

## Esito

Il blueprint è pronto per M16-S, che implementerà runtime analytics, event tracker, admin dashboard e KPI snapshots.
