# Billing, IVA e fatturazione — analisi

Concetto centrale: **Billing Profile** cliente separato dall'ordine.

## Obiettivo

Definire come trattare dati fiscali, IVA, ricevute e fatture senza bloccare l'MVP.

## Scenario iniziale

ClientiAffidabili.it vende servizi digitali/report B2B con pagamento anticipato. Per il mercato italiano la UX deve raccogliere dati fiscali completi prima o subito dopo il pagamento, con preferenza per prima del pagamento quando il cliente è azienda.

## Dati billing profile MVP

| Campo | Obbligatorio | Nota |
|---|---:|---|
| Ragione sociale / nome cliente | Sì | B2B first |
| Partita IVA o codice fiscale | Sì | in base al tipo cliente |
| Codice SDI o PEC | Sì per fattura elettronica italiana | validazione base |
| Indirizzo sede | Sì | fattura/ordine |
| Email amministrativa | Sì | ricevuta e supporto |
| Paese | Sì | Italia first |
| Accettazione condizioni | Sì | snapshot legale |

## IVA e prezzo

Il catalogo mostra prezzi **IVA esclusa** per coerenza B2B. Il checkout mostra sempre:

- prezzo netto;
- IVA stimata/applicata;
- totale;
- eventuali commissioni non ribaltate al cliente;
- data e versione prezzo.

## Strategia fiscale MVP

1. Calcolo IVA interno semplice per Italia B2B/B2C.
2. Snapshot fiscale sull'ordine.
3. Emissione fattura tramite integrazione fiscale dedicata in sprint successivo.
4. Stato fattura separato dal pagamento.
5. Export amministrativo CSV/JSON come fallback.

## Stati fattura

| Stato | Significato |
|---|---|
| `not_required_yet` | pagamento non confermato |
| `billing_data_missing` | dati fiscali incompleti |
| `ready_to_issue` | pagamento confermato e dati completi |
| `issued` | fattura generata |
| `sent_to_sdi` | inviata a sistema fiscale/provider |
| `accepted` | accettata/recapitata |
| `rejected` | scarto da correggere |
| `credited` | nota credito/rimborso gestito |

## Guardrail

- Non promettere “fattura immediata” finché il workflow SDI non è integrato e certificato.
- Separare email ricevuta pagamento da fattura fiscale.
- Bloccare emissione se dati fiscali incompleti.
- Auditare ogni modifica al billing profile dopo pagamento.
- Non modificare l'importo ordine dopo pagamento: usare nota credito o nuovo ordine.

## Da validare con consulente

- diciture esatte in checkout e termini;
- gestione B2C eventuale;
- reverse charge/cross-border;
- tempi emissione fattura;
- conservazione documentale;
- policy note credito per report già generati.
