import type { MetadataRoute } from 'next';
import { buildLaunchSitemapEntries } from '@/lib/launch-website/launch-website-runtime';

export default function sitemap(): MetadataRoute.Sitemap {
  return buildLaunchSitemapEntries();
}
