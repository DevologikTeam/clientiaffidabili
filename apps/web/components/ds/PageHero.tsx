import type { ReactNode } from 'react';

type PageHeroProps = {
  eyebrow?: string;
  title: string;
  description: string;
  actions?: ReactNode;
  aside?: ReactNode;
  className?: string;
};

export function PageHero({ eyebrow, title, description, actions, aside, className }: PageHeroProps) {
  const classes = ['ca-hero-surface', className ?? ''].filter(Boolean).join(' ');
  return (
    <section className={classes}>
      <div className="container ca-hero-surface__grid">
        <div>
          {eyebrow ? <p className="ca-eyebrow ca-eyebrow--light">{eyebrow}</p> : null}
          <h1>{title}</h1>
          <p>{description}</p>
          {actions ? <div className="ca-hero-surface__actions">{actions}</div> : null}
        </div>
        {aside ? <div className="ca-hero-surface__aside">{aside}</div> : null}
      </div>
    </section>
  );
}
