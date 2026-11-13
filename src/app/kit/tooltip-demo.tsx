'use client';

import { PiBellSlash, PiBookmarkSimple, PiDotsThreeBold, PiShareNetwork, PiTrash } from 'react-icons/pi';
import { Card, GhostAvatar, IconButton, Toggletip, Tooltip, useToast } from '@/ui/components';
import { Specimen } from './kit-parts';

export function TooltipDemo() {
  const toast = useToast();
  return (
    <>
      <Specimen
        title="Tooltip on icon buttons"
        note="Hover (it waits a moment) or Tab to a button (it shows at once). Esc hides it. Tapping on a phone just presses the button."
      >
        <div className="flex flex-wrap items-center gap-2">
          <Tooltip text="Save">
            <IconButton icon={PiBookmarkSimple} label="Save" variant="quiet" onClick={() => toast('Saved')} />
          </Tooltip>
          <Tooltip text="Share">
            <IconButton icon={PiShareNetwork} label="Share" variant="quiet" />
          </Tooltip>
          <Tooltip text="Mute">
            <IconButton icon={PiBellSlash} label="Mute" variant="quiet" />
          </Tooltip>
          <Tooltip text="Delete">
            <IconButton icon={PiTrash} label="Delete" variant="quiet" />
          </Tooltip>
          <span className="mx-2 h-8 w-px bg-line" aria-hidden />
          <Tooltip text="Saved posts are only visible to you" describes side="bottom">
            <IconButton icon={PiBookmarkSimple} label="Save" />
          </Tooltip>
          <span className="text-sm text-smoke">← describes: screen readers hear “Save, Saved posts are only visible to you”.</span>
        </div>
      </Specimen>

      <Specimen title="Stays on screen" note="Near an edge it shifts sideways; at the top of the screen it drops below. Scroll so this row is at the top and hover.">
        <div className="flex items-center justify-between">
          <Tooltip text="Tooltips at the left edge line up with it">
            <IconButton icon={PiShareNetwork} label="Share" variant="quiet" />
          </Tooltip>
          <Tooltip text="Post options">
            <IconButton icon={PiDotsThreeBold} label="Post options" variant="quiet" />
          </Tooltip>
        </div>
      </Specimen>

      <Specimen title="Toggletip" note="Tap or click the ⓘ. Tap again, tap elsewhere or press Esc to close. Works the same on phones.">
        <Card className="max-w-md">
          <div className="flex items-center gap-3">
            <GhostAvatar avatarKey="skull" />
            <div className="min-w-0 flex-1">
              <p className="font-semibold text-bone">ShadowSkull</p>
              <p className="flex items-center gap-1.5 text-sm text-ash">
                <span className="tabular-nums">920 DP</span>
                <Toggletip term="DP">
                  Devil Points. You earn them by posting, reacting and replying, and lose a post’s DP if it’s removed.
                </Toggletip>
              </p>
            </div>
          </div>
          <p className="mt-4 flex items-center gap-1.5 text-sm text-ash">
            Soul Exposure: <span className="font-semibold text-bone tabular-nums">20%</span>
            <Toggletip term="Soul Exposure" side="bottom">
              It rises when a Pure Soul visits your profile. At 100% your devil is purified and loses its powers for a while.
            </Toggletip>
          </p>
        </Card>
      </Specimen>
    </>
  );
}
