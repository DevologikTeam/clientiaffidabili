# Public Funnel Wireframes

## Homepage desktop

```text
┌──────────────────────────────────────────────────────────────────────────────┐
│ Header: logo | Servizi | Prezzi | API | Risorse | Accedi | CTA Verifica     │
├──────────────────────────────────────────────────────────────────────────────┤
│ HERO                                                                         │
│ [Badge: Verifiche B2B guidate]                                               │
│ H1: Verifica clienti, aziende e segnali di affidabilità...                   │
│ Testo breve con costi, tempi, report leggibili                               │
│ [Avvia una verifica azienda] [Esplora i servizi]                             │
│ A destra: mock report card con stato, segnali, fonti, tempo stimato          │
├──────────────────────────────────────────────────────────────────────────────┤
│ TRUST STRIP: prezzi visibili | fonti/limiti | uso B2B | API/integrazioni     │
├──────────────────────────────────────────────────────────────────────────────┤
│ SCENARIO SELECTOR                                                            │
│ Che controllo devi fare oggi?                                                │
│ [Nuovo cliente] [Fornitore] [Documento/visura] [Integrazione API]            │
├──────────────────────────────────────────────────────────────────────────────┤
│ PACCHETTI CONSIGLIATI                                                        │
│ [Check Azienda Start] [Check Azienda Plus] [Documenti ufficiali]             │
├──────────────────────────────────────────────────────────────────────────────┤
│ REPORT PREVIEW                                                               │
│ Esempio struttura: dati soggetto, indicatori, documenti, limiti, audit       │
├──────────────────────────────────────────────────────────────────────────────┤
│ COME FUNZIONA                                                                │
│ 1 scegli controllo → 2 inserisci dati → 3 confermi uso → 4 scarichi report   │
├──────────────────────────────────────────────────────────────────────────────┤
│ PRICING TRANSPARENCY                                                         │
│ Prezzo finale prima del checkout, eventuali imposte/diritti indicati         │
├──────────────────────────────────────────────────────────────────────────────┤
│ COMPLIANCE NOTICE                                                            │
│ Uso professionale, fonti, limiti, divieto claim assoluti                     │
├──────────────────────────────────────────────────────────────────────────────┤
│ FAQ + CTA finale                                                             │
└──────────────────────────────────────────────────────────────────────────────┘
```

## Homepage mobile

Ordine mobile obbligatorio:

1. Logo/header compatto.
2. Hero con una sola CTA primaria visibile above the fold.
3. Trust strip a 2 colonne o carousel semplice senza autoplay obbligatorio.
4. Scenario selector in card verticali.
5. Pacchetti consigliati in stack.
6. Report preview semplificata.
7. Come funziona.
8. FAQ.
9. CTA sticky opzionale solo dopo scroll.

## Catalogo servizi

```text
┌────────────────────────────────────────────────────────────┐
│ PageHero: Scegli il controllo più adatto                   │
│ Search/filter: ragione sociale, categoria, scenario        │
├────────────────────────────────────────────────────────────┤
│ Scenario tabs: Nuovo cliente | Fornitore | Documento | API │
├────────────────────────────────────────────────────────────┤
│ Service cards                                               │
│ - Nome comprensibile                                        │
│ - A cosa serve                                              │
│ - Dati richiesti                                            │
│ - Tempo stimato                                             │
│ - Prezzo da / prezzo fisso                                  │
│ - CTA: Vedi dettagli                                        │
└────────────────────────────────────────────────────────────┘
```

## Dettaglio servizio

```text
Hero servizio
├─ cosa controlla
├─ quando usarlo
├─ dati richiesti
├─ tempi e prezzo
├─ anteprima risultato
├─ limiti e fonti
├─ form iniziale dati minimi
└─ CTA checkout + conferma uso lecito
```

## Prezzi e pacchetti

```text
Hero prezzi
├─ pacchetti self-service
│  ├─ Check Azienda Start
│  ├─ Check Azienda Plus
│  └─ Documenti ufficiali
├─ API/volumi
├─ note IVA/diritti/imposte
└─ FAQ prezzi
```

## Regole layout

- Above the fold: massimo 1 headline, 1 paragraph, 2 CTA.
- Card scenario: massimo 110 parole complessive tra titolo, descrizione e meta.
- Ogni CTA deve usare verbo operativo: `Avvia`, `Scegli`, `Vedi`, `Richiedi`.
- La pagina non deve partire da elenchi tecnici del provider.
- Nessuna tabella prezzi lunga in homepage.
