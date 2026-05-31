import Link from 'next/link';
import type { CustomerEducationPage } from '@/lib/seo-geo/customer-education-runtime';
import { Button, Card, TrustNotice } from '@/components/ds';

export function EducationSidebarCta({ page }: { page: CustomerEducationPage }) {
  return (
    <aside className="card ca-stack ca-education-sidebar">
      <h3>Trasforma la guida in una verifica</h3>
      <p>Usa il report più adatto per leggere fonti, dati, limiti e prossima azione operativa prima della decisione.</p>
      <Button href={page.primaryCta.href}>{page.primaryCta.label}</Button>
      {page.secondaryCta ? <Link className="btn btn-outline" href={page.secondaryCta.href}>{page.secondaryCta.label}</Link> : null}
      <TrustNotice tone="info" title="Garanzia operativa">
        Prezzo chiaro, fonti indicate, limiti spiegati e supporto. Nessuna promessa assoluta sul comportamento futuro di clienti o fornitori.
      </TrustNotice>
    </aside>
  );
}
