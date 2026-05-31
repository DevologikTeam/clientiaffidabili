import { IsBoolean, IsIn, IsOptional, IsString, MinLength } from 'class-validator';
import type { AdminReasonCategory, AdminRole } from '../admin-operations.types';

const categories: AdminReasonCategory[] = [
  'customer_request',
  'provider_error',
  'billing_reconciliation',
  'compliance_review',
  'data_quality_issue',
  'manual_override',
  'security_incident',
  'other',
];

const roles: AdminRole[] = ['support_agent', 'operations_agent', 'billing_agent', 'compliance_reviewer', 'analyst', 'super_admin'];

export class ExecuteAdminActionDto {
  @IsOptional()
  @IsString()
  @MinLength(8)
  reason?: string;

  @IsOptional()
  @IsIn(categories)
  reasonCategory?: AdminReasonCategory;

  @IsOptional()
  @IsString()
  idempotencyKey?: string;

  @IsOptional()
  @IsBoolean()
  confirmGuardrail?: boolean;

  @IsOptional()
  @IsString()
  actorUserId?: string;

  @IsOptional()
  @IsString()
  actorLabel?: string;

  @IsOptional()
  @IsIn(roles)
  actorRole?: AdminRole;
}
