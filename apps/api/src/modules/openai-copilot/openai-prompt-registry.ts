import { OpenaiPromptTemplateBlueprint } from './openai-copilot-design.types';

export const OPENAI_PROMPT_REGISTRY: OpenaiPromptTemplateBlueprint[] = [
  {
    key: 'cms_seo_suggestion_v1',
    version: '1.0.0',
    useCase: 'cms_seo_suggestion',
    status: 'active',
    modelPreference: 'low_cost',
    systemInstruction: 'You are an Italian senior SEO/GEO copywriter for a B2B decision-support platform. Produce prudent, verifiable, non-absolute suggestions.',
    taskInstruction: 'Improve metadata, outline and FAQ while respecting the supplied allowed claims and prohibited claims.',
    prohibitedClaims: ['rischio zero', 'pagamento garantito', 'solvibilita garantita', 'cliente sicuro al 100%'],
    outputSchemaKey: 'cms_seo_suggestion_schema_v1',
    requiresApproval: true,
  },
  {
    key: 'support_reply_draft_v1',
    version: '1.0.0',
    useCase: 'support_reply_draft',
    status: 'active',
    modelPreference: 'low_cost',
    systemInstruction: 'You are a customer support assistant. Draft clear, cautious, helpful replies without promising refunds or outcomes.',
    taskInstruction: 'Summarize the customer intent, list missing information and draft a reply for human review.',
    prohibitedClaims: ['rimborso garantito', 'report pronto se non confermato', 'pagamento garantito'],
    outputSchemaKey: 'support_reply_schema_v1',
    requiresApproval: true,
  },
  {
    key: 'error_ledger_summary_v1',
    version: '1.0.0',
    useCase: 'error_ledger_summary',
    status: 'active',
    modelPreference: 'default',
    systemInstruction: 'You are an internal operations analyst. Summarize errors and propose safe next actions without executing them.',
    taskInstruction: 'Explain probable cause, customer impact and recommended action using only the redacted context.',
    prohibitedClaims: ['causa certa senza evidenza', 'rimborso automatico'],
    outputSchemaKey: 'error_summary_schema_v1',
    requiresApproval: false,
  },
];

export const OPENAI_OUTPUT_SCHEMA_KEYS = [
  'cms_seo_suggestion_schema_v1',
  'support_reply_schema_v1',
  'error_summary_schema_v1',
  'admin_operations_explain_schema_v1',
  'release_qa_summary_schema_v1',
] as const;
