'use client';

import { useState } from 'react';
import {
  PiBellSlash,
  PiCopy,
  PiDotsThreeBold,
  PiEyeSlash,
  PiFlag,
  PiPencilSimple,
  PiPushPin,
  PiTrash,
} from 'react-icons/pi';
import { Card, GhostAvatar, Menu, SelectMenu } from '@/ui/components';

/** The "…" on someone else's post vs your own, with the last choice shown (toasts arrive later). */
export function PostMenuDemo() {
  const [last, setLast] = useState<string | null>(null);
  const pick = (what: string) => () => setLast(what);
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Card>
        <div className="flex items-center gap-3">
          <GhostAvatar avatarKey="moth" />
          <div className="min-w-0 flex-1">
            <p className="font-semibold text-bone">MidnightMoth</p>
            <p className="text-xs text-smoke">Someone else&apos;s post · 1 h</p>
          </div>
          <Menu
            label="Post options"
            align="end"
            trigger={{ icon: PiDotsThreeBold, label: 'Post options' }}
            items={[
              { label: 'Copy link', icon: PiCopy, onSelect: pick('Copy link') },
              { label: 'Hide this post', icon: PiEyeSlash, onSelect: pick('Hide this post') },
              { label: 'Mute MidnightMoth', icon: PiBellSlash, hint: 'You won’t see their posts', onSelect: pick('Mute') },
              { kind: 'separator' },
              { label: 'Report', icon: PiFlag, danger: true, onSelect: pick('Report') },
            ]}
          />
        </div>
        <p className="mt-3 text-sm text-bone">My plants are thriving because I threaten them weekly.</p>
      </Card>

      <Card>
        <div className="flex items-center gap-3">
          <GhostAvatar avatarKey="skull" />
          <div className="min-w-0 flex-1">
            <p className="font-semibold text-bone">ShadowSkull</p>
            <p className="text-xs text-smoke">Your post · 2 h</p>
          </div>
          <Menu
            label="Your post options"
            align="end"
            trigger={{ icon: PiDotsThreeBold, label: 'Your post options' }}
            items={[
              { label: 'Edit', icon: PiPencilSimple, disabled: true, hint: 'Only in the first 15 minutes' },
              { label: 'Pin to profile', icon: PiPushPin, onSelect: pick('Pin to profile') },
              { label: 'Copy link', icon: PiCopy, onSelect: pick('Copy link') },
              { kind: 'separator' },
              { label: 'Delete', icon: PiTrash, danger: true, hint: 'Its Devil Points go too', onSelect: pick('Delete') },
            ]}
          />
        </div>
        <p className="mt-3 text-sm text-bone">I reply &ldquo;haha&rdquo; to texts with a completely straight face.</p>
      </Card>

      <p aria-live="polite" className="text-sm text-smoke md:col-span-2">
        {last ? (
          <>
            You chose <span className="font-semibold text-bone">{last}</span>.
          </>
        ) : (
          'Choose something from a menu: what you picked shows here.'
        )}
      </p>
    </div>
  );
}

/** Pick-one menu: the button says the current choice. */
export function SortMenuDemo() {
  const [sort, setSort] = useState<'hot' | 'new' | 'top'>('hot');
  return (
    <div className="flex flex-wrap items-center gap-4">
      <SelectMenu
        label="Sort by"
        value={sort}
        onChange={setSort}
        options={[
          { value: 'hot', label: 'Hot', hint: 'Most reactions lately' },
          { value: 'new', label: 'New' },
          { value: 'top', label: 'Top', hint: 'Most Devil Points ever' },
        ]}
      />
      <p className="text-sm text-smoke">
        Showing <span className="text-bone">{sort}</span> posts.
      </p>
    </div>
  );
}

/** Near the bottom of the screen the menu opens upward. */
export function FlipMenuDemo() {
  return (
    <div className="flex justify-end">
      <Menu
        label="Composer options"
        align="end"
        trigger={{ text: 'More' }}
        items={[
          { kind: 'heading', label: 'Post as' },
          { label: 'Your devil name' },
          { label: 'Fully anonymous', disabled: true, hint: 'Arrives in Level 4' },
          { kind: 'separator' },
          { kind: 'link', label: 'Posting rules', href: '#menu' },
        ]}
      />
    </div>
  );
}
