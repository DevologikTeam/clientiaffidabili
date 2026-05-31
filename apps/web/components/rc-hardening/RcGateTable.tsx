import { DataTable, StatusPill } from '../ds';
import { getM21sGateLabel, getM21sGateTone, m21sRcRuntimeGates, type RcRuntimeGate } from '../../lib/rc-hardening/rc-hardening-runtime';

export function RcGateTable() {
  return (
    <section className="ca-card">
      <div className="ca-table-head">
        <div>
          <p className="ca-eyebrow">Gate runtime</p>
          <h2>Blocchi RC e prossima azione</h2>
          <p>Ogni P0 resta bloccante finche il pacchetto non contiene evidenze reali oppure, solo dove ammesso, un waiver con feature disabilitata.</p>
        </div>
      </div>
      <DataTable<RcRuntimeGate>
        caption="M21-S RC gate runtime"
        columns={[
          { key: 'gate', label: 'Gate', render: (gate: any) => <strong>{gate.blockerCode}</strong> },
          { key: 'label', label: 'Area', render: (gate: any) => gate.label },
          { key: 'status', label: 'Stato', render: (gate: any) => <StatusPill label={getM21sGateLabel(gate.status)} tone={getM21sGateTone(gate.status)} /> },
          { key: 'owner', label: 'Owner', render: (gate: any) => gate.owner },
          { key: 'next', label: 'Prossima azione', render: (gate: any) => gate.nextAction },
        ]}
        rows={m21sRcRuntimeGates}
      />
    </section>
  );
}
