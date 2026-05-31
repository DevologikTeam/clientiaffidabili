# M5-A Provider Source Notes

## Fonti interne al progetto

- Listino Openapi acquisito nella strategia iniziale del progetto.
- Documenti M3-A/M3-P/M3-S su catalogo, prezzi, margini e price guard.
- Documenti M4-A/M4-P/M4-S su checkout, pagamento confermato, webhook e ledger.

## Informazioni consolidate dal listino Openapi acquisito

Il listino include categorie compatibili con ClientiAffidabili.it:

- Business Information;
- Documenti Ufficiali;
- ID & Trust;
- Digital Transformation;
- verifiche PEC/SDI;
- verifiche IBAN/email/telefono;
- AML, sanctions, PEP e full KYC;
- bilanci, report azienda, visure, protesti e scoring.

## Gap tecnici da non inventare

Non vanno inventati endpoint, header, URL o payload non presenti in documentazione ufficiale partner.

In M5-P/M5-S bisogna recuperare e verificare:

- documentazione developer effettiva;
- credenziali sandbox;
- base URL;
- endpoint reali per ogni servizio MVP;
- autenticazione;
- callback/polling;
- rate limit;
- idempotenza;
- addebito in caso di errore;
- formato errori;
- condizioni contrattuali aggiornate.

## Decisione prudente

M5-A produce una progettazione di integrazione **contract-first**. L'implementazione production resta bloccata fino a verifica ufficiale dei dettagli tecnici e contrattuali del provider.

