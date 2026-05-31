import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Invoice } from '../billing/entities/invoice.entity';
import { Check } from '../checks/check.entity';
import { Order } from '../orders/order.entity';
import { Report } from '../reports/report.entity';
import { CustomerDashboardController } from './customer-dashboard.controller';
import { CustomerDashboardService } from './customer-dashboard.service';
import { CustomerNotification } from './entities/customer-notification.entity';
import { CustomerTask } from './entities/customer-task.entity';
import { SupportTicket } from './entities/support-ticket.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Check, Order, Report, Invoice, CustomerNotification, CustomerTask, SupportTicket])],
  controllers: [CustomerDashboardController],
  providers: [CustomerDashboardService],
  exports: [CustomerDashboardService],
})
export class CustomerDashboardModule {}
