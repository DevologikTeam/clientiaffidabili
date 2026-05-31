# M4B-P — Payment Providers & Subscriptions Design

## Obiettivo sprint

Trasformare l'analisi M4B-A in un blueprint operativo per pagamenti multi-provider, abbonamenti, crediti, entitlement, rimborsi, cancellazioni, dispute, riconciliazione webhook e superfici customer/admin.

Questo sprint non attiva provider reali: prepara il disegno da sviluppare in M4B-S, mantenendo il principio gia' adottato nel progetto: nessuna chiamata dati Openapi/provider prima di pagamento confermato o credito riservato.

## Decisione di prodotto

ClientiAffidabili.it deve supportare tre modalita' commerciali:

1. acquisto singolo di una verifica/report;
2. wallet crediti prepagato;
3. abbonamento con crediti/benefici limitati e monitoraggio opzionale.

Non vengono introdotti piani illimitati per servizi con costo provider variabile. Ogni consumo deve scalare un credito, generare un ledger entry e produrre audit.

## Decisione provider

- **Stripe first**: provider primario per carte, metodi locali supportati, Checkout hosted, subscription e customer portal futuro.
- **PayPal second**: provider opzionale feature-flagged, utile per conversione B2B/PMI, ma da attivare solo dopo sandbox e webhook validati.
- **Internal source of truth**: lo stato commerciale vero resta nel database ClientiAffidabili.it: subscription interna, wallet, entitlement, payment ledger, refund ledger.

## Ambito incluso

- Payment provider abstraction.
- Stripe one-shot/subscription blueprint.
- PayPal orders/subscriptions blueprint.
- Refund, partial refund, cancellation e dispute blueprint.
- Credit wallet ed entitlement blueprint.
- Reconciliation ledger e webhook model.
- Admin billing/payment operations blueprint.
- Customer billing portal blueprint.
- API contract e handoff M4B-S.

## Ambito escluso

- Integrazione reale con Stripe/PayPal.
- Gestione fiscale definitiva/fatturazione elettronica completa.
- Piano subscription pubblico attivo.
- Automazioni di rimborso senza review.

## Refund policy MVP

I rimborsi sono gestiti come workflow controllato:

| Scenario | Politica MVP | Motivo |
|---|---|---|
| Pagamento riuscito ma provider non chiamato | Rimborso possibile, anche full automatico assistito | Nessun costo provider sostenuto |
| Provider chiamato ma report non pubblicato | Rimborso solo manual review | Costo provider gia' sostenuto |
| Report pubblicato o scaricato | Rimborso normalmente bloccato o eccezionale | Valore gia' consegnato |
| Subscription appena rinnovata, crediti non usati | Rimborso valutabile | Evita contenziosi e chargeback |
| Subscription con crediti consumati | Rimborso parziale solo su valore residuo | Protegge margine |
| Dispute/chargeback aperta | Blocca rimborso manuale duplicato | Evita doppio rimborso |

## Output prodotti

- Blueprint provider, subscription, credito, refund e dispute.
- Contratti TypeScript backend/frontend.
- Registry policy rimborsi.
- QA antiregressione M4B-P.
- Roadmap e release aggiornate a `0.27.0`.

## Gate di uscita

- [x] Disegnato adapter multi-provider.
- [x] Disegnato modello refund e refund policy.
- [x] Disegnato modello subscription/crediti/entitlement.
- [x] Disegnata riconciliazione webhook.
- [x] Disegnate superfici customer/admin.
- [x] Aggiornata roadmap.
- [x] Aggiunto QA M4B-P.
