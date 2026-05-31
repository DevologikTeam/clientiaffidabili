import type { HTMLAttributes, ReactNode } from 'react';

type CardVariant = 'default' | 'interactive' | 'elevated' | 'danger';

type CardProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
  variant?: CardVariant;
};

export function Card({ children, variant = 'default', className, ...props }: CardProps) {
  return (
    <div className={['ca-card', `ca-card--${variant}`, className ?? ''].filter(Boolean).join(' ')} {...props}>
      {children}
    </div>
  );
}
