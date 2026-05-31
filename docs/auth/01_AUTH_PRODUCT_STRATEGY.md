# Auth Product Strategy

## Principio prodotto

L'autenticazione non deve essere una barriera commerciale ma un passaggio di protezione. Il cliente deve poter capire, acquistare e completare il checkout con frizione minima; l'account diventa necessario quando deve visualizzare report, storico, fatture, consensi e abbonamenti.

## Modello consigliato

ClientiAffidabili.it vende verifiche e report B2B. Il modello corretto è:

```text
Account aziendale
└── Membership utenti
    ├── owner
    ├── admin
    ├── analyst
    ├── billing
    └── viewer
```

Non è consigliato basarsi solo su `users.organizationId` perché il prodotto deve evolvere verso più aziende per utente, inviti, ruoli granulari, API partner e reseller.

## Customer journey auth

1. Utente visita funnel pubblico.
2. Sceglie servizio.
3. Inserisce dati minimi per ordine e fatturazione.
4. Paga.
5. Riceve email per creare o confermare account.
6. Accede a dashboard.
7. Visualizza stato verifica/report.
8. Può invitare colleghi se ruolo autorizzato.

## Segmenti utenti

| Segmento | Bisogno auth |
|---|---|
| PMI acquirente singolo | login semplice, storico verifiche, fatture |
| Agenzia/consulente | team, più utenti, ruoli, abbonamento/crediti |
| Billing user | accesso fatture e profilo fiscale, non report sensibili |
| Analyst | accesso report e verifiche, non pagamenti |
| Admin interno | MFA, audit, ruoli separati, accesso operativo |

## Copy prodotto

Preferire:

- "Accedi alla tua area riservata"
- "Invita un collega"
- "Può vedere report e verifiche"
- "Può gestire fatture e abbonamento"

Evitare:

- "tenant"
- "RBAC"
- "JWT claims"
- "scope tecnico"
- "object authorization"
