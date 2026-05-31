export const reportComposerDesign = {
  version: '0.18.0',
  sprint: 'M6-P Report Composer Design',
  customerSections: [
    'report_hero',
    'executive_summary',
    'attention_badge',
    'main_evidence',
    'company_identity',
    'economic_profile',
    'compliance_kyb',
    'sources_and_limits',
    'next_actions',
  ],
  adminComponents: [
    'report_review_queue_table',
    'review_reason_panel',
    'evidence_inspector',
    'template_version_panel',
    'review_decision_box',
  ],
  guardrails: [
    'no_raw_payload_in_customer_ui',
    'no_absolute_claims',
    'immutable_snapshot_after_publish',
    'source_and_limits_required',
    'download_audit_required',
    'admin_review_audit_required',
  ],
  attentionLevels: [
    'low_attention',
    'medium_attention',
    'high_attention',
    'manual_review',
    'not_enough_data',
  ],
} as const;

export type ReportComposerDesign = typeof reportComposerDesign;
