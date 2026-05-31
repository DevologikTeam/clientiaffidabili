import type { MetadataRoute } from 'next';
import { launchSiteBaseUrl } from '@/lib/launch-website/launch-website-runtime';

const sensitiveDisallow = [
  '/admin/',
  '/dashboard/',
  '/reports/',
  '/checkout/',
  '/checkout/success',
  '/checkout/cancel',
  '/invito/',
  '/fatture/',
  '/reset-password',
];

export default function robots(): MetadataRoute.Robots {
  const isProduction = process.env.NEXT_PUBLIC_SITE_URL === 'https://clientiaffidabili.it';
  return {
    rules: isProduction
      ? { userAgent: '*', allow: '/', disallow: sensitiveDisallow }
      : { userAgent: '*', disallow: '/' },
    sitemap: `${launchSiteBaseUrl}/sitemap.xml`,
  };
}
