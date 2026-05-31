# Bundle and packaging analysis

## Perché usare bundle

Il cliente non vuole comprare “Company Full + Credit Scoring + Negatività”. Vuole capire se procedere con un cliente/fornitore.

Il bundle consente di:

- aumentare valore percepito;
- proteggere marginalità;
- evitare confronto diretto col prezzo grezzo API;
- rendere il report leggibile;
- gestire add-on e soglie.

## Bundle MVP

### Starter controllo cliente

- Servizio principale: `COMPANY_ESSENTIAL`
- Prezzo: €14,90 + IVA
- Messaggio: “Verifica i dati principali prima di procedere.”
- Add-on consigliati: `COMPANY_PRO`, `IBAN_CHECK`

### Affidabilità Pro

- Servizio principale: `COMPANY_PRO`
- Prezzo: €24,90 + IVA
- Messaggio: “Decisione B2B più sicura con segnali e sintesi operativa.”
- Add-on consigliati: Bilancio, monitoraggio, IBAN

### Compliance partner

- Servizio principale: `KYB_COMPLIANCE`
- Prezzo: €49,90 + IVA
- Messaggio: “Controllo più prudente su assetti e soggetti rilevanti.”
- Add-on consigliati: monitoraggio, report manuale assistito

### Antifrode dati

- Servizi: `IBAN_CHECK`, `CONTACT_CHECK`
- Prezzo: €4,90 cad. + IVA oppure pacchetto da €9,90
- Messaggio: “Riduci errori prima di salvare dati in CRM/contabilità.”

## Add-on consigliati

| Add-on | Quando proporlo | Regola |
|---|---|---|
| Bilancio | Importo decisione alto | Non incluso automaticamente nel Pro base. |
| Monitoraggio | Dopo esito Pro/KYB | Solo quando billing ricorrente è pronto. |
| Visura/Documento ufficiale | Cliente richiede documento originale | Mostrare tempi e costo separato. |
| Report assistito | Dati mancanti o alto valore | Richiede gestione manuale e SLA. |

## Regola soglia ordine

Nel checkout si può chiedere opzionalmente il contesto decisionale:

- importo ordine/contratto;
- pagamento anticipato/differito;
- nuovo cliente/cliente esistente;
- frequenza rapporto.

Questi dati non devono generare decisioni automatiche rischiose. Servono per suggerire prodotto o add-on.

## Packaging copy

Evitare:

- “scopri se pagherà”;
- “cliente sicuro”;
- “zero rischi”;
- “controllo definitivo”;
- “indagine su persona”.

Usare:

- “raccogli segnali disponibili”;
- “riduci decisioni al buio”;
- “leggi dati e limiti in modo chiaro”;
- “decidi il prossimo passo con più contesto”.
