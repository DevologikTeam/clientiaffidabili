export class OperationalErrorActionDto {
  action!: 'assign' | 'retry' | 'link_refund' | 'link_fix' | 'resolve' | 'ignore' | 'escalate';
  reason!: string;
  targetId?: string;
  actorId?: string;
}
