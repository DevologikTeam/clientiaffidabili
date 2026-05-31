import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { RESOURCE_ACCESS_KEY, type ResourceAccessRequirement } from '../decorators/resource-access.decorator';
import { ObjectAuthorizationService } from '../services/object-authorization.service';

@Injectable()
export class ObjectAuthorizationGuard implements CanActivate {
  constructor(private readonly reflector: Reflector, private readonly objectAuth: ObjectAuthorizationService) {}

  canActivate(context: ExecutionContext): boolean {
    const requirement = this.reflector.getAllAndOverride<ResourceAccessRequirement | undefined>(RESOURCE_ACCESS_KEY, [context.getHandler(), context.getClass()]);
    if (!requirement) return true;
    const request = context.switchToHttp().getRequest<{ headers: Record<string, string | undefined>; params: Record<string, string | undefined> }>();
    const resourceAccountId = request.headers['x-resource-account-id'];
    this.objectAuth.assertAccess(
      requirement.resourceType,
      {
        accountId: request.headers['x-account-id'],
        customerRole: request.headers['x-customer-role'] as never,
        adminRole: request.headers['x-admin-role'] as never,
        isInternal: Boolean(request.headers['x-admin-role']),
      },
      { accountId: resourceAccountId ?? request.headers['x-account-id'] },
    );
    return true;
  }
}
