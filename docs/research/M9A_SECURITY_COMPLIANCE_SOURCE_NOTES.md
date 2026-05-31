# M9-A Source Notes

## Fonti normative/tecniche consultate

- OWASP Top 10:2025 — https://owasp.org/Top10/2025/
- OWASP API Security Top 10:2023 — https://owasp.org/API-Security/editions/2023/en/0x11-t10/
- GDPR Regolamento UE 2016/679 — https://eur-lex.europa.eu/legal-content/IT/TXT/?uri=CELEX:32016R0679
- NIS2 Direttiva UE 2022/2555 — https://eur-lex.europa.eu/legal-content/IT/TXT/?uri=CELEX:32022L2555

## Impatti sul progetto

- OWASP Top 10 2025 conferma la necessita' di dare priorita' a access control, misconfiguration, supply chain, crypto, injection, insecure design, authentication, integrity, logging/alerting ed exception handling.
- OWASP API Security 2023 e' direttamente applicabile per BOLA/IDOR, unrestricted resource consumption, unsafe API consumption e improper inventory management.
- GDPR richiede privacy-by-design, minimizzazione, accountability, gestione data breach e documentazione dei trattamenti.
- NIS2 e' trattata come readiness prudente: il progetto potrebbe non rientrare direttamente nel perimetro in fase MVP, ma le misure di risk management, incident handling, business continuity e supply chain sono best practice utili per un SaaS B2B.

## Nota

Questo documento non sostituisce consulenza legale, DPO o assessment cybersecurity formale. Serve come base tecnica/prodotto per M9-P e M9-S.
