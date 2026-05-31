export function SessionSecurityPanel({ session }: { session: { cookieMode: string; expiresIn: string; stepUpRequiredFor: readonly string[] } }) {
  return (
    <section className="panel">
      <h2>Sicurezza sessione</h2>
      <dl className="kv">
        <div><dt>Cookie</dt><dd>{session.cookieMode}</dd></div>
        <div><dt>Durata</dt><dd>{session.expiresIn}</dd></div>
        <div><dt>Step-up</dt><dd>{session.stepUpRequiredFor.join(', ')}</dd></div>
      </dl>
    </section>
  );
}
