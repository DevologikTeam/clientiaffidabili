# Public Funnel Analytics Events

## Principio

Gli eventi devono misurare conversione e frizioni senza inviare dati personali o dati della ricerca.

## Event schema base

```ts
interface PublicFunnelEvent {
  event: string;
  page: string;
  section?: string;
  cta?: string;
  serviceCategory?: string;
  serviceCode?: string;
  priceBand?: 'free' | 'under_1' | '1_10' | '10_50' | 'over_50' | 'unknown';
  pathType?: 'self_service' | 'api_lead' | 'support';
}
```

## Eventi MVP

| Evento | Quando | PII consentita |
|---|---|---|
| `public_home_viewed` | apertura homepage | No |
| `scenario_selected` | click su scenario | No |
| `service_card_viewed` | card in viewport/click dettaglio | No |
| `service_detail_viewed` | pagina servizio | No |
| `checkout_entry_started` | click verso checkout | No |
| `legal_purpose_confirmed` | conferma finalità | No |
| `lead_api_requested` | invio richiesta API/volumi | Email solo nel backend/form, non analytics |
| `faq_opened` | apertura FAQ | No |

## Regole implementative M2-S

- Non inviare ragione sociale, codice fiscale, partita IVA, email, telefono, targa o indirizzo negli eventi.
- Non inviare query di ricerca libere.
- Usare codici interni servizio e categorie.
- Tracciare posizione CTA per capire quali sezioni convertono.
- Disattivare analytics se consenso non presente, quando richiesto dal setup privacy.
