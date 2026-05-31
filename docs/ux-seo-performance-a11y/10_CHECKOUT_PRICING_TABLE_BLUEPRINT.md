# 10 — Checkout, Pricing & DataTable Blueprint

## Scopo

Ridurre frizione e ambiguita nel percorso prezzo -> checkout -> pagamento -> report, mantenendo limiti e guardrail visibili.

## Pricing blueprint

Ogni elemento prezzo deve indicare:

- nome servizio;
- cosa include;
- prezzo finale;
- tempo indicativo;
- output ricevuto;
- limiti principali;
- CTA specifica.

## Checkout blueprint

Il checkout deve diventare un flusso guidato:

1. riepilogo servizio selezionato;
2. dato richiesto con label specifica per servizio;
3. uso lecito e limiti;
4. metodo pagamento;
5. conferma e stato ordine;
6. prossima azione dopo pagamento.

### Errori

- Error summary sopra il form.
- Ogni campo con `aria-describedby` verso help/error text.
- Messaggi cliente: cosa manca, perche serve, come correggere.
- Nessun errore tecnico grezzo tipo provider/webhook/payload.

## DataTable compatibility decision

M20-P include una correzione build per `DataTable`:

- forma raccomandata nuova: `DataTableColumn<Row>[]` con `key`, `label`, `render`;
- forma legacy supportata: `string[]` per colonne e `ReactNode[]` per riga;
- `caption` opzionale per compatibilita, ma raccomandato per nuove tabelle;
- normalizzazione interna legacy per evitare errori TypeScript in Docker/Next build;
- QA statico specifico sul fix #32.

## Migrazione successiva

M20-S puo continuare a usare il bridge, ma le nuove tabelle dovranno usare la forma typed. M21-S potra introdurre un task di migrazione completa legacy -> typed se la build reale risulta stabile.

## Acceptance criteria M20-S

- `/admin/billing` non blocca piu `next build` per `DataTable`.
- Warning Autoprefixer `align-items:end` rimosso.
- Checkout non mostra copy tecnico al cliente.
- Tabelle dati P0 espongono caption e header semantici.
