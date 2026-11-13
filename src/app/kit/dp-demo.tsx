'use client';

import { useState } from 'react';
import { PiDiceFive, PiTrash } from 'react-icons/pi';
import { Button, Card, DpChange, DpCounter, GhostAvatar, RankBadge, useToast } from '@/ui/components';
import { REACTION_MYSTERY_ODDS } from '@/world/world.config';
import { Specimen } from './kit-parts';

function draw() {
  let roll = Math.random();
  for (const o of REACTION_MYSTERY_ODDS) {
    if (roll < o.chance) return o;
    roll -= o.chance;
  }
  return REACTION_MYSTERY_ODDS[0];
}

export function DpDemo() {
  const toast = useToast();
  const [dp, setDp] = useState(8450);
  const [history, setHistory] = useState<{ by: number; what: string }[]>([
    { by: 6, what: 'Your post got reactions' },
    { by: 3, what: 'You replied to ChaiDemon' },
    { by: -4, what: 'A Pure Soul visited you' },
    { by: 0, what: 'You reacted to a post' },
  ]);

  const add = (by: number, what: string, line: string) => {
    setDp((v) => v + by);
    setHistory((h) => [{ by, what }, ...h].slice(0, 5));
    toast(line, { dp: by });
  };

  return (
    <>
      <Specimen
        title="Earn it"
        note="Press the button: a reward is drawn from the published odds (the same table as the landing). The chip counts up, the change floats beside it, and the reward toast says it once."
      >
        <div className="space-y-5">
          <div className="flex items-center justify-between rounded-field border border-line bg-void px-4 py-3">
            <p className="text-sm font-semibold text-ash">Header</p>
            <DpCounter value={dp} />
          </div>
          <div className="flex flex-wrap gap-3">
            <Button
              size="sm"
              variant="secondary"
              icon={PiDiceFive}
              onClick={() => {
                const o = draw();
                add(o.dp, 'Your post got 100 reactions', o.line);
              }}
            >
              Get 100 reactions
            </Button>
            <Button size="sm" variant="secondary" icon={PiTrash} onClick={() => add(-6, 'A post of yours was removed', 'A removed post takes its DP with it')}>
              Have a post removed
            </Button>
          </div>
        </div>
      </Specimen>

      <Specimen title="On a profile, and the history" note="Big gradient number on the profile. The history lists every change: gains in fire, losses and zero in calm grey.">
        <div className="grid gap-4 md:grid-cols-2">
          <Card className="text-center">
            <GhostAvatar avatarKey="skull" size="lg" />
            <p className="mt-3 font-display text-xl font-extrabold text-bone">ShadowSkull</p>
            <RankBadge rank={7} size="md" className="mt-1" />
            <div className="mt-4">
              <DpCounter value={dp} size="lg" />
            </div>
          </Card>
          <Card>
            <p className="font-display text-lg font-bold text-bone">Recent DP</p>
            <ul className="mt-2 divide-y divide-line">
              {history.map((h, i) => (
                <li key={`${i}-${h.what}`} className="flex items-center justify-between gap-3 py-2.5 text-sm">
                  <span className="text-ash">{h.what}</span>
                  <DpChange by={h.by} />
                </li>
              ))}
            </ul>
          </Card>
        </div>
      </Specimen>
    </>
  );
}
