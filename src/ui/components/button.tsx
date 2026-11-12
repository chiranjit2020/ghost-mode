import Link from 'next/link';
import type { ButtonHTMLAttributes, ReactNode } from 'react';
import type { IconType } from 'react-icons';
import { cn } from '../cn';
import { Spinner } from './spinner';

/**
 * Button: the one way to make something clickable look like a button. See /kit#button.
 *
 * Rules
 * - primary: the ONE main action of a screen or card (Enter, Post, Buy). At most one per view.
 * - secondary: other real actions next to it (Cancel, Learn more).
 * - quiet: low-weight actions in toolbars and menus.
 * - link: small actions beside content (Reply, Remove, See all). Never a filled button for these.
 * - danger: irreversible actions only (Delete, Leave). Asks for confirmation elsewhere.
 * - Disabled is neutral grey, never a faded brand colour. Loading keeps the look and shows a spinner.
 * - className is for layout only (margin, width). Colours and sizes come from variant/size, nowhere else.
 */
export type ButtonVariant = 'primary' | 'secondary' | 'quiet' | 'link' | 'danger';
export type ButtonSize = 'sm' | 'md' | 'lg';

const BASE =
  'inline-flex items-center justify-center gap-2 font-semibold whitespace-nowrap select-none transition duration-150 ' +
  'cursor-pointer disabled:cursor-not-allowed';

const BOX = 'rounded-full active:scale-[0.98] disabled:active:scale-100';

const VARIANT: Record<ButtonVariant, string> = {
  primary: cn(BOX, 'btn-fire text-bone', 'disabled:bg-none disabled:bg-disabled disabled:text-on-disabled disabled:shadow-none'),
  secondary: cn(
    BOX,
    'border border-line-strong bg-surface text-bone hover:border-ash hover:bg-surface-2',
    'disabled:border-transparent disabled:bg-disabled disabled:text-on-disabled',
  ),
  quiet: cn(BOX, 'text-ash hover:bg-surface hover:text-bone', 'disabled:bg-transparent disabled:text-on-disabled'),
  link: 'rounded-md text-link underline-offset-4 hover:underline disabled:text-on-disabled disabled:no-underline',
  danger: cn(BOX, 'bg-danger text-bone hover:bg-danger-hover', 'disabled:bg-disabled disabled:text-on-disabled'),
};

// Every size is at least 44px tall: a comfortable thumb target on phones.
const SIZE: Record<ButtonSize, string> = {
  sm: 'min-h-11 px-4 text-sm',
  md: 'min-h-12 px-6 text-button',
  lg: 'min-h-14 px-8 text-base',
};
// Link buttons are text-sized, but keep a 44px-tall tap area (padding, not visible box) like every other control.
const LINK_SIZE: Record<ButtonSize, string> = { sm: 'min-h-11 text-sm', md: 'min-h-11 text-button', lg: 'min-h-11 text-base' };
const ICON_SIZE: Record<ButtonSize, string> = { sm: 'size-4', md: 'size-5', lg: 'size-5' };

export function buttonClasses({
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  className,
}: {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  className?: string;
}) {
  return cn(BASE, VARIANT[variant], variant === 'link' ? LINK_SIZE[size] : SIZE[size], fullWidth && 'w-full', className);
}

type CommonProps = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  /** Icon before the label. */
  icon?: IconType;
  /** Icon after the label (e.g. an arrow for "go somewhere"). */
  iconEnd?: IconType;
  fullWidth?: boolean;
  className?: string;
  children: ReactNode;
};

function Inner({ icon: Icon, iconEnd: IconEnd, size = 'md', loading, children }: CommonProps & { loading?: boolean }) {
  const iconClass = ICON_SIZE[size];
  return (
    <>
      {loading ? <Spinner className={iconClass} /> : Icon ? <Icon aria-hidden className={iconClass} /> : null}
      <span>{children}</span>
      {IconEnd && !loading ? <IconEnd aria-hidden className={iconClass} /> : null}
    </>
  );
}

export function Button({
  variant,
  size,
  icon,
  iconEnd,
  fullWidth,
  loading = false,
  className,
  children,
  type = 'button',
  disabled,
  onClick,
  ...rest
}: CommonProps & { loading?: boolean } & Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children' | 'className'>) {
  return (
    <button
      // Loading is not "disabled": it keeps its colour but ignores clicks (no handler, no pointer events, and a
      // submit button stops submitting, so Enter can't send the form twice) and tells screen readers it's busy.
      type={loading && type === 'submit' ? 'button' : type}
      disabled={disabled}
      aria-busy={loading || undefined}
      aria-disabled={loading || undefined}
      onClick={loading ? undefined : onClick}
      className={buttonClasses({ variant, size, fullWidth, className: cn(loading && 'pointer-events-none', className) })}
      {...rest}
    >
      <Inner icon={icon} iconEnd={iconEnd} size={size} loading={loading}>
        {children}
      </Inner>
    </button>
  );
}

/**
 * A link that looks like a button (it goes somewhere instead of doing something). Links have no disabled state:
 * if the destination isn't available, render a disabled <Button> instead.
 */
export function ButtonLink({
  href,
  variant,
  size,
  icon,
  iconEnd,
  fullWidth,
  className,
  children,
}: CommonProps & { href: string }) {
  return (
    <Link href={href} className={buttonClasses({ variant, size, fullWidth, className })}>
      <Inner icon={icon} iconEnd={iconEnd} size={size}>
        {children}
      </Inner>
    </Link>
  );
}
