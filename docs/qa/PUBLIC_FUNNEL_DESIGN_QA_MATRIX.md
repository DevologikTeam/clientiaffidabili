# Public Funnel Design QA Matrix

## Obiettivo

Bloccare lo sviluppo M2-S se il funnel progettato introduce confusione, claim rischiosi, copy non conforme o layout non implementabile.

## Checklist design

| Area | Controllo | Stato |
|---|---|---|
| Hero | Promessa chiara entro 10 secondi | OK |
| Hero | Nessun claim assoluto o garanzia impropria | OK |
| Scenario | Parte da bisogni operativi, non da API tecniche | OK |
| Servizi | Ogni card prevede prezzo/tempo/dati richiesti | OK |
| Dettaglio | Limiti e fonti presenti prima del checkout | OK |
| Checkout entry | Conferma uso lecito progettata | OK |
| Report preview | Nessun dato reale o sensibile | OK |
| FAQ | Obiezioni principali coperte | OK |
| Mobile | Ordine sezioni definito | OK |
| Analytics | Eventi senza PII | OK |

## Claim vietati

Lo sviluppo deve fallire QA se compaiono frasi come:

- `rischio zero`;
- `pagamento garantito`;
- `cliente affidabile al 100%`;
- `scopri tutto su una persona`;
- `indagini private`;
- `controllo anonimo`;
- `accesso illimitato a dati personali`.

## Copy da preferire

- `segnali di affidabilità`;
- `informazioni disponibili dalle fonti previste`;
- `supporto alla decisione`;
- `uso professionale lecito`;
- `prezzo e tempi prima del checkout`;
- `report con fonti e limiti`.

## Test manuale M2-S da preparare

1. Visita homepage desktop/mobile.
2. Seleziona scenario nuovo cliente.
3. Apri dettaglio servizio.
4. Verifica prezzo/tempo/dati richiesti.
5. Avvia checkout.
6. Conferma finalità lecita.
7. Controlla che nessun dato personale sia tracciato negli eventi.
8. Controlla copy vietati con ricerca testuale.
