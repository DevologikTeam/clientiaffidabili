import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OpenapiAdapterService } from './openapi-adapter.service';
import { OpenapiCallbackController } from './openapi-callback.controller';
import { ProviderAdminController } from './provider-admin.controller';
import { ProviderRuntimeService } from './provider-runtime.service';
import { ProviderCostLedgerEntry } from './entities/provider-cost-ledger-entry.entity';
import { ProviderRawPayloadVault } from './entities/provider-raw-payload-vault.entity';
import { ProviderRequestEvent } from './entities/provider-request-event.entity';
import { ProviderRequest } from './entities/provider-request.entity';
import { SettingsAdminModule } from '../settings-admin/settings-admin.module';

@Module({
  imports: [ConfigModule, SettingsAdminModule, TypeOrmModule.forFeature([ProviderRequest, ProviderRequestEvent, ProviderCostLedgerEntry, ProviderRawPayloadVault])],
  controllers: [OpenapiCallbackController, ProviderAdminController],
  providers: [OpenapiAdapterService, ProviderRuntimeService],
  exports: [OpenapiAdapterService, ProviderRuntimeService],
})
export class ProviderModule {}
