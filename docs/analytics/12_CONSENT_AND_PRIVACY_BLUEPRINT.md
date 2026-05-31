# 12 — Consent and Privacy Blueprint

## Strategia

Il sistema deve funzionare anche senza consenso marketing. Gli eventi server-side necessari per sicurezza, pagamento, antifrode, audit e servizio possono essere separati dagli eventi marketing/analytics esterni.

## Livelli consenso

| Livello | Uso |
|---|---|
| `necessary` | servizio, sicurezza, pagamenti, audit, errori operativi |
| `analytics` | misurazione aggregata non essenziale |
| `marketing` | advertising, retargeting, campagne |
| `personalization` | personalizzazione esperienza, se futura |

## Google Consent Mode v2

Se verrà attivata integrazione Google, la UI consenso dovrà gestire:

- `analytics_storage`;
- `ad_storage`;
- `ad_user_data`;
- `ad_personalization`.

Default prudente per EEA: denied finché l'utente non presta consenso.

## Eventi interni vs esterni

| Tipo evento | Necessita consenso analytics? | Note |
|---|---:|---|
| pagamento riuscito | No, se solo audit/servizio | Non inviare a tool esterni senza regole dedicate |
| lead creato | No per CRM operativo | Marketing analytics solo se consentito |
| page view pubblico | Sì per tool esterni | interno solo aggregato/minimizzato |
| error ledger | No | sicurezza/servizio, accesso admin limitato |
| report downloaded | No per audit servizio | mai dati report negli analytics |

## Retention

- Raw event interno: retention limitata e configurabile.
- KPI snapshot aggregati: retention più lunga.
- Error ledger: policy operativa separata.
- IP audit acquisto: retention minima necessaria e accesso limitato.
