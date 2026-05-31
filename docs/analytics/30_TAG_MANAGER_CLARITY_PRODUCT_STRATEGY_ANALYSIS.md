# 30 — Tag Manager & Clarity Product Strategy Analysis

## Perché aggiungerli

Il progetto ha già analytics interno privacy-safe. Tuttavia per campagne marketing, remarketing controllato, conversion tracking e analisi UX visuale servono strumenti esterni configurabili, disattivabili e governati centralmente.

Google Tag Manager serve come layer operativo per deploy controllato di tag, eventi e conversioni. Microsoft Clarity serve per analizzare comportamento qualitativo, heatmap e session recording, ma va trattato come strumento ad alto rischio privacy se attivo nelle aree sbagliate.

## Principio guida

Il tracking esterno non è fonte primaria di verità. La fonte primaria rimane il database interno:

- ordini;
- pagamenti;
- report;
- error ledger;
- analytics event ledger interno;
- CRM/contact inbox.

GTM e Clarity sono strumenti di osservazione marketing/UX, non sistemi decisionali.

## Obiettivi di business

- Misurare quali pagine portano contatti e acquisti.
- Capire quali CTA funzionano.
- Studiare abbandoni checkout senza vedere dati sensibili.
- Misurare impatto delle guide SEO/GEO.
- Collegare campagne a lead e ordini in modo privacy-safe.
- Capire dove l'utente si blocca nella UX pubblica.

## Non obiettivi MVP

- Non creare profilazione invasiva.
- Non inviare dati personali a strumenti esterni.
- Non tracciare contenuti report/documenti.
- Non registrare sessioni in admin, dashboard, checkout o pagine fiscali.
- Non usare tag manager per logiche business critiche.
