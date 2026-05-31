import type { ReactNode } from 'react';

export type AlertTone = 'info' | 'success' | 'warning' | 'danger';

type AlertProps = {
  title: string;
  children?: ReactNode;
  /**
   * Backward-compatible shorthand for simple text-only alerts.
   * Prefer children for richer content.
   */
  description?: ReactNode;
  tone?: AlertTone;
  action?: ReactNode;
  className?: string;
};

const icons: Record<AlertTone, string> = {
  info: 'i',
  success: '✓',
  warning: '!',
  danger: '×'
};

export function Alert({ title, children, description, tone = 'info', action, className }: AlertProps) {
  const supportingContent = children ?? description;
  const classes = ['ca-alert', `ca-alert--${tone}`, className ?? ''].filter(Boolean).join(' ');

  return (
    <section className={classes} role={tone === 'danger' ? 'alert' : 'status'}>
      <span className="ca-alert__icon" aria-hidden="true">{icons[tone]}</span>
      <div className="ca-alert__body">
        <strong>{title}</strong>
        {supportingContent ? <div>{supportingContent}</div> : null}
      </div>
      {action ? <div className="ca-alert__action">{action}</div> : null}
    </section>
  );
}
