# Report Template Blueprint

## Principio

Ogni report è generato da un template versionato. Il template determina sezioni, copy, score bands, requisiti di evidence, disclaimer e criteri di review.

Il report pubblicato non deve dipendere da dati runtime mutevoli: deve diventare uno **Snapshot immutabile**.

## Template MVP: `company_reliability_pro_v1`

### Header

- Nome report: Check Affidabilità Pro.
- Soggetto verificato.
- Data richiesta.
- Data generazione.
- ID ordine.
- Versione template.
- Stato report.

### Sezioni

1. **Sintesi operativa**
   - livello attenzione;
   - sintesi in 3-5 righe;
   - raccomandazione non vincolante.

2. **Segnali principali**
   - massimo 5 segnali;
   - ogni segnale deve avere severità, fonte e limite.

3. **Identità azienda**
   - denominazione;
   - P.IVA/codice fiscale;
   - sede;
   - stato attività;
   - forma giuridica quando disponibile.

4. **Informazioni economiche e commerciali**
   - score provider quando disponibile;
   - negatività/protesti/pregiudizievoli quando incluse;
   - bilancio se acquistato;
   - limiti di disponibilità dati.

5. **Compliance e KYB**
   - titolare effettivo se incluso;
   - PEP/sanzioni/adverse media se incluso;
   - blocco copy assoluto: nessun giudizio definitivo.

6. **Fonti e limiti**
   - elenco fonti;
   - timestamp;
   - copertura territoriale;
   - tempi di aggiornamento;
   - cosa non è stato verificato.

7. **Prossime azioni consigliate**
   - richiedere documenti aggiuntivi;
   - ridurre fido;
   - pagamento anticipato;
   - monitoraggio periodico;
   - review manuale.

## Template brevi

Per `iban_verification_v1` e `contact_verification_v1` si usa un layout compatto:

- esito tecnico;
- dati verificati;
- fonte/tempo;
- limite;
- azione consigliata.

## Regola design

La prima schermata del report deve essere comprensibile senza scorrere. Dettagli, fonti e limiti stanno sotto, ma devono essere sempre disponibili.
