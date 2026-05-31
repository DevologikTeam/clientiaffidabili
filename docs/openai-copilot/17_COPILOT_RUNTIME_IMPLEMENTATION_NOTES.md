# Copilot Runtime Implementation Notes

## Flusso runtime

1. L'admin richiede un suggerimento.
2. Il backend verifica OpenAI settings e use case abilitato.
3. Il contesto viene redatto.
4. Il prompt viene scelto da registry versionato.
5. L'adapter mock/OpenAI genera una bozza.
6. L'output passa da guardrail anti-claim e anti-leak.
7. La bozza resta in `needs_review`, `blocked` o viene successivamente approvata/scartata.
8. Usage/costi vengono tracciati in ledger.

## Stato provider

- Default: `mock`.
- Reale OpenAI: da abilitare solo dopo settings, budget e secret verification.

## Output pubblici

Qualsiasi output destinato a CMS, email, supporto o pagine pubbliche richiede revisione umana.
