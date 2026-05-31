# M16B-A — Source Notes

## Google Tag Manager

Google Tag Manager consente di configurare e distribuire tag Google e di terze parti tramite container web/app/server. Per ClientiAffidabili.it il container deve essere configurabile da admin/backend, non hardcoded.

## Google Consent Mode

Google Consent Mode richiede default consent state e aggiornamenti in base alle scelte utente. Consent Mode v2 include `ad_storage`, `analytics_storage`, `ad_user_data`, `ad_personalization`. La scelta di progetto è default prudente `denied`.

## Microsoft Clarity

Microsoft Clarity usa tracking code/project ID e offre heatmap/session recordings. Anche se include masking, ClientiAffidabili.it deve escluderlo da aree sensibili per default.

## Nota compliance

Queste note non sostituiscono revisione legale/cookie policy/CMP. Prima del go-live serve validazione privacy e aggiornamento cookie policy.
