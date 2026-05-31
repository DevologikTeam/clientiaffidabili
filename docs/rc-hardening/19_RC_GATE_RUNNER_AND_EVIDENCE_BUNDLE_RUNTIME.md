# 19 — RC Gate Runner and Evidence Bundle Runtime

Il runner `scripts/rc-hardening-gate-runner.js` produce due artifact:

- `artifacts/rc-hardening/m21s-rc-gate-run.json`;
- `artifacts/rc-hardening/m21s-rc-evidence-bundle.json`.

## Cosa controlla

- Presenza log build/typecheck/Docker.
- Presenza `pnpm-lock.yaml`.
- Presenza restore drill.
- Presenza export sandbox provider reale.
- Presenza report Playwright reale.
- Presenza security/privacy freeze.
- Presenza sign-off owner.

## Uso target

```bash
node scripts/rc-hardening-gate-runner.js
node scripts/rc-hardening-gate-runner.js --fail-on-blocked
```

`--fail-on-blocked` deve essere usato nel workflow RC finale. Nel pacchetto M21-S non viene usato perche gli artifact reali non sono ancora disponibili.
