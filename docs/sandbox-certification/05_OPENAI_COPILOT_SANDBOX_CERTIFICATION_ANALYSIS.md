# OpenAI Copilot Sandbox Certification Analysis

## Flussi obbligatori

- OpenAI disabilitato di default.
- Settings admin richiesti per abilitarlo.
- Redaction applicata prima della richiesta.
- Budget giornaliero/mensile verificato.
- Prompt registry versionato.
- Output salvato come bozza, non pubblicato automaticamente.
- Usage ledger aggiornato.
- Errori API tracciati in Operational Error Ledger.

## Use case sandbox

- Suggerimento meta title/description CMS.
- Riassunto ticket supporto.
- Riassunto errore tecnico da error ledger.
- Bozza risposta supporto.
- Riassunto QA release.

## Guardrail

Nessuna AI action può rimborsare, pubblicare, cambiare prezzi, cambiare settings, chiamare Openapi o decidere affidabilità. Pattern obbligatorio: AI propone, admin verifica, admin approva, sistema audita.
