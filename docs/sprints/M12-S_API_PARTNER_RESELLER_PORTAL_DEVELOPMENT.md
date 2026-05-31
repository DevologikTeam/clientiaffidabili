# M12-S — API Partner & Reseller Portal Development

## Obiettivo sprint
Implementare il runtime MVP del portale partner/reseller e delle API pubbliche controllate di ClientiAffidabili.it.

Lo sprint traduce il blueprint M12-P in codice scaffold reale: entita' TypeORM, servizi NestJS, controller partner/customer/admin, API key hashate, sandbox-first, usage ledger append-only, idempotenza, rate limit, webhook partner firmati, pagine dashboard partner e console admin.

## Decisione prodotto
Il portale partner resta **controllato e sandbox-first**.

La produzione live non viene attivata automaticamente. Il runtime consente di richiedere accesso live, ma l'approvazione resta manual-assisted e auditata. Questo evita consumo provider non governato, abuso API, erosione margini e rischi compliance.

## Implementato nello sprint
- `PartnerPortalModule` backend.
- Entita' partner, API key, webhook, ledger usage, rate limit, live access request e idempotency record.
- Servizi runtime per API key, usage ledger, rate limit, webhook e sandbox.
- Controller area partner, API pubblica `/api/partner/v1` e admin operations.
- API key con prefix visibile e hash del secret.
- `Idempotency-Key` obbligatoria sulle richieste costose.
- Usage ledger append-only con reservation/commit/release.
- Sandbox company check mock, senza chiamata provider reale.
- Webhook partner firmati e delivery log semplificato.
- Portale frontend `/dashboard/partner` con API key, usage, webhook, docs e go-live.
- Console admin `/admin/partners` e `/admin/partners/[id]`.
- OpenAPI partner scaffold `apps/api/openapi/partner.v1.yaml`.
- QA antiregressione M12-S.

## Guardrail runtime
- Nessuna API key salvata in chiaro.
- Secret mostrato una sola volta in fase di creazione.
- Live disabilitato di default se il partner non e' approvato.
- Ogni richiesta costosa richiede idempotenza.
- Ogni consumo produce ledger.
- Partner sandbox non chiama provider reale.
- Raw payload provider non esposto.
- Reason obbligatoria per approvazioni, sospensioni, revoche e adjustment.
- Rate limit implementato come scaffold in-memory, da rendere persistente prima del go-live.

## Definition of Done
- Le pagine partner e admin sono presenti.
- I controller e servizi runtime sono presenti.
- Le entita' partner sono registrabili nel modulo e predisposte in `AppModule`.
- QA statico dedicato passa.
- Lo ZIP e' valido.

## Limiti noti
Il progetto resta scaffold offline. Non sono state eseguite build `pnpm install`/`pnpm build`, test browser reali, sandbox Stripe/PayPal/Openapi o test di carico API. Prima del go-live vanno completati M13 e gate produzione.
