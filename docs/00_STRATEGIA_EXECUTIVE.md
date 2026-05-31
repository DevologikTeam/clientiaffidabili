# Strategia executive — ClientiAffidabili.it

## Posizionamento

ClientiAffidabili.it deve nascere come piattaforma B2B italiana per **verificare affidabilità commerciale, identità operativa e segnali di rischio** prima di firmare un contratto, spedire merce, concedere credito, attivare una collaborazione o validare dati di pagamento.

Il prodotto non deve essere presentato come “portale visure” generico. Il messaggio corretto è:

> Verifica clienti e fornitori prima di prendere decisioni commerciali rischiose.

## Tesi di business

La materia prima sono API e dati ufficiali/terzi. Il valore venduto non è la singola chiamata API, ma:

1. lettura semplice dell’esito;
2. report scaricabile;
3. storico verificabile;
4. suggerimento operativo;
5. monitoraggio ricorrente;
6. piani team/API per chi fa verifiche continuative.

Il margine non va impostato a costo-plus. I costi unitari API sono spesso molto inferiori al valore percepito dal cliente. Il prezzo deve essere value-based e deve coprire acquisizione cliente, supporto, compliance, reportistica, rischio operativo, checkout, storage e sviluppo.

## Offerte iniziali consigliate

| Offerta | Target | Output | Prezzo pubblico MVP |
|---|---|---|---:|
| Verifica azienda essenziale | PMI, vendite, acquisti | stato, dati base, scoring sintetico | €14,90 + IVA |
| Affidabilità Pro | PMI con rischio credito | scoring, negatività, stakeholders, report | €24,90 + IVA |
| KYB Compliance | settori regolati/procurement | AML, titolare effettivo, stakeholders, adverse media opzionale | da €49,90 + IVA |
| Antifrode dati | ecommerce/CRM/amministrazione | email, mobile, IBAN, codice fiscale | da €4,90 + IVA |
| Team Start | uso ricorrente PMI | crediti mensili, storico, export | €29/mese |
| Team Pro | team amministrativi/commerciali | più crediti, utenti, monitoraggio | €99/mese |
| API Partner | software house/integratori | API key, webhook, volumi inclusi | da €299/mese |

## Prima fase MVP

La prima fase deve consegnare un funnel completo ma controllato:

1. landing e pagine servizio;
2. wizard verifica azienda/persona/dato;
3. checkout hosted;
4. creazione ordine;
5. chiamata provider disattivabile via feature flag;
6. report normalizzato;
7. dashboard storico;
8. download PDF in fase successiva;
9. admin minimo per prodotti/prezzi/stati ordine;
10. audit log per ogni evento sensibile.

## Decisione checkout

Per l’MVP: **Stripe Checkout** come provider principale per rapidità, subscription e gestione webhooks. Nexi/Mollie devono restare previsti come adapter futuri, non implementati in parallelo nella prima release.

## Rischi principali

- licensing e diritti di rivendita da contrattualizzare;
- GDPR e basi giuridiche per dati persona/compliance;
- promesse SLA da tenere prudenti finché non esistono SLA fornitore contrattuali;
- rischio “catalogo disordinato” se si espongono troppe API;
- rischio di UI tecnica incomprensibile per PMI.

## Regola prodotto

Ogni servizio deve rispondere a quattro domande:

1. cosa inserisco?
2. cosa ricevo?
3. quanto tempo serve?
4. cosa posso decidere dopo?
