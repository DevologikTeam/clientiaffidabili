# Buyer IP Audit Runtime

## Obiettivo
Salvare un riferimento privacy-aware dell'IP utente durante acquisti e azioni sensibili.

## Implementazione MVP
`PurchaseIpAudit` salva:
- evento;
- hash IP;
- prefisso IP non puntuale;
- hash user agent;
- ordine/pagamento collegato;
- retention class.

## Privacy guardrail
- Evitare esposizione IP in UI cliente.
- Mostrare in admin solo hash/prefisso e solo a ruoli autorizzati.
- Retention e base giuridica da validare legalmente prima del go-live.
