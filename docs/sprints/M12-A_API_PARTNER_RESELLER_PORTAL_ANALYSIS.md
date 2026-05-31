# M12-A — API Partner & Reseller Portal Analysis

Versione: 0.38.0  
Tipo sprint: Analisi  
Obiettivo: definire il perimetro strategico, tecnico, commerciale e di sicurezza del portale API/partner/reseller di ClientiAffidabili.it prima della progettazione M12-P.

## Sintesi executive

ClientiAffidabili.it non deve diventare subito un marketplace API generico. La direzione corretta è un **Partner & Reseller Portal controllato**, pensato per agenzie, software house, gestionali, consulenti, studi e piattaforme B2B che vogliono integrare verifiche aziendali, report affidabilità, KYB, IBAN, contatti e monitoraggio in flussi propri.

Il portale partner deve avere due livelli:

1. **Reseller commerciale**: il partner compra crediti o pacchetti, rivende report e servizi ai propri clienti, gestisce margine e storico.
2. **API partner**: il partner ottiene API key, sandbox, documentazione, rate limit, webhook e usage ledger per integrare i servizi in un proprio prodotto.

Il go-live deve essere graduale: prima partner selezionati/manual-approved, poi sandbox self-service, poi API production con limiti e contratti.

## Problema da risolvere

Senza un portale partner, il prodotto resta limitato alla vendita diretta. Con il portale partner, ClientiAffidabili.it può aprire canali B2B2B mantenendo controllo su margini, compliance, consumi provider e rischio operativo.

Il rischio è esporre API troppo presto senza controlli. Ogni chiamata API può generare costo provider, dati sensibili, report, fattura, rimborso o contestazione. Per questo il portale deve essere progettato con guardrail forti.

## Fonti e baseline

- La selezione dei servizi rivendibili resta collegata alla strategia iniziale basata sul listino Openapi.
- OWASP API Security Top 10 2023 indica come rischi principali Broken Object Level Authorization, Broken Authentication, Unrestricted Resource Consumption, Improper Inventory Management e Unsafe Consumption of APIs.
- Stripe documenta API key sandbox/live, restricted API keys, webhook signing secrets, rotazione e IP allowlist: sono principi da replicare anche per le API key partner.
- PayPal usa access token OAuth2 per REST API: utile come riferimento per separare autenticazione provider da API key partner.
- OpenAPI Specification è lo standard da usare per documentare gli endpoint pubblici partner.

## Decisione MVP

M12 non espone ancora API reali in produzione. M12-A definisce il modello, M12-P lo progetta, M12-S implementerà scaffold controllato.

MVP consigliato:

- portale partner solo per account approvati;
- ambiente sandbox separato da production;
- API key con prefisso, hash, scope, stato, rate limit, IP allowlist opzionale;
- credit wallet partner obbligatorio prima di chiamate costose;
- nessuna chiamata provider se credito non riservato o pagamento non valido;
- usage ledger append-only;
- webhook partner firmati;
- documentazione OpenAPI versionata;
- dashboard partner con consumi, errori, chiavi, webhook, crediti e simulatore sandbox;
- revenue share inizialmente manual-assisted;
- produzione partner solo dopo review compliance e contrattuale.

## Non obiettivi del MVP

- marketplace pubblico aperto senza approvazione;
- API illimitate;
- payout automatici ai partner;
- white label completa;
- dati raw provider ai partner;
- generazione report senza controllo su uso lecito;
- SDK ufficiali multipiattaforma.

## Segmenti partner prioritari

1. **Software house e gestionali B2B**: vogliono integrare verifiche aziendali nei CRM/ERP.
2. **Agenzie commerciali e lead generation B2B**: vogliono qualificare aziende prima di campagne o appuntamenti.
3. **Studi professionali**: vogliono offrire verifiche su clienti/fornitori come servizio aggiuntivo.
4. **Marketplace e piattaforme procurement**: vogliono controlli KYB/affidabilità nel workflow.
5. **Consulenti credito/recupero**: solo con perimetro compliance validato.

## Modello commerciale analizzato

### Opzione A — Credit wallet partner

Nel modello credit wallet il partner acquista pacchetti crediti e consuma per chiamata/report. È il modello più sicuro perché evita esposizione a costi provider non coperti.

### Opzione B — Abbonamento + crediti inclusi

Il partner paga un piano mensile con un numero di crediti inclusi e overage controllato. Buono per ricavi ricorrenti, ma richiede entitlements solidi.

### Opzione C — Reseller margin manual-assisted

Il partner acquista a prezzo scontato e rivende al proprio cliente. Il margine è gestito fuori piattaforma o con report mensile. Buono per MVP.

### Opzione D — Revenue share automatico

Da rimandare: richiede payout, fiscalità, contratti, note credito/commissioni e compliance più complesse.

## Pricing preliminare partner

Il prezzo partner non deve scendere sotto la soglia di margine minimo già definita per il catalogo. Per MVP:

| Piano partner | Target | Canone | Crediti inclusi | Sconto indicativo | Note |
|---|---|---:|---:|---:|---|
| Partner Starter | studio/agenzia piccola | €49/mese | 50 | 10–15% | no API production automatica |
| Partner Pro | software house/agenzia | €149/mese | 200 | 20–25% | API production previa review |
| Partner Agency | reseller strutturato | €399/mese | 750 | 30–35% | SLA e supporto avanzato |
| Enterprise | piattaforme | su richiesta | custom | custom | contratto e limiti dedicati |

Gli sconti devono applicarsi al prezzo pubblico interno, non al costo provider. Ogni chiamata deve salvare `providerCostSnapshot`, `partnerPriceSnapshot`, `platformMarginSnapshot` e `paymentFeeSnapshot` se applicabile.

## API product strategy

L'API partner non deve esporre tutti i prodotti. La prima lista deve essere limitata:

- `company_reliability_check`;
- `company_reliability_pro`;
- `kyb_compliance_check` solo partner approvati;
- `iban_verification`;
- `contact_verification`;
- `report_status`;
- `report_download_url` solo se autorizzato;
- webhook `report.ready`, `report.blocked`, `credit.low`, `subscription.updated`.

## Sicurezza obbligatoria

- API key visibile una sola volta alla creazione.
- Salvataggio solo hash della key.
- Scope per endpoint/prodotto.
- Rate limit per key/account/IP.
- IP allowlist opzionale, consigliata per production.
- idempotency key obbligatoria per richieste costose.
- object-level authorization su ogni risorsa partner.
- No raw provider payload.
- Webhook firmati con secret dedicato.
- Rotazione/revoca key auditata.
- Ambiente sandbox/production separato.
- Usage ledger append-only.

## Rischi principali

1. Uso improprio dei report per decisioni non autorizzate.
2. Consumi API automatizzati che generano costi provider non coperti.
3. Furto API key partner.
4. Accesso cross-partner a report o fatture.
5. Webhook spoofing.
6. Pricing partner troppo aggressivo con margine negativo.
7. Confusione tra sandbox e produzione.
8. API non documentate o versioni obsolete.

## Decisione su developer experience

Il portale developer deve essere molto pratico:

- quick start in 5 minuti;
- esempi cURL;
- OpenAPI spec scaricabile;
- ambiente sandbox con risposte simulate realistiche;
- API key management;
- webhook test sender;
- log richieste redatti;
- usage dashboard;
- error code catalog;
- limiti chiari;
- pagina status e incidenti in futuro.

## Readiness M12-P

M12-P deve progettare:

- IA portale partner;
- data model API key/webhook/usage/partner plan;
- lifecycle partner onboarding;
- API contract e OpenAPI baseline;
- pricing/reseller blueprint;
- sicurezza key/scopes/rate limit;
- UI dashboard partner;
- admin partner approval queue;
- handoff M12-S.
