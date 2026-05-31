# M17-P OpenAI Copilot Source Notes

## Fonti consultate

- OpenAI API Production Best Practices, developers.openai.com/platform docs.
- OpenAI Structured Outputs guide, developers.openai.com/platform docs.

## Implicazioni progettuali

- Le API key devono restare in environment variables o secret management; nel progetto si salva solo `apiKeySecretRef` redatta.
- Separare progetti staging/production e limiti di spesa aiuta a non impattare produzione durante test o errori.
- Structured Outputs e JSON Schema sono preferiti per output validabili e UI sicure.
- Usage/cost tracking deve essere duplicato internamente, oltre alla dashboard OpenAI, per collegare costi a use case, admin e target entity.
