# 10 — Attribution Model Blueprint

## Obiettivo

Attribuire vendite, lead e richieste supporto a fonti e contenuti senza usare tracciamento invasivo.

## Modello MVP

Il modello MVP usa tre viste:

1. **First touch**: prima sorgente nota della sessione/lead.
2. **Last touch**: sorgente o contenuto più vicino alla conversione.
3. **Content assist**: pagine guida o sezioni che hanno contribuito prima della conversione.

Non viene usato un modello predittivo automatico in MVP.

## Attribution snapshot

Lo snapshot viene creato quando accade una conversione importante:

- lead creato;
- checkout iniziato;
- pagamento completato;
- abbonamento attivato;
- partner API richiede accesso live.

Campi:

- `source`;
- `medium`;
- `campaign`;
- `landingRoute`;
- `lastRoute`;
- `contentCluster`;
- `guideSlug`;
- `serviceCode`;
- `consentState`;
- `createdAt`.

## UTM policy

UTM consentiti:

- `utm_source`;
- `utm_medium`;
- `utm_campaign`;
- `utm_content`;
- `utm_term`.

Gli UTM non devono contenere PII o nomi soggetto verificato.

## Attribution e privacy

Il sistema non deve creare un profilo marketing invasivo. L'attribution serve a capire cosa funziona a livello contenuto/canale, non a inseguire singoli utenti.
