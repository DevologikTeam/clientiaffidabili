# Privacy, GDPR & Data Protection Analysis

## Natura dati

ClientiAffidabili.it tratta dati business, dati di contatto, dati fiscali/billing, ordini, report, audit e potenzialmente informazioni su persone collegate ad aziende quando i servizi includono stakeholders, titolari effettivi, PEP/sanctions o informazioni societarie con persone fisiche.

## Principi GDPR applicati

- Liceita', correttezza e trasparenza.
- Limitazione della finalita'.
- Minimizzazione dei dati.
- Esattezza e aggiornamento temporale tramite timestamp/fonti.
- Limitazione della conservazione.
- Integrita' e riservatezza.
- Accountability tramite audit, policy e registro trattamenti.

## Output richiesti prima della produzione

1. Privacy policy pubblica.
2. Cookie policy e gestione consensi se tracking/analytics non essenziali.
3. Termini servizio e uso lecito.
4. Policy rimborsi e limiti report.
5. Registro trattamenti template.
6. DPIA-light o assessment legittimo interesse per servizi compliance/affidabilita'.
7. Data retention matrix.
8. Procedura data breach.
9. Elenco subfornitori: provider dati, payment processor, hosting, email, analytics.
10. DPA/accordi con fornitori quando necessari.

## Data retention proposta

| Dato | Retention MVP | Nota |
|---|---:|---|
| Ordini/pagamenti/fatture | secondo obblighi fiscali | da validare con commercialista |
| Report pubblicati | 24 mesi default | configurabile per policy commerciale/legal |
| Raw payload provider | minimo necessario, cifrato/redatto | accesso ristretto, retention breve |
| Audit log | 36 mesi | valutare in base a obblighi e rischi |
| Log tecnici | 30-90 giorni | senza PII/segreti |
| Support ticket | 24 mesi | salvo richiesta/obbligo diverso |

## Data breach

Il sistema deve prevedere rilevazione, classificazione, contenimento, registro incidenti e procedura di notifica. Per GDPR la notifica all'autorita' di controllo deve essere valutata senza ingiustificato ritardo e, ove richiesto, entro 72 ore dalla conoscenza della violazione.

## Privacy guardrail UX

- Nel checkout spiegare uso lecito e finalita' della verifica.
- Nei report indicare fonte, data richiesta e limiti.
- Non promettere solvibilita', assenza rischio o certezza di pagamento.
- Non mostrare dati personali non necessari nella dashboard cliente.
- Non mostrare raw payload provider in admin list.
