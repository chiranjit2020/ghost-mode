'use client';

import { useId, useState, type InputHTMLAttributes, type ReactNode, type TextareaHTMLAttributes } from 'react';
import type { IconType } from 'react-icons';
import { PiAt, PiCheckCircle, PiEye, PiEyeSlash, PiMagnifyingGlass, PiWarningCircle } from 'react-icons/pi';
import { cn } from '../cn';

/**
 * Field icons are chosen by name from a fixed set: one icon per meaning, and (as a client component) the field can't
 * receive an icon component from a server page. Add a name here when a new kind of field needs one.
 */
const FIELD_ICONS = { search: PiMagnifyingGlass, at: PiAt } satisfies Record<string, IconType>;
export type FieldIcon = keyof typeof FIELD_ICONS;

/**
 * TextField and TextArea: a labelled input with its hint, error and character count. See /kit#field.
 *
 * Rules
 * - Every field has a visible label above it. Placeholders are examples, never the label.
 * - Optional fields say "Optional"; required is the default and isn't marked.
 * - One message line under the field: the error if there is one, else the success note, else the hint.
 * - Errors say what to do ("Use 3–20 letters or numbers"), not just what's wrong.
 * - Text is 16px so phones don't zoom in when the field is tapped.
 * - Passwords get a show/hide button automatically.
 * - Disabled fields are neutral grey like every other disabled control.
 */

type FieldOwnProps = {
  label: string;
  /** Hide the label visually (still read by screen readers). Only when the purpose is obvious, e.g. a search box. */
  hideLabel?: boolean;
  hint?: ReactNode;
  error?: string;
  /** A short confirmation shown in place of the hint, e.g. "Available". */
  success?: string;
  optional?: boolean;
  className?: string;
};

const BOX =
  'w-full rounded-field border bg-surface text-base text-bone placeholder:text-smoke transition-colors duration-150 ' +
  'outline-none focus-visible:outline-none ' +
  'disabled:cursor-not-allowed disabled:border-transparent disabled:bg-disabled disabled:text-on-disabled disabled:placeholder:text-on-disabled';
const OK_BORDER = 'border-line-strong hover:border-ash/50 focus:border-ember focus:ring-2 focus:ring-ember/25';
const ERROR_BORDER = 'border-error focus:border-error focus:ring-2 focus:ring-error/25';

function Field({
  id,
  label,
  hideLabel,
  hint,
  error,
  success,
  optional,
  counter,
  className,
  children,
}: FieldOwnProps & { id: string; counter?: ReactNode; children: ReactNode }) {
  const message = error ? (
    <span className="flex items-start gap-1.5 text-error">
      <PiWarningCircle aria-hidden className="mt-px size-4 shrink-0" />
      {error}
    </span>
  ) : success ? (
    <span className="flex items-start gap-1.5 text-bone">
      <PiCheckCircle aria-hidden className="mt-px size-4 shrink-0" />
      {success}
    </span>
  ) : hint ? (
    <span className="text-ash">{hint}</span>
  ) : null;

  return (
    <div className={cn('flex flex-col gap-1.5', className)}>
      <label htmlFor={id} className={cn('flex items-baseline justify-between gap-2 text-sm font-semibold text-bone', hideLabel && 'sr-only')}>
        {label}
        {optional ? <span className="text-xs font-normal text-ash">Optional</span> : null}
      </label>
      {children}
      {/* Always present (even empty) so an error appearing doesn't push the page down by a whole line. */}
      <div id={`${id}-msg`} className="flex min-h-4 items-start justify-between gap-3 text-xs leading-snug" aria-live="polite">
        <div className="min-w-0">{message}</div>
        {counter}
      </div>
    </div>
  );
}

/** "N characters left", shown only in the last fifth of the limit so it doesn't nag. */
function Counter({ length, max }: { length: number; max?: number }) {
  if (!max) return null;
  const left = max - length;
  if (left > Math.max(10, Math.floor(max * 0.2))) return null;
  return (
    <span className={cn('shrink-0 tabular-nums', left <= 0 ? 'text-error' : 'text-ash')}>
      {left <= 0 ? 'No characters left' : `${left} character${left === 1 ? '' : 's'} left`}
    </span>
  );
}

export function TextField({
  label,
  hideLabel,
  hint,
  error,
  success,
  optional,
  className,
  icon,
  type = 'text',
  id: idProp,
  maxLength,
  value,
  defaultValue,
  onChange,
  ...rest
}: FieldOwnProps & {
  /** Icon at the start of the field: 'search' or 'at' (for Ghost names). */
  icon?: FieldIcon;
} & Omit<InputHTMLAttributes<HTMLInputElement>, 'className' | 'size'>) {
  const Icon = icon ? FIELD_ICONS[icon] : null;
  const autoId = useId();
  const id = idProp ?? autoId;
  const [shown, setShown] = useState(false);
  const [length, setLength] = useState(String(value ?? defaultValue ?? '').length);
  const isPassword = type === 'password';

  return (
    <Field
      id={id}
      label={label}
      hideLabel={hideLabel}
      hint={hint}
      error={error}
      success={success}
      optional={optional}
      className={className}
      counter={<Counter length={value !== undefined ? String(value).length : length} max={maxLength} />}
    >
      <div className="relative">
        {Icon ? <Icon aria-hidden className="pointer-events-none absolute top-1/2 left-4 size-5 -translate-y-1/2 text-ash" /> : null}
        <input
          id={id}
          type={isPassword && shown ? 'text' : type}
          maxLength={maxLength}
          value={value}
          defaultValue={defaultValue}
          onChange={(e) => {
            setLength(e.target.value.length);
            onChange?.(e);
          }}
          aria-invalid={error ? true : undefined}
          aria-describedby={`${id}-msg`}
          className={cn(BOX, error ? ERROR_BORDER : OK_BORDER, 'h-12 px-4', Icon && 'pl-11', isPassword && 'pr-12')}
          {...rest}
        />
        {isPassword ? (
          <button
            type="button"
            onClick={() => setShown((s) => !s)}
            aria-label={shown ? 'Hide password' : 'Show password'}
            aria-pressed={shown}
            disabled={rest.disabled}
            className="absolute top-1/2 right-1 flex size-10 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full text-ash transition hover:bg-surface-2 hover:text-bone disabled:pointer-events-none disabled:text-on-disabled"
          >
            {shown ? <PiEyeSlash aria-hidden className="size-5" /> : <PiEye aria-hidden className="size-5" />}
          </button>
        ) : null}
      </div>
    </Field>
  );
}

export function TextArea({
  label,
  hideLabel,
  hint,
  error,
  success,
  optional,
  className,
  id: idProp,
  maxLength,
  rows = 4,
  value,
  defaultValue,
  onChange,
  ...rest
}: FieldOwnProps & Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'className'>) {
  const autoId = useId();
  const id = idProp ?? autoId;
  const [length, setLength] = useState(String(value ?? defaultValue ?? '').length);

  return (
    <Field
      id={id}
      label={label}
      hideLabel={hideLabel}
      hint={hint}
      error={error}
      success={success}
      optional={optional}
      className={className}
      counter={<Counter length={value !== undefined ? String(value).length : length} max={maxLength} />}
    >
      <textarea
        id={id}
        rows={rows}
        maxLength={maxLength}
        value={value}
        defaultValue={defaultValue}
        onChange={(e) => {
          setLength(e.target.value.length);
          onChange?.(e);
        }}
        aria-invalid={error ? true : undefined}
        aria-describedby={`${id}-msg`}
        className={cn(BOX, error ? ERROR_BORDER : OK_BORDER, 'block resize-y px-4 py-3 leading-relaxed')}
        {...rest}
      />
    </Field>
  );
}
