import { Column, CreateDateColumn, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

@Entity('fiscal_legal_audit_events')
@Index(['organizationId', 'entityType'])
@Index(['entityId'])
export class FiscalLegalAuditEvent {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'uuid', nullable: true })
  organizationId?: string;

  @Column({ type: 'uuid', nullable: true })
  actorUserId?: string;

  @Column({ type: 'varchar', length: 64 })
  entityType!: 'tax_profile' | 'fiscal_document' | 'legal_document' | 'legal_acceptance' | 'refund' | 'credit_note';

  @Column({ type: 'uuid', nullable: true })
  entityId?: string;

  @Column({ type: 'varchar', length: 80 })
  action!: string;

  @Column({ type: 'varchar', length: 220, nullable: true })
  reason?: string;

  @Column({ type: 'jsonb', default: {} })
  metadata!: Record<string, unknown>;

  @CreateDateColumn()
  createdAt!: Date;
}
