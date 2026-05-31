export type SeoEducationStatus = 'draft' | 'review' | 'published' | 'archived';

export type SeoEducationReviewStatus =
  | 'content_missing'
  | 'seo_ready'
  | 'geo_ready'
  | 'compliance_review_required'
  | 'ready_to_publish'
  | 'blocked';

export interface SeoEducationPublishChecklist {
  hasSeoTitle: boolean;
  hasSeoDescription: boolean;
  hasAnswerSummary: boolean;
  hasGuaranteeBlock: boolean;
  hasLimitationsBlock: boolean;
  hasPrimaryCta: boolean;
  hasRelatedLinks: boolean;
  hasFaqIfSchemaEnabled: boolean;
  hasNoForbiddenClaims: boolean;
  hasReviewReason: boolean;
}

export interface SeoEducationClaimRisk {
  term: string;
  severity: 'warning' | 'blocking';
  suggestion: string;
}

export interface SeoEducationInternalLinkSuggestion {
  slug: string;
  reason: string;
  priority: 'primary' | 'secondary';
}

export interface SeoEducationTemplateContract {
  template: 'educational_guide' | 'comparison_guide' | 'operational_checklist' | 'guarantee_limits' | 'glossary_definition';
  requiredBlocks: string[];
  schemaTypes: Array<'Article' | 'FAQPage' | 'BreadcrumbList'>;
  minRelatedLinks: number;
  maxRelatedLinks: number;
}

export const seoEducationTemplateContracts: SeoEducationTemplateContract[] = [
  {
    template: 'educational_guide',
    requiredBlocks: ['hero', 'geoAnswer', 'body', 'guaranteeLimits', 'faq', 'relatedGuides'],
    schemaTypes: ['Article', 'FAQPage', 'BreadcrumbList'],
    minRelatedLinks: 2,
    maxRelatedLinks: 4
  },
  {
    template: 'comparison_guide',
    requiredBlocks: ['hero', 'geoAnswer', 'comparisonMatrix', 'guaranteeLimits', 'faq'],
    schemaTypes: ['Article', 'FAQPage', 'BreadcrumbList'],
    minRelatedLinks: 2,
    maxRelatedLinks: 4
  },
  {
    template: 'operational_checklist',
    requiredBlocks: ['hero', 'geoAnswer', 'operationalChecklist', 'decisionTable', 'guaranteeLimits', 'faq'],
    schemaTypes: ['Article', 'FAQPage', 'BreadcrumbList'],
    minRelatedLinks: 2,
    maxRelatedLinks: 4
  },
  {
    template: 'guarantee_limits',
    requiredBlocks: ['hero', 'geoAnswer', 'guaranteeLimits', 'refundPolicySummary', 'faq'],
    schemaTypes: ['Article', 'FAQPage', 'BreadcrumbList'],
    minRelatedLinks: 2,
    maxRelatedLinks: 4
  }
];
