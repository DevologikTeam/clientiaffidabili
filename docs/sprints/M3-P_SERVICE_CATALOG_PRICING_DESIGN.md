# Sprint M3-P — Service Catalog & Pricing Design

**Versione pacchetto:** 0.9.0  
**Tipo sprint:** Progettazione  
**Modulo:** M3 — Service Catalog & Pricing  
**Sprint precedente:** M3-A Service Catalog & Pricing Analysis  
**Sprint successivo:** M3-S Service Catalog & Pricing Development

## Obiettivo

Trasformare l'analisi di catalogo e pricing in una progettazione pronta per lo sviluppo. Lo sprint definisce come devono funzionare catalogo pubblico, catalogo admin, bundle, price guard, snapshot prezzo, stati di pubblicazione e handoff verso checkout.

La regola guida resta: **il cliente compra una decisione assistita, non una chiamata API**.

## Decisioni approvate

1. Il catalogo pubblico parte da bisogni e scenari: cliente, fornitore, pagamento, compliance.
2. Il catalogo interno resta provider-aware, ma questi dettagli non devono comparire nella UI cliente.
3. Ogni prodotto pubblicato deve avere prezzo netto, IVA, tempi, dati richiesti, output, limiti, finalità lecita e stato di disponibilità.
4. Ogni ordine deve salvare uno snapshot immutabile del prezzo e del pacchetto acquistato.
5. I costi provider, margini, buffer, soglie e endpoint restano visibili solo in admin/super admin.
6. I servizi high-risk o con costo elevato richiedono stato assistito o approvazione prima della pubblicazione.
7. Nessun prezzo può essere pubblicato sotto soglia minima senza approvazione super admin e audit.

## Output prodotti

- Blueprint esperienza catalogo pubblico.
- Blueprint admin catalogo/prezzi.
- Blueprint price guards e workflow approvazione.
- Blueprint snapshot prezzo ordine/checkout.
- Copy deck pubblico dei servizi MVP.
- Blueprint bundle e comparazione pacchetti.
- TypeScript blueprint per seed/catalogo UI.
- QA script antiregressione per lo sprint.

## Ambito funzionale progettato

### Catalogo pubblico

Le pagine pubbliche devono rispondere prima a queste domande:

- quale problema sto risolvendo?
- che dati devo inserire?
- cosa riceverò?
- quanto costa?
- quando riceverò il risultato?
- quali sono i limiti del report?
- posso procedere in modo lecito?

### Catalogo admin

L'admin deve consentire di:

- creare/modificare prodotti;
- associare endpoint provider e costi stimati;
- impostare prezzo pubblico netto;
- calcolare margine stimato;
- bloccare pubblicazione se margine o compliance non sono sufficienti;
- pubblicare, sospendere o archiviare prodotti;
- vedere audit e versioni di prezzo.

### Checkout handoff

Il checkout non deve leggere il prezzo “live” in modo fragile. Deve ricevere:

- product code;
- product version;
- price version;
- bundle/add-on selezionati;
- snapshot del prezzo netto;
- IVA e imposte/diritti separati;
- tempi stimati;
- dati richiesti;
- copy legale e conferma finalità lecita.

## Stati progettati

| Stato | Uso | Visibilità pubblica |
|---|---|---|
| `draft` | prodotto in lavorazione | no |
| `review` | pronto per controllo interno | no |
| `published` | acquistabile | sì |
| `paused` | temporaneamente sospeso | pagina visibile con CTA disabilitata se utile SEO |
| `assisted` | richiede contatto/valutazione | sì, senza checkout diretto |
| `archived` | non più vendibile | no, redirect o pagina storica interna |

## Criteri di accettazione

- Ogni prodotto MVP ha una scheda pubblica progettata.
- Ogni prodotto ha una scheda admin progettata.
- Ogni prezzo ha regole minime, target, buffer e stato di pubblicazione.
- I costi provider non compaiono nel pubblico.
- La progettazione distingue prezzo netto, IVA, imposte, diritti e fee interne.
- Il checkout riceve uno snapshot prezzo non modificabile dopo pagamento.
- Il QA rileva documenti mancanti, versioni non aggiornate e blueprint incompleti.

## Esclusioni di questo sprint

Non sviluppiamo ancora CRUD reale, database migration, endpoint backend o integrazione checkout. Questi vengono affrontati in **M3-S**.
