# 02 — UX Copy & Trust Gap Matrix

## Principio

Il polish pre-RC deve far percepire il prodotto come servizio finito, chiaro e acquistabile. Le parole da sviluppo devono sparire dalle superfici pubbliche e cliente.

## Gap copy P0

| Route/superficie | Copy attuale da rivedere | Rischio | Direzione M20-P |
|---|---|---|---|
| Header pubblico | `Dashboard demo` | Sembra ambiente dimostrativo non separato dal prodotto | Usare `Accedi` / `Area cliente`; eventuale demo solo in tenant demo dedicato. |
| `/prezzi` hero | `Prezzi MVP` | Comunica prodotto incompleto | `Prezzi delle verifiche` o `Listino chiaro prima dell'acquisto`. |
| `/prezzi` hero | `margine protetto` | Espone logica interna non utile al cliente | Parlare di totale, IVA, cosa include e quando parte la verifica. |
| Home sezione guide | CTA `CMS editoriale` | Link interno admin in superficie pubblica | Rimuovere dalla home pubblica o renderlo visibile solo admin. |
| `/servizi` | `Scenario selector` | Inglese/tecnico e poco naturale | `Scegli il tuo caso` o `Da quale decisione parti?`. |
| `/servizi` | `prezzi e limiti coerenti con i guardrail di marginalita` | Espone vincolo interno | `prezzi e limiti spiegati prima dell'acquisto`. |
| `/checkout` | `provider dati`, `webhook pagamento` | Troppo tecnico per acquirente | `La verifica parte solo dopo pagamento confermato`. |
| Admin link pubblici | Link verso admin da pagine pubbliche | Rischio fiducia/crawl | Spostare link admin in area autenticata. |

## Pattern copy da approvare

### Pubblico

- Frasi brevi.
- Spiegare cosa si puo sapere, cosa serve per iniziare, cosa succede dopo.
- CTA specifiche: `Avvia verifica`, `Confronta prezzi`, `Leggi cosa include`, `Richiedi assistenza`.
- Evitare riferimenti a sprint, MVP, registry, mapping, provider, guardrail tecnici, ledger, sandbox.

### Cliente autenticato

- Mostrare stato, motivo, impatto e prossima azione.
- Distinguere `verifica in corso`, `serve integrazione`, `report pronto`, `richiesta assistenza`, `rimborso in revisione`.
- Evitare pagine che sembrano demo se l'utente e' in un ambiente reale.

### Admin

- Terminologia tecnica ammessa, ma con priorita operative.
- Ogni pagina deve indicare: cosa e' urgente, cosa blocca la RC, chi deve agire, quale evidenza manca.

## Trust matrix

| Area trust | Stato attuale | Gap | Priorita |
|---|---|---|---|
| Garanzia operativa | Buona base pubblica | Collegare meglio a checkout e rimborsi | P1 |
| Limiti report | Presenti in home/checkout | Devono essere uniformi su servizi e pricing | P0 |
| Prezzi | Derivati da catalogo | Copy troppo interno in `/prezzi` | P0 |
| Rimborso | Documentato | Serve sintesi in checkout e post-checkout | P1 |
| Fonti e data verifica | Concetto presente | Va reso visibile nei dettagli servizio/report | P1 |
| Supporto | Esiste dashboard supporto | CTA pubblica e post-acquisto da armonizzare | P1 |
| Demo | Non completamente separata nel copy | Demo commerciale deve essere esplicita e isolata | P0 |

## UX heuristics per M20-P

1. Una sola azione primaria sopra la piega.
2. Ogni pagina pubblica deve rispondere a: cosa posso fare, quanto costa, cosa ricevo, quali limiti ci sono.
3. Ogni pagina cliente deve rispondere a: cosa e' pronto, cosa manca, cosa devo fare ora.
4. Ogni pagina admin deve rispondere a: cosa blocca il lancio, quale evidenza serve, quale azione e' sicura.
5. Niente claim assoluti o promesse predittive.
