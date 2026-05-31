import { Injectable } from '@nestjs/common';
import type { PartnerEnvironment } from './partner-portal.types';

export interface PartnerLedgerDraft {
  partnerAccountId: string;
  environment: PartnerEnvironment;
  type: 'usage_reservation' | 'usage_commit' | 'usage_release' | 'manual_adjustment' | 'refund_credit' | 'credit_purchase' | 'subscription_grant' | 'chargeback_hold' | 'chargeback_release';
  amountCents: number;
  serviceCode?: string;
  idempotencyKey?: string;
  reason?: string;
}

@Injectable()
export class PartnerUsageLedgerService {
  private readonly inMemoryLedger: Array<PartnerLedgerDraft & { id: string; createdAt: string }> = [];

  append(entry: PartnerLedgerDraft) {
    const row = { ...entry, id: `pule_${Date.now()}_${this.inMemoryLedger.length + 1}`, createdAt: new Date().toISOString() };
    this.inMemoryLedger.push(row);
    return row;
  }

  reserve(input: Omit<PartnerLedgerDraft, 'type'>) {
    return this.append({ ...input, type: 'usage_reservation' });
  }

  commit(input: Omit<PartnerLedgerDraft, 'type'>) {
    return this.append({ ...input, type: 'usage_commit' });
  }

  release(input: Omit<PartnerLedgerDraft, 'type'>) {
    return this.append({ ...input, type: 'usage_release' });
  }

  listForPartner(partnerAccountId: string) {
    return this.inMemoryLedger.filter((entry) => entry.partnerAccountId === partnerAccountId);
  }

  getBalance(partnerAccountId: string) {
    return this.listForPartner(partnerAccountId).reduce((sum, entry) => sum + entry.amountCents, 0);
  }
}
