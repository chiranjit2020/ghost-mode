import { cn } from '../cn';

/**
 * CountBadge: "something new is waiting" on an icon or menu item. See /kit#tag.
 *
 * Rules
 * - A number when the count matters (3 messages), a dot when only "new" matters.
 * - 0 shows nothing. Over 99 shows "99+".
 * - Red fill (badge token) is reserved for this: unread, waiting for you. Not for errors, not for decoration.
 * - The number is decorative for screen readers: the control it sits on must say it (IconButton does this for you).
 * - On an icon, use IconButton's `badge` prop instead of placing this by hand.
 */
export function CountBadge({ value, className }: { value: number | 'dot'; className?: string }) {
  if (value === 0) return null;
  if (value === 'dot') {
    return <span aria-hidden className={cn('block size-2.5 rounded-full bg-badge ring-2 ring-void', className)} />;
  }
  return (
    <span
      aria-hidden
      className={cn(
        'inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-badge px-1.5 text-[0.7rem] leading-none font-bold text-bone tabular-nums ring-2 ring-void',
        className,
      )}
    >
      {value > 99 ? '99+' : value}
    </span>
  );
}

/** What a screen reader should hear for a badge, appended to the control's label. */
export function badgeLabel(value: number | 'dot' | undefined): string {
  if (value === undefined || value === 0) return '';
  if (value === 'dot') return ', new';
  return `, ${value > 99 ? 'more than 99' : value} new`;
}
