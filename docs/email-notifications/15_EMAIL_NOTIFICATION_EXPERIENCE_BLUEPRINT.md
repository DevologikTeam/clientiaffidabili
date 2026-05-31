# 15 — Email Notification Experience Blueprint

## Principio prodotto

Le email tecniche devono rassicurare il cliente e ridurre il carico supporto. Ogni email deve rispondere a quattro domande:

1. cosa e' successo;
2. cosa significa per il cliente;
3. quale azione puo' fare ora;
4. dove puo' trovare storico, documento o supporto.

## Superfici

| Superficie | Obiettivo |
|---|---|
| Cliente anonimo | Ricevere conferma contatto, reset password o invito sicuro. |
| Cliente registrato | Seguire acquisti, report, PDF, fatture, supporto. |
| Team account | Gestire inviti, ruoli e sicurezza. |
| Partner/API | Ricevere notifiche API key, webhook, crediti e usage. |
| Admin | Monitorare invii, errori, retry e anomalie. |

## Struttura email tecnica

Ogni email deve usare questa struttura:

```text
Logo / brand
Titolo breve e operativo
Messaggio principale
Dettagli essenziali
CTA principale
CTA secondaria o link supporto
Note di sicurezza / limiti
Footer legale
```

## Pattern CTA

| Evento | CTA primaria |
|---|---|
| Verifica email | Verifica indirizzo email |
| Reset password | Reimposta password |
| Documento pronto | Apri documento |
| PDF disponibile | Scarica PDF sicuro |
| Pagamento riuscito | Vai all'ordine |
| Pagamento fallito | Aggiorna pagamento |
| Fattura disponibile | Apri documento fiscale |
| Ticket aggiornato | Leggi risposta |

## Tone of voice

- chiaro;
- rassicurante;
- non allarmistico;
- non tecnico;
- orientato alla prossima azione.

## Regole di sicurezza copy

Non scrivere mai:

- password;
- token;
- API key;
- dati carta;
- IBAN completo;
- raw payload provider;
- dati sensibili del report oltre lo stretto necessario.

## Email e customer dashboard

Ogni email importante deve avere un equivalente in dashboard:

- report pronto -> storico verifiche;
- fattura pronta -> documenti fiscali;
- ticket aggiornato -> supporto;
- rimborso aggiornato -> billing/refund;
- invito team -> team management.

La dashboard resta fonte primaria. L'email e' una notifica e un ponte.
