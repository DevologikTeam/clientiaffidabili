import type { PlatformSettingBlueprint, OperationalErrorEventBlueprint } from './settings-admin.types';

export interface SettingsOverviewResponseContract {
  namespaces: Array<{
    namespace: string;
    label: string;
    state: 'ok' | 'warning' | 'error' | 'disabled';
    issueCount: number;
    lastChangedAt?: string;
  }>;
  purchasesEnabled: boolean;
  criticalErrors: number;
  settingsRequiringReview: number;
}

export interface SettingsNamespaceResponseContract {
  namespace: string;
  settings: PlatformSettingBlueprint[];
}

export interface UpdatePlatformSettingRequestContract {
  value: unknown;
  reason: string;
}

export interface UpdateSecretSettingRequestContract {
  secretValue: string;
  reason: string;
}

export interface PurchaseKillSwitchRequestContract {
  enabled: boolean;
  customerMessage?: string;
  disabledUntil?: string;
  reason: string;
}

export interface OperationalErrorListResponseContract {
  items: OperationalErrorEventBlueprint[];
  total: number;
}

export interface OperationalErrorActionRequestContract {
  action: 'assign' | 'retry' | 'link_refund' | 'link_fix' | 'resolve' | 'ignore' | 'escalate';
  reason: string;
  targetId?: string;
}
