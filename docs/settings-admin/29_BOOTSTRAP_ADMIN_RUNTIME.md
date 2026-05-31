# Bootstrap Admin Runtime

## Obiettivo
Consentire la creazione del primo super admin solo quando non esiste gia' un utente admin.

## Flusso
1. `POST /settings-admin/bootstrap/admin`.
2. Il backend verifica assenza di admin esistenti.
3. Crea account interno `ClientiAffidabili Platform Admin`.
4. Crea utente con password hashata.
5. Crea membership owner con override `platform.super_admin`.
6. Registra audit.

## Guardrail
- Se esiste gia' un admin, il bootstrap e' bloccato.
- Password policy gestita da `AuthPasswordService`.
- In produzione il bootstrap dovra' essere protetto da secret temporaneo/one-shot e disabilitato dopo uso.
