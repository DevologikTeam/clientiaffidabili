import type { PartnerEnvironment, PartnerScope } from './partner-portal.types';

export const PARTNER_API_VERSION = 'v1';
export const PARTNER_API_BASE_PATH = '/api/partner/v1';

export const partnerApiScopes: PartnerScope[] = [
  'checks:company.read',
  'checks:company.create',
  'checks:company.status',
  'reports:read',
  'webhooks:manage',
  'usage:read',
  'billing:read',
];

export const partnerApiEndpoints = [
  {
    method: 'POST',
    path: '/company-checks',
    requiredScope: 'checks:company.create',
    requiresIdempotencyKey: true,
    requiresCreditReservation: true,
    environments: ['sandbox', 'live'] as PartnerEnvironment[],
  },
  {
    method: 'GET',
    path: '/company-checks/:checkId',
    requiredScope: 'checks:company.status',
    requiresIdempotencyKey: false,
    requiresCreditReservation: false,
    environments: ['sandbox', 'live'] as PartnerEnvironment[],
  },
  {
    method: 'GET',
    path: '/reports/:reportId',
    requiredScope: 'reports:read',
    requiresIdempotencyKey: false,
    requiresCreditReservation: false,
    environments: ['sandbox', 'live'] as PartnerEnvironment[],
  },
  {
    method: 'GET',
    path: '/usage',
    requiredScope: 'usage:read',
    requiresIdempotencyKey: false,
    requiresCreditReservation: false,
    environments: ['sandbox', 'live'] as PartnerEnvironment[],
  },
] as const;

export const partnerApiErrorCodes = [
  'invalid_api_key',
  'api_key_revoked',
  'scope_missing',
  'live_not_approved',
  'rate_limit_exceeded',
  'idempotency_key_required',
  'idempotency_key_conflict',
  'insufficient_credits',
  'service_not_enabled',
  'manual_review_required',
] as const;
