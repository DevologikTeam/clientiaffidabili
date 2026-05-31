import type { InputHTMLAttributes, TextareaHTMLAttributes } from 'react';

function fieldIdFromLabel(label: string) {
  return label
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '') || 'field';
}

type SharedFieldProps = {
  label: string;
  name?: string;
  hint?: string;
  helpText?: string;
  error?: string;
  as?: 'input' | 'textarea';
};

type FieldProps = SharedFieldProps &
  InputHTMLAttributes<HTMLInputElement> &
  TextareaHTMLAttributes<HTMLTextAreaElement>;

export function Field({ label, name, hint, helpText, error, as = 'input', id, ...props }: FieldProps) {
  const fieldName = name ?? String(id ?? fieldIdFromLabel(label));
  const fieldId = String(id ?? fieldName);
  const help = helpText ?? hint;
  const describedBy = [help ? `${fieldId}-hint` : undefined, error ? `${fieldId}-error` : undefined].filter(Boolean).join(' ') || undefined;
  return (
    <label className="ca-field" htmlFor={fieldId}>
      <span>{label}</span>
      {as === 'textarea' ? (
        <textarea id={fieldId} name={fieldName} aria-invalid={Boolean(error)} aria-describedby={describedBy} {...props} />
      ) : (
        <input id={fieldId} name={fieldName} aria-invalid={Boolean(error)} aria-describedby={describedBy} {...props} />
      )}
      {help ? <small id={`${fieldId}-hint`} className="ca-field__help">{help}</small> : null}
      {error ? <small id={`${fieldId}-error`} className="ca-field__error">{error}</small> : null}
    </label>
  );
}
