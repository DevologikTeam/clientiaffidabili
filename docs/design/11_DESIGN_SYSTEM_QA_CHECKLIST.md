# Design System QA Checklist

## 1. Visual regression

Per ogni componente verificare:

- default;
- hover;
- focus;
- disabled;
- loading se previsto;
- errore se previsto;
- desktop/tablet/mobile;
- light background e dark background quando applicabile.

## 2. Accessibilità

Checklist minima:

- focus visibile;
- contrasto AA;
- label form;
- messaggi di errore leggibili;
- navigazione tastiera;
- ordine heading coerente;
- testo alternativo su immagini informative;
- nessun click target sotto 44px su mobile.

## 3. Copy regression

Controllare che non compaiano in UI cliente:

- endpoint;
- payload;
- tenant;
- adapter;
- provider raw;
- mock/fake/demo fuori dal tenant demo;
- scoring garantito;
- affidabilità garantita.

## 4. Checkout regression

Ogni modifica al checkout deve verificare:

- prezzo corretto;
- IVA/costi extra visibili;
- conferma uso lecito;
- idempotency key;
- esito pagamento;
- esito provider;
- ordine salvato;
- audit log;
- messaggi errore chiari.

## 5. Report regression

Ogni report deve verificare:

- esito sintetico;
- segnali principali;
- fonti;
- timestamp;
- limiti;
- prossima azione;
- download;
- storico.

## 6. Gate per sprint futuri

Uno sprint UI non è completato se:

- introduce componenti duplicati senza motivo;
- rompe la gerarchia CTA;
- mostra linguaggio tecnico al cliente;
- non ha stati vuoti/errore;
- non aggiorna changelog e roadmap;
- non include test o checklist QA.
