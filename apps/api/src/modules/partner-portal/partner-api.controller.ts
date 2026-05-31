import { Body, Controller, Get, Headers, Param, Post, Query } from '@nestjs/common';
import { PartnerPortalService } from './partner-portal.service';
import { PartnerSandboxService } from './partner-sandbox.service';
import { PartnerWebhookService } from './partner-webhook.service';
import { PartnerCompanyCheckDto } from './dto/partner-company-check.dto';

@Controller('api/partner/v1')
export class PartnerApiController {
  constructor(
    private readonly portal: PartnerPortalService,
    private readonly sandbox: PartnerSandboxService,
    private readonly webhook: PartnerWebhookService,
  ) {}

  @Post('company-checks')
  createCompanyCheck(@Headers('idempotency-key') idempotencyKey: string | undefined, @Headers('x-partner-account-id') partnerAccountId: string | undefined, @Headers('x-ca-environment') environment: 'sandbox' | 'live' | undefined, @Body() body: PartnerCompanyCheckDto) {
    return this.portal.createPartnerCompanyCheck({
      partnerAccountId: partnerAccountId || 'partner_demo',
      environment: environment || 'sandbox',
      serviceCode: body.serviceCode,
      subject: body.subject,
      idempotencyKey,
    });
  }

  @Get('company-checks/:checkId')
  getCompanyCheck(@Param('checkId') checkId: string) {
    return this.sandbox.getCompanyCheck(checkId);
  }

  @Get('reports/:reportId')
  getReport(@Param('reportId') reportId: string) {
    return {
      reportId,
      status: 'ready',
      environment: 'sandbox',
      summary: 'Report sandbox pronto. I dati sono simulati e non utilizzabili per decisioni reali.',
      limits: ['Nessun dato reale', 'Nessuna chiamata provider', 'Solo test integrazione'],
    };
  }

  @Get('usage')
  usage(@Headers('x-partner-account-id') partnerAccountId: string | undefined, @Query('from') from?: string, @Query('to') to?: string) {
    return { ...this.portal.getUsage(partnerAccountId || 'partner_demo'), from, to };
  }

  @Post('webhooks/test')
  webhookTest(@Headers('x-partner-account-id') partnerAccountId: string | undefined) {
    const event = this.webhook.buildTestEvent(partnerAccountId || 'partner_demo');
    return { event, signaturePreview: this.webhook.signPayload(event, 'sandbox_webhook_secret') };
  }
}
