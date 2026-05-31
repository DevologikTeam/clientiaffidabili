import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContactEmailDeliveryService } from './contact-email-delivery.service';
import { ContactMessage } from './entities/contact-message.entity';
import { CrmSupportTicket } from './entities/crm-support-ticket.entity';
import { SalesLead } from './entities/sales-lead.entity';
import { SalesOpportunity } from './entities/sales-opportunity.entity';
import { SalesCrmAdminController } from './sales-crm-admin.controller';
import { SalesCrmController } from './sales-crm.controller';
import { SalesCrmService } from './sales-crm.service';

@Module({
  imports: [TypeOrmModule.forFeature([ContactMessage, SalesLead, SalesOpportunity, CrmSupportTicket])],
  controllers: [SalesCrmController, SalesCrmAdminController],
  providers: [SalesCrmService, ContactEmailDeliveryService],
  exports: [SalesCrmService],
})
export class SalesCrmModule {}
