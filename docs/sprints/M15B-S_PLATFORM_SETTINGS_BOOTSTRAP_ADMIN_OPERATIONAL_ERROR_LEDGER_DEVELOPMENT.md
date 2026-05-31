# M15B-S — Platform Settings, Bootstrap Admin & Operational Error Ledger Development

## Obiettivo
Implementare il runtime MVP per configurazioni amministrative centrali, bootstrap del primo super admin, sospensione temporanea degli acquisti, gestione provider/AI e tracciamento errori operativi.

## Cosa e' stato sviluppato
- Modulo NestJS `SettingsAdminModule`.
- Entita' TypeORM per settings, audit settings, error ledger e IP audit acquisti.
- Default settings seed-on-start per commerce, payments, Openapi, OpenAI ed email.
- Endpoint admin per overview, namespace, update setting, update secret, kill switch, bootstrap admin, error ledger e azioni su errori.
- Kill switch acquisti integrato nel checkout billing.
- Salvataggio audit IP/hash durante creazione checkout e conferma pagamento.
- Tracciamento errori pagamento/provider nel ledger operativo.
- Pagina admin `/admin/settings` con summary, namespace, settings e error ledger.
- QA statico dedicato e controllo generico sorgenti.

## Guardrail implementati
- I segreti sono write-only: la UI e le API restituiscono solo valore redatto o secret reference.
- Ogni modifica sensibile richiede `reason`.
- Gli acquisti vengono bloccati server-side, non solo via UI.
- Gli ordini gia pagati continuano il loro lifecycle anche se gli acquisti vengono sospesi.
- Gli errori operativi sono business-linked, quindi collegabili a ordine, pagamento, provider request, report, ticket, refund o fix.
- L'IP acquisto viene salvato come hash e prefisso non puntuale, con retention class.

## Limiti noti
- Non sostituisce un secret manager reale: il runtime usa secret reference/redaction come contratto MVP.
- RBAC admin reale e MFA admin devono essere certificati prima del go-live.
- Serve migrazione DB reale o sincronizzazione TypeORM solo in ambienti non production.
- Il build Docker/Coolify va rilanciato nell'ambiente del progetto.
