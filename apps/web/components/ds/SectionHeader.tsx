type SectionHeaderProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: 'left' | 'center';
  className?: string;
};

export function SectionHeader({ eyebrow, title, description, align = 'left', className }: SectionHeaderProps) {
  const classes = ['ca-section-header', `ca-section-header--${align}`, className ?? ''].filter(Boolean).join(' ');
  return (
    <div className={classes}>
      {eyebrow ? <p className="ca-eyebrow">{eyebrow}</p> : null}
      <h2>{title}</h2>
      {description ? <p>{description}</p> : null}
    </div>
  );
}
