export type SeoGeoPublishStatus = 'draft' | 'review' | 'published' | 'archived';

export type LaunchWebsitePublishGate = {
  hasSeoTitle: boolean;
  hasMetaDescription: boolean;
  hasSingleH1: boolean;
  hasAnswerFirstIntro: boolean;
  hasLimitsSection: boolean;
  hasInternalLinks: boolean;
  hasValidCta: boolean;
  hasNoBlockedClaims: boolean;
  schemaMatchesVisibleContent: boolean;
  containsNoPersonalData: boolean;
};

export type LaunchWebsiteSchemaType =
  | 'Organization'
  | 'WebSite'
  | 'BreadcrumbList'
  | 'FAQPage'
  | 'Article'
  | 'Product'
  | 'Service'
  | 'SoftwareApplication';

export const launchWebsiteNoIndexPaths = [
  '/admin',
  '/dashboard',
  '/checkout/session',
  '/api/internal',
];

export const launchWebsiteAllowedSchemaTypes: LaunchWebsiteSchemaType[] = [
  'Organization',
  'WebSite',
  'BreadcrumbList',
  'FAQPage',
  'Article',
  'Product',
  'Service',
  'SoftwareApplication',
];
