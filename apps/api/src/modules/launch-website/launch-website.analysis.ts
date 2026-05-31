export type LaunchWebsiteReadinessItem = {
  code: string;
  label: string;
  requiredForLaunch: boolean;
  status: 'analysed' | 'pending-design' | 'pending-development';
};

export const launchWebsiteReadinessItems: LaunchWebsiteReadinessItem[] = [
  {
    code: 'POSITIONING',
    label: 'Commercial positioning and value proposition defined',
    requiredForLaunch: true,
    status: 'analysed',
  },
  {
    code: 'SEO_GEO_CLUSTERS',
    label: 'SEO/GEO clusters and customer education page model defined',
    requiredForLaunch: true,
    status: 'analysed',
  },
  {
    code: 'CLAIM_GUARDS',
    label: 'Guarantee, refund, risk and claim guardrails defined',
    requiredForLaunch: true,
    status: 'analysed',
  },
  {
    code: 'CMS_GOVERNANCE',
    label: 'Admin CMS governance aligned with public sitemap and review workflow',
    requiredForLaunch: true,
    status: 'analysed',
  },
  {
    code: 'TRACKING_PRIVACY',
    label: 'Privacy-safe analytics events defined without sensitive verification data',
    requiredForLaunch: true,
    status: 'analysed',
  },
  {
    code: 'TECHNICAL_SEO',
    label: 'Metadata, canonical, robots, sitemap and JSON-LD blueprint required in M14-P',
    requiredForLaunch: true,
    status: 'pending-design',
  },
];
