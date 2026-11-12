import Link from 'next/link';
import type { ButtonHTMLAttributes } from 'react';
import type { IconType } from 'react-icons';
import { cn } from '../cn';
import { Spinner } from './spinner';

/**
 * IconButton: a round button that is only an icon (menu, close, more, back, send). See /kit#icon-button.
 *
 * Rules
 * - `label` is required: it's what screen readers say, since there's no visible text.
 * - secondary (outlined) is the default. quiet for toolbars and rows of icons. primary only for the one main
 *   action it stands for (e.g. Send in a composer).
 * - `pressed` makes it a toggle (on = solid bone with ink icon), e.g. Save, Mute.
 * - Icons are Phosphor Regular at 20px or larger (smaller blurs on laptop screens). The "more" icon is the one
 *   Bold icon: Regular dots vanish.
 * - Same disabled/loading behaviour as Button.
 */
export type IconButtonVariant = 'primary' | 'secondary' | 'quiet';
export type IconButtonSize = 'sm' | 'md' | 'lg';

const VARIANT: Record<IconButtonVariant, string> = {
  primary: 'btn-fire text-bone disabled:bg-none disabled:bg-disabled disabled:text-on-disabled disabled:shadow-none',
  secondary:
    'border border-line-strong bg-surface text-bone hover:border-ash hover:bg-surface-2 ' +
    'disabled:border-transparent disabled:bg-disabled disabled:text-on-disabled',
  quiet: 'text-ash hover:bg-surface hover:text-bone disabled:bg-transparent disabled:text-on-disabled',
};

// The "on" look of a toggle, same for every variant so a pressed state always reads the same.
const PRESSED = 'border border-bone bg-bone text-ink hover:bg-bone hover:text-ink';

const SIZE: Record<IconButtonSize, { box: string; icon: string }> = {
  sm: { box: 'size-11', icon: 'size-5' }, // 44px
  md: { box: 'size-12', icon: 'size-6' }, // 48px
  lg: { box: 'size-14', icon: 'size-7' }, // 56px
};

/**
 * The icon-button look for an element that can't be a <button>, such as a <details> <summary>.
 * The icon inside should use `iconButtonIconClass(size)`.
 */
export function iconButtonClasses({
  variant = 'secondary',
  size = 'md',
  className,
}: {
  variant?: IconButtonVariant;
  size?: IconButtonSize;
  className?: string;
}) {
  return classes(variant, size, false, className);
}
export const iconButtonIconClass = (size: IconButtonSize = 'md') => SIZE[size].icon;

function classes(variant: IconButtonVariant, size: IconButtonSize, pressed: boolean, className?: string) {
  return cn(
    'inline-flex shrink-0 items-center justify-center rounded-full transition duration-150 cursor-pointer',
    'active:scale-95 disabled:cursor-not-allowed disabled:active:scale-100',
    SIZE[size].box,
    pressed ? PRESSED : VARIANT[variant],
    className,
  );
}

type CommonProps = {
  icon: IconType;
  /** What the button does, read by screen readers (e.g. "Open menu", "Close"). */
  label: string;
  variant?: IconButtonVariant;
  size?: IconButtonSize;
  className?: string;
};

export function IconButton({
  icon: Icon,
  label,
  variant = 'secondary',
  size = 'md',
  pressed,
  loading = false,
  className,
  type = 'button',
  onClick,
  ...rest
}: CommonProps & {
  /** Makes this a toggle. Leave undefined for a normal button. */
  pressed?: boolean;
  loading?: boolean;
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children' | 'className' | 'aria-label' | 'aria-pressed'>) {
  return (
    <button
      type={loading && type === 'submit' ? 'button' : type}
      aria-label={label}
      aria-pressed={pressed}
      aria-busy={loading || undefined}
      aria-disabled={loading || undefined}
      onClick={loading ? undefined : onClick}
      className={classes(variant, size, pressed === true, cn(loading && 'pointer-events-none', className))}
      {...rest}
    >
      {loading ? <Spinner className={SIZE[size].icon} /> : <Icon aria-hidden className={SIZE[size].icon} />}
    </button>
  );
}

/** An icon-only link (goes somewhere), e.g. the back arrow. */
export function IconButtonLink({ href, icon: Icon, label, variant = 'secondary', size = 'md', className }: CommonProps & { href: string }) {
  return (
    <Link href={href} aria-label={label} className={classes(variant, size, false, className)}>
      <Icon aria-hidden className={SIZE[size].icon} />
    </Link>
  );
}
