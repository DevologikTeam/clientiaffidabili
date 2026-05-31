# Backup, Restore & Incident Response Analysis

## Backup strategy

| Risorsa | Backup | RPO | RTO |
|---|---|---:|---:|
| PostgreSQL | giornaliero + pre-deploy | 24h MVP | 4-8h MVP |
| File/report PDF futuri | object storage versionato | 24h | 4-8h |
| Config/Coolify env inventory | export manuale sicuro | 24h | 4h |
| Audit log | incluso DB + retention | 24h | 8h |

## Restore drill

Il restore non e' valido finche' non viene provato. M9-S dovra' produrre una procedura con:

- ambiente restore dedicato;
- restore DB da backup;
- verifica ordini/report/billing/audit;
- test login admin/customer;
- confronto record count;
- esito firmato nel QA report.

## Incident severity

| Severity | Esempio | Azione |
|---|---|---|
| SEV0 | data breach, secret leak, pagamento alterato | blocco immediato, escalation, legal/privacy |
| SEV1 | provider cost spike, report esposto a cliente errato | contenimento, audit, customer impact assessment |
| SEV2 | webhook failure massivo, checkout degradato | fallback operativo, retry controllato |
| SEV3 | bug UI non critico | backlog ordinario |

## Data breach runbook

1. Rileva e registra timestamp.
2. Contieni: disabilita chiave/feature/account interessato.
3. Preserva evidenze.
4. Valuta categorie dati e soggetti coinvolti.
5. Valuta rischio per diritti/liberta'.
6. Notifica DPO/privacy owner/legal se presente.
7. Valuta notifica Garante entro 72h se richiesta.
8. Comunica agli interessati se rischio elevato.
9. Documenta remediation e preventive actions.

## Business continuity MVP

- Pagamenti: se provider pagamento down, mostra stato degradato e non creare ordini pagati manualmente senza verifica.
- Provider dati: se Openapi down, ordine resta in lavorazione e admin queue gestisce retry/manual update.
- Report: se composer fallisce, nessun report parziale pubblicato automaticamente.
