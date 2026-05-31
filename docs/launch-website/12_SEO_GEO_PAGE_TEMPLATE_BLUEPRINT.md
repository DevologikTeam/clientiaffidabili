# 12 — SEO/GEO Page Template Blueprint

## Template pagina guida CMS

Ogni pagina `/guide/[slug]` deve seguire una struttura stabile, utile per utenti, motori di ricerca e motori generativi.

## Struttura

1. **Hero answer-first**
   - H1 orientato alla domanda.
   - Risposta sintetica in 50-90 parole.
   - CTA contestuale.

2. **Quando serve questa verifica**
   - 3-5 casi concreti.

3. **Cosa puoi controllare**
   - dati aziendali;
   - segnali economico/amministrativi;
   - dati di contatto;
   - eventuali controlli KYB/AML se pertinenti.

4. **Cosa non puo' garantire**
   - niente certezza di pagamento;
   - niente rischio zero;
   - niente valutazione definitiva.

5. **Come funziona ClientiAffidabili.it**
   - scegliere servizio;
   - inserire dati;
   - pagare;
   - ricevere report;
   - consultare fonti/limiti.

6. **Esempio pratico**
   - scenario generico, non dati reali.

7. **FAQ**
   - 4-7 domande con risposta breve.

8. **CTA finale**
   - collegata al servizio piu' coerente.

## Campi CMS obbligatori

- `title`
- `slug`
- `seoTitle`
- `seoDescription`
- `searchIntent`
- `geoAnswerFocus`
- `canonicalPath`
- `primaryCtaLabel`
- `primaryCtaHref`
- `status`
- `reviewChecklist`

## Guardrail pubblicazione

La pagina non puo' passare a `published` se:

- contiene claim bloccati;
- manca la sezione limiti;
- manca CTA coerente;
- manca meta description;
- non ha almeno 2 link interni;
- usa keyword stuffing;
- contiene dati personali o casi reali non autorizzati;
- schema JSON-LD non corrisponde al contenuto visibile.
