'use client';

import { useState } from 'react';
import { Card, ExposureMeter as KitMeter } from '@/ui/components';
import { EXPOSURE_STAGES } from '@/world/world.config';

/** The five stages of Soul Exposure as a meter you can step through. */
export function ExposureMeter() {
  const [stage, setStage] = useState(0);
  const current = EXPOSURE_STAGES[stage];

  return (
    <Card tone="feature">
      <div aria-live="polite">
        <KitMeter percent={current.percent} resetNote={false} />
      </div>

      <div role="group" aria-label="Exposure stage" className="mt-5 grid grid-cols-5 gap-2">
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
