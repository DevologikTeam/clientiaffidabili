# Report access and download blueprint

## Obiettivo

Definire come il cliente accede ai report in modo sicuro, chiaro e auditabile.

## Accesso report MVP

Il report è accessibile quando:

- pagamento confermato;
- richiesta provider completata o verificata manualmente;
- report snapshot generato;
- report pubblicato;
- utente autorizzato;
- account non sospeso.

## Stati report cliente

| Stato report | Cliente vede |
|---|---|
| `draft` | Non visibile |
| `internal_review` | Verifica in controllo interno |
| `published` | Report pronto |
| `archived` | Report archiviato |
| `revoked` | Report non più disponibile |

## Pagina report già esistente

La route `/reports/[id]` resta il punto di lettura del report. L'area dashboard deve solo guidare l'accesso e mostrare stato/report metadata.

## Download PDF futuro

Il download PDF non deve rigenerare contenuto live. Deve usare snapshot immutabile:

```text
reportSnapshot → render PDF → watermark/account → download audit event
```

Controlli futuri:

- token download a scadenza;
- watermark opzionale con account e data download;
- audit evento `report_downloaded`;
- limite download se necessario;
- revoca in caso di errore o contestazione.

## Copy prudente

CTA:

- **Apri report**;
- **Scarica PDF** solo quando la funzione sarà reale;
- **Vedi fonti e limiti**;
- **Richiedi chiarimento**.

Da evitare:

- “certificato definitivo”;
- “azienda sicura”;
- “rischio nullo”;
- “pagamento garantito”.

## Report card

Dati visibili nella card:

- azienda verificata;
- tipo report;
- data richiesta;
- data pubblicazione;
- indice di attenzione;
- stato lettura;
- CTA.

## Report access guardrail

- Mai mostrare raw payload provider.
- Mai mostrare dettagli tecnici di normalizzazione.
- Ogni report deve riportare data richiesta, fonti, limiti e natura informativa.
- Accesso e download sono eventi auditabili.
