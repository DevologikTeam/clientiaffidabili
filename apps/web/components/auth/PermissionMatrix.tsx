export function PermissionMatrix({ permissions }: { permissions: Record<string, readonly string[]> }) {
  return (
    <section className="panel">
      <h2>Matrice ruoli</h2>
      <div className="role-grid">
        {Object.entries(permissions).map(([role, items]) => (
          <article key={role} className="role-card">
            <h3>{role}</h3>
            <ul>{items.map((item) => <li key={item}>{item}</li>)}</ul>
          </article>
        ))}
      </div>
    </section>
  );
}
