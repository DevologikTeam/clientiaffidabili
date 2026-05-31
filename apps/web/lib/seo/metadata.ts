import type { Metadata } from 'next';
import type { CatalogService } from '@/lib/catalog/catalog';
import type { CustomerEducationPage } from '@/lib/seo-geo/customer-education-runtime';
import { absoluteUrl, launchSiteBaseUrl } from '@/lib/launch-website/launch-website-runtime';

export type PublicMetadataInput = {
  title: string;
  description: string;
  path: string;
  ogType?: 'website' | 'article';
  keywords?: string[];
};

export type SensitiveMetadataInput = {
  title: string;
  description?: string;
};

const defaultOgImage = absoluteUrl('/logo-hd.png');

export function buildPublicMetadata({ title, description, path, ogType = 'website', keywords = [] }: PublicMetadataInput): Metadata {
  const canonical = path.startsWith('http') ? path : absoluteUrl(path);
  return {
    metadataBase: new URL(launchSiteBaseUrl),
    title,
    description,
    keywords,
    alternates: { canonical },
    robots: { index: true, follow: true },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: 'ClientiAffidabili.it',
      locale: 'it_IT',
      type: ogType,
      images: [{ url: defaultOgImage, width: 1200, height: 630, alt: 'ClientiAffidabili.it' }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [defaultOgImage],
    },
  };
}

export function buildSensitiveMetadata({ title, description = 'Area riservata ClientiAffidabili.it.' }: SensitiveMetadataInput): Metadata {
  return {
    title,
    description,
    robots: {
      index: false,
      follow: false,
      nocache: true,
      googleBot: {
        index: false,
        follow: false,
        noimageindex: true,
      },
    },
  };
}

export function buildServiceMetadata(service: CatalogService): Metadata {
  return buildPublicMetadata({
    title: `${service.name} | Servizi ClientiAffidabili.it`,
    description: `${service.description} Prezzo, dati richiesti, tempi e limiti sono visibili prima del checkout.`,
    path: `/servizi/${service.slug}`,
    keywords: [service.name, service.category, 'verifica aziendale', 'affidabilità clienti', 'report B2B'],
  });
}

export function buildGuideMetadata(page: CustomerEducationPage): Metadata {
  return buildPublicMetadata({
    title: page.seoTitle,
    description: page.seoDescription,
    path: page.canonicalPath,
    ogType: 'article',
    keywords: [page.targetKeyword, 'affidabilità azienda', 'report azienda', 'ClientiAffidabili.it'],
  });
}
