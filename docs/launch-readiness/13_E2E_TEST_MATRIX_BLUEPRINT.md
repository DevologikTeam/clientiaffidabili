# 13 — E2E Test Matrix Blueprint

## Matrice critica MVP

| Area | Scenario | Tipo | Bloccante |
|---|---|---:|---:|
| Public | Home → servizi → dettaglio → checkout | browser | si |
| Catalogo | Prezzo mostrato = price snapshot checkout | browser/API | si |
| Checkout | Conferma uso lecito obbligatoria | browser | si |
| Billing | Pagamento mock/sandbox conferma ordine | API/browser | si |
| Provider | Nessuna chiamata prima del pagamento | API | si |
| Report | Report creato solo da provider completed/review | API/browser | si |
| Customer | Login → dashboard → report autorizzato | browser | si |
| Security | Account A non legge report Account B (cross-account denied) | API/browser | si |
| Admin | Work item → action con reason → audit | browser/API | si |
| Refund | Rimborso bloccato se report pubblicato | API/admin | si |
| Partner | API key sandbox → company check sandbox con Idempotency-Key | API/browser | si |
| Legal | Checkout registra consensi versionati | API/browser | si |

## Matrice non bloccante ma consigliata

| Area | Scenario | Priorita' |
|---|---|---:|
| Mobile | Funnel e checkout mobile | P1 |
| Email | Invito team e reset password | P1 |
| Fiscal | Download documento fiscale placeholder | P1 |
| Subscription | Wallet crediti e rinnovo mock | P1 |
| PayPal | Sessione mock/sandbox | P2 |
| Webhook partner | Delivery firmato | P2 |

## Regole `data-testid`
Ogni pagina critica deve esporre selettori stabili:

```text
data-testid="public-hero"
data-testid="service-card-COMPANY_PRO"
data-testid="checkout-legal-purpose"
data-testid="checkout-submit"
data-testid="dashboard-report-list"
data-testid="report-evidence-card"
data-testid="admin-work-item"
data-testid="admin-action-reason"
data-testid="partner-api-key-create"
```

## Criterio accettazione
M13-S deve implementare almeno 8 scenari bloccanti prima di poter chiamare la release `launch-candidate`.
