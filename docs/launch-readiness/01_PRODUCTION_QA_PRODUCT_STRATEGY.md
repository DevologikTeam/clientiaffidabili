# 01 — Production QA Product Strategy

## Principio
La qualita' di ClientiAffidabili.it non si misura dal numero di moduli presenti, ma dalla capacita' di far completare in modo sicuro un ciclo reale:

**scopro servizio → compro → pago → verifico soggetto → genero report → accedo al report → ricevo documento fiscale → eventualmente gestisco rimborso/supporto.**

## Posizione attuale
Il progetto e' ricco di moduli ma ancora scaffold offline. Questo significa che esistono architettura, documentazione, componenti e runtime iniziali, ma non esiste ancora una prova completa con dipendenze installate e ambiente avviato.

## Rischio principale
Lanciare troppo presto genererebbe rischi su:

- pagamento riuscito ma provider non chiamato;
- pagamento riuscito ma report non generato;
- provider chiamato due volte per idempotenza debole;
- report visibile all'account sbagliato;
- rimborso con credito ancora disponibile;
- abbonamento attivo senza entitlement coerente;
- fattura/nota credito disallineata;
- admin action non auditata;
- webhook non verificato;
- deploy Coolify senza healthcheck affidabile.

## Strategia M13
M13 deve essere una fase di certificazione progressiva:

1. **M13-A Analysis**: definizione matrice, gate e rischi.
2. **M13-P Design**: blueprint test, Playwright architecture, CI, smoke, release process.
3. **M13-S Development**: implementazione test, script, pipeline, production checklist e report eseguibili.

## Criterio MVP launchable
Un MVP puo' partire solo se:

- i servizi pubblici mostrano prezzi/limiti chiari;
- il checkout non consuma provider prima del pagamento;
- report e documenti sono accessibili solo agli account autorizzati;
- rimborsi/dispute non creano doppio movimento economico;
- la console admin permette di risolvere anomalie;
- esiste un rollback operativo;
- e' stato eseguito almeno un restore drill su staging.
