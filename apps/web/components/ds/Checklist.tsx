type ChecklistItem = string | { label: string; done?: boolean };

type ChecklistProps = {
  items: ReadonlyArray<ChecklistItem>;
  className?: string;
};

function getChecklistItemLabel(item: ChecklistItem): string {
  return typeof item === 'string' ? item : item.label;
}

function getChecklistItemDone(item: ChecklistItem): boolean {
  return typeof item === 'string' ? true : item.done !== false;
}

export function Checklist({ items, className }: ChecklistProps) {
  const classes = ['ca-checklist', className ?? ''].filter(Boolean).join(' ');

  return (
    <ul className={classes}>
      {items.map((item) => {
        const label = getChecklistItemLabel(item);
        const done = getChecklistItemDone(item);
        return (
          <li key={label} data-state={done ? 'done' : 'pending'}>
            <span aria-hidden="true">{done ? '✓' : '□'}</span>
            {label}
          </li>
        );
      })}
    </ul>
  );
}
