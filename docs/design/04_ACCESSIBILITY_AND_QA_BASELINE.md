# Accessibility and QA baseline

## Obiettivo

Definire i criteri minimi che il design system deve rispettare prima dello sviluppo UI. Questi criteri saranno trasformati in test nello sprint M1-S e mantenuti come gate antiregressione negli sprint successivi.

## Criteri accessibilità

| Area | Regola |
|---|---|
| Contrasto | Testi e CTA devono rispettare WCAG AA. |
| Focus | Ogni controllo deve avere focus visibile e coerente. |
| Form | Label sempre visibile; placeholder solo come aiuto, mai come unica label. |
| Errori | Messaggio vicino al campo, con istruzione di correzione. |
| Stato | Non usare solo colore: aggiungere testo, icona o label. |
| Tastiera | Checkout, report, dashboard e menu devono essere navigabili da tastiera. |
| Tabelle | Tabelle storico/report devono essere leggibili su mobile o trasformate in card. |
| Movimento | Animazioni non essenziali; rispettare preferenze reduced motion. |
| Linguaggio | Evitare formule ambigue o intimidatorie. |

## QA visuale minimo

Viewport da testare:

- mobile 360px;
- mobile 390px;
- tablet 768px;
- desktop 1280px;
- desktop wide 1440px.

Pagine da includere nel primo visual regression set:

1. home pubblica;
2. catalogo servizi;
3. dettaglio servizio;
4. checkout;
5. dashboard;
6. report azienda;
7. report persona light;
8. pagina errore/servizio non disponibile.

## QA funzionale collegato alla UI

| Flusso | Controlli |
|---|---|
| Scelta servizio | Prezzo, input, output e tempi coerenti. |
| Checkout | Totale non cambia senza avviso, consenso richiesto, stato pagamento chiaro. |
| Report pronto | Summary, evidenze, limiti, download/storico visibili. |
| Provider error | Messaggio non tecnico, retry o supporto visibili. |
| Credito insufficiente | Spiegazione + CTA ricarica/acquisto. |

## Guardrail antiregressione UI

- Nessuna CTA generica se è possibile indicare l’azione reale.
- Nessun claim numerico non dimostrato.
- Nessuna pagina senza empty/error/loading state.
- Nessuna pagina operativa solo desktop.
- Nessun report senza limiti/fonti/data aggiornamento.
- Nessun checkout senza prezzo totale e disclosure.
- Nessun warning comunicato solo con colore.

## Tooling suggerito per M1-S

- Playwright per e2e e screenshot baseline.
- Axe o controlli equivalenti per accessibilità automatica.
- Test unitari componenti per stati critici.
- Storybook o pagina interna `/design-system` per componenti.
- Checklist manuale per copy e claim.
