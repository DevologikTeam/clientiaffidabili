import { Column, CreateDateColumn, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

@Entity('purchase_ip_audits')
@Index(['eventType', 'createdAt'])
@Index(['linkedOrderId'])
export class PurchaseIpAudit {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'varchar', name: 'event_type' })
  eventType!: 'checkout_session_created' | 'payment_confirmed' | 'refund_requested' | 'report_downloaded' | 'partner_api_consumed';

  @Column({ name: 'buyer_ip_hash' })
  buyerIpHash!: string;

  @Column({ name: 'buyer_ip_prefix', nullable: true })
  buyerIpPrefix?: string;

  @Column({ name: 'user_agent_hash', nullable: true })
  userAgentHash?: string;

  @Column({ name: 'linked_order_id', nullable: true })
  linkedOrderId?: string;

  @Column({ name: 'linked_payment_id', nullable: true })
  linkedPaymentId?: string;

  @Column({ type: 'varchar', name: 'retention_class', default: 'financial_audit' })
  retentionClass!: 'security_short' | 'financial_audit' | 'fraud_review';

  @Column({ type: 'jsonb', default: {} })
  metadata!: Record<string, unknown>;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt!: Date;
}
