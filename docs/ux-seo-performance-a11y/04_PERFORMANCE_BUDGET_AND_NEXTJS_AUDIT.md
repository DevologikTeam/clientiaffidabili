# 04 — Performance Budget & Next.js Audit

## Scopo

Definire cosa misurare in M20-P/M20-S prima della RC. M20-A non esegue Lighthouse reale o build Next.js.

## Rischi rilevati da codice

| Area | Rischio | Priorita | Nota |
|---|---|---|---|
| Root tracking provider | Componente client globale in `layout.tsx` | P1 | Anche se default disattivo, il bootstrap client-side va misurato. |
| CSS globale | Molte regole legacy + design system nello stesso file | P1 | Rischio CSS non usato e incoerenze focus/responsive. |
| Header logo priority | Logo header con `priority` | P2 | Utile per home, ma da valutare su tutte le route. |
| Pagine admin pesanti | Molti componenti dashboard/table | P1 | Candidate per route-level lazy loading e split. |
| Tabelle e card | Layout complessi su mobile | P0 | Performance percepita e usabilita mobile vanno insieme. |
| Font | Stack system senza font file esterno | Positivo | Riduce rischio FOIT e dipendenze. |

## Budget proposto

| Metrica | Target pre-RC | Route P0 |
|---|---:|---|
| LCP mobile | <= 2.5s in staging controllato | `/`, `/servizi`, `/prezzi`, `/checkout` |
| INP | <= 200ms su interazioni principali | header, card servizi, checkout form |
| CLS | <= 0.1 | home, catalogo, pricing, checkout |
| JS initial public | budget da definire con build reale | home, servizi, prezzi |
| Immagini above-the-fold | ottimizzate e dimensionate | home/header |
| Third-party scripts | zero di default senza consenso/settings | tutte |

## Measurement plan M20-P

- Definire comando `qa:ux-polish-performance-budget`.
- Stabilire se usare Lighthouse CI, Playwright trace o script statico iniziale.
- Eseguire misure su almeno: `/`, `/servizi`, `/prezzi`, `/checkout`, `/guide`, `/garanzia-operativa`.
- Separare misure pubbliche da dashboard/admin.
- Salvare evidenze in `artifacts/ux-polish/`.

## Optimization backlog per M20-S

1. Spostare tracking provider in wrapper che evita fetch/config su route sensibili e quando disabilitato da env/settings.
2. Dividere CSS legacy e design system, oppure introdurre lint statico per classi duplicate critiche.
3. Verificare immagini logo e OG con dimensioni corrette.
4. Ridurre contenuto above-the-fold e CTA duplicate su mobile.
5. Usare lazy rendering per sezioni non critiche dove opportuno.
6. Aggiungere performance evidence nel launch readiness admin.

## Guardrail

- Nessun tracking esterno attivo di default.
- Nessuna ottimizzazione deve rimuovere contenuti utili a SEO/GEO o accessibilita.
- Le misure devono essere ripetibili e salvate come evidenza, non solo commentate in chat.
