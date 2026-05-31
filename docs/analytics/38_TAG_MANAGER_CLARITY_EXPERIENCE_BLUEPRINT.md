# 38 — Tag Manager & Clarity Experience Blueprint

## Esperienza admin

La pagina admin prevista sara' `/admin/settings/analytics` o una sezione della pagina settings esistente.

Deve mostrare quattro blocchi:

1. **Stato tracking esterno**: master switch, ambiente, ultimo aggiornamento, owner.
2. **Google Tag Manager**: container ID, stato, ambiente, preview, note.
3. **Microsoft Clarity**: project ID, stato, route permesse, route escluse, masking.
4. **QA e sicurezza**: ultimi controlli, eventi bloccati, payload redatti, errori.

## Gerarchia UX

La prima informazione deve essere operativa:

- Tracking esterno attivo/disattivo.
- Perche' e' bloccato se non attivo.
- Quale prossima azione serve.
- Quali rischi sono protetti.

## Stati UI

| Stato | Significato | CTA |
|---|---|---|
| `disabled` | Nessun tag esterno caricato | Configura in staging |
| `configured_staging` | ID presenti ma solo staging | Testa eventi |
| `ready_for_review` | QA ok, attivazione da approvare | Richiedi pubblicazione |
| `enabled` | Tracking attivo in produzione | Controlla eventi |
| `blocked` | QA/privacy blocca attivazione | Risolvi blocchi |

## Copy admin

Il copy deve evitare linguaggio tecnico dominante. Esempi:

- "GTM e Clarity sono spenti: nessuno script esterno viene caricato."
- "Clarity non sara' mai caricato su checkout, report, fatture, admin e dashboard."
- "Gli eventi vengono filtrati prima di uscire dal sito."
- "Le modifiche vengono registrate con motivazione obbligatoria."
