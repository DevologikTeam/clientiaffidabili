import { BadRequestException, ConflictException, Injectable, NotFoundException, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { createHash, randomUUID } from 'crypto';
import { Repository } from 'typeorm';
import { AuthPasswordService } from '../auth/auth-password.service';
import { AccountMembership } from '../auth/entities/account-membership.entity';
import { Account } from '../auth/entities/account.entity';
import { User } from '../users/user.entity';
import { BootstrapAdminDto } from './dto/bootstrap-admin.dto';
import { CreateOperationalErrorDto } from './dto/create-operational-error.dto';
import { OperationalErrorActionDto } from './dto/operational-error-action.dto';
import { PurchaseKillSwitchDto } from './dto/purchase-kill-switch.dto';
import { UpdatePlatformSettingDto } from './dto/update-platform-setting.dto';
import { UpdateSecretSettingDto } from './dto/update-secret-setting.dto';
import { OperationalErrorEvent } from './entities/operational-error-event.entity';
import { PlatformSettingAudit } from './entities/platform-setting-audit.entity';
import { PlatformSetting } from './entities/platform-setting.entity';
import { PurchaseIpAudit } from './entities/purchase-ip-audit.entity';
import type { PlatformSettingNamespace, PurchaseRequestContext, SafeSettingView } from './settings-admin-runtime.types';

const DEFAULT_ACTOR = 'system';
const BOOTSTRAP_ACCOUNT_NAME = 'ClientiAffidabili Platform Admin';

const DEFAULT_SETTINGS: Array<Partial<PlatformSetting> & { namespace: PlatformSettingNamespace; key: string; valueJson?: unknown }> = [
  {
    namespace: 'commerce',
    key: 'purchases.enabled',
    label: 'Acquisti attivi',
    description: 'Abilita o sospende server-side la creazione di nuove sessioni checkout, pacchetti crediti e abbonamenti.',
    valueJson: true,
    sensitivity: 'restricted_admin',
    requiresReasonOnChange: true,
    goLiveBlocker: true,
  },
  {
    namespace: 'commerce',
    key: 'purchases.disabledMessage',
    label: 'Messaggio sospensione acquisti',
    description: 'Testo mostrato ai clienti quando gli acquisti sono temporaneamente sospesi.',
    valueJson: 'Gli acquisti sono temporaneamente sospesi. Le richieste già pagate continuano il normale ciclo operativo.',
    sensitivity: 'public_admin',
    requiresReasonOnChange: true,
  },
  {
    namespace: 'payments',
    key: 'stripe.enabled',
    label: 'Stripe abilitato',
    description: 'Abilita Stripe come provider pagamento, se le secret reference sono configurate e verificate.',
    valueJson: false,
    sensitivity: 'restricted_admin',
    requiresReasonOnChange: true,
  },
  {
    namespace: 'payments',
    key: 'stripe.secretKey',
    label: 'Stripe Secret Key',
    description: 'Secret reference della chiave Stripe. Il valore è write-only e non viene mai restituito in chiaro.',
    sensitivity: 'secret_write_only',
    valueSource: 'secret_ref',
    state: 'requires_review',
    requiresReasonOnChange: true,
    requiresVerificationAfterChange: true,
    goLiveBlocker: true,
  },
  {
    namespace: 'payments',
    key: 'paypal.enabled',
    label: 'PayPal abilitato',
    description: 'Abilita PayPal solo dopo verifica sandbox/webhook e riconciliazione.',
    valueJson: false,
    sensitivity: 'restricted_admin',
    requiresReasonOnChange: true,
  },
  {
    namespace: 'provider_openapi',
    key: 'openapi.callsEnabled',
    label: 'Chiamate Openapi abilitate',
    description: 'Abilita le chiamate al provider dati dopo pagamento o credito riservato.',
    valueJson: false,
    sensitivity: 'restricted_admin',
    requiresReasonOnChange: true,
    goLiveBlocker: true,
  },
  {
    namespace: 'provider_openapi',
    key: 'openapi.apiKey',
    label: 'Openapi API Key',
    description: 'Secret reference della chiave Openapi. Write-only, backend-only, mai esposta in UI o log.',
    sensitivity: 'secret_write_only',
    valueSource: 'secret_ref',
    state: 'requires_review',
    requiresReasonOnChange: true,
    requiresVerificationAfterChange: true,
    goLiveBlocker: true,
  },
  {
    namespace: 'openai',
    key: 'openai.enabled',
    label: 'OpenAI funzioni interne abilitate',
    description: 'Abilita funzioni AI interne solo dopo redaction, budget e use case approvati.',
    valueJson: false,
    sensitivity: 'restricted_admin',
    requiresReasonOnChange: true,
  },
  {
    namespace: 'openai',
    key: 'openai.apiKey',
    label: 'OpenAI API Key',
    description: 'Secret reference della chiave OpenAI. Write-only, backend-only, mai inviata al frontend.',
    sensitivity: 'secret_write_only',
    valueSource: 'secret_ref',
    state: 'requires_review',
    requiresReasonOnChange: true,
    requiresVerificationAfterChange: true,
  },
  {
    namespace: 'openai',
    key: 'openai.monthlyBudgetCents',
    label: 'Budget mensile OpenAI',
    description: 'Limite di spesa mensile per funzioni AI interne, espresso in centesimi.',
    valueJson: 5000,
    sensitivity: 'restricted_admin',
    requiresReasonOnChange: true,
  },


  {
    namespace: 'openai',
    key: 'openai.defaultModel',
    label: 'Modello OpenAI predefinito',
    description: 'Modello usato per funzioni AI interne standard. Deve essere modificabile solo da admin autorizzato.',
    valueJson: 'gpt-4.1-mini',
    sensitivity: 'restricted_admin',
    requiresReasonOnChange: true,
  },
  {
    namespace: 'openai',
    key: 'openai.lowCostModel',
    label: 'Modello OpenAI low cost',
    description: 'Modello usato per bozze copy, sintesi e funzioni a basso rischio.',
    valueJson: 'gpt-4.1-mini',
    sensitivity: 'restricted_admin',
    requiresReasonOnChange: true,
  },
  {
    namespace: 'openai',
    key: 'openai.dailyBudgetCents',
    label: 'Budget giornaliero OpenAI',
    description: 'Limite giornaliero in centesimi per funzioni AI interne.',
    valueJson: 500,
    sensitivity: 'restricted_admin',
    requiresReasonOnChange: true,
  },
  {
    namespace: 'openai',
    key: 'openai.allowedUseCases',
    label: 'Use case OpenAI abilitati',
    description: 'Lista dei casi d uso AI consentiti. Ogni output pubblico resta soggetto ad approvazione.',
    valueJson: ['cms_seo_suggestion', 'support_reply_draft', 'error_ledger_summary', 'admin_operations_explain', 'release_qa_summary'],
    sensitivity: 'restricted_admin',
    requiresReasonOnChange: true,
  },
  {
    namespace: 'openai',
    key: 'openai.requireApprovalForPublicContent',
    label: 'Approvazione obbligatoria contenuti pubblici',
    description: 'Blocca qualsiasi applicazione diretta di contenuti pubblici generati o suggeriti da AI.',
    valueJson: true,
    sensitivity: 'restricted_admin',
    requiresReasonOnChange: true,
  },

  {
    namespace: 'analytics',
    key: 'externalTags.enabled',
    label: 'Tag esterni abilitati',
    description: 'Abilita il loader esterno per Google Tag Manager e Microsoft Clarity solo sulle route consentite e dopo consenso valido.',
    valueJson: false,
    sensitivity: 'restricted_admin',
    requiresReasonOnChange: true,
  },

  {
    namespace: 'openai',
    key: 'openai.defaultModel',
    label: 'Modello OpenAI predefinito',
    description: 'Modello usato per funzioni AI interne standard. Deve essere modificabile solo da admin autorizzato.',
    valueJson: 'gpt-4.1-mini',
    sensitivity: 'restricted_admin',
    requiresReasonOnChange: true,
  },
  {
    namespace: 'openai',
    key: 'openai.lowCostModel',
    label: 'Modello OpenAI low cost',
    description: 'Modello usato per bozze copy, sintesi e funzioni a basso rischio.',
    valueJson: 'gpt-4.1-mini',
    sensitivity: 'restricted_admin',
    requiresReasonOnChange: true,
  },
  {
    namespace: 'openai',
    key: 'openai.dailyBudgetCents',
    label: 'Budget giornaliero OpenAI',
    description: 'Limite giornaliero in centesimi per funzioni AI interne.',
    valueJson: 500,
    sensitivity: 'restricted_admin',
    requiresReasonOnChange: true,
  },
  {
    namespace: 'openai',
    key: 'openai.allowedUseCases',
    label: 'Use case OpenAI abilitati',
    description: 'Lista dei casi d uso AI consentiti. Ogni output pubblico resta soggetto ad approvazione.',
    valueJson: ['cms_seo_suggestion', 'support_reply_draft', 'error_ledger_summary', 'admin_operations_explain', 'release_qa_summary'],
    sensitivity: 'restricted_admin',
    requiresReasonOnChange: true,
  },
  {
    namespace: 'openai',
    key: 'openai.requireApprovalForPublicContent',
    label: 'Approvazione obbligatoria contenuti pubblici',
    description: 'Blocca qualsiasi applicazione diretta di contenuti pubblici generati o suggeriti da AI.',
    valueJson: true,
    sensitivity: 'restricted_admin',
    requiresReasonOnChange: true,
  },

  {
    namespace: 'analytics',
    key: 'gtm.enabled',
    label: 'Google Tag Manager abilitato',
    description: 'Abilita GTM se e solo se container ID, consenso e denylist route sono validi.',
    valueJson: false,
    sensitivity: 'restricted_admin',
    requiresReasonOnChange: true,
  },

  {
    namespace: 'openai',
    key: 'openai.defaultModel',
    label: 'Modello OpenAI predefinito',
    description: 'Modello usato per funzioni AI interne standard. Deve essere modificabile solo da admin autorizzato.',
    valueJson: 'gpt-4.1-mini',
    sensitivity: 'restricted_admin',
    requiresReasonOnChange: true,
  },
  {
    namespace: 'openai',
    key: 'openai.lowCostModel',
    label: 'Modello OpenAI low cost',
    description: 'Modello usato per bozze copy, sintesi e funzioni a basso rischio.',
    valueJson: 'gpt-4.1-mini',
    sensitivity: 'restricted_admin',
    requiresReasonOnChange: true,
  },
  {
    namespace: 'openai',
    key: 'openai.dailyBudgetCents',
    label: 'Budget giornaliero OpenAI',
    description: 'Limite giornaliero in centesimi per funzioni AI interne.',
    valueJson: 500,
    sensitivity: 'restricted_admin',
    requiresReasonOnChange: true,
  },
  {
    namespace: 'openai',
    key: 'openai.allowedUseCases',
    label: 'Use case OpenAI abilitati',
    description: 'Lista dei casi d uso AI consentiti. Ogni output pubblico resta soggetto ad approvazione.',
    valueJson: ['cms_seo_suggestion', 'support_reply_draft', 'error_ledger_summary', 'admin_operations_explain', 'release_qa_summary'],
    sensitivity: 'restricted_admin',
    requiresReasonOnChange: true,
  },
  {
    namespace: 'openai',
    key: 'openai.requireApprovalForPublicContent',
    label: 'Approvazione obbligatoria contenuti pubblici',
    description: 'Blocca qualsiasi applicazione diretta di contenuti pubblici generati o suggeriti da AI.',
    valueJson: true,
    sensitivity: 'restricted_admin',
    requiresReasonOnChange: true,
  },

  {
    namespace: 'analytics',
    key: 'gtm.containerId',
    label: 'Google Tag Manager Container ID',
    description: 'Container ID GTM nel formato GTM-XXXXXXX. Non inserire script completi o codice HTML.',
    valueJson: '',
    sensitivity: 'restricted_admin',
    requiresReasonOnChange: true,
    requiresVerificationAfterChange: true,
  },

  {
    namespace: 'openai',
    key: 'openai.defaultModel',
    label: 'Modello OpenAI predefinito',
    description: 'Modello usato per funzioni AI interne standard. Deve essere modificabile solo da admin autorizzato.',
    valueJson: 'gpt-4.1-mini',
    sensitivity: 'restricted_admin',
    requiresReasonOnChange: true,
  },
  {
    namespace: 'openai',
    key: 'openai.lowCostModel',
    label: 'Modello OpenAI low cost',
    description: 'Modello usato per bozze copy, sintesi e funzioni a basso rischio.',
    valueJson: 'gpt-4.1-mini',
    sensitivity: 'restricted_admin',
    requiresReasonOnChange: true,
  },
  {
    namespace: 'openai',
    key: 'openai.dailyBudgetCents',
    label: 'Budget giornaliero OpenAI',
    description: 'Limite giornaliero in centesimi per funzioni AI interne.',
    valueJson: 500,
    sensitivity: 'restricted_admin',
    requiresReasonOnChange: true,
  },
  {
    namespace: 'openai',
    key: 'openai.allowedUseCases',
    label: 'Use case OpenAI abilitati',
    description: 'Lista dei casi d uso AI consentiti. Ogni output pubblico resta soggetto ad approvazione.',
    valueJson: ['cms_seo_suggestion', 'support_reply_draft', 'error_ledger_summary', 'admin_operations_explain', 'release_qa_summary'],
    sensitivity: 'restricted_admin',
    requiresReasonOnChange: true,
  },
  {
    namespace: 'openai',
    key: 'openai.requireApprovalForPublicContent',
    label: 'Approvazione obbligatoria contenuti pubblici',
    description: 'Blocca qualsiasi applicazione diretta di contenuti pubblici generati o suggeriti da AI.',
    valueJson: true,
    sensitivity: 'restricted_admin',
    requiresReasonOnChange: true,
  },

  {
    namespace: 'analytics',
    key: 'clarity.enabled',
    label: 'Microsoft Clarity abilitato',
    description: 'Abilita Clarity solo su pagine pubbliche non sensibili. Admin, dashboard, checkout, report e fatture restano esclusi.',
    valueJson: false,
    sensitivity: 'restricted_admin',
    requiresReasonOnChange: true,
  },

  {
    namespace: 'openai',
    key: 'openai.defaultModel',
    label: 'Modello OpenAI predefinito',
    description: 'Modello usato per funzioni AI interne standard. Deve essere modificabile solo da admin autorizzato.',
    valueJson: 'gpt-4.1-mini',
    sensitivity: 'restricted_admin',
    requiresReasonOnChange: true,
  },
  {
    namespace: 'openai',
    key: 'openai.lowCostModel',
    label: 'Modello OpenAI low cost',
    description: 'Modello usato per bozze copy, sintesi e funzioni a basso rischio.',
    valueJson: 'gpt-4.1-mini',
    sensitivity: 'restricted_admin',
    requiresReasonOnChange: true,
  },
  {
    namespace: 'openai',
    key: 'openai.dailyBudgetCents',
    label: 'Budget giornaliero OpenAI',
    description: 'Limite giornaliero in centesimi per funzioni AI interne.',
    valueJson: 500,
    sensitivity: 'restricted_admin',
    requiresReasonOnChange: true,
  },
  {
    namespace: 'openai',
    key: 'openai.allowedUseCases',
    label: 'Use case OpenAI abilitati',
    description: 'Lista dei casi d uso AI consentiti. Ogni output pubblico resta soggetto ad approvazione.',
    valueJson: ['cms_seo_suggestion', 'support_reply_draft', 'error_ledger_summary', 'admin_operations_explain', 'release_qa_summary'],
    sensitivity: 'restricted_admin',
    requiresReasonOnChange: true,
  },
  {
    namespace: 'openai',
    key: 'openai.requireApprovalForPublicContent',
    label: 'Approvazione obbligatoria contenuti pubblici',
    description: 'Blocca qualsiasi applicazione diretta di contenuti pubblici generati o suggeriti da AI.',
    valueJson: true,
    sensitivity: 'restricted_admin',
    requiresReasonOnChange: true,
  },

  {
    namespace: 'analytics',
    key: 'clarity.projectId',
    label: 'Microsoft Clarity Project ID',
    description: 'Project ID Clarity. Non inserire script completo o codice HTML.',
    valueJson: '',
    sensitivity: 'restricted_admin',
    requiresReasonOnChange: true,
    requiresVerificationAfterChange: true,
  },

  {
    namespace: 'openai',
    key: 'openai.defaultModel',
    label: 'Modello OpenAI predefinito',
    description: 'Modello usato per funzioni AI interne standard. Deve essere modificabile solo da admin autorizzato.',
    valueJson: 'gpt-4.1-mini',
    sensitivity: 'restricted_admin',
    requiresReasonOnChange: true,
  },
  {
    namespace: 'openai',
    key: 'openai.lowCostModel',
    label: 'Modello OpenAI low cost',
    description: 'Modello usato per bozze copy, sintesi e funzioni a basso rischio.',
    valueJson: 'gpt-4.1-mini',
    sensitivity: 'restricted_admin',
    requiresReasonOnChange: true,
  },
  {
    namespace: 'openai',
    key: 'openai.dailyBudgetCents',
    label: 'Budget giornaliero OpenAI',
    description: 'Limite giornaliero in centesimi per funzioni AI interne.',
    valueJson: 500,
    sensitivity: 'restricted_admin',
    requiresReasonOnChange: true,
  },
  {
    namespace: 'openai',
    key: 'openai.allowedUseCases',
    label: 'Use case OpenAI abilitati',
    description: 'Lista dei casi d uso AI consentiti. Ogni output pubblico resta soggetto ad approvazione.',
    valueJson: ['cms_seo_suggestion', 'support_reply_draft', 'error_ledger_summary', 'admin_operations_explain', 'release_qa_summary'],
    sensitivity: 'restricted_admin',
    requiresReasonOnChange: true,
  },
  {
    namespace: 'openai',
    key: 'openai.requireApprovalForPublicContent',
    label: 'Approvazione obbligatoria contenuti pubblici',
    description: 'Blocca qualsiasi applicazione diretta di contenuti pubblici generati o suggeriti da AI.',
    valueJson: true,
    sensitivity: 'restricted_admin',
    requiresReasonOnChange: true,
  },

  {
    namespace: 'analytics',
    key: 'consent.defaultMode',
    label: 'Default consenso tracking',
    description: 'Default prudente per Consent Mode. Deve restare denied finche non esiste consenso valido.',
    valueJson: {
      analytics_storage: 'denied',
      ad_storage: 'denied',
      ad_user_data: 'denied',
      ad_personalization: 'denied'
    },
    sensitivity: 'restricted_admin',
    requiresReasonOnChange: true,
  },

  {
    namespace: 'openai',
    key: 'openai.defaultModel',
    label: 'Modello OpenAI predefinito',
    description: 'Modello usato per funzioni AI interne standard. Deve essere modificabile solo da admin autorizzato.',
    valueJson: 'gpt-4.1-mini',
    sensitivity: 'restricted_admin',
    requiresReasonOnChange: true,
  },
  {
    namespace: 'openai',
    key: 'openai.lowCostModel',
    label: 'Modello OpenAI low cost',
    description: 'Modello usato per bozze copy, sintesi e funzioni a basso rischio.',
    valueJson: 'gpt-4.1-mini',
    sensitivity: 'restricted_admin',
    requiresReasonOnChange: true,
  },
  {
    namespace: 'openai',
    key: 'openai.dailyBudgetCents',
    label: 'Budget giornaliero OpenAI',
    description: 'Limite giornaliero in centesimi per funzioni AI interne.',
    valueJson: 500,
    sensitivity: 'restricted_admin',
    requiresReasonOnChange: true,
  },
  {
    namespace: 'openai',
    key: 'openai.allowedUseCases',
    label: 'Use case OpenAI abilitati',
    description: 'Lista dei casi d uso AI consentiti. Ogni output pubblico resta soggetto ad approvazione.',
    valueJson: ['cms_seo_suggestion', 'support_reply_draft', 'error_ledger_summary', 'admin_operations_explain', 'release_qa_summary'],
    sensitivity: 'restricted_admin',
    requiresReasonOnChange: true,
  },
  {
    namespace: 'openai',
    key: 'openai.requireApprovalForPublicContent',
    label: 'Approvazione obbligatoria contenuti pubblici',
    description: 'Blocca qualsiasi applicazione diretta di contenuti pubblici generati o suggeriti da AI.',
    valueJson: true,
    sensitivity: 'restricted_admin',
    requiresReasonOnChange: true,
  },

  {
    namespace: 'analytics',
    key: 'clarity.blockedRoutePrefixes',
    label: 'Route escluse da Clarity',
    description: 'Denylist route dove session recording e heatmap non devono mai attivarsi.',
    valueJson: ['/admin', '/dashboard', '/checkout', '/reports', '/fatture', '/api', '/invito', '/reset-password', '/legal'],
    sensitivity: 'restricted_admin',
    requiresReasonOnChange: true,
  },

  {
    namespace: 'openai',
    key: 'openai.defaultModel',
    label: 'Modello OpenAI predefinito',
    description: 'Modello usato per funzioni AI interne standard. Deve essere modificabile solo da admin autorizzato.',
    valueJson: 'gpt-4.1-mini',
    sensitivity: 'restricted_admin',
    requiresReasonOnChange: true,
  },
  {
    namespace: 'openai',
    key: 'openai.lowCostModel',
    label: 'Modello OpenAI low cost',
    description: 'Modello usato per bozze copy, sintesi e funzioni a basso rischio.',
    valueJson: 'gpt-4.1-mini',
    sensitivity: 'restricted_admin',
    requiresReasonOnChange: true,
  },
  {
    namespace: 'openai',
    key: 'openai.dailyBudgetCents',
    label: 'Budget giornaliero OpenAI',
    description: 'Limite giornaliero in centesimi per funzioni AI interne.',
    valueJson: 500,
    sensitivity: 'restricted_admin',
    requiresReasonOnChange: true,
  },
  {
    namespace: 'openai',
    key: 'openai.allowedUseCases',
    label: 'Use case OpenAI abilitati',
    description: 'Lista dei casi d uso AI consentiti. Ogni output pubblico resta soggetto ad approvazione.',
    valueJson: ['cms_seo_suggestion', 'support_reply_draft', 'error_ledger_summary', 'admin_operations_explain', 'release_qa_summary'],
    sensitivity: 'restricted_admin',
    requiresReasonOnChange: true,
  },
  {
    namespace: 'openai',
    key: 'openai.requireApprovalForPublicContent',
    label: 'Approvazione obbligatoria contenuti pubblici',
    description: 'Blocca qualsiasi applicazione diretta di contenuti pubblici generati o suggeriti da AI.',
    valueJson: true,
    sensitivity: 'restricted_admin',
    requiresReasonOnChange: true,
  },

  {
    namespace: 'analytics',
    key: 'clarity.allowedRoutePrefixes',
    label: 'Route pubbliche abilitate a Clarity',
    description: 'Allowlist route pubbliche dove Clarity puo essere caricato dopo consenso valido.',
    valueJson: ['/', '/servizi', '/prezzi', '/guide', '/garanzia-operativa', '/contatti'],
    sensitivity: 'restricted_admin',
    requiresReasonOnChange: true,
  },
  {
    namespace: 'email',
    key: 'email.deliveryEnabled',
    label: 'Invio email abilitato',
    description: 'Abilita invio email. I messaggi contatto restano comunque salvati in admin anche se invio fallisce.',
    valueJson: false,
    sensitivity: 'restricted_admin',
    requiresReasonOnChange: true,
  },
];

@Injectable()
export class SettingsAdminService implements OnModuleInit {
  constructor(
    @InjectRepository(PlatformSetting) private readonly settings: Repository<PlatformSetting>,
    @InjectRepository(PlatformSettingAudit) private readonly audits: Repository<PlatformSettingAudit>,
    @InjectRepository(OperationalErrorEvent) private readonly errors: Repository<OperationalErrorEvent>,
    @InjectRepository(PurchaseIpAudit) private readonly purchaseIpAudits: Repository<PurchaseIpAudit>,
    @InjectRepository(User) private readonly users: Repository<User>,
    @InjectRepository(Account) private readonly accounts: Repository<Account>,
    @InjectRepository(AccountMembership) private readonly memberships: Repository<AccountMembership>,
    private readonly passwords: AuthPasswordService,
  ) {}

  async onModuleInit(): Promise<void> {
    await this.ensureDefaultSettings();
  }

  async ensureDefaultSettings(): Promise<void> {
    for (const item of DEFAULT_SETTINGS) {
      const existing = await this.settings.findOne({ where: { namespace: item.namespace, key: item.key } });
      if (existing) continue;
      const setting = this.settings.create({
        label: item.label ?? item.key,
        description: item.description ?? item.key,
        namespace: item.namespace,
        key: item.key,
        environment: item.environment ?? 'all',
        state: item.state ?? 'active',
        valueSource: item.valueSource ?? (item.sensitivity === 'secret_write_only' ? 'secret_ref' : 'database'),
        sensitivity: item.sensitivity ?? 'restricted_admin',
        valueJson: item.valueJson,
        requiresReasonOnChange: item.requiresReasonOnChange ?? true,
        requiresVerificationAfterChange: item.requiresVerificationAfterChange ?? false,
        goLiveBlocker: item.goLiveBlocker ?? false,
        metadata: item.metadata ?? {},
      });
      await this.settings.save(setting);
      await this.appendAudit(setting, 'created', 'Impostazione bootstrap di sistema.', DEFAULT_ACTOR);
    }
  }

  async overview() {
    await this.ensureDefaultSettings();
    const all = await this.settings.find({ order: { namespace: 'ASC', key: 'ASC' } });
    const grouped = new Map<string, PlatformSetting[]>();
    for (const setting of all) grouped.set(setting.namespace, [...(grouped.get(setting.namespace) ?? []), setting]);
    const openErrors = await this.errors.count({ where: [{ status: 'new' }, { status: 'investigating' }, { status: 'fix_pending' }, { status: 'refund_pending' }] });
    return {
      purchasesEnabled: await this.arePurchasesEnabled(),
      criticalErrors: await this.errors.count({ where: { severity: 'critical', status: 'new' } }),
      openErrors,
      settingsRequiringReview: all.filter((setting) => setting.state === 'requires_review' || setting.state === 'error').length,
      namespaces: [...grouped.entries()].map(([namespace, settings]) => ({
        namespace,
        label: this.namespaceLabel(namespace),
        state: settings.some((s) => s.state === 'error') ? 'error' : settings.some((s) => s.state === 'requires_review') ? 'warning' : settings.every((s) => s.state === 'disabled') ? 'disabled' : 'ok',
        issueCount: settings.filter((s) => s.state === 'requires_review' || s.state === 'error').length,
        total: settings.length,
      })),
    };
  }

  async listNamespace(namespace: PlatformSettingNamespace): Promise<{ namespace: PlatformSettingNamespace; settings: SafeSettingView[] }> {
    await this.ensureDefaultSettings();
    const settings = await this.settings.find({ where: { namespace }, order: { key: 'ASC' } });
    return { namespace, settings: settings.map((setting) => this.safeView(setting)) };
  }

  async updateSetting(namespace: PlatformSettingNamespace, key: string, dto: UpdatePlatformSettingDto, context?: PurchaseRequestContext): Promise<SafeSettingView> {
    const setting = await this.getSetting(namespace, key);
    if (setting.sensitivity === 'secret_write_only') {
      throw new BadRequestException('Questa impostazione è write-only. Usa l endpoint secret dedicato.');
    }
    this.assertReason(setting, dto.reason);
    const before = this.auditSnapshot(setting);
    setting.valueJson = dto.value;
    setting.valueSource = 'database';
    setting.state = 'active';
    setting.lastChangedBy = dto.actorId ?? context?.actorId ?? DEFAULT_ACTOR;
    setting.lastChangeReason = dto.reason;
    const saved = await this.settings.save(setting);
    await this.appendAudit(saved, 'updated', dto.reason, setting.lastChangedBy, before, this.auditSnapshot(saved), context?.ipAddress);
    return this.safeView(saved);
  }

  async updateSecret(namespace: PlatformSettingNamespace, key: string, dto: UpdateSecretSettingDto, context?: PurchaseRequestContext): Promise<SafeSettingView> {
    const setting = await this.getSetting(namespace, key);
    this.assertReason(setting, dto.reason);
    if (!dto.secretValue || dto.secretValue.length < 8) throw new BadRequestException('Secret troppo breve o assente.');
    const before = this.auditSnapshot(setting);
    setting.secretRef = this.toSecretRef(namespace, key, dto.secretValue);
    setting.redactedValue = this.redactSecret(dto.secretValue);
    setting.valueJson = undefined;
    setting.valueSource = 'secret_ref';
    setting.sensitivity = 'secret_write_only';
    setting.state = setting.requiresVerificationAfterChange ? 'requires_review' : 'active';
    setting.lastChangedBy = dto.actorId ?? context?.actorId ?? DEFAULT_ACTOR;
    setting.lastChangeReason = dto.reason;
    const saved = await this.settings.save(setting);
    await this.appendAudit(saved, 'secret_updated', dto.reason, setting.lastChangedBy, before, this.auditSnapshot(saved), context?.ipAddress);
    return this.safeView(saved);
  }

  async setPurchaseKillSwitch(dto: PurchaseKillSwitchDto, context?: PurchaseRequestContext) {
    const setting = await this.getSetting('commerce', 'purchases.enabled');
    const before = this.auditSnapshot(setting);
    setting.valueJson = dto.enabled;
    setting.state = dto.enabled ? 'active' : 'disabled';
    setting.lastChangedBy = dto.actorId ?? context?.actorId ?? DEFAULT_ACTOR;
    setting.lastChangeReason = dto.reason;
    setting.metadata = {
      ...(setting.metadata ?? {}),
      customerMessage: dto.customerMessage,
      disabledUntil: dto.disabledUntil,
      existingPaidOrdersContinue: true,
    };
    const saved = await this.settings.save(setting);
    await this.appendAudit(saved, dto.enabled ? 'enabled' : 'disabled', dto.reason, setting.lastChangedBy, before, this.auditSnapshot(saved), context?.ipAddress);
    return {
      purchasesEnabled: dto.enabled,
      customerMessage: dto.customerMessage ?? (await this.getPurchaseDisabledMessage()),
      disabledUntil: dto.disabledUntil,
      existingPaidOrdersContinue: true,
    };
  }

  async arePurchasesEnabled(): Promise<boolean> {
    const setting = await this.settings.findOne({ where: { namespace: 'commerce', key: 'purchases.enabled' } });
    return setting?.valueJson !== false && setting?.state !== 'disabled';
  }

  async assertPurchasesEnabled(): Promise<void> {
    if (await this.arePurchasesEnabled()) return;
    throw new ConflictException(await this.getPurchaseDisabledMessage());
  }

  async getPurchaseDisabledMessage(): Promise<string> {
    const setting = await this.settings.findOne({ where: { namespace: 'commerce', key: 'purchases.disabledMessage' } });
    const value = setting?.valueJson;
    return typeof value === 'string' ? value : 'Gli acquisti sono temporaneamente sospesi. Riprova più tardi o contatta il supporto.';
  }

  async bootstrapAdmin(dto: BootstrapAdminDto, context?: PurchaseRequestContext) {
    const existingSuperAdmin = await this.users.findOne({ where: { role: 'admin' } });
    if (existingSuperAdmin) {
      throw new ConflictException('Bootstrap bloccato: esiste già almeno un utente admin. Usa la gestione team/admin esistente.');
    }
    const existingEmail = await this.users.findOne({ where: { email: dto.email.toLowerCase() } });
    if (existingEmail) throw new ConflictException('Email già registrata.');
    const account = await this.accounts.save(this.accounts.create({
      legalName: BOOTSTRAP_ACCOUNT_NAME,
      displayName: 'Platform Admin',
      status: 'active',
      planCode: 'internal',
      metadata: { bootstrap: true, createdBy: 'settings-admin' },
    }));
    const user = await this.users.save(this.users.create({
      organizationId: account.id,
      email: dto.email.toLowerCase(),
      fullName: dto.fullName,
      role: 'admin',
      passwordHash: this.passwords.hashPassword(dto.password),
    }));
    const membership = await this.memberships.save(this.memberships.create({
      accountId: account.id,
      userId: user.id,
      role: 'owner',
      status: 'active',
      permissionOverrides: ['platform.super_admin'],
    }));
    const synthetic = this.settings.create({ namespace: 'security', key: 'bootstrap.admin', label: 'Bootstrap admin', description: 'Evento di creazione primo super admin.', valueJson: { userId: user.id, accountId: account.id }, sensitivity: 'restricted_admin' });
    await this.appendAudit(synthetic, 'created', dto.reason ?? 'Bootstrap iniziale super admin.', user.id, undefined, { userId: user.id, accountId: account.id, membershipId: membership.id }, context?.ipAddress);
    return { created: true, userId: user.id, accountId: account.id, membershipId: membership.id };
  }

  async recordOperationalError(dto: CreateOperationalErrorDto): Promise<OperationalErrorEvent> {
    const event = this.errors.create({
      category: dto.category,
      severity: dto.severity ?? 'error',
      status: 'new',
      sourceModule: dto.sourceModule,
      sourceAction: dto.sourceAction,
      safeMessage: dto.safeMessage,
      technicalSummary: dto.technicalSummary,
      redactedPayload: this.deepRedact(dto.redactedPayload ?? {}),
      linkedObjects: dto.linkedObjects ?? {},
      refundRelevant: dto.refundRelevant ?? ['payment', 'refund', 'checkout', 'openapi_provider', 'report_generation'].includes(dto.category),
      events: [{ type: 'created', at: new Date().toISOString(), message: dto.safeMessage }],
    });
    return this.errors.save(event);
  }

  async listOperationalErrors(status?: string) {
    const where = status ? { status: status as never } : undefined;
    const items = await this.errors.find({ where, order: { createdAt: 'DESC' }, take: 100 });
    return { items, total: items.length };
  }

  async actOnOperationalError(id: string, dto: OperationalErrorActionDto): Promise<OperationalErrorEvent> {
    const event = await this.errors.findOne({ where: { id } });
    if (!event) throw new NotFoundException('Errore operativo non trovato.');
    if (!dto.reason || dto.reason.trim().length < 8) throw new BadRequestException('Motivazione obbligatoria per ogni azione su error ledger.');
    const nextStatus = this.statusFromAction(dto.action);
    event.status = nextStatus;
    event.resolutionReason = dto.reason;
    event.fixReference = dto.action === 'link_fix' ? dto.targetId : event.fixReference;
    event.events = [
      ...(event.events ?? []),
      { type: dto.action, at: new Date().toISOString(), reason: dto.reason, actorId: dto.actorId ?? DEFAULT_ACTOR, targetId: dto.targetId },
    ];
    return this.errors.save(event);
  }

  async recordBuyerIpAudit(input: { eventType: PurchaseIpAudit['eventType']; orderId?: string; paymentId?: string; ipAddress?: string; userAgent?: string; metadata?: Record<string, unknown> }) {
    const ipAddress = this.normalizeForwardedIp(input.ipAddress);
    const userAgent = input.userAgent ?? '';
    const audit = this.purchaseIpAudits.create({
      eventType: input.eventType,
      linkedOrderId: input.orderId,
      linkedPaymentId: input.paymentId,
      buyerIpHash: this.hashValue(ipAddress || 'unknown'),
      buyerIpPrefix: this.safeIpPrefix(ipAddress),
      userAgentHash: userAgent ? this.hashValue(userAgent) : undefined,
      retentionClass: input.eventType === 'checkout_session_created' ? 'financial_audit' : 'security_short',
      metadata: input.metadata ?? {},
    });
    return this.purchaseIpAudits.save(audit);
  }

  private async getSetting(namespace: PlatformSettingNamespace, key: string): Promise<PlatformSetting> {
    await this.ensureDefaultSettings();
    const setting = await this.settings.findOne({ where: { namespace, key } });
    if (!setting) throw new NotFoundException(`Impostazione ${namespace}.${key} non trovata.`);
    return setting;
  }

  private assertReason(setting: PlatformSetting, reason?: string): void {
    if (setting.requiresReasonOnChange && (!reason || reason.trim().length < 8)) {
      throw new BadRequestException('Motivazione obbligatoria: indica perche stai modificando questa impostazione.');
    }
  }

  private async appendAudit(setting: PlatformSetting, action: PlatformSettingAudit['action'], reason: string, actorId = DEFAULT_ACTOR, beforeSnapshot?: Record<string, unknown>, afterSnapshot?: Record<string, unknown>, ipAddress?: string) {
    await this.audits.save(this.audits.create({
      namespace: setting.namespace,
      key: setting.key,
      action,
      actorId,
      reason,
      beforeSnapshot,
      afterSnapshot,
      ipAddressHash: ipAddress ? this.hashValue(this.normalizeForwardedIp(ipAddress)) : undefined,
    }));
  }

  private safeView(setting: PlatformSetting): SafeSettingView {
    const displayValue = setting.sensitivity === 'secret_write_only'
      ? setting.redactedValue ?? (setting.secretRef ? '********' : null)
      : setting.valueJson;
    return {
      id: setting.id,
      namespace: setting.namespace,
      key: setting.key,
      label: setting.label,
      description: setting.description,
      state: setting.state,
      environment: setting.environment,
      valueSource: setting.valueSource,
      sensitivity: setting.sensitivity,
      displayValue,
      requiresReasonOnChange: setting.requiresReasonOnChange,
      requiresVerificationAfterChange: setting.requiresVerificationAfterChange,
      goLiveBlocker: setting.goLiveBlocker,
      lastChangedAt: setting.updatedAt?.toISOString(),
      lastChangeReason: setting.lastChangeReason,
    };
  }

  private auditSnapshot(setting: PlatformSetting): Record<string, unknown> {
    return {
      namespace: setting.namespace,
      key: setting.key,
      state: setting.state,
      valueSource: setting.valueSource,
      sensitivity: setting.sensitivity,
      displayValue: setting.sensitivity === 'secret_write_only' ? setting.redactedValue ?? null : setting.valueJson,
      metadata: setting.metadata,
    };
  }

  private namespaceLabel(namespace: string): string {
    const labels: Record<string, string> = {
      commerce: 'Acquisti e checkout',
      payments: 'Pagamenti',
      provider_openapi: 'Openapi provider',
      openai: 'OpenAI e funzioni AI',
      email: 'Email',
      security: 'Sicurezza',
      crm: 'CRM',
      partner: 'Partner API',
      launch: 'Lancio',
      analytics: 'Analytics, Tag Manager e Clarity',
    };
    return labels[namespace] ?? namespace;
  }

  private toSecretRef(namespace: string, key: string, secret: string): string {
    const digest = this.hashValue(`${namespace}.${key}.${secret}`).slice(0, 16);
    return `secret://${namespace}/${key}/${digest}`;
  }

  private redactSecret(secret: string): string {
    if (secret.length <= 8) return '********';
    return `${secret.slice(0, 4)}...${secret.slice(-4)}`;
  }

  private deepRedact(value: Record<string, unknown>): Record<string, unknown> {
    const sensitive = /secret|token|password|api[_-]?key|authorization|signature|iban|card|raw/i;
    const walk = (input: unknown): unknown => {
      if (Array.isArray(input)) return input.map(walk);
      if (!input || typeof input !== 'object') return input;
      return Object.fromEntries(Object.entries(input as Record<string, unknown>).map(([key, nested]) => [key, sensitive.test(key) ? '[REDACTED]' : walk(nested)]));
    };
    return walk(value) as Record<string, unknown>;
  }

  private hashValue(value: string): string {
    return createHash('sha256').update(value).digest('hex');
  }

  private normalizeForwardedIp(ipAddress = ''): string {
    return ipAddress.split(',')[0]?.trim() || 'unknown';
  }

  private safeIpPrefix(ipAddress?: string): string | undefined {
    if (!ipAddress) return undefined;
    if (ipAddress.includes(':')) return ipAddress.split(':').slice(0, 4).join(':') + '::/64';
    const parts = ipAddress.split('.');
    return parts.length === 4 ? `${parts[0]}.${parts[1]}.${parts[2]}.0/24` : undefined;
  }

  private statusFromAction(action: OperationalErrorActionDto['action']) {
    switch (action) {
      case 'assign': return 'investigating';
      case 'retry': return 'fix_pending';
      case 'link_refund': return 'refund_pending';
      case 'link_fix': return 'fix_pending';
      case 'resolve': return 'resolved';
      case 'ignore': return 'ignored';
      case 'escalate': return 'waiting_provider';
      default: return 'investigating';
    }
  }
}
