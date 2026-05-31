# Checks history and detail blueprint

## Obiettivo

Progettare lo storico verifiche come lista operativa, non come tabella tecnica. Il cliente deve trovare rapidamente una verifica e capirne stato, output, blocchi e prossima azione.

## Lista verifiche

Campi visibili:

| Campo | Descrizione |
|---|---|
| Azienda/Soggetto verificato | Nome normalizzato o input richiesto. |
| Servizio | Nome commerciale acquistato. |
| Stato | Stato cliente, non tecnico. |
| Data richiesta | Timestamp leggibile. |
| Report | Pronto / Non ancora disponibile / In revisione. |
| Azione | CTA principale. |

Filtri MVP:

- Tutte;
- Report pronti;
- In corso;
- Serve attenzione;
- Archiviate.

Ricerca MVP:

- nome azienda;
- partita IVA/codice fiscale azienda se presente;
- ID ordine leggibile.

## Stati lista

### Empty state

Copy:

> Non hai ancora richiesto verifiche. Avvia la prima verifica inserendo i dati dell'azienda che vuoi analizzare.

CTA: **Avvia prima verifica**.

### Loading state

Skeleton con 3 card. Evitare spinner isolati senza contesto.

### Error state

Copy:

> Non siamo riusciti a caricare le verifiche. Riprova tra poco o contatta il supporto se il problema continua.

CTA: **Riprova** + link **Contatta supporto**.

## Dettaglio verifica

Sezioni:

1. Stato richiesta.
2. Dati inviati dal cliente.
3. Servizio acquistato e prezzo snapshot.
4. Timeline eventi customer-facing.
5. Report collegato, se pronto.
6. Fattura/ordine collegato.
7. Supporto contestuale.

## Timeline cliente

Esempio:

```text
Pagamento ricevuto → Verifica avviata → Dati in elaborazione → Report pronto
```

Se manual review:

```text
Pagamento ricevuto → Verifica avviata → Controllo interno richiesto → Report pronto
```

Non mostrare:

- provider event raw;
- webhook;
- retry tecnici;
- errori stack/API.

## CTA per stato

| Stato | CTA primaria |
|---|---|
| Pagamento ricevuto | Vedi dettagli richiesta |
| Verifica in corso | Vedi stato |
| Serve controllo interno | Segui avanzamento |
| Report pronto | Apri report |
| Serve assistenza | Contatta supporto |
| Rimborso registrato | Vedi dettaglio ordine |

## Regole di sicurezza

- Il dettaglio verifica è visibile solo a utenti autorizzati dell'account.
- Report non pubblicati non devono apparire come link apribile.
- Ogni apertura report deve poter essere auditata.
- Dati sensibili vanno mascherati quando non necessari.
