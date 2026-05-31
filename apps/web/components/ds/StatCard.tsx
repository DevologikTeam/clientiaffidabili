import type { ReactNode } from 'react';
import { StatusPill } from './StatusPill';
import type { BadgeTone } from './Badge';

type StatCardProps = {
  label: string;
  value: ReactNode;
  description?: ReactNode;
  /**
   * Backward-compatible alias used by older dashboard pages.
   * Prefer `description` in new code.
   */
  helper?: ReactNode;
  status?: string;
  tone?: BadgeTone;
  icon?: ReactNode;
  className?: string;
};

export function StatCard({ label, value, description, helper, status, tone = 'neutral', icon, className }: StatCardProps) {
  const supportingText = description ?? helper;
  const classes = ['ca-stat-card', className ?? ''].filter(Boolean).join(' ');

  return (
    <article className={classes}>
      <div className="ca-stat-card__top">
        <span>{label}</span>
        {icon ? <span className="ca-stat-card__icon" aria-hidden="true">{icon}</span> : null}
      </div>
      <strong>{value}</strong>
      {supportingText ? <p>{supportingText}</p> : null}
      {status ? <StatusPill tone={tone} label={status} /> : null}
    </article>
  );
}
