# Public Funnel — Implementation Notes

## Pagine implementate

| Route | Ruolo nel funnel | Stato |
|---|---|---|
| `/` | Landing decision-led con hero, report preview, scenari, trust, servizi MVP e FAQ. | Implementata |
| `/servizi` | Catalogo pubblico con scenario selector e servizi. | Implementata |
| `/servizi/[slug]` | Dettaglio servizio con output, dati richiesti, limiti e checkout entry. | Implementata |
| `/prezzi` | Pacchetti e listino singolo. | Implementata |
| `/api` | Pagina partner/API con messaggio prudente. | Implementata |
| `/checkout` | Checkout demo collegato da query `service`. | Aggiornato |

## Regola di contenuto

La piattaforma non deve vendere “chiamate API”, ma verifiche comprensibili. Per questo il contenuto pubblico usa tre livelli:

1. **Scenario**: problema dell’utente.
2. **Servizio**: verifica acquistabile.
3. **Report**: output decisionale con limiti.

## Componenti commerciali

I componenti creati in `components/public-funnel` sono volutamente separati dal design system base:

- il design system contiene mattoni generici;
- il public funnel contiene pattern commerciali specifici;
- in futuro i pattern maturi potranno diventare componenti DS ufficiali.

## Checkout entry

Le CTA usano il formato:

```text
/checkout?service=COMPANY_PRO
```

Il checkout accetta anche `product` per retrocompatibilità con la versione precedente, ma la nuova convenzione è `service`.

## SEO/GEO

La struttura permette contenuti indicizzabili per:

- verifica azienda;
- affidabilità clienti;
- verifica fornitori;
- KYB compliance;
- verifica IBAN;
- verifica contatti business;
- API verifiche B2B.

Nel prossimo ciclo SEO sarà utile aggiungere metadata Next.js pagina-per-pagina, schema.org prudente e FAQ structured data solo dopo revisione legale/copy.
