import { ForbiddenException, Injectable } from '@nestjs/common';
import { objectAuthorizationPolicies } from '../security-control.registry';
import type { AdminRole, CustomerRole, ProtectedResourceType } from '../security-hardening.types';

export type ObjectAccessActor = {
  accountId?: string;
  customerRole?: CustomerRole;
  adminRole?: AdminRole;
  isInternal?: boolean;
};

@Injectable()
export class ObjectAuthorizationService {
  assertAccess(resourceType: ProtectedResourceType, actor: ObjectAccessActor, resource: { accountId?: string; organizationId?: string; customerId?: string }) {
    const policy = objectAuthorizationPolicies.find((item) => item.resourceType === resourceType);
    if (!policy) throw new ForbiddenException(`Policy non definita per ${resourceType}.`);

    if (actor.isInternal) {
      if (!actor.adminRole || !policy.adminRoles.includes(actor.adminRole)) throw new ForbiddenException('Ruolo admin non autorizzato.');
      return { ok: true, mode: 'admin', auditOnRead: policy.auditOnRead, auditOnWrite: policy.auditOnWrite };
    }

    if (!actor.customerRole || !policy.customerRoles.includes(actor.customerRole)) throw new ForbiddenException('Ruolo cliente non autorizzato.');
    const resourceAccountId = resource.accountId ?? resource.organizationId ?? resource.customerId;
    if (!actor.accountId || !resourceAccountId || actor.accountId !== resourceAccountId) {
      throw new ForbiddenException('Risorsa non disponibile per questo account.');
    }
    return { ok: true, mode: 'customer', auditOnRead: policy.auditOnRead, auditOnWrite: policy.auditOnWrite };
  }
}
