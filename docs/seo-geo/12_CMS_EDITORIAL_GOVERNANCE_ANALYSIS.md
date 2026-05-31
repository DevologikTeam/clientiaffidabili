# CMS Editorial Governance Analysis

## Obiettivo

Il CMS SEO/GEO deve permettere di creare pagine nuove senza perdere controllo su qualità, SEO, compliance e coerenza del brand.

## Stati pagina

- `draft`: contenuto in lavorazione.
- `review`: pronto per revisione SEO/compliance.
- `published`: pubblico e inseribile in sitemap.
- `archived`: non pubblico, mantenuto per storico.

## Ruoli consigliati

- `seo_editor`: crea e modifica bozze.
- `seo_reviewer`: revisiona SEO/GEO e struttura.
- `compliance_reviewer`: verifica claim, garanzia e limiti.
- `admin`: pubblica/archivia con reason obbligatoria.

## Checklist prima della pubblicazione

Ogni pagina deve avere:

- H1 unico;
- meta title entro limite consigliato;
- meta description utile;
- canonical path;
- target keyword;
- intent dichiarato;
- blocco garanzia/limiti;
- CTA coerente;
- FAQ se utili;
- nessun claim vietato;
- nessun dato personale o caso cliente reale non autorizzato;
- data ultimo aggiornamento;
- autore/reviewer.

## Versioning

Ogni pubblicazione deve generare una versione immutabile con:

- titolo;
- slug;
- metadata;
- body HTML/JSON;
- reviewer;
- reason;
- hash snapshot.

## Audit

Audit obbligatorio per:

- creazione pagina;
- modifica slug;
- pubblicazione;
- archiviazione;
- modifica contenuto pubblicato;
- override guardrail;
- rimozione da sitemap.

## Policy sitemap

Solo pagine `published`, con canonical valido, non noindex e non archiviate devono essere inserite in sitemap.

## Policy contenuto AI

L'AI puo' aiutare a preparare bozze, ma la pubblicazione deve essere umana e revisionata. Ogni pagina deve essere valutata per utilita', accuratezza, non ripetitivita' e assenza di claim eccessivi.
