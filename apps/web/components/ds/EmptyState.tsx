import type { ReactNode } from 'react';
import { Button } from './Button';

type EmptyStateProps = {
  title: string;
  description: string;
  icon?: string;
  actionLabel?: string;
  actionHref?: string;
  secondaryAction?: ReactNode;
};

export function EmptyState({ title, description, icon = '□', actionLabel, actionHref, secondaryAction }: EmptyStateProps) {
  return (
    <section className="ca-empty-state">
      <div className="ca-empty-state__icon" aria-hidden="true">{icon}</div>
      <div>
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
      <div className="ca-empty-state__actions">
        {actionLabel && actionHref ? <Button href={actionHref}>{actionLabel}</Button> : null}
        {secondaryAction}
      </div>
    </section>
  );
}
