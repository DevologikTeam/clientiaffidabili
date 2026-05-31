import { Module } from '@nestjs/common';
import { SecurityController } from './security.controller';
import { ObjectAuthorizationService } from './services/object-authorization.service';
import { ProductionReadinessService } from './services/production-readiness.service';
import { RedactionService } from './services/redaction.service';
import { WebhookSecurityService } from './services/webhook-security.service';

@Module({
  controllers: [SecurityController],
  providers: [ObjectAuthorizationService, ProductionReadinessService, RedactionService, WebhookSecurityService],
  exports: [ObjectAuthorizationService, ProductionReadinessService, RedactionService, WebhookSecurityService],
})
export class SecurityModule {}
