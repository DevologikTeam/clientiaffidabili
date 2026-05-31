# 10 — M12P/M12S Readiness Checklist

## M12-P deve produrre

- Partner portal experience blueprint;
- Partner data model blueprint;
- API key/scopes/rate limit blueprint;
- Developer docs/OpenAPI blueprint;
- Usage ledger/credit wallet blueprint;
- Partner onboarding/KYB/legal blueprint;
- Admin operations blueprint;
- API contracts;
- UI components blueprint;
- M12-S implementation handoff.

## M12-S dovrà implementare

- entità partner account/profilo;
- API key hash model;
- scopes e rate limit scaffold;
- usage ledger;
- credit reservation service;
- endpoint sandbox `POST /partner-api/v1/checks` mock-safe;
- endpoint status/report mock-safe;
- webhook configuration scaffold;
- pagine `/partner` e `/partner/developer`;
- admin partner queue;
- QA script.

## Blocker produzione

- Legal partner terms non validati;
- API key live non testate;
- rate limit non persistente;
- credit reservation non atomica;
- object-level authorization non testata;
- webhook signature non validata end-to-end;
- provider live non isolato da sandbox;
- mancanza log redaction;
- assenza production review.
