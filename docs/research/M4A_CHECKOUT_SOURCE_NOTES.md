# M4-A — Source notes checkout

## Fonti verificate

### Stripe Checkout

- Stripe Checkout consente di creare una pagina di pagamento con UI prebuilt tramite Checkout Sessions API.
- La documentazione indica supporto per pagamenti una tantum e abbonamenti e per numerosi metodi di pagamento locali.
- La modalità full page hosted è la più coerente con un MVP a bassa complessità.

Fonte consultata: `https://docs.stripe.com/payments/checkout`

### Stripe pricing Italia

- Pagina tariffe Italia consultata per stimare impatto commissioni sul margine.
- Tariffa standard carte SEE indicata nella pagina: `1,5% + 0,25€`.
- Tariffa carte Regno Unito indicata nella pagina: `2,5% + 0,25€`.

Fonte consultata: `https://stripe.com/it/pricing`

### Stripe Tax

- Stripe Tax è stato considerato come possibile evoluzione per automazioni fiscali/IVA, non come dipendenza obbligatoria MVP.

Fonte consultata: `https://docs.stripe.com/tax`

## Nota metodo

Queste fonti servono per analisi architetturale e stima iniziale. Prima della produzione bisogna validare:

- account Stripe italiano reale;
- paese merchant;
- metodi di pagamento abilitati;
- regime IVA/fatturazione con commercialista;
- policy privacy e termini legali;
- eventuali restrizioni provider dati.
