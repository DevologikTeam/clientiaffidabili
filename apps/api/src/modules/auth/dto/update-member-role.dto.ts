import type { CustomerAccountRole } from '../auth-accounts.types';

export class UpdateMemberRoleDto {
  accountId!: string;
  actorUserId!: string;
  membershipId!: string;
  role!: CustomerAccountRole;
  reason!: string;
}
