'use client';

import { useEffect, useRef, useState } from 'react';
import { PiLightning } from 'react-icons/pi';
import { WORLD } from '@/world/world.config';
import { cn } from '../cn';

/**
 * DP counter and DP change: a devil's Devil Points, and how they moved. See /kit#dp.
 *
 * Rules
 * - Numbers use Indian grouping (8,450 · 1,25,000), tabular so they don't wobble while counting.
 * - DpCounter sm: the chip in the header, always visible. lg: the big number on a profile.
 * - When the balance changes it counts to the new number (under a second) and shows the change beside it for a
 *   moment. People who ask for less motion get the new number at once. Screen readers aren't told by the counter:
 *   the reward toast says it once.
 * - DpChange "+6 DP" / "−4 DP" in histories and lists. Gains are fire; losses are calm grey, never alarm red:
 *   losing a little is part of the game, not an error. 0 is grey too.
 * - DP is earned only. Never next to a price, never "buy DP" (PLAN: DP is never sold or turned into money).
 */
const format = (n: number) => Math.round(n).toLocaleString('en-IN');

function prefersLessMotion() {
  return typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/** Counts from the old value to the new one, easing out, over `ms`. */
function useCountTo(value: number, ms = 700) {
  const [shown, setShown] = useState(value);
  const from = useRef(value);

  useEffect(() => {
    const start = from.current;
    if (start === value) return;
    if (prefersLessMotion()) {
      from.current = value;
      setShown(value);
      return;
    }
    let frame = 0;
    const t0 = performance.now();
    const tick = (now: number) => {
      const p = Math.min(1, (now - t0) / ms);
      const eased = 1 - Math.pow(1 - p, 3);
      const v = start + (value - start) * eased;
      from.current = v;
      setShown(v);
      if (p < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [value, ms]);

  return shown;
}

/** The last change, shown for a moment after the balance moves. */
function useRecentChange(value: number) {
  const prev = useRef(value);
  const [change, setChange] = useState<{ by: number; key: number } | null>(null);
  useEffect(() => {
    const by = value - prev.current;
    prev.current = value;
    if (by === 0) return;
    setChange({ by, key: Date.now() });
    const t = setTimeout(() => setChange(null), 1800);
    return () => clearTimeout(t);
  }, [value]);
  return change;
}

export function DpCounter({ value, size = 'sm', className }: { value: number; size?: 'sm' | 'lg'; className?: string }) {
  const shown = useCountTo(value);
  const change = useRecentChange(value);
  const label = `${format(value)} ${WORLD.currency}`;

  if (size === 'lg') {
    return (
      <p className={cn('relative inline-flex items-baseline gap-2', className)}>
        <span aria-hidden className="font-display text-4xl font-extrabold gradient-ink tabular-nums">
          {format(shown)} {WORLD.currencyShort}
        </span>
        <span className="sr-only">{label}</span>
        {change ? <ChangeFlash key={change.key} by={change.by} className="absolute -top-3 left-full ml-1 text-sm" /> : null}
      </p>
    );
  }
  return (
    <span
      className={cn(
        'relative inline-flex h-9 items-center gap-1.5 rounded-full border border-line-strong bg-surface pr-3 pl-2.5 text-sm font-semibold text-bone',
        className,
      )}
    >
      <PiLightning aria-hidden className="size-4 text-ember" />
      <span aria-hidden className="tabular-nums">
        {format(shown)}
      </span>
      <span className="sr-only">{label}</span>
      {change ? <ChangeFlash key={change.key} by={change.by} className="absolute -top-2.5 -right-2 text-xs" /> : null}
    </span>
  );
}

function ChangeFlash({ by, className }: { by: number; className?: string }) {
  return (
    <span
      aria-hidden
      className={cn('dp-flash pointer-events-none font-bold tabular-nums', by > 0 ? 'text-ember' : 'text-ash', className)}
    >
      {by > 0 ? '+' : '−'}
      {format(Math.abs(by))}
    </span>
  );
}

/** "+6 DP" / "−4 DP" / "0 DP" for histories and lists. */
export function DpChange({ by, className }: { by: number; className?: string }) {
  const gain = by > 0;
  return (
    <span className={cn('font-semibold whitespace-nowrap tabular-nums', gain ? 'gradient-ink' : 'text-ash', className)}>
      {gain ? '+' : by < 0 ? '−' : ''}
      {format(Math.abs(by))} {WORLD.currencyShort}
    </span>
  );
}
