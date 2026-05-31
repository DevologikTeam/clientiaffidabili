# Copilot Experience Blueprint

## Superficie principale

Route admin proposta:

```text
/admin/openai-copilot
```

La home copilot mostra:

- stato OpenAI: disabilitato, staging, attivo, budget quasi esaurito, errore;
- uso oggi/mese;
- use case abilitati;
- bozze generate in attesa di revisione;
- errori recenti;
- scorciatoie verso CMS, supporto, error ledger e release notes.

## Esperienza per use case

### CMS SEO/GEO

Nel form pagina CMS appare un pannello laterale:

- "Migliora title e meta";
- "Suggerisci FAQ";
- "Crea risposta breve GEO";
- "Controlla claim rischiosi";
- "Rendi il testo piu' chiaro".

Ogni suggerimento genera una **bozza**, mai una modifica diretta.

### CRM/supporto

Nel dettaglio messaggio/ticket:

- "Riassumi richiesta";
- "Classifica urgenza";
- "Prepara bozza risposta";
- "Spiega cosa serve al cliente".

La risposta non viene inviata automaticamente.

### Error ledger

Nel dettaglio errore o cluster:

- "Riassumi impatto";
- "Suggerisci prossima azione";
- "Crea nota per sviluppatore";
- "Prepara spiegazione per supporto".

### Admin operations

Nel dettaglio work item:

- "Spiega stato";
- "Indica blocco principale";
- "Elenca azioni sicure".

## Stati UI

| Stato | UI |
|---|---|
| OpenAI disabilitato | card informativa con link settings |
| Budget superato | copilot bloccato, error ledger generato |
| Output bloccato | motivazione + testo non applicabile |
| Bozza pronta | diff/preview + applica/scarta |
| Use case non consentito | messaggio con motivo e owner |

## Copy UI

Usare sempre linguaggio chiaro:

- "Suggerisci" invece di "Genera automaticamente";
- "Bozza da verificare" invece di "Risultato finale";
- "Applica dopo revisione" invece di "Pubblica".
