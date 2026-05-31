import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PlatformSetting } from '../settings-admin/entities/platform-setting.entity';
import { defaultPublicExternalTrackingConfig, PublicExternalTrackingConfig } from './tag-manager-clarity-design.types';

const GTM_ID_PATTERN = /^GTM-[A-Z0-9]+$/;
const CLARITY_ID_PATTERN = /^[a-zA-Z0-9_-]{6,64}$/;

@Injectable()
export class TagManagerClarityService {
  constructor(@InjectRepository(PlatformSetting) private readonly settings: Repository<PlatformSetting>) {}

  async publicConfig(pathname = '/'): Promise<PublicExternalTrackingConfig & { routeAllowed: boolean; configSource: 'database' | 'safe_default' }> {
    const externalTagsEnabled = await this.booleanSetting('externalTags.enabled', false);
    const gtmEnabled = await this.booleanSetting('gtm.enabled', false);
    const clarityEnabled = await this.booleanSetting('clarity.enabled', false);
    const gtmContainerId = await this.stringSetting('gtm.containerId', '');
    const clarityProjectId = await this.stringSetting('clarity.projectId', '');
    const allowedRoutePrefixes = await this.arraySetting('clarity.allowedRoutePrefixes', defaultPublicExternalTrackingConfig.clarity.allowedRoutePrefixes);
    const blockedRoutePrefixes = await this.arraySetting('clarity.blockedRoutePrefixes', defaultPublicExternalTrackingConfig.clarity.blockedRoutePrefixes);
    const consentDefault = await this.objectSetting('consent.defaultMode', defaultPublicExternalTrackingConfig.consentDefault);

    const safeGtmId = GTM_ID_PATTERN.test(gtmContainerId) ? gtmContainerId : '';
    const safeClarityId = CLARITY_ID_PATTERN.test(clarityProjectId) ? clarityProjectId : '';
    const routeAllowed = this.isRouteAllowed(pathname, allowedRoutePrefixes, blockedRoutePrefixes);

    return {
      externalTagsEnabled,
      gtm: {
        enabled: externalTagsEnabled && gtmEnabled && Boolean(safeGtmId),
        containerId: externalTagsEnabled && gtmEnabled && safeGtmId ? safeGtmId : null,
      },
      clarity: {
        enabled: externalTagsEnabled && clarityEnabled && routeAllowed && Boolean(safeClarityId),
        projectId: externalTagsEnabled && clarityEnabled && routeAllowed && safeClarityId ? safeClarityId : null,
        allowedRoutePrefixes,
        blockedRoutePrefixes,
      },
      consentDefault: this.safeConsentDefault(consentDefault),
      routeAllowed,
      configSource: 'database',
    };
  }

  private async booleanSetting(key: string, fallback: boolean): Promise<boolean> {
    const setting = await this.get(key);
    return typeof setting?.valueJson === 'boolean' ? setting.valueJson : fallback;
  }

  private async stringSetting(key: string, fallback: string): Promise<string> {
    const setting = await this.get(key);
    return typeof setting?.valueJson === 'string' ? setting.valueJson.trim() : fallback;
  }

  private async arraySetting(key: string, fallback: string[]): Promise<string[]> {
    const setting = await this.get(key);
    return Array.isArray(setting?.valueJson) ? setting.valueJson.filter((item): item is string => typeof item === 'string') : fallback;
  }

  private async objectSetting<T extends Record<string, unknown>>(key: string, fallback: T): Promise<T> {
    const setting = await this.get(key);
    return setting?.valueJson && typeof setting.valueJson === 'object' && !Array.isArray(setting.valueJson) ? setting.valueJson as T : fallback;
  }

  private get(key: string): Promise<PlatformSetting | null> {
    return this.settings.findOne({ where: { namespace: 'analytics' as never, key } });
  }

  private safeConsentDefault(input: Record<string, unknown>): PublicExternalTrackingConfig['consentDefault'] {
    const safe = (value: unknown) => value === 'granted' ? 'granted' : 'denied';
    return {
      analytics_storage: safe(input.analytics_storage),
      ad_storage: safe(input.ad_storage),
      ad_user_data: safe(input.ad_user_data),
      ad_personalization: safe(input.ad_personalization),
    };
  }

  private isRouteAllowed(pathname: string, allowed: string[], blocked: string[]): boolean {
    const path = pathname || '/';
    if (blocked.some((prefix) => path === prefix || path.startsWith(`${prefix}/`) || path.startsWith(prefix))) return false;
    return allowed.some((prefix) => path === prefix || path.startsWith(`${prefix}/`) || (prefix === '/' && path === '/'));
  }
}
