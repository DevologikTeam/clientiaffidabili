# Notifications, tasks and support blueprint

## Obiettivo

Definire notifiche e supporto come strumenti operativi, non come rumore. Ogni notifica deve avere motivo, impatto e azione.

## Notification center MVP

Categorie:

- Report pronto;
- Verifica in corso;
- Serve azione cliente;
- Fattura disponibile;
- Rimborso/ordine;
- Supporto.

Campi notifica:

- titolo;
- descrizione breve;
- categoria;
- severità;
- stato lettura;
- entity collegata;
- CTA;
- data.

## Regole di priorità

1. Azioni richieste dal cliente.
2. Report pronti non letti.
3. Problemi di pagamento/fatturazione.
4. Aggiornamenti supporto.
5. Informazioni generali.

## Task center leggero

In dashboard mostrare massimo 3 task:

- Completa profilo fatturazione;
- Apri report pronto;
- Rispondi a richiesta supporto;
- Aggiorna dati richiesta;
- Scarica fattura.

Ogni task deve avere:

- azione;
- motivo;
- impatto;
- CTA.

## Supporto contestuale

Il supporto deve essere associato a:

- verifica;
- report;
- ordine;
- fattura;
- account.

Form supporto MVP:

- categoria;
- oggetto collegato;
- messaggio;
- allegato opzionale futuro;
- consenso privacy/uso dati necessario se il messaggio contiene dati sensibili.

## Stati ticket futuri

- ricevuto;
- in lavorazione;
- in attesa cliente;
- risolto;
- chiuso.

## Copy supporto

Tono:

- chiaro;
- rassicurante;
- non tecnico;
- orientato alla soluzione.

Esempio:

> Descrivi il problema o il chiarimento richiesto. Se riguarda una verifica o un report, lo collegheremo alla richiesta corretta per risponderti più velocemente.

## Guardrail notifiche

- Non inviare notifiche per eventi tecnici non utili.
- Non mostrare messaggi come “provider failed” o “webhook retry”.
- Non usare notifiche marketing dentro eventi operativi.
- Ogni notifica importante deve essere persistente finché letta o risolta.
