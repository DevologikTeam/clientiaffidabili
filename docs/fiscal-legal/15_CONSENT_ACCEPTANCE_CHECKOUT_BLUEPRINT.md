# Consent & Acceptance Checkout Blueprint

## Obiettivo

Salvare una prova tecnica chiara delle condizioni accettate dal cliente prima di acquistare servizi basati su dati, report e provider esterni.

## Accettazioni obbligatorie

| Accettazione | Tipo | Richiesta |
|---|---|---|
| Termini di servizio | checkbox | Sempre |
| Privacy policy | checkbox/read acknowledgement | Sempre |
| Refund policy | checkbox | Sempre |
| Acceptable Use | checkbox | Sempre |
| Report disclaimer | checkbox | Per prodotti report |
| Uso lecito dati | checkbox esplicita | Sempre per verifiche/report |
| Marketing | opt-in separato | Mai pre-selezionato |
| Cookie non tecnici | CMP/preferenze | Separato dal checkout |

## Acceptance snapshot

```json
{
  "acceptedAt": "2026-05-30T00:00:00.000Z",
  "ipHash": "sha256:...",
  "userAgentHash": "sha256:...",
  "documents": [
    { "type": "terms", "version": "1.0.0", "contentHash": "sha256:..." },
    { "type": "privacy", "version": "1.0.0", "contentHash": "sha256:..." }
  ],
  "explicitPurposes": ["lawful_use", "report_limits", "refund_policy"]
}
```

## Regole privacy

- Non salvare IP pieno se non necessario: preferire hash o retention limitata.
- Marketing separato da termini contrattuali.
- Cookie/tracciamento gestito con preferenze separate.
- Le accettazioni contrattuali non devono diventare consenso marketing.

## UI checkout

Sezione: “Conferme prima dell'acquisto”

Copy:

“Conferma di usare il servizio per finalita lecite e di aver compreso che il report e un supporto informativo basato sulle fonti disponibili, non una garanzia di solvibilita futura.”

Errore:

“Per procedere devi confermare le condizioni obbligatorie del servizio.”

## Admin audit

Ogni ordine deve mostrare in admin:

- documenti accettati;
- versione;
- data;
- hash contenuto;
- se una nuova versione richiede riaccettazione.
