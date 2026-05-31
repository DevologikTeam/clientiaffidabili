import type { ReactNode } from 'react';
import type { Metadata } from 'next';
import { ExternalTrackingProvider } from '@/components/analytics/ExternalTrackingProvider';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'https://clientiaffidabili.it'),
  title: {
    default: 'ClientiAffidabili.it — Verifica clienti e fornitori',
    template: '%s | ClientiAffidabili.it',
  },
  description: 'Piattaforma B2B per verificare affidabilità commerciale, segnali di rischio e dati operativi prima di firmare, spedire o concedere credito.',
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="it">
      <body>
        <a className="skip-link" href="#main-content">Salta al contenuto</a>
        <ExternalTrackingProvider>{children}</ExternalTrackingProvider>
      </body>
    </html>
  );
}
