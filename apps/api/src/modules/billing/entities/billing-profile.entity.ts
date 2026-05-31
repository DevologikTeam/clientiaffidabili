import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity('billing_profiles')
export class BillingProfile {
  @PrimaryGeneratedColumn('uuid') id!: string;

  @Column() organizationId!: string;
  @Column() userId!: string;
  @Column({ default: 'company' }) type!: 'company' | 'professional';
  @Column() businessName!: string;
  @Column({ nullable: true }) vatNumber?: string;
  @Column({ nullable: true }) taxId?: string;
  @Column({ default: 'IT' }) country!: string;
  @Column() addressLine1!: string;
  @Column() city!: string;
  @Column() postalCode!: string;
  @Column({ nullable: true }) province?: string;
  @Column() email!: string;
  @Column({ nullable: true }) sdiCode?: string;
  @Column({ nullable: true }) pec?: string;

  @CreateDateColumn() createdAt!: Date;
  @UpdateDateColumn() updatedAt!: Date;
}
