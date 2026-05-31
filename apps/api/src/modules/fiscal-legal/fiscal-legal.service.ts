import { createHash } from 'crypto';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CustomerTaxProfile } from './entities/customer-tax-profile.entity';
import { FiscalDocument } from './entities/fiscal-document.entity';
import { LegalAcceptance } from './entities/legal-acceptance.entity';
import { LegalDocumentVersion } from './entities/legal-document-version.entity';
import { FiscalLegalAuditEvent } from './entities/fiscal-legal-audit.entity';
import { CreateFiscalDocumentDto } from './dto/create-fiscal-document.dto';
import { ExecuteFiscalAdminActionDto } from './dto/execute-fiscal-admin-action.dto';
import { RecordLegalAcceptanceDto } from './dto/record-legal-acceptance.dto';
import { UpsertCustomerTaxProfileDto } from './dto/upsert-customer-tax-profile.dto';
import { canCheckoutProceed, mandatoryCheckoutLegalDocuments, requiresReason } from './fiscal-legal-design.registry';
import type { TaxProfileSnapshot } from './fiscal-legal.types';

@Injectable()
export class FiscalLegalService {
  constructor(
    @InjectRepository(CustomerTaxProfile) private readonly taxProfiles: Repository<CustomerTaxProfile>,
    @InjectRepository(FiscalDocument) private readonly fiscalDocuments: Repository<FiscalDocument>,
    @InjectRepository(LegalDocumentVersion) private readonly legalDocuments: Repository<LegalDocumentVersion>,
    @InjectRepository(LegalAcceptance) private readonly legalAcceptances: Repository<LegalAcceptance>,
    @InjectRepository(FiscalLegalAuditEvent) private readonly auditEvents: Repository<FiscalLegalAuditEvent>,
  ) {}

  async upsertTaxProfile(dto: UpsertCustomerTaxProfileDto): Promise<CustomerTaxProfile> {
    const snapshot: TaxProfileSnapshot = {
      profileType: dto.profileType,
      legalName: dto.legalName,
      vatNumber: dto.vatNumber,
      taxCode: dto.taxCode,
      pec: dto.pec,
      sdiCode: dto.sdiCode,
      email: dto.email,
      country: dto.country,
      addressLine1: dto.addressLine1,
      postalCode: dto.postalCode,
      city: dto.city,
      province: dto.province,
      requiresFiscalReview: this.requiresTaxReview(dto),
      snapshotCreatedAt: new Date().toISOString(),
    };
    const existing = await this.taxProfiles.findOne({ where: { organizationId: dto.organizationId } });
    const entity = this.taxProfiles.create({
      ...(existing ?? {}),
      ...dto,
      latestSnapshot: snapshot,
      requiresFiscalReview: snapshot.requiresFiscalReview,
      status: snapshot.requiresFiscalReview ? 'requires_review' : 'complete',
      snapshotHash: this.hash(snapshot),
    });
    const saved = await this.taxProfiles.save(entity);
    await this.audit('tax_profile', saved.id, 'tax_profile_upserted', dto.organizationId, snapshot.requiresFiscalReview ? 'Profilo fiscale richiede verifica' : 'Profilo fiscale completato');
    return saved;
  }

  async createFiscalDocument(dto: CreateFiscalDocumentDto): Promise<FiscalDocument> {
    const profile = dto.taxProfileId ? await this.taxProfiles.findOne({ where: { id: dto.taxProfileId } }) : await this.taxProfiles.findOne({ where: { organizationId: dto.organizationId } });
    const status = profile?.requiresFiscalReview ? 'requires_review' : 'queued';
    const entity = this.fiscalDocuments.create({
      ...dto,
      status,
      taxProfileId: profile?.id ?? dto.taxProfileId,
      taxProfileSnapshot: profile?.latestSnapshot ?? {},
      lineItems: dto.lineItems ?? [],
      documentHash: this.hash({ dto, profileSnapshot: profile?.latestSnapshot ?? {} }),
    });
    const saved = await this.fiscalDocuments.save(entity);
    await this.audit('fiscal_document', saved.id, 'fiscal_document_created', dto.organizationId, status === 'requires_review' ? 'Dati fiscali da verificare' : 'Documento accodato');
    return saved;
  }

  async recordLegalAcceptance(dto: RecordLegalAcceptanceDto): Promise<LegalAcceptance> {
    const published = await this.legalDocuments.find({ where: { status: 'published' as any } });
    const availableTypes = published.map((doc) => doc.documentType);
    if (!canCheckoutProceed(availableTypes)) {
      const missing = mandatoryCheckoutLegalDocuments.filter((doc) => !availableTypes.includes(doc));
      throw new Error(`Legal pack incompleto: ${missing.join(', ')}`);
    }
    const entity = this.legalAcceptances.create({
      ...dto,
      acceptedAt: new Date(dto.acceptanceSnapshot.acceptedAt),
      snapshotHash: this.hash(dto.acceptanceSnapshot),
    });
    const saved = await this.legalAcceptances.save(entity);
    await this.audit('legal_acceptance', saved.id, 'legal_acceptance_recorded', dto.organizationId, 'Accettazioni checkout registrate');
    return saved;
  }

  async publishedLegalPack(): Promise<LegalDocumentVersion[]> {
    return this.legalDocuments.find({ where: { status: 'published' as any }, order: { documentType: 'ASC', publishedAt: 'DESC' } });
  }

  async customerSnapshot(organizationId: string) {
    const [taxProfile, fiscalDocuments, legalAcceptances] = await Promise.all([
      this.taxProfiles.findOne({ where: { organizationId } }),
      this.fiscalDocuments.find({ where: { organizationId }, order: { createdAt: 'DESC' }, take: 20 }),
      this.legalAcceptances.find({ where: { organizationId }, order: { acceptedAt: 'DESC' }, take: 10 }),
    ]);
    return { taxProfile, fiscalDocuments, legalAcceptances, legalPack: await this.publishedLegalPack() };
  }

  async adminQueue() {
    const [taxProfiles, fiscalDocuments, legalDocuments] = await Promise.all([
      this.taxProfiles.find({ where: { status: 'requires_review' as any }, order: { updatedAt: 'DESC' }, take: 30 }),
      this.fiscalDocuments.find({ where: { status: 'requires_review' as any }, order: { updatedAt: 'DESC' }, take: 30 }),
      this.legalDocuments.find({ where: { status: 'legal_review' as any }, order: { updatedAt: 'DESC' }, take: 30 }),
    ]);
    return { taxProfiles, fiscalDocuments, legalDocuments };
  }

  async executeAdminAction(dto: ExecuteFiscalAdminActionDto) {
    if (requiresReason(dto.action) && (!dto.reason || dto.reason.trim().length < 12)) {
      throw new Error('Reason obbligatoria e descrittiva per azioni fiscal/legal sensibili.');
    }
    if (dto.entityType === 'fiscal_document') {
      const document = await this.fiscalDocuments.findOneByOrFail({ id: dto.entityId });
      if (dto.action === 'mark_ready_to_issue') document.status = 'ready_to_issue';
      if (dto.action === 'mark_issued') {
        document.status = 'issued';
        document.issuedAt = new Date();
      }
      if (dto.action === 'queue_credit_note') document.status = 'credit_note_required';
      document.adminReason = dto.reason;
      await this.fiscalDocuments.save(document);
    }
    await this.audit(dto.entityType as any, dto.entityId, dto.action, undefined, dto.reason, dto.metadata, dto.actorUserId);
    return { ok: true, action: dto.action, entityType: dto.entityType, entityId: dto.entityId };
  }

  private requiresTaxReview(dto: UpsertCustomerTaxProfileDto): boolean {
    return dto.profileType === 'requires_review' || dto.profileType.includes('extra_eu') || dto.profileType === 'public_administration' || dto.country !== 'IT';
  }

  private hash(value: unknown): string {
    return createHash('sha256').update(JSON.stringify(value)).digest('hex');
  }

  private async audit(entityType: FiscalLegalAuditEvent['entityType'], entityId: string | undefined, action: string, organizationId?: string, reason?: string, metadata: Record<string, unknown> = {}, actorUserId?: string) {
    await this.auditEvents.save(this.auditEvents.create({ entityType, entityId, action, organizationId, actorUserId, reason, metadata }));
  }
}
