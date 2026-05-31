# 01 — Surface Inventory & Journey Analysis

## Scopo

Inventariare le superfici reali di ClientiAffidabili.it v0.68.0 e capire quali vanno rifinite prima della Release Candidate.

## Inventory statico

| Metrica | Valore rilevato | Nota |
|---|---:|---|
| Page route Next.js | 72 | Conteggio file `apps/web/app/**/page.tsx`. |
| Route con metadata espliciti | 6 | Home, guide, guida dettaglio, garanzia, contatti, settings analytics. |
| Route pubbliche principali | 9 | Home, servizi, servizio dettaglio, prezzi, guide, guida dettaglio, garanzia, contatti, API. |
| Route sensibili | 40+ | Admin, dashboard, report, checkout post-payment, inviti, fatture, API partner autenticata. |
| Sitemap | presente | Delegata a `buildLaunchSitemapEntries()`. |
| Robots | presente | Blocca admin/dashboard in produzione e blocca tutto fuori produzione. |
| Tracking esterno | configurabile | Default disattivo e denylist sensibile presente. |

## Journey pubblico P0

```text
Home -> scenario/servizi -> dettaglio servizio -> prezzi/checkout -> conferme -> pagamento hosted -> dashboard/report -> supporto/rimborso
```

### Forze attuali

- La home comunica il concetto di report decisionale e non di semplice chiamata API.
- La pagina garanzia spiega valore, limiti e rimborso.
- Le guide pubbliche sono filtrate per stato `published` e hanno JSON-LD coerente.
- Catalogo e pricing derivano da registry, quindi riducono incoerenze manuali.
- Checkout include conferme legali e nota sui limiti del report.

### Gap operativi

- Il percorso pubblico contiene ancora copy interno: `MVP`, `margine protetto`, `CMS editoriale`, `dashboard demo`, `provider mapping`.
- Le pagine `/servizi`, `/prezzi`, `/api`, `/checkout` non hanno metadata specifici.
- La navigazione mobile nasconde i link principali senza proporre un menu alternativo.
- Il checkout usa un campo unico per dati diversi; serve una scelta guidata in base al servizio.
- La pagina prezzi deve parlare di totale, IVA e cosa include, non di margine interno.

## Journey cliente P0

```text
Login/registrazione -> dashboard -> verifica/report -> download o richiesta supporto -> fatture/profilo fiscale/team
```

### Forze attuali

- Esiste una dashboard cliente con status hero, next best action, report access e support entry.
- Esistono pagine per account, fatture, profilo fiscale, team e verifiche.
- Il report detail e' separato dalla lista verifiche.

### Gap operativi

- La voce pubblica `Dashboard demo` rischia di confondere demo commerciale e area cliente reale.
- Le route dashboard non hanno noindex page-level.
- Stati vuoti, bloccati e azioni successive devono essere uniformi tra verifiche, fatture e supporto.
- I report devono essere trattati come superficie sensibile: no tracking esterno, no sitemap, no metadata indicizzabili.

## Journey partner P1

```text
API partner -> dashboard partner -> sandbox -> API keys -> usage -> go-live -> webhooks/supporto
```

### Forze attuali

- Area partner gia segmentata con docs, API key, usage, go-live e webhook.
- Il modello sandbox-first e' coerente con M19.

### Gap operativi

- Serve chiarezza tra pagina pubblica API e area partner autenticata.
- La pagina pubblica `/api` richiede metadata, CTA e copy commerciale meno tecnico.
- Le route partner dashboard devono restare noindex e senza tracking esterno.

## Journey admin P1

```text
Admin -> launch readiness -> sandbox certification -> error ledger/settings/billing/provider/email/CRM/SEO -> RC gate
```

### Forze attuali

- Admin ha gia molte console verticali.
- Sandbox certification M19-S crea un centro evidenze e waiver.
- Error ledger, settings e launch readiness sono gia collegati a decisioni di rilascio.

### Gap operativi

- L'admin puo restare tecnico, ma deve avere gerarchia visiva e azioni primarie chiare.
- Le pagine admin devono essere escluse a livello metadata oltre che robots.
- Le tabelle admin devono essere verificabili via tastiera e screen reader.
- Le pagine admin non devono ereditare accidentalmente tracking esterno.

## Classificazione priorita

- **P0**: pagine o pattern che impattano conversione, privacy, SEO sensibile, mobile, checkout o accesso a report.
- **P1**: superfici importanti per credibilita, operativita admin o go-live partner.
- **P2**: miglioramenti estetici o contenuti non bloccanti per RC.
