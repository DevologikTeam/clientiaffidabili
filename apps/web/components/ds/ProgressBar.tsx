type ProgressBarProps = {
  label: string;
  value: number;
  /**
   * Optional maximum used by wallet/usage panels. When omitted, value is treated
   * as an already-normalized percentage from 0 to 100.
   */
  max?: number;
  helpText?: string;
  className?: string;
};

function normalizeProgressValue(value: number, max?: number): number {
  if (typeof max === 'number' && max > 0) return Math.round((value / max) * 100);
  return value;
}

export function ProgressBar({ label, value, max, helpText, className }: ProgressBarProps) {
  const normalizedValue = normalizeProgressValue(value, max);
  const safeValue = Math.max(0, Math.min(100, normalizedValue));
  const classes = ['ca-progress', className ?? ''].filter(Boolean).join(' ');
  return (
    <div className={classes}>
      <div className="ca-progress__top">
        <span>{label}</span>
        <strong>{safeValue}%</strong>
      </div>
      <div className="ca-progress__track" role="progressbar" aria-label={label} aria-valuemin={0} aria-valuemax={100} aria-valuenow={safeValue}>
        <span style={{ width: `${safeValue}%` }} />
      </div>
      {helpText ? <p>{helpText}</p> : null}
    </div>
  );
}
