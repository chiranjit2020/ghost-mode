'use client';

import { useEffect, useLayoutEffect, useRef, useState, type KeyboardEvent } from 'react';
import { PiSmiley } from 'react-icons/pi';
import { HALO, REACTIONS } from '@/world/world.config';
import { cn } from '../cn';
import { menuPanelClasses } from './menu-styles';

/**
 * Reaction bar: the dark reactions under a post. See /kit#reactions.
 *
 * Rules
 * - One reaction per person per post. Tap React to open the picker, tap one to react; tap your own again to take it
 *   back. The button then shows your reaction, so you always know what you sent.
 * - The 8 reactions come from world.config.ts, in that order, always all 8 (no "top picks" that change places).
 * - The summary shows the 3 most used and the total. Exact numbers per reaction are for screen readers and the
 *   "who reacted" list, not the bar: the bar stays calm.
 * - The name of the reaction under your finger (or keyboard focus) shows in the picker, so it works on phones too.
 * - 😇 Halo only when the switch is on (Level 3 test). It costs the thrower DP, and the cost is shown before you
 *   throw it, never after.
 * - Reacting may earn DP; that's the reward toast's job, not the bar's.
 */
export type ReactionName = (typeof REACTIONS)[number]['name'] | typeof HALO.name;

type Choice = { emoji: string; name: ReactionName };
const ALL: Choice[] = [...REACTIONS];

export function ReactionBar({
  counts,
  mine,
  onChange,
  halo,
  className,
}: {
  /** How many of each, by name. Missing = 0. Your own reaction is already included. */
  counts: Partial<Record<ReactionName, number>>;
  mine: ReactionName | null;
  onChange: (next: ReactionName | null) => void;
  /** Turns on 😇 Halo, with what it costs the thrower. */
  halo?: { cost: number };
  className?: string;
}) {
  const [open, setOpen] = useState(false);
  const [hover, setHover] = useState<ReactionName | null>(null);
  const [below, setBelow] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLButtonElement | null)[]>([]);
  // Opened with Enter/Space: focus goes onto an emoji. Opened by tap or click: onto the panel, so no emoji
  // lights up with a focus ring (it would look already chosen), and arrow keys still work.
  const byKeyboard = useRef(false);

  const choices: Choice[] = halo ? [...ALL, { emoji: HALO.emoji, name: HALO.name }] : ALL;
  const total = Object.values(counts).reduce((a, b) => a + (b ?? 0), 0);
  const top = [...choices]
    .filter((c) => (counts[c.name] ?? 0) > 0)
    .sort((a, b) => (counts[b.name] ?? 0) - (counts[a.name] ?? 0))
    .slice(0, 3);
  const mineChoice = choices.find((c) => c.name === mine);

  // Opens above the button; below when there's no room. Focus goes to your reaction, or the first.
  useLayoutEffect(() => {
    if (!open) return;
    const btn = buttonRef.current?.getBoundingClientRect();
    const panel = panelRef.current?.getBoundingClientRect();
    if (btn && panel) setBelow(btn.top < panel.height + 16);
    if (byKeyboard.current) itemRefs.current[Math.max(0, choices.findIndex((c) => c.name === mine))]?.focus();
    else panelRef.current?.focus();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onPointer = (e: PointerEvent) => !rootRef.current?.contains(e.target as Node) && setOpen(false);
    document.addEventListener('pointerdown', onPointer);
    return () => document.removeEventListener('pointerdown', onPointer);
  }, [open]);

  function close(returnFocus: boolean) {
    setOpen(false);
    setHover(null);
    if (returnFocus) buttonRef.current?.focus();
  }

  function pick(name: ReactionName) {
    onChange(name === mine ? null : name);
    close(true);
  }

  function onKey(e: KeyboardEvent) {
    const i = itemRefs.current.findIndex((el) => el === document.activeElement);
    const n = choices.length;
    let next: number | undefined;
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') next = (i + 1) % n;
    else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') next = i < 0 ? n - 1 : (i - 1 + n) % n;
    else if (e.key === 'Home') next = 0;
    else if (e.key === 'End') next = n - 1;
    else if (e.key === 'Escape') {
      e.preventDefault();
      close(true);
      return;
    } else if (e.key === 'Tab') {
      close(false);
      return;
    }
    if (next === undefined) return;
    e.preventDefault();
    itemRefs.current[next]?.focus();
  }

  const caption = hover ?? mine;
  const captionChoice = choices.find((c) => c.name === caption);
  const summaryLabel =
    total === 0
      ? 'No reactions yet'
      : `${total} reactions: ` + top.map((c) => `${counts[c.name]} ${c.name}`).join(', ') + (choices.filter((c) => (counts[c.name] ?? 0) > 0).length > 3 ? ' and more' : '');

  return (
    <div ref={rootRef} className={cn('relative flex items-center gap-3', className)}>
      <button
        ref={buttonRef}
        type="button"
        aria-haspopup="true"
        aria-expanded={open}
        aria-label={mineChoice ? `Your reaction: ${mineChoice.name}. Change` : 'React'}
        onClick={(e) => {
          if (open) return close(false);
          byKeyboard.current = e.detail === 0; // a click from Enter/Space has no pointer clicks
          setOpen(true);
        }}
        className={cn(
          'inline-flex min-h-11 cursor-pointer items-center gap-2 rounded-full border px-3.5 text-sm font-semibold transition-colors duration-150',
          mineChoice
            ? mineChoice.name === HALO.name
              ? 'border-halo/40 bg-halo/10 text-halo'
              : 'border-crimson/45 bg-crimson/15 text-bone hover:bg-crimson/20'
            : 'border-line-strong bg-surface text-ash hover:border-ash hover:bg-surface-2 hover:text-bone',
        )}
      >
        {mineChoice ? (
          <span aria-hidden className="text-lg leading-none">
            {mineChoice.emoji}
          </span>
        ) : (
          <PiSmiley aria-hidden className="size-5" />
        )}
        <span aria-hidden>{mineChoice ? mineChoice.name : 'React'}</span>
      </button>

      <p className="flex items-center gap-1.5 text-sm text-ash">
        {top.length ? (
          <span aria-hidden className="flex -space-x-1 text-base leading-none">
            {top.map((c) => (
              <span key={c.name} className="flex size-6 items-center justify-center rounded-full bg-surface-2 ring-2 ring-surface">
                {c.emoji}
              </span>
            ))}
          </span>
        ) : null}
        <span aria-hidden className="tabular-nums">
          {total > 0 ? total.toLocaleString('en-IN') : ''}
        </span>
        <span className="sr-only">{summaryLabel}</span>
      </p>

      {open ? (
        <div
          ref={panelRef}
          role="group"
          aria-label="Reactions"
          tabIndex={-1}
          onKeyDown={onKey}
          className={cn(
            menuPanelClasses,
            'absolute left-0 z-50 min-w-0 p-2 outline-none animate-[menu-in_120ms_ease-out]',
            below ? 'top-full mt-2' : 'bottom-full mb-2',
          )}
        >
          <div className="grid grid-cols-4 gap-1 sm:grid-cols-8">
            {ALL.map((c, i) => (
              <EmojiButton
                key={c.name}
                choice={c}
                pressed={c.name === mine}
                buttonRef={(el) => {
                  itemRefs.current[i] = el;
                }}
                onPick={pick}
                onHover={setHover}
              />
            ))}
          </div>
          {halo ? (
            <div className="mt-1 flex items-center gap-3 border-t border-line pt-2">
              <EmojiButton
                choice={{ emoji: HALO.emoji, name: HALO.name }}
                pressed={mine === HALO.name}
                halo
                extraLabel={`, costs you ${halo.cost} DP`}
                buttonRef={(el) => {
                  itemRefs.current[ALL.length] = el;
                }}
                onPick={pick}
                onHover={setHover}
              />
              <p className="text-xs leading-snug text-ash">
                <span className="font-semibold text-halo">Halo</span> drains a little darkness.
                <br />
                Costs you {halo.cost} DP.
              </p>
            </div>
          ) : null}
          <p aria-hidden className="mt-1.5 h-5 px-1 text-center text-xs font-semibold text-ash">
            {captionChoice ? (
              <>
                {captionChoice.name}
                {caption === mine ? <span className="font-normal text-smoke"> · tap again to remove</span> : null}
              </>
            ) : (
              <span className="font-normal text-smoke">Pick one</span>
            )}
          </p>
        </div>
      ) : null}
    </div>
  );
}

function EmojiButton({
  choice,
  pressed,
  halo = false,
  extraLabel = '',
  buttonRef,
  onPick,
  onHover,
}: {
  choice: Choice;
  pressed: boolean;
  halo?: boolean;
  extraLabel?: string;
  buttonRef: (el: HTMLButtonElement | null) => void;
  onPick: (name: ReactionName) => void;
  onHover: (name: ReactionName | null) => void;
}) {
  return (
    <button
      ref={buttonRef}
      type="button"
      aria-pressed={pressed}
      aria-label={choice.name + extraLabel}
      onClick={() => onPick(choice.name)}
      onPointerEnter={() => onHover(choice.name)}
      onPointerLeave={() => onHover(null)}
      onFocus={() => onHover(choice.name)}
      className={cn(
        'flex size-11 shrink-0 cursor-pointer items-center justify-center rounded-full text-2xl leading-none transition-transform duration-150',
        'hover:scale-110 hover:bg-surface-2 focus-visible:scale-110 focus-visible:bg-surface-2',
        pressed && (halo ? 'bg-halo/15 ring-1 ring-halo/50' : 'bg-crimson/15 ring-1 ring-crimson/50'),
      )}
    >
      <span aria-hidden>{choice.emoji}</span>
    </button>
  );
}
