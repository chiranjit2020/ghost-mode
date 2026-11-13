'use client';

import { useState } from 'react';
import { Card, GhostAvatar, RankBadge, ReactionBar, Switch, useToast, type ReactionName } from '@/ui/components';
import { Specimen } from './kit-parts';

const BASE: Partial<Record<ReactionName, number>> = { Devilish: 41, Deadly: 27, Inferno: 18, Joker: 6, Phantom: 2 };

/** One post: react, change, take it back. Counts include your own reaction. */
function Post({ halo, rewards }: { halo: boolean; rewards: boolean }) {
  const toast = useToast();
  const [mine, setMine] = useState<ReactionName | null>(null);
  const counts = { ...BASE };
  if (mine) counts[mine] = (counts[mine] ?? 0) + 1;
  return (
    <Card>
      <div className="flex items-center gap-3">
        <GhostAvatar avatarKey="moth" />
        <div className="min-w-0 flex-1">
          <p className="flex flex-wrap items-center gap-2 font-semibold text-bone">
            MidnightMoth <RankBadge rank={3} />
          </p>
          <p className="text-xs text-smoke">1 h</p>
        </div>
      </div>
      <p className="mt-3 text-sm text-bone">My plants are thriving because I threaten them weekly.</p>
      <ReactionBar
        className="mt-4"
        counts={counts}
        mine={mine}
        halo={halo ? { cost: 2 } : undefined}
        onChange={(next) => {
          const first = mine === null && next !== null;
          setMine(next);
          if (next === 'Halo') toast('Halo thrown. MidnightMoth’s darkness dims a little', { dp: -2 });
          else if (first && rewards) toast('A faint shadow gathers around you', { dp: 1 });
        }}
      />
    </Card>
  );
}

export function ReactionsDemo() {
  const [halo, setHalo] = useState(false);
  return (
    <>
      <Specimen
        title="Under a post"
        note="Tap React, pick one. The button now shows yours; tap it and pick the same one to take it back. Keyboard: Enter opens, arrows move, Esc closes. Your first reaction may earn DP (the reward toast)."
      >
        <div className="grid gap-4 md:grid-cols-2">
          <Post halo={halo} rewards />
          <Card>
            <div className="flex items-center gap-3">
              <GhostAvatar avatarKey="chai" />
              <div className="min-w-0 flex-1">
                <p className="font-semibold text-bone">ChaiDemon</p>
                <p className="text-xs text-smoke">Just now</p>
              </div>
            </div>
            <p className="mt-3 text-sm text-bone">First post in the Dark World. Be gentle. Or don’t.</p>
            <ReactionBar className="mt-4" counts={{}} mine={null} onChange={() => {}} />
          </Card>
        </div>
      </Specimen>

      <Specimen title="😇 Halo (Level 3 test)" note="Behind a switch. It sits apart from the 8, in Pure Soul gold, and says what it costs before you throw it.">
        <Switch label="Turn on Halo for these posts" checked={halo} onChange={(e) => setHalo(e.target.checked)} />
      </Specimen>
    </>
  );
}
