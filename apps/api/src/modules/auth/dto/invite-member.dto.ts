import type { CustomerAccountRole } from '../auth-accounts.types';

export class InviteMemberDto {
  accountId!: string;
  actorUserId!: string;
  email!: string;
  role!: CustomerAccountRole;
  reason!: string;
}
