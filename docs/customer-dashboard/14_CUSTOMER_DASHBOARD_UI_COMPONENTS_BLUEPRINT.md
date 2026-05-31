# Customer dashboard UI components blueprint

## Componenti da sviluppare in M7-S

### `CustomerShell`

Layout area cliente con sidebar desktop e topbar mobile.

Props concettuali:

```ts
{
  userName: string;
  companyName: string;
  activePath: string;
  unreadNotifications: number;
}
```

### `DashboardStatusHero`

Hero operativo con stato account.

Props:

```ts
{
  readyReports: number;
  pendingChecks: number;
  actionRequired: number;
  primaryAction: { label: string; href: string };
}
```

### `NextBestActionCard`

Card prioritaria unica.

Regole:

- massimo una CTA primaria;
- spiegare motivo e impatto;
- nessun linguaggio tecnico.

### `CheckListItem`

Card verifica nello storico.

Props:

```ts
{
  id: string;
  subjectName: string;
  serviceName: string;
  status: CustomerCheckStatus;
  requestedAt: string;
  reportHref?: string;
}
```

### `CheckTimeline`

Timeline cliente semplificata.

Step consentiti:

- pagamento ricevuto;
- verifica avviata;
- dati in elaborazione;
- controllo interno;
- report pronto;
- assistenza richiesta;
- rimborso.

### `ReportAccessCard`

Card report pronto o non ancora pronto.

### `InvoiceListItem`

Vista sintetica fattura.

### `NotificationItem`

Notifica operativa persistente.

### `SupportEntryCard`

Accesso supporto contestuale.

## Stati UI obbligatori

Per ogni lista:

- loading;
- empty;
- error;
- success;
- filtered-empty.

## Semantica colori

- Verde: pronto/completato.
- Giallo: attenzione o in attesa.
- Rosso: blocco/errore operativo.
- Blu: informazione.
- Grigio: neutro/archiviato.

## Accessibilità

- Le pill stato devono avere testo, non solo colore.
- CTA raggiungibili da tastiera.
- Heading gerarchici.
- Tabelle convertite in card su mobile.
- Errori con testo esplicito.

## Copy componenti

CTA approvate:

- Avvia verifica;
- Apri report;
- Vedi dettagli;
- Completa dati;
- Scarica fattura;
- Contatta supporto;
- Riprova.

CTA vietate:

- Gestisci;
- Dettagli generico senza contesto;
- Vai;
- Clicca qui;
- Debug;
- Retry provider.
