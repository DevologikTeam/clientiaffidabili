# Sandbox Provider Certification Contracts

## Interfaccia comune

Ogni provider certificabile deve esporre un adapter di test con questo contratto logico:

```ts
interface SandboxCertificationAdapter {
  provider: string;
  canRun(): Promise<SandboxReadiness>;
  runScenario(input: SandboxScenarioInput): Promise<SandboxScenarioResult>;
  collectEvidence(resultId: string): Promise<SandboxEvidence[]>;
}
```

## Readiness minima

Un provider è `ready_to_run` solo se:

- è abilitato in ambiente sandbox;
- ha secret reference configurate;
- non usa credenziali live in ambiente test;
- può generare errori controllati;
- scrive errori nel ledger operativo;
- supporta idempotenza o normalizzazione interna.

## Provider coperti

- `stripe`
- `paypal`
- `openapi`
- `openai`
- `email_provider`
- `pdf_runtime`

## Evidenze richieste

- input redatto;
- output redatto;
- provider event id se disponibile;
- internal correlation id;
- ledger id;
- createdAt;
- pass/fail reason;
- next action.
