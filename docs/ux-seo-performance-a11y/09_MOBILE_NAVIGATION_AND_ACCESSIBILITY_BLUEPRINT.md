# 09 — Mobile Navigation & Accessibility Blueprint

## Scopo

Rendere la navigazione mobile e le interazioni P0 usabili da cliente finale, tastiera e screen reader, con target pragmatico WCAG AA. M20-S dovra introdurre pattern accessibili senza appesantire il design.

## Header mobile

Requisiti:

- un solo pulsante menu con `aria-expanded`, `aria-controls` e label chiara;
- focus trap semplice quando il drawer e' aperto oppure chiusura robusta con Esc e click link;
- link principali sempre raggiungibili: servizi, prezzi, guide, garanzia, contatti/accesso;
- CTA primaria coerente: avvia verifica o consulta servizi;
- nessun link admin pubblico non necessario.

## Skip link e landmark

- Primo elemento focusabile: `Salta al contenuto`.
- `main` con id stabile.
- Header, nav, main, footer semanticamente distinti.
- Pagine admin e dashboard possono usare layout interno, ma devono mantenere landmark e heading order.

## Focus state

- Focus visibile su link, button, input, select, checkbox, tab e card cliccabili.
- Evitare focus affidato solo a colore molto tenue.
- `.ca-button`, `.btn`, link card e menu mobile devono condividere token coerenti.

## Tabelle e listini

- Usare `<table>` reale per dati tabellari.
- `caption` visibile o accessibile quando il contesto non e' evidente.
- Header con `scope="col"`.
- CTA dentro celle con label specifiche.
- Per mobile: non nascondere colonne critiche senza alternativa testuale.

## M20-S acceptance criteria

- Navigazione mobile eseguita via tastiera.
- Nessun link pubblico critico nascosto solo da CSS senza alternativa.
- Almeno home, prezzi, checkout e dashboard hanno smoke keyboard.
- Nessuna tabella P0 usa solo `div role="table"` quando i dati sono tabellari.
