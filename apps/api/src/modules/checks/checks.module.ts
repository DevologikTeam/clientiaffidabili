import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Check } from './check.entity';
import { ChecksController } from './checks.controller';
import { ChecksService } from './checks.service';
import { ProviderModule } from '../provider/provider.module';
import { OrdersModule } from '../orders/orders.module';

@Module({
  imports: [TypeOrmModule.forFeature([Check]), ProviderModule, OrdersModule],
  controllers: [ChecksController],
  providers: [ChecksService],
  exports: [ChecksService],
})
export class ChecksModule {}
