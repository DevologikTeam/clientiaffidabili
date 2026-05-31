import type { ReactNode } from 'react';

export type BadgeTone = 'neutral' | 'info' | 'success' | 'warning' | 'danger' | 'brand';

type BadgeProps = {
  children: ReactNode;
  tone?: BadgeTone;
  className?: string;
};

export function Badge({ children, tone = 'neutral', className }: BadgeProps) {
  const classes = ['ca-badge', `ca-badge--${tone}`, className ?? ''].filter(Boolean).join(' ');
  return <span className={classes}>{children}</span>;
}
