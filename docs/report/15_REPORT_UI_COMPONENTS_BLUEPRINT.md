# Report UI Components Blueprint

## Componenti cliente

### `ReportHero`

Mostra soggetto, prodotto, data e stato.

### `AttentionBadge`

Mostra livello attenzione con copy prudente.

### `ExecutiveSummaryCard`

Mostra sintesi, motivazione principale e azione consigliata.

### `EvidenceCard`

Mostra segnale, fonte, severità, limite e timestamp.

### `ReportSection`

Wrapper per sezioni report con titolo, descrizione, contenuto e stato completeness.

### `SourceAndLimitsPanel`

Sezione sempre presente con fonti, date e limiti.

### `NextActionList`

Azioni consigliate non vincolanti.

### `ReportStatusTimeline`

Visibile quando report non è ancora ready.

## Componenti admin

### `ReportReviewQueueTable`

Elenco report da revisionare.

### `ReviewReasonPanel`

Mostra perché la review è richiesta.

### `EvidenceInspector`

Mostra evidenze normalizzate e riferimenti payload interni.

### `TemplateVersionPanel`

Mostra template/composer version.

### `ReviewDecisionBox`

Azioni approva, richiedi modifiche, rifiuta.

## Responsive

- Mobile: sintesi e livello attenzione prima di tutto.
- Tablet: card stacked, fonti collassabili.
- Desktop: layout due colonne con summary sticky opzionale.

## Accessibilità

- Colore mai unico segnale.
- Badge con testo esplicito.
- Tabelle responsive.
- Focus visibile.
- Download e azioni con label descrittive.
