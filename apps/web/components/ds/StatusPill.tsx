import type { ReactNode } from 'react';
import type { BadgeTone } from './Badge';

const statusSymbols: Record<BadgeTone, string> = {
  neutral: '•',
  info: 'i',
  success: '✓',
  warning: '!',
  danger: '×',
  brand: '•'
};

type StatusPillProps = {
  /**
   * Preferred explicit status text.
   */
  label?: ReactNode;
  /**
   * Backward-compatible shorthand for legacy `<StatusPill>Text</StatusPill>` usages.
   */
  children?: ReactNode;
  tone?: BadgeTone;
  className?: string;
};

export function StatusPill({ label, children, tone = 'neutral', className }: StatusPillProps) {
  const content = label ?? children;
  const classes = ['ca-status', `ca-status--${tone}`, className ?? ''].filter(Boolean).join(' ');

  return (
    <span className={classes}>
      <span aria-hidden="true">{statusSymbols[tone]}</span>
      {content}
    </span>
  );
}
