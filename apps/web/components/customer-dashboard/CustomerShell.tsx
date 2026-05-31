import Link from 'next/link';
import type { ReactNode } from 'react';
import { Header } from '@/components/Header';

const items = [
  { href: '/dashboard', label: 'Panoramica' },
  { href: '/dashboard/verifiche', label: 'Verifiche' },
  { href: '/dashboard/fatture', label: 'Fatture' },
  { href: '/dashboard/profilo-fiscale', label: 'Profilo fiscale' },
  { href: '/dashboard/legale', label: 'Legal' },
  { href: '/dashboard/account', label: 'Account' },
  { href: '/dashboard/team', label: 'Team' },
  { href: '/dashboard/partner', label: 'API partner' },
  { href: '/dashboard/supporto', label: 'Supporto' },
  { href: '/servizi', label: 'Nuova verifica' },
];

export function CustomerShell({ children, active = '/dashboard' }: { children: ReactNode; active?: string }) {
  return (
    <>
      <Header />
      <main className="container dashboard">
        <aside className="sidebar" aria-label="Area cliente">
          {items.map((item) => (
            <Link key={item.href} className={active === item.href ? 'active' : undefined} href={item.href}>{item.label}</Link>
          ))}
        </aside>
        <section className="ca-stack ca-stack--lg">{children}</section>
      </main>
    </>
  );
}
