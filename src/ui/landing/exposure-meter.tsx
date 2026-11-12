'use client';

import { useState } from 'react';
import { Card } from '@/ui/components';
import { EXPOSURE_STAGES } from '@/world/world.config';

const FILL = ['fill-20', 'fill-40', 'fill-60', 'fill-80', 'fill-100'] as const;

/** The five stages of Soul Exposure as a meter you can step through. */
export function ExposureMeter() {
  const [stage, setStage] = useState(0);
  const current = EXPOSURE_STAGES[stage];

  return (
    <Card tone="feature">
      <div className="flex items-baseline justify-between gap-4">
        <p className="text-xs font-semibold tracking-[0.2em] text-halo uppercase">Soul Exposure</p>
        <p className="font-display text-3xl font-extrabold text-bone tabular-nums">{current.percent}%</p>
      </div>

      <div className="mt-4 h-3 overflow-hidden rounded-full bg-void" aria-hidden>
        <div className={`exposure-fill h-full rounded-full ${FILL[stage]}`} />
      </div>

      <p aria-live="polite" className="mt-5 min-h-14 font-display text-lg font-bold text-bone">
        {current.effect}
      </p>

      <div role="group" aria-label="Exposure stage" className="mt-4 grid grid-cols-5 gap-2">
        {EXPOSURE_STAGES.map((s, i) => (
          <button
            key={s.percent}
            type="button"
            aria-pressed={i === stage}
            onClick={() => setStage(i)}
            className={`min-h-11 rounded-xl border text-sm font-semibold tabular-nums transition ${
              i === stage ? 'border-halo bg-halo text-ink' : 'border-line-strong text-ash hover:border-ash hover:text-bone'
            }`}
          >
            <span className="sr-only">Stage {i + 1}, </span>
            {s.percent}%
          </button>
        ))}
      </div>

      <p className="mt-5 text-xs leading-relaxed text-smoke">
        Purification resets your Devil, not your account. Your posts, handle and purchases stay. Real identity is never
        revealed, at any stage.
      </p>
    </Card>
  );
}
