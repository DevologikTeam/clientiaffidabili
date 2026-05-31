import Link from 'next/link';

export function Footer() {
  return (
    <footer className="footer">
      <div className="container grid-3">
        <div>
          <strong>ClientiAffidabili.it</strong>
          <p>Verifiche B2B, report e segnali di rischio per decisioni commerciali più sicure.</p>
        </div>
        <div>
          <strong>Prodotto</strong>
          <p><Link href="/servizi">Catalogo verifiche</Link> · <Link href="/prezzi">Prezzi</Link> · <Link href="/api">API partner</Link></p>
        </div>
        <div>
          <strong>Nota</strong>
          <p>I report fotografano le informazioni disponibili al momento della richiesta e non costituiscono garanzia assoluta.</p>
        </div>
      </div>
    </footer>
  );
}
