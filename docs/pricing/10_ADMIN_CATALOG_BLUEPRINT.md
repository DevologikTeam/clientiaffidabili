# Admin catalog blueprint

## Obiettivo

L'admin catalogo deve permettere la gestione sicura di prodotti, prezzi e collegamenti provider senza esporre complessità tecnica al cliente finale.

## Navigazione admin proposta

```text
/admin/catalogo
  prodotti
  prezzi
  bundle
  endpoint provider
  revisioni
  audit
```

## Lista prodotti admin

Colonne:

| Campo | Descrizione |
|---|---|
| Nome pubblico | nome visto dal cliente |
| Codice prodotto | identificativo stabile, es. COMPANY_PRO |
| Categoria | Affidabilità B2B, KYB, Antifrode dati |
| Stato | draft/review/published/paused/assisted/archived |
| Prezzo netto | prezzo attivo |
| Margine stimato | visibile solo admin |
| Rischio | low/medium/high |
| Ultima revisione | data e utente |
| Azione | modifica, duplica, invia in review, pubblica/sospendi |

## Scheda prodotto admin

### Sezione identità

- nome pubblico;
- slug;
- codice prodotto immutabile dopo pubblicazione;
- categoria;
- descrizione breve;
- audience;
- scenario principale;
- stato pubblicazione.

### Sezione contenuto pubblico

- promessa operativa;
- cosa controlli;
- cosa ricevi;
- dati richiesti;
- limiti dichiarati;
- FAQ prodotto;
- CTA pubblica;
- meta title/description.

### Sezione pricing

- prezzo netto;
- aliquota IVA;
- imposte/diritti da mostrare separatamente;
- prezzo minimo consentito;
- margine target;
- buffer supporto;
- fee checkout stimata;
- stato price guard;
- versione prezzo.

### Sezione provider

Visibile solo ad admin autorizzati:

- provider;
- endpoint associati;
- costo stimato min/max;
- costo effettivo medio storico;
- retry policy;
- fallback;
- SLA interno;
- mapping output report.

### Sezione compliance

- finalità lecite ammesse;
- dati personali eventualmente coinvolti;
- livello rischio;
- disclaimer obbligatorio;
- conferme checkout obbligatorie;
- blocchi per paese/target non supportato.

## Workflow admin

```text
Draft → Review → Published
             ↘ Paused
             ↘ Assisted
Published → Price change review → Published new price version
Published → Paused → Published
Published → Archived
```

## Regola versioning

Ogni modifica a prezzo, bundle, provider map, disclaimer, dati richiesti o output report genera una nuova versione interna. Gli ordini già pagati mantengono la versione acquistata.

## Permessi

| Ruolo | Può fare |
|---|---|
| Catalog editor | modificare copy e schede draft |
| Pricing manager | modificare prezzo entro guardrail |
| Compliance reviewer | approvare disclaimer e finalità |
| Super admin | forzare override motivato e pubblicare high-risk |
| Support | leggere prodotto e ordine, senza modificare prezzo |

## Empty/error states

- nessun prodotto creato: mostra CTA “Crea prodotto” e link template;
- prezzo sotto soglia: blocco rosso con motivazione e azione;
- endpoint provider incompleto: blocco giallo, stato non pubblicabile;
- disclaimer mancante: blocco pubblicazione;
- costo provider scaduto: warning e richiesta revisione.
