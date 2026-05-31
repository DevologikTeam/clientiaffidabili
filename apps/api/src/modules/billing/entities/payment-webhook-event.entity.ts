import { Column, CreateDateColumn, Entity, Index, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity('payment_webhook_events')
@Index(['provider', 'eventId'], { unique: true })
export class PaymentWebhookEvent {
  @PrimaryGeneratedColumn('uuid') id!: string;

  @Column() provider!: string;
  @Column() eventId!: string;
  @Column() eventType!: string;
  @Column({ default: false }) signatureValid!: boolean;
  @Column({ default: false }) processed!: boolean;
  @Column({ nullable: true }) processedAt?: Date;
  @Column() payloadHash!: string;
  @Column({ type: 'jsonb', default: {} }) payload!: Record<string, unknown>;
  @Column({ type: 'text', nullable: true }) error?: string;

  @CreateDateColumn() createdAt!: Date;
  @UpdateDateColumn() updatedAt!: Date;
}
