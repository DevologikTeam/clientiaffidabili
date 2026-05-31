# M3-A — Service Catalog & Pricing Analysis

Versione pacchetto: **0.8.0**  
Tipo sprint: **Analisi**  
Stato: **Completato**

## Obiettivo dello sprint

Trasformare il catalogo generico di API disponibili in un catalogo commerciale coerente con **ClientiAffidabili.it**: pochi servizi, chiari, vendibili, con marginalità protetta, copy prudente e percorso di checkout sostenibile.

Questo sprint non sviluppa ancora il catalogo definitivo: decide **cosa vendere**, **cosa non vendere subito**, **con quale logica di prezzo**, **con quali limiti** e **quali dati dovranno essere progettati nel prossimo sprint**.

## Decisione strategica

ClientiAffidabili.it non deve presentarsi come marketplace API generalista. Il posizionamento corretto è:

> Una piattaforma B2B semplice per verificare clienti, fornitori e dati operativi prima di decisioni commerciali sensibili.

Quindi il catalogo pubblico MVP deve restare corto: massimo 5-7 prodotti, raggruppati per scenario, non per endpoint tecnico.

## Famiglie da lanciare nel MVP

| Famiglia | Priorità | Razionale |
|---|---:|---|
| Affidabilità B2B | Alta | È coerente col dominio, con il bisogno PMI e con il valore percepito. |
| Risk intelligence | Altissima | È il cuore commerciale: report decisionale, non semplice dato grezzo. |
| Compliance KYB | Media/alta | Alto valore percepito, ma richiede copy e guardrail più severi. |
| Antifrode dati | Alta | Prodotti entry, costo basso, conversione facile e upsell naturale. |
| Monitoring | Fase 2 | Ricorrenza interessante, ma richiede scheduler, notifiche e billing evoluto. |

## Servizi da evitare nella prima fase pubblica

| Area | Decisione | Motivo |
|---|---|---|
| Persona fisica investigativa | Non spingere pubblicamente | Rischio privacy/copy e potenziale uso improprio. |
| Pratiche CAF/INPS/cittadinanza | Escludere | Non coerenti con posizionamento B2B e richiedono processi operativi diversi. |
| Real estate catastale avanzato | Rimandare | Può diventare verticale futuro, ma diluisce il dominio. |
| Automotive | Escludere MVP | Buono per marketplace generalista, poco coerente con “clienti affidabili”. |
| Documenti ufficiali manuali/lenti | Solo add-on selettivi | Tempi lunghi e costi più alti peggiorano conversione self-service. |
| AI/RAG | Escludere MVP | Non è il bisogno primario del sito; rischia di confondere la proposta. |

## Prodotti MVP raccomandati

| Codice | Nome pubblico | Prezzo netto consigliato | Costo provider stimato | Margine obiettivo | Stato |
|---|---|---:|---:|---:|---|
| COMPANY_ESSENTIAL | Verifica azienda essenziale | €14,90 | €0,12-€0,25 | >80% | MVP |
| COMPANY_PRO | Check Affidabilità Pro | €24,90 | €1,30-€2,20 | >70% | MVP core |
| COMPANY_PRO_PLUS | Affidabilità Pro + Bilancio | €34,90 | €4,80-€7,00 | >55% | Add-on |
| KYB_COMPLIANCE | KYB Compliance | €49,90 | €2,00-€4,50 | >70% | MVP controllato |
| IBAN_CHECK | Verifica IBAN | €4,90 | €0,09-€0,20 | >80% | MVP |
| CONTACT_CHECK | Verifica email e telefono | €4,90 | €0,02-€0,12 | >80% | MVP |
| SUPPLIER_MONITORING | Monitoraggio fornitore | €9,90/mese | €0,10-€1,50 | >65% | Post-MVP |

## Nota sulla marginalità

Il margine non deve essere calcolato solo come differenza fra prezzo pubblico e chiamata provider. Devono essere considerati:

- costo provider effettivo;
- eventuale costo di retry;
- fee checkout;
- costo fatturazione/assistenza;
- costo generazione PDF/report;
- costo gestione errore/rimborso;
- IVA, imposte, bolli, diritti o tasse quando applicabili;
- sconti commerciali o crediti inclusi nei piani.

## Regola senior di pricing

Il prezzo deve vendere **la decisione semplificata**, non il singolo endpoint.

Un endpoint da pochi centesimi può sostenere un prezzo da €14,90 se il prodotto restituisce:

1. dati selezionati;
2. interpretazione leggibile;
3. contesto decisionale;
4. limiti chiari;
5. storico e ricevuta;
6. report scaricabile;
7. supporto in caso di errore.

## Guardrail catalogo/prezzi

- Nessun prezzo pubblico sotto costo stimato + fee + buffer.
- Costo provider sempre privato, visibile solo in admin/super admin.
- Ogni prodotto deve avere `allowedUseCases`, `requiredLegalBasis`, `riskLevel` e `providerEndpointMap`.
- Prodotti high-risk richiedono copy prudente e conferma uso lecito nel checkout.
- I prodotti con costi variabili o tempi lunghi non devono essere venduti come “istantanei”.
- Gli add-on devono avere conferma separata prima di generare costo provider.
- Nessuna chiamata provider prima del pagamento o autorizzazione interna, salvo prodotti free/lead magnet esplicitamente configurati.

## Output creati nello sprint

- Analisi provider/listino.
- Selezione servizi MVP.
- Modello prezzi e marginalità.
- Analisi bundle/pacchetti.
- Benchmark competitor e posizionamento prezzo.
- Governance admin/prezzi.
- Confini copy pubblico/privato.
- File TypeScript di analisi catalogo per preparare lo sprint di design.
- Script QA antiregressione documentale.

## Esito

Sprint completato. Il prossimo sprint è **M3-P Service Catalog & Pricing Design**, dove questa analisi diventa blueprint dati, admin UI, pagine catalogo, price guards e flussi di modifica prezzi.
