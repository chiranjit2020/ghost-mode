import type { ReactNode } from 'react';
import type { IconType } from 'react-icons';
import { cn } from '../cn';

/**
 * Tag: a small, non-clickable label. See /kit#tag.
 *
 * Tones carry a meaning, so the same tone always means the same thing:
 * - neutral: plain status or category (Later, a topic).
 * - crimson: brand labels (Ghost Mode).
 * - ember: rewards and points (+5 DP, Mystery).
 * - violet: paid or premium items (Cloak, Premium).
 * - halo: Pure Souls and anything they cause (Purified).
 * - solid: the one strong emphasis in a group (New, Approved).
 *
 * Sizes: sm is an uppercase status label; md is a normal-case label. Tags never act as buttons.
 */
export type TagTone = 'neutral' | 'crimson' | 'ember' | 'violet' | 'halo' | 'solid';
export type TagSize = 'sm' | 'md';

const TONE: Record<TagTone, string> = {
  neutral: 'border border-line-strong text-ash',
  crimson: 'bg-crimson/15 text-crimson-soft',
  ember: 'bg-ember/15 text-ember',
  violet: 'bg-violet/20 text-link',
  halo: 'bg-halo/15 text-halo',
  solid: 'bg-bone text-ink',
};

const SIZE: Record<TagSize, string> = {
  sm: 'gap-1 px-2 py-0.5 text-[0.68rem] font-bold tracking-[0.12em] uppercase',
  md: 'gap-1.5 px-2.5 py-1 text-xs font-semibold',
};

export function Tag({
  tone = 'neutral',
  size = 'md',
  icon: Icon,
  className,
  children,
}: {
  tone?: TagTone;
  size?: TagSize;
  icon?: IconType;
  className?: string;
  children: ReactNode;
}) {
  return (
    <span className={cn('inline-flex shrink-0 items-center rounded-full whitespace-nowrap', TONE[tone], SIZE[size], className)}>
      {Icon ? <Icon aria-hidden className={size === 'sm' ? 'size-3' : 'size-3.5'} /> : null}
      {children}
    </span>
  );
}
