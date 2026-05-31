# Design system — ClientiAffidabili.it

## Personalità visiva

- **Affidabile:** colori istituzionali, layout stabile, spazi generosi.
- **Operativa:** CTA chiare, stato e prossima azione sempre visibili.
- **Non burocratica:** evitare pagine dense da gestionale pubblico.
- **Decisionale:** ogni schermata deve aiutare a decidere.

## Token colore

| Token | Hex | Uso |
|---|---|---|
| `--color-navy-900` | `#0B3C5D` | brand, header, titoli forti |
| `--color-blue-600` | `#328CC1` | CTA primaria, link, focus |
| `--color-gold-500` | `#E6AF2E` | evidenza premium, attenzione soft |
| `--color-slate-950` | `#1D2731` | testo principale |
| `--color-slate-600` | `#475569` | testo secondario |
| `--color-slate-50` | `#F8FAFC` | background |
| `--color-success` | `#10B981` | ok, completato |
| `--color-warning` | `#F59E0B` | attenzione |
| `--color-danger` | `#EF4444` | rischio/blocco |

## Semantica colori

- Verde: verifica completata o rischio basso.
- Giallo: attenzione, dato mancante o rischio medio.
- Rosso: blocco, rischio alto, pagamento fallito.
- Blu: informazione, progresso, azione primaria.
- Grigio: dato neutro o non ancora disponibile.

## Tipografia

Font consigliato: **Inter**.

Scala:

- Display: 56/64, weight 700;
- H1: 44/52, weight 700;
- H2: 32/40, weight 700;
- H3: 24/32, weight 650;
- Body: 16/26, weight 400;
- Small: 14/22;
- Microcopy: 12/18.

## Layout

- Container desktop: 1200px.
- Grid marketing: 12 colonne.
- Dashboard: sidebar 280px + content fluido.
- Card radius: 18px per marketing, 14px per dashboard.
- Shadow leggero, mai eccessivo.
- Above the fold: massimo 1 CTA primaria.

## Componenti

### Button

Varianti:

- primary;
- secondary;
- outline;
- ghost;
- danger;
- link.

Regola: nessun pulsante con label generica `Apri` se può essere più specifico.

### Card servizio

Deve includere:

- nome comprensibile;
- domanda a cui risponde;
- dati richiesti;
- output;
- tempo stimato;
- prezzo;
- CTA.

### Risk summary

Deve mostrare:

- punteggio sintetico;
- livello rischio;
- 3 motivi principali;
- prossima azione suggerita;
- link al dettaglio.

### Empty state

Ogni empty state deve rispondere a:

- cosa manca;
- perché serve;
- cosa fare adesso.

## Accessibilità

- Contrasto WCAG AA per testi e CTA.
- Focus visibile su input e pulsanti.
- Non usare solo colore per comunicare stato.
- Tabelle report leggibili da tastiera.
- Form con label reali, non solo placeholder.

## Addendum M1-A — decisioni dopo analisi logo e bozze

Lo sprint M1-A ha confermato la direzione **trust fintech operativo**.

Decisioni vincolanti per M1-P:

- riallineare la palette ai colori reali del logo: navy circa `#083858`, blue circa `#3088C0`;
- evitare claim assoluti come “garantito al 100%” se non dimostrabili sul singolo servizio;
- ogni servizio deve mostrare input, output, prezzo, tempi, fonte/partner e limiti;
- ogni report deve aprire con una sintesi decisionale, non con una tabella dati;
- ogni checkout deve includere breakdown prezzo e conferma uso lecito;
- le CTA devono essere specifiche, non generiche;
- il logo/check comunica verifica completata, non assenza totale di rischio.

Documenti collegati:

- `docs/sprints/M1-A_DESIGN_SYSTEM_ANALYSIS.md`
- `docs/design/01_BRAND_IDENTITY_AUDIT.md`
- `docs/design/02_VISUAL_DIRECTION_DECISION.md`
- `docs/design/03_COMPONENT_INVENTORY_ANALYSIS.md`
- `docs/design/04_ACCESSIBILITY_AND_QA_BASELINE.md`
- `docs/design/05_CONTENT_TONE_AND_MICROCOPY_ANALYSIS.md`

