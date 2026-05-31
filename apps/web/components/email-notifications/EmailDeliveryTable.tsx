import { Card } from '../ds/Card';
import { emailNotificationRuntime } from '../../lib/email-notifications/email-notifications-runtime';

export function EmailDeliveryTable() {
  return (
    <Card>
      <p className="ca-eyebrow">Delivery ledger</p>
      <h2>Ultimi invii tecnici</h2>
      <div className="ca-table-wrap">
        <table className="ca-table">
          <thead><tr><th>ID</th><th>Evento</th><th>Template</th><th>Destinatario</th><th>Stato</th><th>Azione</th></tr></thead>
          <tbody>
            {emailNotificationRuntime.deliveries.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td><td>{item.event}</td><td>{item.templateKey}</td><td>{item.recipient}</td><td>{item.status}</td><td>{item.nextAction}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}
