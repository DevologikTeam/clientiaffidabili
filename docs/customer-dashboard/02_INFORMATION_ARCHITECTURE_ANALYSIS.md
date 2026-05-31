# Customer Dashboard — Information Architecture Analysis

## Navigazione proposta

La dashboard cliente deve avere una navigazione breve e orientata al lavoro reale.

| Voce | Scopo | Priorità MVP |
|---|---|---|
| Panoramica | Stato immediato e prossime azioni | Alta |
| Verifiche | Storico richieste e stati | Alta |
| Report | Accesso ai report pronti | Alta |
| Ordini e fatture | Pagamenti, ricevute e fatture | Media |
| Supporto | Assistenza contestuale | Media |
| Impostazioni | Profilo, azienda, notifiche | Post-MVP |

## Panoramica

La pagina iniziale deve rispondere a quattro domande:

1. **Cosa è pronto?** Report pubblicati e leggibili.
2. **Cosa è in lavorazione?** Verifiche pagate e in elaborazione.
3. **Cosa è bloccato?** Pagamento, dati mancanti, review, provider unavailable.
4. **Cosa posso fare adesso?** CTA specifica, una per stato.

## Gerarchia sopra la piega

1. Hero compatto: `Le tue verifiche`
2. Stato operativo: `2 report pronti`, `1 verifica in corso`, `1 richiesta richiede attenzione`
3. Azione primaria: `Apri report pronto` oppure `Completa dati richiesti`
4. Alert solo se serve un'azione reale.

## Lista verifiche

Campi minimi:

- soggetto verificato;
- servizio;
- stato cliente;
- data richiesta;
- data ultimo aggiornamento;
- totale pagato;
- CTA.

Filtri MVP:

- stato;
- servizio;
- intervallo date;
- testo azienda/P.IVA/codice fiscale se consentito.

## Stati customer-facing

| Stato tecnico aggregato | Stato cliente | CTA |
|---|---|---|
| order_draft | Ordine non completato | Riprendi ordine |
| payment_pending | Pagamento in attesa | Completa pagamento |
| payment_failed | Pagamento non riuscito | Riprova pagamento |
| paid_provider_pending | Verifica in elaborazione | Vedi dettagli |
| provider_manual_review | Verifica in controllo manuale | Segui aggiornamenti |
| provider_failed_retriable | Elaborazione in ritardo | Contatta supporto solo se urgente |
| provider_failed_final | Verifica non completata | Richiedi assistenza |
| report_draft | Report in preparazione | Vedi stato |
| report_review_required | Report in revisione | Attendi revisione |
| report_published | Report pronto | Apri report |
| refunded | Rimborsato | Vedi ordine |

## Regola UX sugli stati

Ogni stato deve comunicare:

- stato;
- motivo;
- impatto;
- prossima azione;
- tempo atteso solo se affidabile.

Non devono comparire codici provider o errori tecnici.

## Mobile-first

La dashboard deve essere usabile da smartphone:

- card verticali per verifiche;
- filtri collassabili;
- CTA sticky solo se realmente utile;
- niente tabelle larghe come superficie primaria;
- dettaglio verifica in pagina o drawer full-screen.
