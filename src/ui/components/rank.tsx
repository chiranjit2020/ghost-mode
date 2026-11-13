import type { ReactNode } from 'react';
import { PiCrown, PiSparkle } from 'react-icons/pi';
import { RANKS } from '@/world/world.config';
import { cn } from '../cn';

/**
 * Rank badge, ladder and progress: where a devil stands, Lost Soul (1) to Dark Lord (8). See /kit#rank.
 * Rank names come from world.config.ts, never typed into pages.
 *
 * Rules
 * - One colour, growing: Lost Soul is plain grey (just arrived), the crimson tint and glow build rank by rank,
 *   and only Dark Lord gets the fire gradient. The same build-up as the landing's rank cards.
 * - The number always shows next to the title (05 Dark Knight), so the order reads without colour.
 * - sm: beside a name on posts and replies. md: under the name on a profile (with a crown from Imp up, as on the
 *   landing). Never both on one name.
 * - Purified (after the Pure Souls catch you) is the halo colour, the one place a devil wears Pure Soul gold.
 *   It replaces the rank badge for a few days; the rank underneath is Lost Soul again.
 * - Ranks are cosmetic and earned: never sold, never shown as a reason to pay.
 */
export type RankNumber = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;

export const rankTitle = (rank: RankNumber) => RANKS[rank - 1].title;
const num = (rank: number) => String(rank).padStart(2, '0');

// Tint, edge and text per rank. Contrast: crimson-soft on these tints is ≥ 5:1, bone higher.
const TIER: Record<RankNumber, string> = {
  1: 'border-line-strong bg-surface text-ash',
  2: 'border-crimson/20 bg-crimson/5 text-crimson-soft',
  3: 'border-crimson/25 bg-crimson/10 text-crimson-soft',
  4: 'border-crimson/35 bg-crimson/10 text-crimson-soft',
  5: 'border-crimson/45 bg-crimson/15 text-crimson-soft',
  6: 'border-crimson/55 bg-crimson/20 text-bone',
  7: 'border-crimson/70 bg-crimson/25 text-bone',
  8: 'btn-fire border-transparent text-bone',
};

export function RankBadge({
  rank,
  size = 'sm',
  purified = false,
  className,
}: {
  rank: RankNumber;
  size?: 'sm' | 'md';
  /** Caught by the Pure Souls: shows Purified instead of the rank, for a few days. */
  purified?: boolean;
  className?: string;
}) {
  if (size === 'md') {
    return (
      <p
        className={cn(
          'inline-flex items-center gap-1.5 text-sm font-semibold tracking-[0.18em] uppercase',
          purified ? 'text-halo' : rank === 1 ? 'text-ash' : 'text-crimson-soft',
          className,
        )}
      >
        {purified ? <PiSparkle aria-hidden className="size-4" /> : rank > 1 ? <PiCrown aria-hidden className="size-4" /> : null}
        {purified ? 'Purified' : rankTitle(rank)}
        {!purified ? <span className="sr-only">, rank {rank} of 8</span> : null}
      </p>
    );
  }
  return (
    <span
      className={cn(
        'inline-flex h-6 shrink-0 items-center gap-1.5 rounded-full border px-2 text-xs font-semibold whitespace-nowrap',
        purified ? 'border-halo/40 bg-halo/10 text-halo' : cn(TIER[rank], 'rank-glow'),
        className,
      )}
      data-tier={purified ? undefined : rank}
    >
      {purified ? (
        <>
          <PiSparkle aria-hidden className="size-3.5" />
          Purified
        </>
      ) : (
        <>
          <span aria-hidden className="tabular-nums">
            {num(rank)}
          </span>
          {rankTitle(rank)}
          <span className="sr-only">, rank {rank} of 8</span>
        </>
      )}
    </span>
  );
}

/**
 * All eight ranks in order. `current` highlights where you are: ranks above it are still to come (quieter, never
 * hidden, so people can see what's ahead).
 */
export function RankLadder({ current, className }: { current?: RankNumber; className?: string }) {
  return (
    <ol className={cn('grid grid-cols-2 gap-3 md:grid-cols-4', className)}>
      {RANKS.map((r, i) => {
        const rank = (i + 1) as RankNumber;
        const isCurrent = rank === current;
        const ahead = current !== undefined && rank > current;
        return (
          <li
            key={r.title}
            data-tier={rank}
            aria-current={isCurrent ? 'step' : undefined}
            className={cn(
              'rank-glow rounded-field border p-4',
              isCurrent ? 'border-crimson bg-crimson/10' : 'border-line bg-surface',
            )}
          >
            <p className="flex items-center justify-between gap-2 text-xs font-semibold tabular-nums">
              <span className={ahead ? 'text-smoke' : 'text-crimson-soft'}>{num(rank)}</span>
              {isCurrent ? <span className="tracking-[0.16em] text-bone uppercase">You</span> : null}
            </p>
            <p className={cn('mt-2 font-display font-bold', ahead ? 'text-ash' : 'text-bone')}>{r.title}</p>
            <p className={cn('mt-1 text-xs leading-snug', ahead ? 'text-smoke' : 'text-ash')}>{r.line}</p>
          </li>
        );
      })}
    </ol>
  );
}

/**
 * Progress to the next rank: a bar and one line saying how far. Built on <progress>, so screen readers announce
 * the percentage and no inline style is needed. At Dark Lord there's nothing above: pass no `toNext`.
 */
export function RankProgress({
  rank,
  percent,
  toNext,
  className,
}: {
  rank: RankNumber;
  /** 0–100 of the way to the next rank. */
  percent: number;
  /** e.g. "340 DP to Dark Knight". */
  toNext?: ReactNode;
  className?: string;
}) {
  const top = rank === 8;
  return (
    <div className={className}>
      <div className="flex items-baseline justify-between gap-3">
        <RankBadge rank={rank} />
        <p className="text-xs text-ash">{top ? 'The highest rank' : toNext}</p>
      </div>
      {!top ? (
        <progress
          max={100}
          value={Math.max(0, Math.min(100, percent))}
          aria-label={`Progress to ${rankTitle((rank + 1) as RankNumber)}`}
          className="rank-progress mt-2.5 block h-2 w-full"
        />
      ) : null}
    </div>
  );
}
