# 05 — Purchase IP Audit & Privacy Blueprint

## Requisito

Salvare gli IP degli utenti che acquistano per finalità di sicurezza, antifrode, audit pagamento e supporto operativo.

## Campi consigliati

Nel contesto ordine/pagamento:

- `buyerIpAddress` oppure storage cifrato;
- `buyerIpHash` per ricerca privacy-safe;
- `buyerUserAgent`;
- `buyerCountry?` solo se derivato da provider pagamento o lookup validato;
- `checkoutStartedAt`;
- `paymentConfirmedAt`;
- `requestId`;
- `consent/legalSnapshot`.

## Accesso

- visibile solo a billing/compliance/super admin;
- redatto nelle viste standard;
- completo solo in debug autorizzato;
- audit su ogni accesso al dato completo.

## Retention

Retention da validare legalmente. Proposta MVP:

- hash e audit per durata fiscale/contrattuale necessaria;
- IP completo cifrato con retention ridotta;
- cancellazione/anonymization secondo policy privacy.

## Copy privacy

La privacy policy deve indicare che alcuni dati tecnici, inclusi indirizzo IP e user agent, possono essere trattati per sicurezza, prevenzione abusi, gestione pagamenti, audit e assistenza.
