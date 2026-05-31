# Provider Integration Strategy

## Principio prodotto

ClientiAffidabili.it non vende endpoint. Vende una decisione assistita: "posso fidarmi abbastanza di questo cliente, fornitore o dato di pagamento?".

Il provider dati deve quindi restare dietro un livello applicativo che protegge:

- esperienza cliente;
- margine;
- compliance;
- qualità del report;
- audit;
- possibilità futura di cambiare o aggiungere provider.

## Pattern architetturale

```text
Cliente → Checkout → Ordine pagato → Check → Provider Request → Normalizzazione → Report
```

Il provider è chiamato solo dopo che:

1. il pagamento è confermato;
2. il prezzo è stato congelato;
3. il costo provider stimato è stato congelato;
4. l'uso lecito è stato dichiarato;
5. i dati input sono validati;
6. l'idempotency key è stata generata.

## Perché adapter e non chiamata diretta

| Rischio | Adapter server-side |
|---|---|
| Chiavi esposte | Le credenziali restano in backend/Coolify secrets. |
| Lock-in provider | Mapping e normalizzazione separano prodotto e provider. |
| Margine variabile | Cost snapshot e price guard restano controllabili. |
| Errori provider | Tassonomia interna e retry decision unificati. |
| Raw data sensibili | Si salva e mostra solo ciò che serve. |
| Compliance | Ogni richiesta è auditata con scopo e fonte. |

## Provider primario

Openapi è il provider primario candidato perché il listino acquisito copre molte aree compatibili: business information, documenti ufficiali, ID & Trust, verifiche IBAN/email/telefono, PEC/SDI, AML e bilanci.

## Provider futuri

L'architettura deve permettere in futuro:

- secondo provider per fallback;
- provider specializzato per bilanci o score;
- provider per KYC/KYB internazionale;
- provider interno/manuale per servizi assistiti;
- disattivazione temporanea di servizi instabili.

## Regola di disaccoppiamento

Il codice pubblico del prodotto (`COMPANY_PRO`) non deve coincidere con il codice provider. Il mapping deve essere versionato.

Esempio:

```text
COMPANY_PRO v1
  → Openapi company-full-it
  → Openapi credit-scoring-start/top
  → Openapi negativita-impresa-it
```

Se in futuro cambia provider o endpoint, l'ordine storico deve restare leggibile grazie a snapshot e versione mapping.

