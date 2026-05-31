import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HealthModule } from './modules/health/health.module';
import { ProductsModule } from './modules/products/products.module';
import { OrdersModule } from './modules/orders/orders.module';
import { ChecksModule } from './modules/checks/checks.module';
import { BillingModule } from './modules/billing/billing.module';
import { ProviderModule } from './modules/provider/provider.module';
import { ReportsModule } from './modules/reports/reports.module';
import { CustomerDashboardModule } from './modules/customer-dashboard/customer-dashboard.module';
import { AuditModule } from './modules/audit/audit.module';
import { AdminOperationsModule } from './modules/admin-operations/admin-operations.module';
import { SecurityModule } from './modules/security/security.module';
import { FiscalLegalModule } from './modules/fiscal-legal/fiscal-legal.module';
import { AuthModule } from './modules/auth/auth.module';
import { PartnerPortalModule } from './modules/partner-portal/partner-portal.module';
import { SeoCmsModule } from './modules/seo-cms/seo-cms.module';
import { LaunchReadinessModule } from './modules/launch-readiness/launch-readiness.module';
import { SalesCrmModule } from './modules/sales-crm/sales-crm.module';
import { SettingsAdminModule } from './modules/settings-admin/settings-admin.module';
import { AnalyticsModule } from './modules/analytics/analytics.module';
import { PlatformSetting } from './modules/settings-admin/entities/platform-setting.entity';
import { PlatformSettingAudit } from './modules/settings-admin/entities/platform-setting-audit.entity';
import { OperationalErrorEvent } from './modules/settings-admin/entities/operational-error-event.entity';
import { PurchaseIpAudit } from './modules/settings-admin/entities/purchase-ip-audit.entity';
import { Organization } from './modules/organizations/organization.entity';
import { User } from './modules/users/user.entity';
import { Product } from './modules/products/product.entity';
import { Order } from './modules/orders/order.entity';
import { Check } from './modules/checks/check.entity';
import { Report } from './modules/reports/report.entity';
import { AuditLog } from './modules/audit/audit-log.entity';
import { BillingProfile } from './modules/billing/entities/billing-profile.entity';
import { CheckoutSession } from './modules/billing/entities/checkout-session.entity';
import { Invoice } from './modules/billing/entities/invoice.entity';
import { Payment } from './modules/billing/entities/payment.entity';
import { PaymentLedgerEntry } from './modules/billing/entities/payment-ledger-entry.entity';
import { PaymentWebhookEvent } from './modules/billing/entities/payment-webhook-event.entity';
import { BillingSubscription } from './modules/billing/entities/billing-subscription.entity';
import { CreditWallet } from './modules/billing/entities/credit-wallet.entity';
import { CreditLedgerEntry } from './modules/billing/entities/credit-ledger-entry.entity';
import { RefundRequest } from './modules/billing/entities/refund-request.entity';
import { PaymentDispute } from './modules/billing/entities/payment-dispute.entity';

import { ProviderRequest } from './modules/provider/entities/provider-request.entity';
import { ProviderRequestEvent } from './modules/provider/entities/provider-request-event.entity';
import { ProviderCostLedgerEntry } from './modules/provider/entities/provider-cost-ledger-entry.entity';
import { ProviderRawPayloadVault } from './modules/provider/entities/provider-raw-payload-vault.entity';
import { CustomerNotification } from './modules/customer-dashboard/entities/customer-notification.entity';
import { CustomerTask } from './modules/customer-dashboard/entities/customer-task.entity';
import { SupportTicket } from './modules/customer-dashboard/entities/support-ticket.entity';
import { AdminWorkItem } from './modules/admin-operations/entities/admin-work-item.entity';
import { AdminActionAudit } from './modules/admin-operations/entities/admin-action-audit.entity';
import { FiscalLegalAuditEvent } from './modules/fiscal-legal/entities/fiscal-legal-audit.entity';
import { LegalAcceptance } from './modules/fiscal-legal/entities/legal-acceptance.entity';
import { LegalDocumentVersion } from './modules/fiscal-legal/entities/legal-document-version.entity';
import { FiscalDocument } from './modules/fiscal-legal/entities/fiscal-document.entity';
import { Account } from './modules/auth/entities/account.entity';
import { AccountMembership } from './modules/auth/entities/account-membership.entity';
import { AccountInvitation } from './modules/auth/entities/account-invitation.entity';
import { AuthSession } from './modules/auth/entities/auth-session.entity';
import { PasswordResetToken } from './modules/auth/entities/password-reset-token.entity';
import { EmailVerificationToken } from './modules/auth/entities/email-verification-token.entity';
import { AuthAuditEvent } from './modules/auth/entities/auth-audit-event.entity';
import { CustomerTaxProfile } from './modules/fiscal-legal/entities/customer-tax-profile.entity';
import { PartnerAccount } from './modules/partner-portal/entities/partner-account.entity';
import { PartnerApiKey } from './modules/partner-portal/entities/partner-api-key.entity';
import { PartnerWebhookEndpoint } from './modules/partner-portal/entities/partner-webhook-endpoint.entity';
import { PartnerUsageLedgerEntry } from './modules/partner-portal/entities/partner-usage-ledger-entry.entity';
import { PartnerRateLimitProfile } from './modules/partner-portal/entities/partner-rate-limit-profile.entity';
import { PartnerLiveAccessRequest } from './modules/partner-portal/entities/partner-live-access-request.entity';
import { PartnerIdempotencyRecord } from './modules/partner-portal/entities/partner-idempotency-record.entity';
import { SeoPage } from './modules/seo-cms/entities/seo-page.entity';
import { SeoPageVersion } from './modules/seo-cms/entities/seo-page-version.entity';
import { CrmSupportTicket } from './modules/sales-crm/entities/crm-support-ticket.entity';
import { SalesOpportunity } from './modules/sales-crm/entities/sales-opportunity.entity';
import { SalesLead } from './modules/sales-crm/entities/sales-lead.entity';
import { ContactMessage } from './modules/sales-crm/entities/contact-message.entity';
import { AnalyticsEvent } from './modules/analytics/entities/analytics-event.entity';
import { AnalyticsAttributionSnapshot } from './modules/analytics/entities/analytics-attribution-snapshot.entity';
import { AnalyticsKpiSnapshot } from './modules/analytics/entities/analytics-kpi-snapshot.entity';
import { OpenaiCopilotModule } from './modules/openai-copilot/openai-copilot.module';
import { EmailNotificationsModule } from './modules/email-notifications/email-notifications.module';
import { OpenaiPromptTemplate } from './modules/openai-copilot/entities/openai-prompt-template.entity';
import { OpenaiRequest } from './modules/openai-copilot/entities/openai-request.entity';
import { OpenaiUsageLedgerEntry } from './modules/openai-copilot/entities/openai-usage-ledger.entity';
import { OpenaiCopilotDraft } from './modules/openai-copilot/entities/openai-copilot-draft.entity';
import { EmailTemplate } from './modules/email-notifications/entities/email-template.entity';
import { EmailEvent } from './modules/email-notifications/entities/email-event.entity';
import { EmailDelivery } from './modules/email-notifications/entities/email-delivery.entity';
import { EmailSuppression } from './modules/email-notifications/entities/email-suppression.entity';
import { EmailSecureLink } from './modules/email-notifications/entities/email-secure-link.entity';
import { EmailProviderWebhookEvent } from './modules/email-notifications/entities/email-provider-webhook-event.entity';
import { SandboxCertificationModule } from './modules/sandbox-certification/sandbox-certification.module';
import { SandboxScenario } from './modules/sandbox-certification/entities/sandbox-scenario.entity';
import { SandboxCertificationRun } from './modules/sandbox-certification/entities/sandbox-certification-run.entity';
import { SandboxScenarioResult } from './modules/sandbox-certification/entities/sandbox-scenario-result.entity';
import { SandboxEvidence } from './modules/sandbox-certification/entities/sandbox-evidence.entity';
import { SandboxWaiver } from './modules/sandbox-certification/entities/sandbox-waiver.entity';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        url: config.get<string>('DATABASE_URL'),
        entities: [Organization, User, Product, Order, Check, Report, AuditLog, BillingProfile, CheckoutSession, Payment, PaymentLedgerEntry, PaymentWebhookEvent, Invoice, BillingSubscription, CreditWallet, CreditLedgerEntry, RefundRequest, PaymentDispute, ProviderRequest, ProviderRequestEvent, ProviderCostLedgerEntry, ProviderRawPayloadVault, CustomerNotification, CustomerTask, SupportTicket, AdminWorkItem, AdminActionAudit, CustomerTaxProfile, FiscalDocument, LegalDocumentVersion, LegalAcceptance, FiscalLegalAuditEvent, Account, AccountMembership, AccountInvitation, AuthSession, PasswordResetToken, EmailVerificationToken, AuthAuditEvent, PartnerAccount, PartnerApiKey, PartnerWebhookEndpoint, PartnerUsageLedgerEntry, PartnerRateLimitProfile, PartnerLiveAccessRequest, PartnerIdempotencyRecord, SeoPage, SeoPageVersion, ContactMessage, SalesLead, SalesOpportunity, CrmSupportTicket, PlatformSetting, PlatformSettingAudit, OperationalErrorEvent, PurchaseIpAudit, AnalyticsEvent, AnalyticsAttributionSnapshot, AnalyticsKpiSnapshot, OpenaiPromptTemplate, OpenaiRequest, OpenaiUsageLedgerEntry, OpenaiCopilotDraft, EmailTemplate, EmailEvent, EmailDelivery, EmailSuppression, EmailSecureLink, EmailProviderWebhookEvent, SandboxScenario, SandboxCertificationRun, SandboxScenarioResult, SandboxEvidence, SandboxWaiver],
        synchronize:
          config.get<string>('DATABASE_SYNCHRONIZE') === 'true' ||
          (config.get<string>('NODE_ENV') !== 'production' && config.get<string>('DATABASE_SYNCHRONIZE') !== 'false'),
        logging:
          config.get<string>('DATABASE_LOGGING') === 'true' ||
          (config.get<string>('NODE_ENV') !== 'production' && config.get<string>('DATABASE_LOGGING') !== 'false'),
      }),
    }),
    HealthModule,
    AuditModule,
    ProductsModule,
    OrdersModule,
    ProviderModule,
    ChecksModule,
    BillingModule,
    ReportsModule,
    CustomerDashboardModule,
    AdminOperationsModule,
    SecurityModule,
    FiscalLegalModule,
    AuthModule,
    PartnerPortalModule,
    SeoCmsModule,
    LaunchReadinessModule,
    SalesCrmModule,
    SettingsAdminModule,
    AnalyticsModule,
    OpenaiCopilotModule,
    EmailNotificationsModule,
    SandboxCertificationModule,
  ],
})
export class AppModule {}
