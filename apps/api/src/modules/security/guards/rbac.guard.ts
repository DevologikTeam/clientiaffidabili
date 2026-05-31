import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { SECURITY_ROLES_KEY, type SecurityRoleRequirement } from '../decorators/roles.decorator';

@Injectable()
export class RbacGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const required = this.reflector.getAllAndOverride<SecurityRoleRequirement | undefined>(SECURITY_ROLES_KEY, [context.getHandler(), context.getClass()]);
    if (!required) return true;
    const request = context.switchToHttp().getRequest<{ headers: Record<string, string | undefined> }>();
    const adminRole = request.headers['x-admin-role'];
    const customerRole = request.headers['x-customer-role'];
    if (required.admin?.length && adminRole && required.admin.includes(adminRole as never)) return true;
    if (required.customer?.length && customerRole && required.customer.includes(customerRole as never)) return true;
    return false;
  }
}
