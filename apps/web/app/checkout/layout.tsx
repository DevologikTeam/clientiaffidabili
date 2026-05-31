import type { ReactNode } from 'react';
import { buildSensitiveMetadata } from '@/lib/seo/metadata';

export const metadata = buildSensitiveMetadata({
  title: 'Checkout sicuro | ClientiAffidabili.it',
  description: 'Percorso checkout non indicizzabile.',
});

export default function CheckoutLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
