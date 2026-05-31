# Evidence Component Blueprint

## Obiettivo

Ogni affermazione del report deve essere supportata da una evidence card. L'utente deve capire da dove nasce un segnale e quanto è affidabile nel contesto.

## Campi evidence

| Campo | Descrizione |
|---|---|
| `id` | identificativo interno |
| `type` | registry, credit, negative_event, compliance, identity, technical |
| `label` | titolo leggibile |
| `severity` | info, positive, attention, critical, unavailable |
| `sourceName` | fonte normalizzata |
| `sourceTimestamp` | data fonte o provider response |
| `observedAt` | data osservazione sistema |
| `summary` | sintesi cliente |
| `details` | dettaglio opzionale |
| `limits` | limiti specifici della fonte |
| `rawPayloadRef` | riferimento interno, mai visibile cliente |

## Regole UI

- Non più di 5 evidence principali nella sintesi.
- Le evidence critiche devono sempre mostrare fonte e limite.
- Le evidence non disponibili non devono diventare segnali negativi automatici.
- Il payload grezzo non deve mai apparire in UI cliente.

## Severità

| Severity | Significato |
|---|---|
| `positive` | elemento coerente o rassicurante nel perimetro dati |
| `info` | dato neutro utile alla lettura |
| `attention` | elemento da valutare |
| `critical` | elemento che richiede cautela forte o review |
| `unavailable` | dato non disponibile o fonte non interrogabile |

## Evidence confidence

La confidence non è mostrata come percentuale al cliente. È usata internamente per review e composizione:

- `high`: dato diretto, fonte chiara, timestamp recente;
- `medium`: dato utile ma da contestualizzare;
- `low`: dato incompleto, vecchio, ambiguo o derivato.
