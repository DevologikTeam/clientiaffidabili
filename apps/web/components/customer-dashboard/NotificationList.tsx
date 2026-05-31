import Link from 'next/link';
import { Card, StatusPill } from '@/components/ds';
import type { CustomerDashboardNotificationItem } from '@clientiaffidabili/shared';

export function NotificationList({ notifications }: { notifications: ReadonlyArray<CustomerDashboardNotificationItem> }) {
  return (
    <Card>
      <span className="tag">Aggiornamenti</span>
      <h2 style={{ fontSize: 28, marginTop: 12 }}>Notifiche utili</h2>
      <div className="ca-stack">
        {notifications.map((item) => (
          <div className="customer-notification" key={item.id}>
            <StatusPill tone={item.tone} label={item.status === 'unread' ? 'Nuova' : 'Letta'} />
            <div>
              <strong>{item.title}</strong>
              <p>{item.body}</p>
              {item.href ? <Link className="btn btn-outline" href={item.href}>Apri</Link> : null}
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
