import { Body, Controller, Get, Headers, Post } from '@nestjs/common';
import { Roles } from './decorators/roles.decorator';
import { ProductionGateOverrideDto } from './dto/production-gate-check.dto';
import { ObjectAuthorizationService } from './services/object-authorization.service';
import { ProductionReadinessService } from './services/production-readiness.service';
import { RedactionService } from './services/redaction.service';
import { WebhookSecurityService, type WebhookProvider } from './services/webhook-security.service';

@Controller('security')
export class SecurityController {
  constructor(
    private readonly readiness: ProductionReadinessService,
    private readonly redaction: RedactionService,
    private readonly webhookSecurity: WebhookSecurityService,
    private readonly objectAuth: ObjectAuthorizationService,
  ) {}

  @Get('controls')
  @Roles({ admin: ['super_admin', 'compliance'] })
  controls() {
    return this.readiness.getControls();
  }

  @Get('production-gate')
  @Roles({ admin: ['super_admin', 'compliance', 'operations'] })
  productionGate() {
    return this.readiness.getProductionGate();
  }

  @Post('production-gate/override-preview')
  @Roles({ admin: ['super_admin'] })
  overridePreview(@Body() body: ProductionGateOverrideDto) {
    return {
      accepted: body.confirmNotGoLive === true,
      reason: body.reason,
      actorLabel: body.actorLabel,
      note: 'Preview soltanto: il go-live richiede evidenze reali e audit operativo separato.',
    };
  }

  @Post('redaction-preview')
  @Roles({ admin: ['super_admin', 'compliance'] })
  redactionPreview(@Body() body: Record<string, unknown>) {
    return this.redaction.safeLogContext(body);
  }

  @Post('webhook/signature-preview')
  webhookSignaturePreview(
    @Headers('x-provider') provider: WebhookProvider = 'openapi',
    @Headers('x-signature') signature = '',
    @Body() body: Record<string, unknown>,
  ) {
    return this.webhookSecurity.verifySharedSecretSignature({
      provider,
      payload: JSON.stringify(body),
      signature,
      secret: process.env.OPENAPI_CALLBACK_SECRET,
      toleranceSeconds: Number(process.env.BILLING_WEBHOOK_TOLERANCE_SECONDS ?? 300),
    });
  }

  @Post('object-access-preview')
  @Roles({ admin: ['super_admin', 'compliance'] })
  objectAccessPreview(@Body() body: { resourceType: never; actor: never; resource: never }) {
    return this.objectAuth.assertAccess(body.resourceType, body.actor, body.resource);
  }
}
