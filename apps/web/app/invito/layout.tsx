import type { ReactNode } from 'react';
import { buildSensitiveMetadata } from '@/lib/seo/metadata';

export const metadata = buildSensitiveMetadata({
  title: 'Invito riservato | ClientiAffidabili.it',
  description: 'Pagina invito non indicizzabile.',
});

export default function InviteLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
