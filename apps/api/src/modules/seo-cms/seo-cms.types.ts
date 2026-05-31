export type SeoPageStatus = 'draft' | 'review' | 'published' | 'archived';
export type SeoSearchIntent = 'informational' | 'commercial' | 'transactional' | 'comparison' | 'support';

export type SeoPageGuardrailCheck = {
  code: string;
  label: string;
  passed: boolean;
  severity: 'info' | 'warning' | 'blocker';
};
