export type StepState = 'done' | 'current' | 'blocked' | 'todo';

export type StepperItem = {
  label: string;
  description?: string;
  state?: StepState;
};

type StepperProps = {
  /**
   * Preferred typed contract for new flows.
   */
  items?: ReadonlyArray<StepperItem>;
  /**
   * Backward-compatible shorthand used by checkout pages created before the
   * design-system stepper accepted rich item metadata.
   */
  steps?: ReadonlyArray<string>;
  /**
   * Backward-compatible 1-based active step index used with `steps`.
   */
  currentStep?: number;
  orientation?: 'horizontal' | 'vertical';
  className?: string;
};

const stateLabel: Record<StepState, string> = {
  done: 'Completato',
  current: 'In corso',
  blocked: 'Bloccato',
  todo: 'Da fare'
};

function normalizeStepperItems({ items, steps, currentStep }: Pick<StepperProps, 'items' | 'steps' | 'currentStep'>): StepperItem[] {
  if (items?.length) return [...items];

  const safeCurrentStep = Math.max(1, currentStep ?? 1);
  return (steps ?? []).map((label, index) => {
    const stepNumber = index + 1;
    return {
      label,
      state: stepNumber < safeCurrentStep ? 'done' : stepNumber === safeCurrentStep ? 'current' : 'todo',
    } satisfies StepperItem;
  });
}

export function Stepper({ items, steps, currentStep, orientation = 'horizontal', className }: StepperProps) {
  const normalizedItems = normalizeStepperItems({ items, steps, currentStep });
  const classes = ['ca-stepper', `ca-stepper--${orientation}`, className ?? ''].filter(Boolean).join(' ');

  if (normalizedItems.length === 0) return null;

  return (
    <ol className={classes}>
      {normalizedItems.map((item, index) => {
        const state = item.state ?? 'todo';
        return (
          <li className={`ca-stepper__item ca-stepper__item--${state}`} key={`${item.label}-${index}`}>
            <span className="ca-stepper__marker" aria-hidden="true">{state === 'done' ? '✓' : index + 1}</span>
            <div>
              <strong>{item.label}</strong>
              <small>{stateLabel[state]}</small>
              {item.description ? <p>{item.description}</p> : null}
            </div>
          </li>
        );
      })}
    </ol>
  );
}
