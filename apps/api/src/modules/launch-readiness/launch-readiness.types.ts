export type LaunchGateStatus = 'passed' | 'warning' | 'blocked';

export interface LaunchGateCheck {
  id: string;
  label: string;
  status: LaunchGateStatus;
  requiredForGoLive: boolean;
  evidence: string;
  remediation?: string;
}

export interface LaunchReadinessSummary {
  status: LaunchGateStatus;
  generatedAt: string;
  checks: LaunchGateCheck[];
}
