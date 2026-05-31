# M7-P — Customer Dashboard Design

Versione pacchetto: **0.21.0**  
Tipo sprint: **Progettazione**  
Modulo: **M7 Customer Dashboard**  
Input principale: M7-A Customer Dashboard Analysis  
Output successivo: M7-S Customer Dashboard Development

## Obiettivo

Trasformare l'analisi dell'area cliente in un blueprint operativo pronto per lo sviluppo. La dashboard deve diventare la cabina di regia post-acquisto del cliente: mostrare cosa è stato acquistato, cosa è pronto, cosa richiede attenzione, dove si scaricano/consultano i report, quali fatture sono disponibili e quale azione sicura eseguire dopo.

Il design non deve sembrare un pannello tecnico. Deve essere semplice, affidabile, orientato al cliente business e coerente con il posizionamento ClientiAffidabili.it: supporto decisionale B2B, dati verificabili, linguaggio prudente, niente promesse assolute.

## Scope M7-P

Incluso:

- dashboard home cliente;
- storico verifiche;
- dettaglio verifica;
- accesso report;
- area ordini, pagamenti e fatture;
- area profilo azienda/billing;
- notifiche operative;
- task/prossime azioni;
- supporto contestuale;
- stati customer-facing;
- blueprint API;
- componenti UI da sviluppare in M7-S;
- guardrail privacy, RBAC, audit, report access.

Escluso da M7-P:

- implementazione reale delle route;
- autenticazione completa;
- generazione PDF reale;
- integrazione subscription completa Stripe/PayPal;
- gestione multi-utente avanzata completa.

## Principio di esperienza

La dashboard deve rispondere subito a cinque domande:

1. Quali verifiche ho richiesto?
2. Quali report sono pronti?
3. Cosa è bloccato o richiede un'azione?
4. Dove trovo ordini, pagamenti e fatture?
5. Cosa posso fare adesso in modo sicuro?

## Architettura informativa proposta

Navigazione customer:

```text
/dashboard
/dashboard/verifiche
/dashboard/verifiche/[id]
/dashboard/report
/dashboard/report/[id]
/dashboard/ordini
/dashboard/fatture
/dashboard/profilo-azienda
/dashboard/notifiche
/dashboard/supporto
```

MVP consigliato in M7-S:

```text
/dashboard
/dashboard/verifiche
/dashboard/verifiche/[id]
/dashboard/report/[id]
/dashboard/fatture
/dashboard/supporto
```

## Home dashboard

Sezioni sopra la piega:

1. **Stato operativo**: report pronti, verifiche in corso, azioni richieste.
2. **Prossima azione consigliata**: una sola CTA primaria.
3. **Ultime verifiche**: massimo 5 elementi.
4. **Avvisi utili**: solo eventi reali, non banner marketing generici.

Sezioni secondarie:

- report recenti;
- ordini e fatture;
- profilo aziendale;
- supporto.

## Stati cliente

Gli stati tecnici devono essere tradotti in stati comprensibili:

| Stato tecnico | Stato cliente | Copy consigliato |
|---|---|---|
| `order_paid` | Pagamento ricevuto | Stiamo preparando la verifica. |
| `provider_pending` | Verifica in corso | I dati sono in elaborazione. |
| `manual_review_required` | Serve controllo interno | Stiamo verificando alcuni dati prima di pubblicare il report. |
| `report_ready` | Report pronto | Puoi consultare il report. |
| `invoice_pending` | Fattura in preparazione | La fattura sarà disponibile appena emessa. |
| `failed_recoverable` | Serve assistenza | La richiesta richiede un controllo operativo. |
| `refunded` | Rimborso registrato | Il pagamento è stato rimborsato. |

Non usare nel cliente: `webhook`, `raw payload`, `provider retry`, `idempotency`, `queue`, `vault`, `tenant`.

## UX mobile

La dashboard deve essere mobile-first per consultazione rapida:

- card verticali;
- CTA una per blocco;
- tab sticky solo se davvero utile;
- report list con status pill e azione primaria;
- niente tabelle complesse su mobile;
- fatture in lista semplificata;
- supporto sempre contestuale.

## Handoff a M7-S

M7-S dovrà implementare:

- data fixture/mock locale per dashboard;
- componenti dashboard riutilizzabili;
- pagina `/dashboard` reale;
- pagina `/dashboard/verifiche`;
- pagina `/dashboard/verifiche/[id]`;
- collegamento ai report già presenti;
- pagina supporto base;
- QA antiregressione su copy vietato, stati cliente e accesso report.

## Gate di uscita M7-P

- [x] Definita esperienza dashboard.
- [x] Definite route customer.
- [x] Definiti stati customer-facing.
- [x] Definite card, liste, dettaglio e report access.
- [x] Definiti copy e parole vietate.
- [x] Definiti API contract.
- [x] Definita readiness per M7-S.
