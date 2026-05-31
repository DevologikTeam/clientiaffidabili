import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmailDelivery } from './entities/email-delivery.entity';
import { EmailEvent } from './entities/email-event.entity';
import { EmailProviderWebhookEvent } from './entities/email-provider-webhook-event.entity';
import { EmailSecureLink } from './entities/email-secure-link.entity';
import { EmailSuppression } from './entities/email-suppression.entity';
import { EmailTemplate } from './entities/email-template.entity';
import { EmailNotificationsAdminController } from './email-notifications-admin.controller';
import { EmailNotificationsController } from './email-notifications.controller';
import { EmailNotificationsService } from './email-notifications.service';
import { EmailProviderAdapter } from './email-provider.adapter';
import { EmailRedactionService } from './email-redaction.service';
import { EmailRendererService } from './email-renderer.service';
import { EmailSecureLinkService } from './email-secure-link.service';

@Module({
  imports: [TypeOrmModule.forFeature([EmailTemplate, EmailEvent, EmailDelivery, EmailSuppression, EmailSecureLink, EmailProviderWebhookEvent])],
  controllers: [EmailNotificationsController, EmailNotificationsAdminController],
  providers: [EmailNotificationsService, EmailProviderAdapter, EmailRedactionService, EmailRendererService, EmailSecureLinkService],
  exports: [EmailNotificationsService]
})
export class EmailNotificationsModule {}
