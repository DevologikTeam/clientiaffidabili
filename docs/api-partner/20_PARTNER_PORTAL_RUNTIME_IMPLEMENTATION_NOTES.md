# Partner Portal Runtime Implementation Notes

## Runtime creato
Il modulo `PartnerPortalModule` espone tre superfici:

1. **Customer partner portal**: gestione profilo, API key, usage, webhook e richiesta live.
2. **Partner public API**: endpoint `/api/partner/v1` per integrazioni esterne.
3. **Admin partner operations**: review, sospensione, revoca, adjustment e audit operativo.

## Modalita' sandbox
La sandbox usa risposte simulate coerenti con gli schemi live, senza consumo provider e senza dati reali. Serve a validare integrazione, idempotenza, webhook e gestione errori.

## Modalita' live
La live resta bloccata finche' il partner non passa a `live_approved`. Lo stato viene controllato prima di ogni richiesta live.

## Stato tecnico
Il runtime e' pronto per sviluppo incrementale, ma non e' ancora production-ready. Mancano rate limit persistente, store idempotenza persistente completo, test cross-partner, webhook delivery reale e osservabilita' completa.
