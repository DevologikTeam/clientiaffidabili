import { SetMetadata } from '@nestjs/common';
import type { AdminRole, CustomerRole } from '../security-hardening.types';

export const SECURITY_ROLES_KEY = 'security_roles';

export type SecurityRoleRequirement = {
  admin?: AdminRole[];
  customer?: CustomerRole[];
};

export const Roles = (roles: SecurityRoleRequirement) => SetMetadata(SECURITY_ROLES_KEY, roles);
