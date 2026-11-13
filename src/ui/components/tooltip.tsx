'use client';

import { useEffect, useId, useLayoutEffect, useRef, useState, type ReactNode } from 'react';
import { PiInfo } from 'react-icons/pi';
import { cn } from '../cn';

/**
 * Tooltip and Toggletip: small text next to a control. See /kit#tooltip.
 *
 * Rules
 * - Tooltip: names an icon-only button on hover or keyboard focus ("Save", "Mute"). Phones have no hover, so a
 *   tooltip must never hold anything people need: the button's own label already says it to screen readers.
 * - `describes` adds a short extra line the label doesn't cover ("Saved posts are private"); then screen
 *   readers hear it too. Still nothing essential.
 * - Toggletip: an ⓘ button you tap or click to explain a game word (DP, Exposure). Works on phones. Use it, not a
 *   tooltip, whenever the text matters.
 * - A few words for a tooltip, at most two short sentences for a toggletip. No links or buttons inside either.
 * - Tooltips show after a short pause on hover (so they don't flicker as the pointer passes) and at once on
 *   keyboard focus. Esc hides them. The pointer can move onto the tooltip without it vanishing.
 * - Above by default; below when there's no room. They shift sideways to stay on screen.
 */
type Side = 'top' | 'bottom';
type Align = 'center' | 'start' | 'end';

const BUBBLE =
  'pointer-events-auto absolute z-[55] w-max max-w-64 rounded-[10px] border border-line-strong bg-surface-2 px-2.5 py-1.5 ' +
  'text-xs leading-snug font-medium text-bone shadow-[0_8px_24px_rgb(0_0_0/0.5)]';

const ALIGN: Record<Align, string> = {
  center: 'left-1/2 -translate-x-1/2',
  start: 'left-0',
  end: 'right-0',
};

/** Measures the bubble and picks the side and alignment that keep it on screen (classes only: no inline styles). */
function usePlacement(open: boolean, preferred: Side) {
  const anchorRef = useRef<HTMLSpanElement>(null);
  const bubbleRef = useRef<HTMLSpanElement>(null);
  const [side, setSide] = useState<Side>(preferred);
  const [align, setAlign] = useState<Align>('center');

  useLayoutEffect(() => {
    if (!open) {
      setSide(preferred);
      setAlign('center');
      return;
    }
    const a = anchorRef.current?.getBoundingClientRect();
    const b = bubbleRef.current?.getBoundingClientRect();
    if (!a || !b) return;
    const gap = 8;
    const roomAbove = a.top - gap;
    const roomBelow = window.innerHeight - a.bottom - gap;
    setSide(preferred === 'top' ? (roomAbove < b.height && roomBelow > roomAbove ? 'bottom' : 'top') : roomBelow < b.height && roomAbove > roomBelow ? 'top' : 'bottom');
    const half = b.width / 2;
    const mid = a.left + a.width / 2;
    setAlign(mid - half < gap ? 'start' : mid + half > window.innerWidth - gap ? 'end' : 'center');
  }, [open, preferred]);

  return { anchorRef, bubbleRef, side, align };
}

export function Tooltip({
  text,
  describes = false,
  side: preferred = 'top',
  children,
  className,
}: {
  text: string;
  /** true: extra information screen readers should hear too. false (default): it only repeats the button's label. */
  describes?: boolean;
  side?: Side;
  /** One focusable control, usually an IconButton. */
  children: ReactNode;
  className?: string;
}) {
  const id = useId();
  const [open, setOpen] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const { anchorRef, bubbleRef, side, align } = usePlacement(open, preferred);

  // Link the description to the control inside (it may come from a server component, so no cloneElement).
  useEffect(() => {
    if (!describes) return;
    const el = anchorRef.current?.querySelector<HTMLElement>('button, a, input, [tabindex]');
    el?.setAttribute('aria-describedby', id);
    return () => el?.removeAttribute('aria-describedby');
  }, [describes, id, anchorRef]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open]);

  useEffect(() => () => clearTimeout(timer.current), []);

  const show = (delay: number) => {
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setOpen(true), delay);
  };
  const hide = () => {
    clearTimeout(timer.current);
    setOpen(false);
  };

  return (
    <span
      ref={anchorRef}
      className={cn('relative inline-flex', className)}
      onPointerEnter={(e) => e.pointerType === 'mouse' && show(400)}
      onPointerLeave={hide}
      onFocus={(e) => e.target.matches(':focus-visible') && show(0)}
      onBlur={hide}
      // A tap or click means the person is acting, not asking: get out of the way.
      onPointerDown={hide}
    >
      {children}
      {/* Always in the page (display:none when closed), so the describedby link always points at real text. */}
      <span
        ref={bubbleRef}
        id={id}
        role="tooltip"
        aria-hidden={describes ? undefined : true}
        className={cn(
          BUBBLE,
          ALIGN[align],
          side === 'top' ? 'bottom-full mb-2' : 'top-full mt-2',
          // An invisible strip over the gap, so moving the pointer onto the bubble doesn't close it.
          'before:absolute before:inset-x-0 before:h-2',
          side === 'top' ? 'before:top-full' : 'before:bottom-full',
          // Closed = display:none, not just invisible: an invisible bubble still takes space and can make a phone page
          // scroll sideways. Screen readers still read a describedby target that is display:none.
          open ? 'block' : 'hidden',
        )}
      >
        {text}
      </span>
    </span>
  );
}

export function Toggletip({
  term,
  children,
  side: preferred = 'top',
  className,
}: {
  /** The word being explained; the button is read as "About {term}". */
  term: string;
  /** One or two short sentences. */
  children: ReactNode;
  side?: Side;
  className?: string;
}) {
  const [open, setOpen] = useState(false);
  const { anchorRef, bubbleRef, side, align } = usePlacement(open, preferred);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    const onPointer = (e: PointerEvent) => !anchorRef.current?.contains(e.target as Node) && setOpen(false);
    document.addEventListener('keydown', onKey);
    document.addEventListener('pointerdown', onPointer);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('pointerdown', onPointer);
    };
  }, [open, anchorRef]);

  return (
    <span ref={anchorRef} className={cn('relative inline-flex align-middle', className)}>
      <button
        type="button"
        aria-label={`About ${term}`}
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
        onBlur={() => setOpen(false)}
        // 44px tap area around a small icon, pulled in so it doesn't push the text apart.
        className={cn(
          '-m-3 inline-flex size-11 cursor-pointer items-center justify-center rounded-full',
          open ? 'text-bone' : 'text-smoke hover:text-bone',
        )}
      >
        <PiInfo aria-hidden className="size-5" />
      </button>
      {/* A live region: screen readers read the text when it appears, without moving focus. */}
      <span role="status">
        {open ? (
          <span
            ref={bubbleRef}
            className={cn(BUBBLE, 'max-w-72 px-3 py-2 text-sm font-normal', ALIGN[align], side === 'top' ? 'bottom-full mb-2' : 'top-full mt-2')}
          >
            {children}
          </span>
        ) : null}
      </span>
    </span>
  );
}
