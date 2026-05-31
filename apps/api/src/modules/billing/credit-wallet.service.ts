import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreditWallet } from './entities/credit-wallet.entity';
import { CreditLedgerEntry, CreditLedgerType } from './entities/credit-ledger-entry.entity';

@Injectable()
export class CreditWalletService {
  constructor(
    @InjectRepository(CreditWallet) private readonly wallets: Repository<CreditWallet>,
    @InjectRepository(CreditLedgerEntry) private readonly ledger: Repository<CreditLedgerEntry>,
  ) {}

  async getOrCreate(customerAccountId: string): Promise<CreditWallet> {
    const existing = await this.wallets.findOne({ where: { customerAccountId } });
    if (existing) return existing;
    return this.wallets.save(this.wallets.create({ customerAccountId, availableCredits: 0, reservedCredits: 0 }));
  }

  async grantCredits(input: { customerAccountId: string; amount: number; type: CreditLedgerType; reason: string; sourceType?: string; sourceId?: string; idempotencyKey?: string; metadata?: Record<string, unknown> }): Promise<CreditWallet> {
    if (input.amount <= 0) throw new BadRequestException('La quantità di crediti da accreditare deve essere positiva.');
    if (input.idempotencyKey) {
      const existing = await this.ledger.findOne({ where: { idempotencyKey: input.idempotencyKey } });
      if (existing) return this.getOrCreate(input.customerAccountId);
    }
    const wallet = await this.getOrCreate(input.customerAccountId);
    wallet.availableCredits += input.amount;
    wallet.lifetimePurchasedCredits += ['purchase', 'subscription_renewal'].includes(input.type) ? input.amount : 0;
    await this.wallets.save(wallet);
    await this.ledger.save(this.ledger.create({ customerAccountId: input.customerAccountId, walletId: wallet.id, type: input.type, amount: input.amount, reason: input.reason, sourceType: input.sourceType, sourceId: input.sourceId, idempotencyKey: input.idempotencyKey, metadata: input.metadata ?? {} }));
    return wallet;
  }

  async reserveCredit(input: { customerAccountId: string; sourceType: string; sourceId: string; reason: string; idempotencyKey?: string }): Promise<CreditWallet> {
    const wallet = await this.getOrCreate(input.customerAccountId);
    if (wallet.availableCredits < 1) throw new BadRequestException('Crediti insufficienti per avviare la verifica.');
    wallet.availableCredits -= 1;
    wallet.reservedCredits += 1;
    await this.wallets.save(wallet);
    await this.ledger.save(this.ledger.create({ customerAccountId: input.customerAccountId, walletId: wallet.id, type: 'reserve', amount: -1, reason: input.reason, sourceType: input.sourceType, sourceId: input.sourceId, idempotencyKey: input.idempotencyKey, metadata: { noProviderCallBeforeCreditReserved: true } }));
    return wallet;
  }

  async consumeReservedCredit(input: { customerAccountId: string; sourceType: string; sourceId: string; reason: string }): Promise<CreditWallet> {
    const wallet = await this.getOrCreate(input.customerAccountId);
    if (wallet.reservedCredits < 1) throw new BadRequestException('Nessun credito prenotato da consumare.');
    wallet.reservedCredits -= 1;
    wallet.lifetimeConsumedCredits += 1;
    await this.wallets.save(wallet);
    await this.ledger.save(this.ledger.create({ customerAccountId: input.customerAccountId, walletId: wallet.id, type: 'consume', amount: -1, reason: input.reason, sourceType: input.sourceType, sourceId: input.sourceId }));
    return wallet;
  }
}
