import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PartnerAccount } from './entities/partner-account.entity';
import { PartnerApiKey } from './entities/partner-api-key.entity';
import { PartnerWebhookEndpoint } from './entities/partner-webhook-endpoint.entity';
import { PartnerUsageLedgerEntry } from './entities/partner-usage-ledger-entry.entity';
import { PartnerRateLimitProfile } from './entities/partner-rate-limit-profile.entity';
import { PartnerLiveAccessRequest } from './entities/partner-live-access-request.entity';
import { PartnerIdempotencyRecord } from './entities/partner-idempotency-record.entity';
import { PartnerApiController } from './partner-api.controller';
import { PartnerAdminController } from './partner-admin.controller';
import { PartnerPortalController } from './partner-portal.controller';
import { PartnerApiKeyService } from './partner-api-key.service';
import { PartnerPortalService } from './partner-portal.service';
import { PartnerRateLimitService } from './partner-rate-limit.service';
import { PartnerSandboxService } from './partner-sandbox.service';
import { PartnerUsageLedgerService } from './partner-usage-ledger.service';
import { PartnerWebhookService } from './partner-webhook.service';

@Module({
  imports: [TypeOrmModule.forFeature([PartnerAccount, PartnerApiKey, PartnerWebhookEndpoint, PartnerUsageLedgerEntry, PartnerRateLimitProfile, PartnerLiveAccessRequest, PartnerIdempotencyRecord])],
  controllers: [PartnerPortalController, PartnerApiController, PartnerAdminController],
  providers: [PartnerPortalService, PartnerApiKeyService, PartnerUsageLedgerService, PartnerRateLimitService, PartnerWebhookService, PartnerSandboxService],
  exports: [PartnerPortalService, PartnerApiKeyService, PartnerUsageLedgerService],
})
export class PartnerPortalModule {}
