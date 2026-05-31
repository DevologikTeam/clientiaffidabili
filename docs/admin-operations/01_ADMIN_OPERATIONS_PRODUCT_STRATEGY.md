# Admin Operations — Product strategy

## Visione

Il pannello admin di ClientiAffidabili.it deve essere progettato come una console operativa per ridurre errori, tempi di evasione e rischi compliance. Non deve essere una replica interna della dashboard cliente né una console tecnica per sviluppatori.

## Jobs to be done

### Operatore operations

- Vedere quali ordini sono bloccati.
- Capire se il blocco è pagamento, provider, report, fattura o supporto.
- Eseguire solo azioni sicure e guidate.
- Escalare quando serve approvazione.

### Responsabile compliance

- Verificare richieste ad alto rischio.
- Controllare uso lecito, dati richiesti e motivazione.
- Bloccare pubblicazione report se informazioni o finalità sono insufficienti.

### Finance/support

- Riconciliare pagamenti, fatture, rimborsi e dispute.
- Rispondere ai ticket collegati a ordini/report.
- Tenere separato il pagamento dal diritto a ricevere il report.

### Super admin

- Gestire override controllati.
- Vedere audit completo.
- Configurare soglie, code e regole operative future.

## Posizionamento interno

L'admin deve dare priorità alla **sicurezza operativa** rispetto alla velocità cieca. Le azioni ad alto rischio devono essere deliberate, tracciate e motivate.

## Principi UI

1. Queue-first.
2. Stato, motivo, impatto e prossima azione sempre visibili.
3. Nessun pulsante generico come “gestisci” senza contesto.
4. Azioni distruttive o economiche sempre confermate.
5. Termini tecnici ammessi solo in aree interne, mai nella UI cliente.
6. Ogni override deve richiedere motivazione.

## KPI operativi

- Tempo medio di evasione ordine.
- Numero ordini bloccati per causa.
- Provider request failed/retried/manual review.
- Report in review oltre SLA.
- Fatture pendenti.
- Ticket aperti per ordine/report.
- Rimborsi e dispute.

## Non obiettivi

- Non sostituire strumenti contabili completi.
- Non trasformare l'admin in CRM generalista.
- Non consentire bypass dei guardrail di pagamento/provider/report.
