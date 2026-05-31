export type SandboxCertificationArea =
  | 'payments.stripe'
  | 'payments.paypal'
  | 'provider.openapi'
  | 'ai.openai'
  | 'email.delivery'
  | 'report.pdf'
  | 'auth.accounts'
  | 'customer.dashboard'
  | 'admin.operations'
  | 'partner.api'
  | 'seo.cms'
  | 'docker.coolify'
  | 'security.audit';

export type SandboxScenarioStatus =
  | 'not_started'
  | 'ready_to_run'
  | 'running'
  | 'passed'
  | 'failed'
  | 'blocked'
  | 'waived';

export interface SandboxScenarioBlueprint {
  id: string;
  area: SandboxCertificationArea;
  title: string;
  blockerForRc: boolean;
  requiredEvidence: string[];
  passCriteria: string[];
  failCriteria: string[];
  featureFlagIfWaived?: string;
}

export interface SandboxRunBlueprint {
  id: string;
  label: string;
  status: SandboxScenarioStatus;
  scenarios: SandboxScenarioBlueprint[];
  generatedAt: string;
}

export const sandboxCertificationDesignVersion = '0.67.0';
