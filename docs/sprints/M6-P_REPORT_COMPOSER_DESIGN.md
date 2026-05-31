# Sprint M6-P — Report Composer Design

Versione pacchetto: **0.18.0**  
Tipo sprint: **Progettazione**  
Modulo: **M6 Report Composer**  
Sprint precedente: **M6-A Report Composer Analysis**  
Sprint successivo: **M6-S Report Composer Development**

## Obiettivo

Trasformare l'analisi M6-A in un blueprint operativo per generare report clienti leggibili, prudenti, versionati e auditabili.

Il report deve essere vendibile come prodotto premium, ma non deve diventare una promessa assoluta di solvibilità. Deve aiutare l'utente a decidere con maggiore consapevolezza, mostrando segnali, fonti, limiti e prossime azioni consigliate.

## Decisione progettuale

Il report MVP è composto da un **ReportTemplate versionato** che produce uno **Snapshot immutabile** dopo la pubblicazione.

Ogni report contiene:

1. Executive summary decisionale.
2. Livello di attenzione descrittivo.
3. Segnali principali osservati.
4. Dati anagrafici e stato azienda.
5. Evidenze economico/commerciali quando disponibili.
6. Evidenze compliance/KYB quando il prodotto le include.
7. Fonti, timestamp e limiti.
8. Azioni consigliate non vincolanti.
9. Disclaimer prudente.
10. Audit trail interno.

## Scope M6-P

### Dentro sprint

- Template report web e futuro PDF.
- Blueprint sezioni e componenti UI.
- Score bands e copy decisionale.
- Evidence card model.
- API contract report/customer/admin.
- Review workflow admin.
- Versioning template e snapshot.
- Handoff implementativo M6-S.
- QA antiregressione design.

### Fuori sprint

- Generazione PDF reale.
- Runtime composer completo.
- Persistenza DB definitiva.
- Firma digitale o marca temporale.
- AI generativa libera.
- Report persona fisica consumer/investigativi.

## Report customer experience

La pagina report deve rispondere in alto a quattro domande:

- **Cosa abbiamo verificato?**
- **Qual è il livello di attenzione?**
- **Perché?**
- **Cosa conviene fare ora?**

Il cliente non deve leggere una visura tecnica. Deve vedere una dashboard report chiara, scaricabile in futuro, con fonti e limiti sempre disponibili.

## Stati report

| Stato | Uso | Visibile cliente |
|---|---|---|
| `queued` | attesa composizione | sì, con messaggio rassicurante |
| `composing` | generazione in corso | sì |
| `review_required` | revisione admin necessaria | sì, senza dettagli interni |
| `ready` | report pubblicato | sì |
| `failed` | errore operativo | sì, con supporto |
| `voided` | report annullato | solo admin o customer care |

## Gate completati

- [x] Disegnato template report web/PDF-ready.
- [x] Disegnate sezioni report MVP.
- [x] Disegnate score bands prudenti.
- [x] Disegnato evidence component model.
- [x] Disegnato workflow admin review.
- [x] Disegnati API contract.
- [x] Disegnati versioning e audit.
- [x] Preparato handoff M6-S.
