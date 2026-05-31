# Design Tokens Blueprint

## 1. Principio

I token devono rendere coerente tutta la piattaforma: landing, checkout, dashboard, report, admin e comunicazioni. Non sono solo colori: rappresentano intenzioni di prodotto.

## 2. Palette primaria

| Token | Valore | Uso |
|---|---:|---|
| `--ca-trust-navy-950` | `#082E48` | Hero, footer scuri, aree autorevoli |
| `--ca-trust-navy-900` | `#0B3C5D` | Titoli, brand, superfici istituzionali |
| `--ca-trust-navy-800` | `#135582` | Hover, varianti scure |
| `--ca-trust-blue-600` | `#328CC1` | CTA primaria, link operativi, focus |
| `--ca-trust-blue-100` | `#E5F4FB` | Background informativi |
| `--ca-trust-gold-500` | `#E6AF2E` | Highlight premium, attenzione positiva |

## 3. Palette neutra

| Token | Valore | Uso |
|---|---:|---|
| `--ca-slate-950` | `#1D2731` | Testo principale |
| `--ca-slate-700` | `#334155` | Testo secondario forte |
| `--ca-slate-600` | `#475569` | Descrizioni |
| `--ca-slate-300` | `#CBD5E1` | Bordi forti |
| `--ca-slate-200` | `#E2E8F0` | Bordi standard |
| `--ca-slate-100` | `#F1F5F9` | Chip, sfondi soft |
| `--ca-slate-50` | `#F8FAFC` | Sfondo app |
| `--ca-white` | `#FFFFFF` | Superfici card |

## 4. Semantica stati

| Stato | Token | Uso corretto |
|---|---|---|
| Success | `--ca-success-600` | Esito completato, dato coerente |
| Warning | `--ca-warning-600` | Azione consigliata, anomalia non bloccante |
| Danger | `--ca-danger-600` | Rischio, errore, blocco operativo |
| Info | `--ca-info-600` | Nota informativa, spiegazione neutra |

Regola: non usare verde per vendere fiducia assoluta. Il verde comunica solo “nessun blocco rilevato nei dati consultati”.

## 5. Tipografia

Font stack: `Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif`.

| Token | Valore | Uso |
|---|---|---|
| Display | 56–68 px | Hero e pagine marketing |
| H1 app | 40–48 px | Titolo pagina dashboard/report |
| H2 | 30–42 px | Sezioni landing |
| H3 | 20–24 px | Card e blocchi |
| Body | 16 px | Testo principale |
| Small | 13–14 px | Meta, label, help text |

## 6. Spaziatura

Scala base: 4px.

| Token | Valore |
|---|---:|
| `space-1` | 4px |
| `space-2` | 8px |
| `space-3` | 12px |
| `space-4` | 16px |
| `space-5` | 20px |
| `space-6` | 24px |
| `space-8` | 32px |
| `space-10` | 40px |
| `space-12` | 48px |
| `space-16` | 64px |
| `space-20` | 80px |

## 7. Radius e shadow

| Token | Valore | Uso |
|---|---:|---|
| `radius-sm` | 10px | Input, chip |
| `radius-md` | 16px | Card compatte |
| `radius-lg` | 22px | Pannelli principali |
| `radius-xl` | 30px | Hero panel, pricing |
| `shadow-card` | soft | Card standard |
| `shadow-soft` | medium | Card evidenti |
| `shadow-focus` | ring | Focus accessibile |

## 8. Anti-pattern

- Non aggiungere nuovi blu senza mappatura token.
- Non usare rosso per contenuti commerciali.
- Non usare badge colorati senza semantica.
- Non usare radius diversi per gusto personale.
- Non creare bottoni con classi custom se esiste `Button`.
