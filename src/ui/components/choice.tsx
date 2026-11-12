'use client';

import { useEffect, useId, useRef, type InputHTMLAttributes, type ReactNode } from 'react';
import { PiCheckBold, PiMinusBold, PiWarningCircle } from 'react-icons/pi';
import { cn } from '../cn';

/**
 * Checkbox, RadioGroup and Switch. See /kit#choice.
 *
 * Rules
 * - Checkbox: pick any number, or agree to something. Takes effect when the form is sent.
 * - RadioGroup: pick exactly one of a few (2–5) options that are all visible.
 * - Switch: turns a setting on or off immediately, with no Save button.
 * - Checked checkboxes and radios are bone with an ink mark (calm: there can be many on a page). A switch that's on
 *   is fire: it means "this is live now".
 * - The whole row (label included) is the tap target, at least 44px tall.
 * - The tick and dash are Phosphor Bold: Regular is too thin at this size (like the "more" dots).
 */

type ChoiceText = {
  label: ReactNode;
  /** A second line explaining the option. */
  description?: ReactNode;
};

function ErrorLine({ id, error }: { id: string; error?: string }) {
  if (!error) return null;
  return (
    <p id={id} className="mt-1 flex items-start gap-1.5 text-xs text-error">
      <PiWarningCircle aria-hidden className="mt-px size-4 shrink-0" />
      {error}
    </p>
  );
}

function Text({ label, description, disabled }: ChoiceText & { disabled?: boolean }) {
  return (
    <span className="min-w-0 flex-1">
      <span className={cn('block text-sm font-medium', disabled ? 'text-on-disabled' : 'text-bone')}>{label}</span>
      {description ? (
        <span className={cn('mt-0.5 block text-xs leading-snug', disabled ? 'text-on-disabled' : 'text-ash')}>{description}</span>
      ) : null}
    </span>
  );
}

// The visible box/circle sits next to a visually hidden native input (the "peer"), so keyboard, forms and screen
// readers work exactly like a normal checkbox while the look stays ours.
const MARK_BASE =
  'relative flex shrink-0 items-center justify-center border transition-colors duration-150 ' +
  'peer-focus-visible:outline-2 peer-focus-visible:outline-offset-3 peer-focus-visible:outline-ember ' +
  'peer-disabled:border-transparent peer-disabled:bg-disabled';

export function Checkbox({
  label,
  description,
  error,
  indeterminate = false,
  disabled,
  className,
  id: idProp,
  ...rest
}: ChoiceText & {
  error?: string;
  /** "Some of these are selected" (e.g. a select-all box). */
  indeterminate?: boolean;
  className?: string;
} & Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'className'>) {
  const autoId = useId();
  const id = idProp ?? autoId;
  const ref = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (ref.current) ref.current.indeterminate = indeterminate;
  }, [indeterminate]);

  return (
    <div className={className}>
      <label htmlFor={id} className={cn('flex min-h-11 items-start gap-3 py-2', disabled ? 'cursor-not-allowed' : 'cursor-pointer')}>
        <input
          ref={ref}
          id={id}
          type="checkbox"
          disabled={disabled}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? `${id}-err` : undefined}
          className="peer sr-only"
          {...rest}
        />
        <span
          aria-hidden
          className={cn(
            MARK_BASE,
            'mt-px size-5 rounded-md bg-surface text-ink',
            error ? 'border-error' : 'border-line-strong hover:border-ash',
            'peer-checked:border-bone peer-checked:bg-bone peer-indeterminate:border-bone peer-indeterminate:bg-bone',
            'peer-disabled:text-on-disabled [&>svg]:hidden peer-checked:[&>.tick]:block peer-indeterminate:[&>.dash]:block',
            'peer-indeterminate:[&>.tick]:hidden',
          )}
        >
          <PiCheckBold className="tick size-3.5" />
          <PiMinusBold className="dash size-3.5" />
        </span>
        <Text label={label} description={description} disabled={disabled} />
      </label>
      <ErrorLine id={`${id}-err`} error={error} />
    </div>
  );
}

export function RadioGroup({
  legend,
  name,
  options,
  value,
  defaultValue,
  onChange,
  error,
  disabled,
  className,
}: {
  /** The question the options answer, e.g. "Who can message you?". */
  legend: string;
  name: string;
  options: (ChoiceText & { value: string; disabled?: boolean })[];
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  error?: string;
  disabled?: boolean;
  className?: string;
}) {
  const groupId = useId();
  return (
    <fieldset
      className={className}
      disabled={disabled}
      aria-invalid={error ? true : undefined}
      aria-describedby={error ? `${groupId}-err` : undefined}
    >
      <legend className="mb-1 text-sm font-semibold text-bone">{legend}</legend>
      {options.map((o) => {
        const id = `${groupId}-${o.value}`;
        const off = disabled || o.disabled;
        return (
          <label key={o.value} htmlFor={id} className={cn('flex min-h-11 items-start gap-3 py-2', off ? 'cursor-not-allowed' : 'cursor-pointer')}>
            <input
              id={id}
              type="radio"
              name={name}
              value={o.value}
              disabled={o.disabled}
              checked={value === undefined ? undefined : value === o.value}
              defaultChecked={defaultValue === undefined ? undefined : defaultValue === o.value}
              onChange={onChange ? () => onChange(o.value) : undefined}
              className="peer sr-only"
            />
            <span
              aria-hidden
              className={cn(
                MARK_BASE,
                'mt-px size-5 rounded-full bg-surface',
                error ? 'border-error' : 'border-line-strong hover:border-ash',
                'peer-checked:border-bone peer-checked:bg-bone peer-checked:[&>span]:scale-100',
              )}
            >
              <span className="size-2 scale-0 rounded-full bg-ink transition-transform duration-150" />
            </span>
            <Text label={o.label} description={o.description} disabled={off} />
          </label>
        );
      })}
      <ErrorLine id={`${groupId}-err`} error={error} />
    </fieldset>
  );
}

export function Switch({
  label,
  description,
  disabled,
  className,
  id: idProp,
  ...rest
}: ChoiceText & { className?: string } & Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'className' | 'role'>) {
  const autoId = useId();
  const id = idProp ?? autoId;
  return (
    <label
      htmlFor={id}
      className={cn('flex min-h-11 items-center gap-4 py-2', disabled ? 'cursor-not-allowed' : 'cursor-pointer', className)}
    >
      <Text label={label} description={description} disabled={disabled} />
      <input id={id} type="checkbox" role="switch" disabled={disabled} className="peer sr-only" {...rest} />
      <span
        aria-hidden
        className={cn(
          // The "on" fire fill and the disabled look live in globals.css (.switch-track): the fire gradient is a CSS
          // class, which Tailwind's peer-checked: can't wrap.
          'switch-track relative inline-flex h-7 w-12 shrink-0 items-center rounded-full border border-line-strong bg-surface-2 transition-colors duration-200',
          'peer-focus-visible:outline-2 peer-focus-visible:outline-offset-3 peer-focus-visible:outline-ember',
          'peer-checked:[&>span]:translate-x-5 peer-checked:[&>span]:bg-bone peer-disabled:[&>span]:bg-on-disabled',
        )}
      >
        <span className="ml-0.5 size-5.5 rounded-full bg-ash shadow transition-transform duration-200" />
      </span>
    </label>
  );
}
