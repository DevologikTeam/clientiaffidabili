# v0.75.3 — Contact Form Senior UX Review

Obiettivo: rendere il form contatti più leggibile, meno largo, più rassicurante e realmente orientato al cliente finale.

Implementato:

- nuovo layout contatti a due colonne;
- card form con larghezza massima controllata;
- fieldset, legend, hint e placeholder orientati alla decisione commerciale;
- colonna laterale con cosa succede dopo e limiti della verifica;
- feedback success/error su `/contatti`;
- route Next `POST /api/sales-crm/contact-messages` che inoltra al backend API;
- supporto `INTERNAL_API_URL` nei compose;
- supporto `wrapperClassName` nel componente `Field`;
- QA `qa-contact-form-design`.
