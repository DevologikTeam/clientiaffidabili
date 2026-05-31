'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ds';

const publicLinks = [
  { href: '/servizi', label: 'Servizi' },
  { href: '/prezzi', label: 'Prezzi' },
  { href: '/guide', label: 'Guide' },
  { href: '/garanzia-operativa', label: 'Garanzia' },
  { href: '/contatti', label: 'Contatti' },
  { href: '/api', label: 'API partner' },
];

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!menuOpen) return;
    const firstLink = menuRef.current?.querySelector<HTMLAnchorElement>('a, button');
    firstLink?.focus();

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') setMenuOpen(false);
      if (event.key !== 'Tab') return;
      const focusable = Array.from(menuRef.current?.querySelectorAll<HTMLElement>('a[href], button:not([disabled])') ?? []);
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="header">
      <div className="container nav">
        <Link href="/" className="logo" aria-label="ClientiAffidabili.it home" onClick={closeMenu}>
          <Image className="logo__mark" src="/android-chrome-192x192.png" alt="" width={42} height={42} priority />
          <span className="logo__wordmark">ClientiAffidabili.it</span>
        </Link>
        <nav className="nav-links" aria-label="Navigazione principale">
          {publicLinks.map((item) => <Link key={item.href} href={item.href}>{item.label}</Link>)}
        </nav>
        <div className="nav-actions">
          <Button href="/login" variant="ghost">Accedi</Button>
          <Button href="/servizi">Avvia verifica</Button>
          <button
            type="button"
            className="mobile-menu-button"
            aria-expanded={menuOpen}
            aria-controls="mobile-public-navigation"
            aria-label={menuOpen ? 'Chiudi menu di navigazione' : 'Apri menu di navigazione'}
            onClick={() => setMenuOpen((value) => !value)}
          >
            <span aria-hidden="true">{menuOpen ? '×' : '☰'}</span>
            Menu
          </button>
        </div>
      </div>
      {menuOpen ? (
        <div className="mobile-nav-panel" id="mobile-public-navigation" ref={menuRef} role="dialog" aria-modal="true" aria-label="Menu principale mobile">
          <nav className="container mobile-nav-panel__links" aria-label="Navigazione principale mobile">
            {publicLinks.map((item) => <Link key={item.href} href={item.href} onClick={closeMenu}>{item.label}</Link>)}
            <Link href="/login" onClick={closeMenu}>Accedi all’area riservata</Link>
            <Button href="/servizi" fullWidth onClick={closeMenu}>Avvia una verifica</Button>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
