import { Body, Controller, Get, Headers, Param, Post } from '@nestjs/common';
import { PartnerPortalService } from './partner-portal.service';
import { PartnerWebhookService } from './partner-webhook.service';
import { CreatePartnerApiKeyDto } from './dto/create-partner-api-key.dto';
import { CreatePartnerWebhookDto } from './dto/create-partner-webhook.dto';
import { RequestLiveAccessDto } from './dto/request-live-access.dto';

@Controller('partner-portal')
export class PartnerPortalController {
  constructor(
    private readonly portal: PartnerPortalService,
    private readonly webhooks: PartnerWebhookService,
  ) {}

  @Get('dashboard')
  dashboard(@Headers('x-partner-account-id') partnerAccountId?: string) {
    return this.portal.getDashboard(partnerAccountId);
  }

  @Post('api-keys')
  createApiKey(@Headers('x-partner-account-id') partnerAccountId: string | undefined, @Body() body: CreatePartnerApiKeyDto) {
    return this.portal.createApiKey({ partnerAccountId: partnerAccountId || 'partner_demo', ...body });
  }

  @Get('usage')
  usage(@Headers('x-partner-account-id') partnerAccountId?: string) {
    return this.portal.getUsage(partnerAccountId || 'partner_demo');
  }

  @Post('webhooks')
  createWebhook(@Headers('x-partner-account-id') partnerAccountId: string | undefined, @Body() body: CreatePartnerWebhookDto) {
    const secret = this.webhooks.generateSecret();
    return {
      id: `pwe_${Date.now()}`,
      partnerAccountId: partnerAccountId || 'partner_demo',
      environment: body.environment,
      url: body.url,
      events: body.events,
      secret,
      warning: 'Mostra questo secret una sola volta. Nel database va salvato solo hash.',
    };
  }

  @Post('webhooks/:id/test')
  testWebhook(@Headers('x-partner-account-id') partnerAccountId: string | undefined, @Param('id') id: string) {
    const event = this.webhooks.buildTestEvent(partnerAccountId || 'partner_demo');
    return { webhookEndpointId: id, event, delivery: 'simulated', signed: this.webhooks.signPayload(event, 'sandbox_webhook_secret') };
  }

  @Post('live-access-requests')
  requestLive(@Headers('x-partner-account-id') partnerAccountId: string | undefined, @Body() body: RequestLiveAccessDto) {
    return this.portal.requestLiveAccess({ partnerAccountId: partnerAccountId || 'partner_demo', ...body });
  }
}
