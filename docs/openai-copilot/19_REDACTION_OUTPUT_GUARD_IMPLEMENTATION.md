# Redaction and Output Guard Implementation

## Redaction

Il redaction service oscura chiavi e valori sensibili prima di costruire il prompt:

- email;
- telefono;
- IBAN;
- password;
- token;
- API key;
- CF/P.IVA;
- IP/user agent;
- raw payload;
- prompt o contenuti provider.

## Output guard

L'output viene bloccato o marcato con warning se contiene:

- "rischio zero";
- "pagamento garantito";
- "solvibilita' garantita";
- API key;
- email o dati personali evidenti.

## Principio

OpenAI puo' aiutare a scrivere meglio, non puo' inventare garanzie commerciali o ridurre i limiti del servizio.
