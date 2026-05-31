# OpenAI Use Case Risk Matrix Analysis

| Use case | Valore | Rischio | Decisione MVP |
|---|---:|---:|---|
| Migliora meta title/description CMS | Alto | Basso | Si |
| Genera FAQ SEO/GEO | Alto | Medio | Si, con claim guard |
| Riassumi ticket supporto | Alto | Medio | Si, con redaction |
| Bozza risposta supporto | Alto | Medio | Si, admin approve |
| Riassumi error ledger | Alto | Medio | Si, dati redatti |
| Suggerisci rimborso | Medio | Alto | No, solo spiega policy |
| Pubblica pagina CMS | Medio | Alto | No |
| Modifica prezzi/settings | Basso | Altissimo | No |
| Decide affidabilita' societa' | Basso | Altissimo | No |
| Genera contenuto email transazionale | Medio | Medio | Solo bozza, no auto-send |
| Spiega report al cliente finale | Medio | Alto | Post-MVP, review legal |
| Analisi prompt/raw payload provider | Medio | Alto | No raw payload |

## Classi rischio

### Basso

- output editoriale non sensibile;
- nessuna azione reale;
- approvazione editoriale semplice.

### Medio

- contiene contesto cliente o operativo;
- richiede redaction;
- output potrebbe influenzare comunicazione cliente.

### Alto

- riguarda denaro, rimborso, compliance, report, dati personali o azioni irreversibili.

### Altissimo

- modifica settings, provider, prezzi, pagamenti, decisioni legali o reputazionali.

## Regola

Solo use case basso/medio entrano nel primo sviluppo. Gli use case alti possono essere analizzati ma restano bloccati da feature flag e approval manuale.
