# Report Runtime Implementation Notes

Il runtime del report parte da `ProviderRequest.normalizedResult` e costruisce un `ReportSnapshot` pubblicabile.

## Pipeline

1. Recupero richieste provider collegate all'ordine/check.
2. Conversione in evidenze normalizzate.
3. Calcolo score prudente.
4. Costruzione sezioni report da template registry.
5. Generazione snapshot JSON.
6. Calcolo hash immutabile.
7. Stato finale `ready` oppure `review_required`.

## Stati

- `queued`: report richiesto ma non ancora composto.
- `composing`: composizione in corso.
- `review_required`: serve verifica admin.
- `ready`: pubblicabile al cliente.
- `failed`: composizione fallita.
- `voided`: report annullato internamente.

## Limite noto

La generazione PDF resta blueprint. Il report è però già snapshot-ready: il PDF dovrà renderizzare lo stesso JSON pubblicato al cliente.
