import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { AccountMembership } from '../auth/entities/account-membership.entity';
import { Account } from '../auth/entities/account.entity';
import { User } from '../users/user.entity';
import { OperationalErrorEvent } from './entities/operational-error-event.entity';
import { PlatformSettingAudit } from './entities/platform-setting-audit.entity';
import { PlatformSetting } from './entities/platform-setting.entity';
import { PurchaseIpAudit } from './entities/purchase-ip-audit.entity';
import { SettingsAdminController } from './settings-admin.controller';
import { SettingsAdminService } from './settings-admin.service';

@Module({
  imports: [TypeOrmModule.forFeature([PlatformSetting, PlatformSettingAudit, OperationalErrorEvent, PurchaseIpAudit, User, Account, AccountMembership]), AuthModule],
  controllers: [SettingsAdminController],
  providers: [SettingsAdminService],
  exports: [SettingsAdminService],
})
export class SettingsAdminModule {}
