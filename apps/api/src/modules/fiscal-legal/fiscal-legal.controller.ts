import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateFiscalDocumentDto } from './dto/create-fiscal-document.dto';
import { RecordLegalAcceptanceDto } from './dto/record-legal-acceptance.dto';
import { UpsertCustomerTaxProfileDto } from './dto/upsert-customer-tax-profile.dto';
import { FiscalLegalService } from './fiscal-legal.service';

@Controller('fiscal-legal')
export class FiscalLegalController {
  constructor(private readonly fiscalLegal: FiscalLegalService) {}

  @Get('legal-pack')
  legalPack() {
    return this.fiscalLegal.publishedLegalPack();
  }

  @Get('customer/:organizationId')
  customerSnapshot(@Param('organizationId') organizationId: string) {
    return this.fiscalLegal.customerSnapshot(organizationId);
  }

  @Post('tax-profile')
  upsertTaxProfile(@Body() dto: UpsertCustomerTaxProfileDto) {
    return this.fiscalLegal.upsertTaxProfile(dto);
  }

  @Post('documents')
  createFiscalDocument(@Body() dto: CreateFiscalDocumentDto) {
    return this.fiscalLegal.createFiscalDocument(dto);
  }

  @Post('acceptances')
  recordAcceptance(@Body() dto: RecordLegalAcceptanceDto) {
    return this.fiscalLegal.recordLegalAcceptance(dto);
  }
}
