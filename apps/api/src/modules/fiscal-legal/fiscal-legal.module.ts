import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomerTaxProfile } from './entities/customer-tax-profile.entity';
import { FiscalDocument } from './entities/fiscal-document.entity';
import { FiscalLegalAuditEvent } from './entities/fiscal-legal-audit.entity';
import { LegalAcceptance } from './entities/legal-acceptance.entity';
import { LegalDocumentVersion } from './entities/legal-document-version.entity';
import { FiscalLegalAdminController } from './fiscal-legal-admin.controller';
import { FiscalLegalController } from './fiscal-legal.controller';
import { FiscalLegalService } from './fiscal-legal.service';

@Module({
  imports: [TypeOrmModule.forFeature([CustomerTaxProfile, FiscalDocument, LegalDocumentVersion, LegalAcceptance, FiscalLegalAuditEvent])],
  controllers: [FiscalLegalController, FiscalLegalAdminController],
  providers: [FiscalLegalService],
  exports: [FiscalLegalService],
})
export class FiscalLegalModule {}
