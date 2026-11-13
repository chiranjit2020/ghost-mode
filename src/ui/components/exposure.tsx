import { PiEye, PiEyeSlash, PiShieldCheck } from 'react-icons/pi';
import { EXPOSURE_STAGES, WORLD } from '@/world/world.config';
import { cn } from '../cn';

/**
 * Exposure meter: how close the Pure Souls are to purifying your devil (Soul Exposure, 0–100%). See /kit#exposure.
 *
 * Rules
 * - The five stages and what they do come from world.config.ts. Below the first stage you're "Unseen".
 * - full: your profile and the hunt page (bar, stage marks, what this stage means). compact: one line where space is
 *   tight. Only ever your own meter: other devils' exposure is not shown (it would invite piling on).
 * - One gradient spans the whole bar (crimson → violet → Pure Soul gold) and the fill reveals only the part reached:
 *   gold appears only when they're close.
 * - Cloaked: the meter is paused and says until when. It NEVER links to the store or says "buy a Cloak" (no false
 *   urgency, PLAN §3.5 and the 2023 dark-pattern guidelines). The Cloak is offered in the store and in missions, not
 *   beside the threat.
 * - Purified (100%) resets the character, never the account; say so wherever 100% shows.
 * - Built on <meter>, so screen readers hear "Soul Exposure, 40%" and no inline style is needed.
 */
export type ExposureSize = 'full' | 'compact';

/** The stage reached at this percent: -1 below the first, then 0–4. */
export function exposureStage(percent: number) {
  let at = -1;
  EXPOSURE_STAGES.forEach((s, i) => {
    if (percent >= s.percent) at = i;
  });
  return at;
}

const UNSEEN = `Unseen. No ${WORLD.hunters.replace(/s$/, '')} has noticed you.`;

// Stage marks over the bar at 20/40/60/80% (100% is the end).
const MARK = ['left-1/5', 'left-2/5', 'left-3/5', 'left-4/5'] as const;

export function ExposureMeter({
  percent,
  size = 'full',
  cloakedUntil,
  resetNote = true,
  className,
}: {
  /** 0–100, from the server. */
  percent: number;
  size?: ExposureSize;
  /** When your Cloak runs out, already worded ("Sat 15 Nov, 9:00 pm"). Set = paused. */
  cloakedUntil?: string;
  /** false when the page already explains purification next to the meter (the landing does). */
  resetNote?: boolean;
  className?: string;
}) {
  const value = Math.max(0, Math.min(100, Math.round(percent)));
  const stage = exposureStage(value);
  const effect = stage < 0 ? UNSEEN : EXPOSURE_STAGES[stage].effect;
  const cloaked = cloakedUntil !== undefined;

  const bar = (h: string) => (
    <div className="relative">
      <meter
        min={0}
        max={100}
        low={40}
        high={80}
        optimum={0}
        value={value}
        data-step={Math.max(5, Math.round(value / 5) * 5)}
        aria-label="Soul Exposure"
        aria-valuetext={`${value}%${cloaked ? ', paused by your Cloak' : ''}`}
        className={cn('exposure-meter block w-full', h, cloaked && 'exposure-meter-paused')}
      />
      {size === 'full'
        ? MARK.map((m) => <span key={m} aria-hidden className={cn('absolute inset-y-0 w-0.5 -translate-x-1/2 bg-void', m)} />)
        : null}
    </div>
  );

  if (size === 'compact') {
    return (
      <div className={cn('flex items-center gap-3', className)}>
        {cloaked ? <PiShieldCheck aria-hidden className="size-4 shrink-0 text-violet" /> : <PiEye aria-hidden className="size-4 shrink-0 text-halo" />}
        <span className="text-xs font-semibold text-ash">Exposure</span>
        <div className="min-w-16 flex-1">{bar('h-1.5')}</div>
        <span className="text-xs font-semibold text-bone tabular-nums">{value}%</span>
      </div>
    );
  }

  return (
    <div className={className}>
      <div className="flex items-baseline justify-between gap-4">
        <p className="text-xs font-semibold tracking-[0.2em] text-halo uppercase">Soul Exposure</p>
        <p className="font-display text-3xl font-extrabold text-bone tabular-nums">{value}%</p>
      </div>
      <div className="mt-3">{bar('h-3')}</div>
      <div aria-hidden className="mt-1.5 grid grid-cols-5 text-right text-[11px] text-smoke tabular-nums">
        {EXPOSURE_STAGES.map((s, i) => (
          <span key={s.percent} className={i <= stage ? 'text-ash' : undefined}>
            {s.percent}%
          </span>
        ))}
      </div>

      <p className="mt-4 flex items-start gap-2 font-display text-base font-bold text-bone">
        {stage < 0 ? <PiEyeSlash aria-hidden className="mt-0.5 size-5 shrink-0 text-smoke" /> : <PiEye aria-hidden className="mt-0.5 size-5 shrink-0 text-halo" />}
        <span>
          {stage >= 0 ? <span className="sr-only">Stage {stage + 1} of 5: </span> : null}
          {effect}
        </span>
      </p>

      {cloaked ? (
        <p className="mt-3 flex items-center gap-2 rounded-field border border-violet/30 bg-violet/10 px-3 py-2 text-sm text-bone">
          <PiShieldCheck aria-hidden className="size-5 shrink-0 text-violet" />
          <span>
            Paused by your Cloak until <span className="font-semibold">{cloakedUntil}</span>.
          </span>
        </p>
      ) : null}

      {value >= 100 && resetNote ? (
        <p className="mt-3 text-xs text-smoke">Only your devil is reset. Your account, posts and handle stay, and your real identity is never revealed.</p>
      ) : null}
    </div>
  );
}
