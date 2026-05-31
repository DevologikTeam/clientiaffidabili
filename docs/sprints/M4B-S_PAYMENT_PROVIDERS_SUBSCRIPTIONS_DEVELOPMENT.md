# M4B-S — Payment Providers & Subscriptions Development

## Obiettivo
Implementare il runtime MVP per pagamenti estesi: Stripe first, PayPal feature-flagged, abbonamenti, pacchetti crediti, wallet, rimborsi, cancellazioni, dispute e riconciliazione webhook.

## Deliverable implementati
- Adapter provider Stripe/PayPal con contratto comune.
- Subscription runtime con piani `starter`, `pro`, `agency`.
- Credit wallet e credit ledger.
- Refund lifecycle con policy full/parziale/manual review/blocco.
- Dispute entity e reconciler webhook provider.
- Pagine cliente e admin per abbonamenti, wallet, rimborsi e ledger.
- Script QA antiregressione M4B-S.

## Guardrail confermati
- Nessuna chiamata provider dati prima di pagamento confermato o credito prenotato.
- Nessun abbonamento illimitato.
- Rimborsi bloccati se report gia' pubblicato/scaricato salvo eccezione auditata.
- Reason obbligatoria per rimborso, cancellazione abbonamento e correzioni economiche.
- Ledger append-only per eventi monetari e credito.
- PayPal resta feature-flagged fino a sandbox/webhook QA reale.

## Esito
Sprint completato come scaffold implementativo offline. Build reale e test e2e vanno eseguiti dopo `pnpm install` in ambiente sviluppo/CI.
