'use client';

import { useState } from 'react';
import { PiDiceFive } from 'react-icons/pi';
import { REACTION_MYSTERY_ODDS } from '@/world/world.config';

type Outcome = (typeof REACTION_MYSTERY_ODDS)[number];

function draw(): Outcome {
  let roll = Math.random();
  for (const outcome of REACTION_MYSTERY_ODDS) {
    if (roll < outcome.chance) return outcome;
    roll -= outcome.chance;
  }
  return REACTION_MYSTERY_ODDS[0];
}

/**
 * "The 100-reaction mystery": a try-it-yourself draw from the published odds table. The odds are shown right under
 * the button, because the surprise is the outcome, never the rules (PLAN §3.4).
 */
export function ReactionMystery() {
  const [outcome, setOutcome] = useState<Outcome | null>(null);
  const [tries, setTries] = useState(0);

  return (
    <div className="rounded-card border border-line-strong bg-surface p-6 sm:p-8">
      <p className="text-xs font-semibold tracking-[0.2em] text-violet uppercase">Try it · the 100-reaction mystery</p>
      <p className="mt-3 font-display text-xl font-bold text-bone">Your post just got 100 reactions.</p>
      <p className="mt-1 text-sm text-ash">How much power does the darkness grant you?</p>

      <div aria-live="polite" className="mt-6 flex min-h-28 flex-col items-center justify-center rounded-2xl bg-void/70 px-4 py-5 text-center">
        {outcome ? (
          <div key={tries} className="reveal-pop">
            <p className={`font-display text-5xl font-extrabold ${outcome.dp === 0 ? 'text-smoke' : 'gradient-ink'}`}>
              +{outcome.dp} DP
            </p>
            <p className="mt-2 text-sm text-ash">{outcome.line}</p>
          </div>
        ) : (
          <p className="text-sm text-smoke">Nobody knows until it happens.</p>
        )}
      </div>

      <button
        type="button"
        onClick={() => {
          setOutcome(draw());
          setTries((n) => n + 1);
        }}
        className="btn-fire mt-5 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full px-6 font-semibold text-bone"
      >
        <PiDiceFive aria-hidden className="size-5" />
        {outcome ? 'Try another post' : 'Reveal my reward'}
      </button>

      <details className="mt-4 text-sm text-ash">
        <summary className="cursor-pointer text-smoke hover:text-ash">The published odds</summary>
        <table className="mt-3 w-full text-left">
          <thead className="text-xs text-smoke">
            <tr>
              <th className="py-1 font-medium">Reward</th>
              <th className="py-1 text-right font-medium">Chance</th>
            </tr>
          </thead>
          <tbody>
            {REACTION_MYSTERY_ODDS.map((o) => (
              <tr key={o.dp} className="border-t border-line">
                <td className="py-1.5">{o.dp} DP</td>
                <td className="py-1.5 text-right tabular-nums">{Math.round(o.chance * 100)}%</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p className="mt-2 text-xs text-smoke">Example figures for the preview. Real odds will be published before launch.</p>
      </details>
    </div>
  );
}
