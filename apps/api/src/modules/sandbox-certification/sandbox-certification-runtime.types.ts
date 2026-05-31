import type { SandboxCertificationArea, SandboxScenarioBlueprint, SandboxScenarioStatus } from './sandbox-certification-design.types';

export type SandboxCertificationProviderMode = 'mock' | 'sandbox' | 'manual';
export type SandboxCertificationRunStatus = 'queued' | 'running' | 'passed' | 'failed' | 'blocked' | 'cancelled';
export type SandboxEvidenceType =
  | 'payment_ledger'
  | 'provider_request'
  | 'webhook_event'
  | 'email_delivery'
  | 'secure_link'
  | 'report_snapshot'
  | 'openai_usage'
  | 'settings_snapshot'
  | 'audit_event'
  | 'refund_ledger'
  | 'rollback_check'
  | 'auth_event'
  | 'dashboard_state'
  | 'partner_api_log'
  | 'cms_publication'
  | 'docker_smoke'
  | 'security_scan';

export type SandboxWaiverStatus = 'active' | 'revoked' | 'expired';

export type SandboxScenarioRuntime = SandboxScenarioBlueprint & {
  providerMode: SandboxCertificationProviderMode;
  automationLevel: 'mock_first' | 'sandbox_adapter' | 'manual_evidence';
  estimatedDurationSeconds: number;
  refundRelevant: boolean;
  retryEligible: boolean;
  rollbackAction: string;
  ownerRole: string;
};

export type SandboxScenarioRunOutcome = {
  scenarioKey: string;
  area: SandboxCertificationArea;
  status: SandboxScenarioStatus;
  providerMode: SandboxCertificationProviderMode;
  safeMessage: string;
  failureSafeMessage?: string;
  evidence: SandboxEvidencePayload[];
  refundRelevant: boolean;
  retryEligible: boolean;
  rollbackAction: string;
  durationMs: number;
};

export type SandboxEvidencePayload = {
  type: SandboxEvidenceType;
  safeLabel: string;
  redactedPayload: Record<string, unknown>;
  storageRef?: string;
  sha256?: string;
};

export type SandboxCertificationSummary = {
  status: SandboxCertificationRunStatus;
  generatedAt: string;
  totalScenarios: number;
  blockerScenarios: number;
  passed: number;
  failed: number;
  blocked: number;
  waived: number;
  notStarted: number;
  lastRunId?: string;
  nextAction: string;
};

export type SandboxCertificationRunDetail = {
  id: string;
  label: string;
  status: SandboxCertificationRunStatus;
  providerMode: SandboxCertificationProviderMode;
  startedAt?: string;
  completedAt?: string;
  requestedBy?: string;
  summary: SandboxCertificationSummary;
  results: SandboxCertificationResultView[];
};

export type SandboxCertificationResultView = {
  id: string;
  scenarioKey: string;
  area: SandboxCertificationArea;
  title: string;
  status: SandboxScenarioStatus;
  blockerForRc: boolean;
  providerMode: SandboxCertificationProviderMode;
  attempt: number;
  safeMessage: string;
  failureSafeMessage?: string;
  errorLedgerId?: string;
  evidenceCount: number;
  startedAt?: string;
  completedAt?: string;
  retryEligible: boolean;
  refundRelevant: boolean;
  rollbackAction: string;
};

export type SandboxWaiverView = {
  id: string;
  scenarioKey: string;
  area: SandboxCertificationArea;
  status: SandboxWaiverStatus;
  reason: string;
  featureFlag: string;
  featureDisabled: boolean;
  approvedBy: string;
  expiresAt?: string;
  createdAt: string;
};

export type SandboxCertificationScenarioListItem = SandboxScenarioRuntime & {
  latestStatus: SandboxScenarioStatus;
  activeWaiver?: SandboxWaiverView;
  latestRunId?: string;
};

export const sandboxCertificationRuntimeVersion = '0.68.0';
