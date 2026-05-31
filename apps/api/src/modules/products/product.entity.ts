import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import type { CatalogPublicationStatus, CatalogRiskLevel } from '@clientiaffidabili/shared';

@Entity('products')
export class Product {
  @PrimaryGeneratedColumn('uuid') id!: string;

  @Column({ unique: true }) code!: string;
  @Column({ unique: true }) slug!: string;
  @Column() name!: string;
  @Column() category!: string;
  @Column({ default: 'new-client' }) scenario!: string;
  @Column({ default: 'published' }) status!: CatalogPublicationStatus;
  @Column({ default: 'low' }) riskLevel!: CatalogRiskLevel;
  @Column({ type: 'text' }) description!: string;
  @Column({ type: 'text', default: '' }) publicPromise!: string;
  @Column({ default: 'pochi minuti' }) estimatedDelivery!: string;

  @Column({ type: 'int' }) publicPriceCents!: number;
  @Column({ type: 'numeric', default: 22 }) taxRate!: number;
  @Column({ type: 'int', default: 0 }) estimatedProviderCostCents!: number;
  @Column({ type: 'int', default: 0 }) checkoutFeeReserveCents!: number;
  @Column({ type: 'int', default: 0 }) supportReserveCents!: number;
  @Column({ type: 'int', default: 0 }) retryReserveCents!: number;
  @Column({ type: 'numeric', default: 0.7 }) targetGrossMarginRatio!: number;
  @Column({ type: 'numeric', default: 0.55 }) minimumGrossMarginRatio!: number;

  @Column({ default: true }) active!: boolean;
  @Column({ default: false }) recommended!: boolean;
  @Column({ default: false }) requiresLegalBasis!: boolean;
  @Column({ default: false }) requiresComplianceReview!: boolean;
  @Column({ type: 'jsonb', default: [] }) requiredInputs!: string[];
  @Column({ type: 'jsonb', default: [] }) reportOutputs!: string[];
  @Column({ type: 'jsonb', default: [] }) limits!: string[];
  @Column({ type: 'jsonb', default: [] }) providerEndpoints!: string[];
  @Column({ type: 'jsonb', default: {} }) providerConfig!: Record<string, unknown>;

  @CreateDateColumn() createdAt!: Date;
  @UpdateDateColumn() updatedAt!: Date;
}
