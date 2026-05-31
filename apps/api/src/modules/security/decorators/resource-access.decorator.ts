import { SetMetadata } from '@nestjs/common';
import type { ProtectedResourceType } from '../security-hardening.types';

export const RESOURCE_ACCESS_KEY = 'resource_access';

export type ResourceAccessRequirement = {
  resourceType: ProtectedResourceType;
  idParam?: string;
  accountIdField?: string;
  auditOnRead?: boolean;
};

export const ResourceAccess = (requirement: ResourceAccessRequirement) => SetMetadata(RESOURCE_ACCESS_KEY, requirement);
