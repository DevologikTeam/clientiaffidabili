'use client';

import Script from 'next/script';
import { usePathname } from 'next/navigation';
import { ReactNode, useEffect, useMemo, useState } from 'react';
import {
  defaultExternalTrackingConfig,
  ExternalTrackingConfig,
  fetchExternalTrackingConfig,
  isRouteAllowedForExternalTracking,
  pushCampaignEvent,
} from '@/lib/analytics/tag-manager-clarity-runtime';

function pageEventName(pathname: string) {
  if (pathname === '/') return 'homepage_view' as const;
  if (pathname === '/prezzi') return 'pricing_view' as const;
  if (pathname === '/garanzia-operativa') return 'guarantee_view' as const;
  if (pathname === '/guide') return 'guide_index_view' as const;
  if (pathname.startsWith('/guide/')) return 'guide_view' as const;
  if (pathname === '/servizi') return 'service_catalog_view' as const;
  if (pathname.startsWith('/servizi/')) return 'service_view' as const;
  return null;
}

export function ExternalTrackingProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname() || '/';
  const [config, setConfig] = useState<ExternalTrackingConfig>(defaultExternalTrackingConfig);

  useEffect(() => {
    let mounted = true;
    fetchExternalTrackingConfig(pathname).then((next) => {
      if (mounted) setConfig(next);
    });
    return () => { mounted = false; };
  }, [pathname]);

  const routeAllowed = useMemo(() => isRouteAllowedForExternalTracking(pathname, config), [pathname, config]);
  const loadGtm = Boolean(config.externalTagsEnabled && config.gtm.enabled && config.gtm.containerId && routeAllowed);
  const loadClarity = Boolean(config.externalTagsEnabled && config.clarity.enabled && config.clarity.projectId && routeAllowed);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    window.dataLayer = window.dataLayer ?? [];
    window.gtag = window.gtag ?? function gtag(){ window.dataLayer?.push(arguments as unknown as Record<string, unknown>); };
    window.gtag('consent', 'default', config.consentDefault);
  }, [config.consentDefault]);

  useEffect(() => {
    const eventName = pageEventName(pathname);
    if (!eventName || !routeAllowed) return;
    pushCampaignEvent(eventName, { page_type: pathname === '/' ? 'homepage' : pathname.split('/')[1] || 'public', route_template: pathname }, config);
  }, [pathname, routeAllowed, config]);

  return (
    <>
      {loadGtm ? (
        <Script id="clientiaffidabili-gtm" strategy="afterInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${config.gtm.containerId}');`}
        </Script>
      ) : null}
      {loadClarity ? (
        <Script id="clientiaffidabili-clarity" strategy="afterInteractive">
          {`(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};t=l.createElement(r);t.async=1;t.src='https://www.clarity.ms/tag/'+i;y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);})(window, document, 'clarity', 'script', '${config.clarity.projectId}');`}
        </Script>
      ) : null}
      {children}
    </>
  );
}
