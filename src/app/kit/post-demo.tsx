'use client';

import { useState } from 'react';
import { PiBellSlash, PiCopy, PiEyeSlash, PiFlag, PiPencilSimple, PiPushPin, PiTrash } from 'react-icons/pi';
import {
  ConfirmDialog,
  PostCard,
  Reply,
  ReplyBox,
  useToast,
  type MenuItem,
  type PostAuthor,
  type ReactionName,
} from '@/ui/components';
import { Specimen } from './kit-parts';

const MOTH: PostAuthor = { name: 'MidnightMoth', avatarKey: 'moth', rank: 3 };
const SKULL: PostAuthor = { name: 'ShadowSkull', avatarKey: 'skull', rank: 5 };
const CHAI: PostAuthor = { name: 'ChaiDemon', avatarKey: 'chai', rank: 1, purified: true };

/** Reaction state for one post or reply, with your reaction counted in. */
function useReactions(base: Partial<Record<ReactionName, number>>) {
  const toast = useToast();
  const [mine, setMine] = useState<ReactionName | null>(null);
  const counts = { ...base };
  if (mine) counts[mine] = (counts[mine] ?? 0) + 1;
  return {
    counts,
    mine,
    onChange: (next: ReactionName | null) => {
      if (mine === null && next) toast('A faint shadow gathers around you', { dp: 1 });
      setMine(next);
    },
  };
}

function othersMenu(name: string, toast: (m: string) => void): MenuItem[] {
  return [
    { label: 'Copy link', icon: PiCopy, onSelect: () => toast('Link copied') },
    { label: 'Hide this post', icon: PiEyeSlash, onSelect: () => toast('Post hidden') },
    { label: `Mute ${name}`, icon: PiBellSlash, onSelect: () => toast(`Muted ${name}`) },
    { kind: 'separator' },
    { label: 'Report', icon: PiFlag, danger: true, onSelect: () => toast('Report form opens here') },
  ];
}

type R = { id: number; author: PostAuthor; time: string; text: string; base?: Partial<Record<ReactionName, number>> };

/** One reply with its own reaction state. */
function DemoReply({ r }: { r: R }) {
  const toast = useToast();
  const reactions = useReactions(r.base ?? {});
  return (
    <Reply
      author={r.author}
      time={r.time}
      dateTime="2026-11-13T15:40:00+05:30"
      text={r.text}
      reactions={reactions}
      menu={othersMenu(r.author.name, toast)}
    />
  );
}

function Thread() {
  const toast = useToast();
  const post = useReactions({ Devilish: 41, Deadly: 27, Inferno: 18, Joker: 6 });
  const [replies, setReplies] = useState<R[]>([
    { id: 1, author: SKULL, time: '40 min', text: 'Mine started flowering the day I told them about the compost bin.', base: { Deadly: 4, Joker: 2 } },
    { id: 2, author: CHAI, time: '12 min', text: 'Purified this morning and even I find this suspicious.', base: { Inferno: 1 } },
  ]);
  const [boxOpen, setBoxOpen] = useState(true);
  return (
    <PostCard
      author={MOTH}
      time="1 h"
      dateTime="2026-11-13T15:00:00+05:30"
      topic="Dark Humour"
      text={'My plants are thriving because I threaten them weekly.\n\nThe cactus knows what it did.'}
      reactions={post}
      replyCount={replies.length}
      onReply={() => setBoxOpen(true)}
      menu={othersMenu('MidnightMoth', toast)}
    >
      {replies.map((r) => (
        <DemoReply key={r.id} r={r} />
      ))}
      {boxOpen ? (
        <ReplyBox
          avatarKey="ghost"
          onSend={(text) => {
            setReplies((rs) => [...rs, { id: Date.now(), author: { name: 'You', avatarKey: 'ghost', rank: 2 }, time: 'Just now', text }]);
            toast('A faint shadow gathers around you', { dp: 2 });
          }}
        />
      ) : null}
    </PostCard>
  );
}

function OwnPost() {
  const toast = useToast();
  const reactions = useReactions({ Phantom: 3, Devilish: 2 });
  const [confirm, setConfirm] = useState(false);
  const [gone, setGone] = useState(false);
  return (
    <>
      <PostCard
        author={{ name: 'You', avatarKey: 'ghost', rank: 2 }}
        time="Yesterday"
        dateTime="2026-11-12T22:10:00+05:30"
        topic="Confession Chamber"
        text="I pretend to be on a call when the lift is crowded."
        removed={gone ? 'author' : undefined}
        reactions={reactions}
        replyCount={0}
        menu={[
          { label: 'Edit', icon: PiPencilSimple, disabled: true, hint: 'Only in the first 15 minutes' },
          { label: 'Pin to profile', icon: PiPushPin, onSelect: () => toast('Pinned to your profile') },
          { label: 'Copy link', icon: PiCopy, onSelect: () => toast('Link copied') },
          { kind: 'separator' },
          { label: 'Delete', icon: PiTrash, danger: true, hint: 'Its Devil Points go too', onSelect: () => setConfirm(true) },
        ]}
      />
      <ConfirmDialog
        open={confirm}
        danger
        title="Delete this post?"
        description="It disappears for everyone, and the 9 Devil Points it earned go with it."
        confirmLabel="Delete"
        onClose={() => setConfirm(false)}
        onConfirm={() => {
          setConfirm(false);
          toast('Post deleted');
          setGone(true);
        }}
      />
    </>
  );
}

const LONG = `Unpopular opinion: the best part of any wedding is the uncle who has been “just leaving” for two hours.

He has said goodbye to everyone twice. He has packed sweets for three households. He has started one more story about 1994. Somewhere a driver has given up and gone home.

I aspire to this level of commitment in everything I do.

Also the paneer was cold and nobody will say it but me.

Fight me in the replies.`;

function LongPost() {
  const reactions = useReactions({ Inferno: 64, Joker: 30, Devilish: 12 });
  return (
    <PostCard
      author={SKULL}
      time="3 h"
      dateTime="2026-11-13T13:00:00+05:30"
      topic="Unfiltered Opinions"
      text={LONG}
      reactions={reactions}
      replyCount={128}
      menu={othersMenu('ShadowSkull', () => {})}
    />
  );
}

export function PostDemo() {
  return (
    <>
      <Specimen
        title="A thread"
        note="Someone else’s post with replies and the reply box. React, reply (Ctrl/⌘ + Enter sends), or open … . ChaiDemon was purified, so their name wears the gold mark."
      >
        <div className="max-w-2xl">
          <Thread />
        </div>
      </Specimen>

      <Specimen title="Your own post" note="Your … menu has Edit (disabled after 15 minutes), Pin and Delete. Delete asks first, then the post becomes the removed placeholder.">
        <div className="max-w-2xl">
          <OwnPost />
        </div>
      </Specimen>

      <Specimen title="Long post" note="Stops at 6 lines with Show more; line breaks are kept. 128 replies shows as a count on Reply.">
        <div className="max-w-2xl">
          <LongPost />
        </div>
      </Specimen>
    </>
  );
}
