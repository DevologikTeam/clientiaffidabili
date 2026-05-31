import type { ReactNode } from 'react';

type TrustNoticeTone = 'info' | 'warning' | 'danger' | 'success';

type TrustNoticeProps = {
  title: string;
  children: ReactNode;
  tone?: TrustNoticeTone;
  className?: string;
};

export function TrustNotice({ title, children, tone = 'info', className }: TrustNoticeProps) {
  const classes = ['ca-trust-notice', `ca-trust-notice--${tone}`, className ?? ''].filter(Boolean).join(' ');
  return (
    <aside className={classes}>
      <strong>{title}</strong>
      <div>{children}</div>
    </aside>
  );
}
