# M18-A — Source Notes

## Google Gmail sender guidelines

Fonte: Google Workspace Admin Help, Email sender guidelines.

Punti usati nel progetto:

- dal 2024 tutti i mittenti verso Gmail devono rispettare requisiti minimi;
- tutti i mittenti devono configurare SPF o DKIM;
- i bulk sender devono configurare SPF, DKIM e DMARC;
- TLS, DNS forward/reverse e spam rate sono importanti per deliverability;
- messaggi marketing/subscribed ad alto volume devono supportare one-click unsubscribe;
- From coerente e contenuti non ingannevoli sono requisito di reputazione.

## Yahoo sender best practices

Fonte: Yahoo Sender Hub.

Punti usati:

- autenticazione, reputazione, complaint/bounce handling e invii a utenti consenzienti sono parte della deliverability;
- le comunicazioni transazionali devono essere pulite e non mescolate con marketing.

## Resend webhook docs

Fonte: Resend documentation.

Punti usati:

- provider transazionale moderno con webhook per eventi email;
- delivery lifecycle deve essere idempotente e normalizzato lato piattaforma;
- webhook provider sono input non affidabili finche' firma e idempotenza non sono validate.
