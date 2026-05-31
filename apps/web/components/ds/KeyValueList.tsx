import type { ReactNode } from 'react';

export type KeyValueItem = {
  label: string;
  value: ReactNode;
};

type KeyValueListProps = {
  items: ReadonlyArray<KeyValueItem>;
  className?: string;
};

export function KeyValueList({ items, className }: KeyValueListProps) {
  const classes = ['ca-key-value-list', className ?? ''].filter(Boolean).join(' ');
  return (
    <dl className={classes}>
      {items.map((item) => (
        <div className="ca-key-value-list__row" key={item.label}>
          <dt>{item.label}</dt>
          <dd>{item.value}</dd>
        </div>
      ))}
    </dl>
  );
}
