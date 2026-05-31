# Sandbox Fixture & Seed Blueprint

## Principio

La certificazione sandbox deve usare dati fittizi, ripetibili e riconoscibili. Nessun test deve dipendere da dati reali, clienti reali, carte reali, aziende reali o API key reali nel repository.

## Fixture minime

- account cliente demo;
- account admin demo;
- account partner sandbox;
- azienda fittizia `ACME Test Srl`;
- P.IVA fittizia o placeholder dichiarato;
- email test su dominio riservato;
- ordine `company_reliability_pro`;
- ordine `iban_check`;
- wallet crediti sandbox;
- report snapshot mock;
- PDF mock con watermark sandbox;
- ticket supporto sandbox;
- CMS guide pubblicate e draft.

## Naming

Tutti i dati generati devono includere un prefisso:

```text
SANDBOX_CERT_
```

## Pulizia

M19-S deve prevedere script:

- `seed:sandbox-certification`
- `reset:sandbox-certification`
- `qa:sandbox-certification-no-real-data`

## Guardrail

I dati sandbox non devono essere disponibili nei tenant/clienti reali. In staging possono esistere solo se esplicitamente caricati per test.
