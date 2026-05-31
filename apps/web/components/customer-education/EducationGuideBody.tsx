import type { CustomerEducationPage } from '@/lib/seo-geo/customer-education-runtime';
import { EducationChecklist } from './EducationChecklist';
import { OperationalLimitsBox } from './OperationalLimitsBox';

export function EducationGuideBody({ page }: { page: CustomerEducationPage }) {
  return (
    <div className="ca-education-body">
      {page.sections.map((section) => (
        <section className="ca-education-block" id={section.id} key={section.id}>
          <h2>{section.title}</h2>
          <p>{section.body}</p>
          {section.bullets?.length ? (
            <ul>
              {section.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}
            </ul>
          ) : null}
        </section>
      ))}
      <EducationChecklist items={page.operationalChecklist} />
      <OperationalLimitsBox notes={page.guaranteeNotes} />
    </div>
  );
}
