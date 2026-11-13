import type { ReactNode } from 'react';
import type { IconType } from 'react-icons';
import { cn } from '../cn';

/**
 * EmptyState: what a list or page shows when there's nothing in it. See /kit#empty.
 *
 * Rules
 * - Say why it's empty and what to do next, in that order. Four kinds, each worded differently:
 *   - first use: "No posts yet" + how to make the first one (Write a post).
 *   - no results: "No Ghosts called ‘moth3’" + how to widen the search. Repeat what they searched.
 *   - couldn't load: "Couldn't load your feed" + Try again. Never blame the person.
 *   - not open yet: "Hunts arrive in Level 3" + nothing to press.
 * - At most one action, as a button (primary only on a page's main empty state, secondary inside cards).
 * - An icon from Phosphor, not an illustration (no images until Level 7). Smoke grey, inside a soft circle.
 * - page: the main content of a screen is empty (centred, more room). inline: inside a card or a tab.
 * - Titles are a plain statement, no jokes about the person; a little Dark World voice in the line under it is fine.
 */
export type EmptyStateSize = 'page' | 'inline';

export function EmptyState({
  icon: Icon,
  title,
  children,
  action,
  size = 'inline',
  className,
}: {
  icon: IconType;
  title: string;
  /** One or two sentences: why it's empty, what happens next. */
  children?: ReactNode;
  /** One Button or ButtonLink. */
  action?: ReactNode;
  size?: EmptyStateSize;
  className?: string;
}) {
  const page = size === 'page';
  return (
    <div className={cn('flex flex-col items-center text-center', page ? 'px-4 py-16' : 'px-4 py-8', className)}>
      <span
        aria-hidden
        className={cn('flex items-center justify-center rounded-full border border-line bg-surface-2 text-smoke', page ? 'size-16' : 'size-12')}
      >
        <Icon className={page ? 'size-8' : 'size-6'} />
      </span>
      <p className={cn('font-display font-bold text-bone', page ? 'mt-5 text-xl' : 'mt-3 text-base')}>{title}</p>
      {children ? <div className={cn('max-w-sm text-sm text-ash', page ? 'mt-2' : 'mt-1')}>{children}</div> : null}
      {action ? <div className={page ? 'mt-6' : 'mt-4'}>{action}</div> : null}
    </div>
  );
}
