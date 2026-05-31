import { Checklist } from '@/components/ds';

export function EducationChecklist({ items }: { items: ReadonlyArray<string> }) {
  return (
    <section className="ca-education-block" id="checklist-operativa">
      <h2>Checklist operativa</h2>
      <Checklist items={items} />
    </section>
  );
}
