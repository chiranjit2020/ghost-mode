'use client';

import { useLayoutEffect, useRef, useState, type ReactNode } from 'react';
import { PiChatCircle, PiDotsThreeBold, PiProhibit } from 'react-icons/pi';
import { cn } from '../cn';
import { GhostAvatar } from './avatar';
import { Button } from './button';
import { Card } from './card';
import { Menu, type MenuItem } from './menu';
import { RankBadge, type RankNumber } from './rank';
import { ReactionBar, type ReactionName } from './reactions';
import { Tag } from './tag';
import { TextArea } from './text-field';

/**
 * Post card, reply and reply box: the main thing people read in Ghost Mode. See /kit#post.
 *
 * Rules
 * - Built only from approved pieces: GhostAvatar, RankBadge, Tag (topic), Menu (…), ReactionBar, Button, TextArea.
 * - Header: avatar, ghost name + rank, then topic and time. The … menu is the only control up there; the page passes
 *   its items (your own post: Edit/Pin/Delete; someone else's: Copy link/Mute/Report).
 * - Text keeps the writer's line breaks. Long posts stop at 6 lines with "Show more" (never a fade over the text).
 * - Footer: reactions on the left, Reply on the right. Nothing between the text and its actions.
 * - Replies sit inside the same card under a thin line, one level deep (no reply-to-a-reply trees: they get lost
 *   on phones). A reply is the same layout, smaller avatar, no topic.
 * - A removed post becomes a quiet placeholder: "removed for breaking the rules" or "the writer deleted this",
 *   never who reported it. Replies under it stay.
 * - Never show a real name or photo: the author is always a ghost.
 */
export type PostAuthor = { name: string; avatarKey: string; rank: RankNumber; purified?: boolean };

export type PostReactions = {
  counts: Partial<Record<ReactionName, number>>;
  mine: ReactionName | null;
  onChange: (next: ReactionName | null) => void;
  halo?: { cost: number };
};

function Header({
  author,
  time,
  dateTime,
  topic,
  menu,
  small,
}: {
  author: PostAuthor;
  time: string;
  dateTime: string;
  topic?: string;
  menu?: MenuItem[];
  small?: boolean;
}) {
  return (
    <div className="flex items-start gap-3">
      <GhostAvatar avatarKey={author.avatarKey} size={small ? 'sm' : 'md'} />
      <div className="min-w-0 flex-1">
        <p className="flex flex-wrap items-center gap-x-2 gap-y-1">
          <span className={cn('font-semibold text-bone', small && 'text-sm')}>{author.name}</span>
          <RankBadge rank={author.rank} purified={author.purified} />
        </p>
        <p className="mt-0.5 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-smoke">
          {topic ? (
            <>
              <Tag tone="neutral">{topic}</Tag>
              <span aria-hidden>·</span>
            </>
          ) : null}
          <time dateTime={dateTime}>{time}</time>
        </p>
      </div>
      {menu?.length ? (
        <Menu
          label={small ? `Reply options` : `Post options`}
          align="end"
          trigger={{ icon: PiDotsThreeBold, label: small ? `Reply options` : `${author.name}’s post options` }}
          items={menu}
          className="-mt-1.5 -mr-2"
        />
      ) : null}
    </div>
  );
}

/** The writer's text: line breaks kept, long text stops at 6 lines with Show more. */
function Body({ text, small }: { text: string; small?: boolean }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const [open, setOpen] = useState(false);
  const [long, setLong] = useState(false);

  useLayoutEffect(() => {
    const el = ref.current;
    if (el && !open) setLong(el.scrollHeight > el.clientHeight + 1);
  }, [text, open]);

  return (
    <div className={small ? 'mt-2' : 'mt-3'}>
      <p ref={ref} className={cn('text-bone whitespace-pre-wrap break-words', small ? 'text-sm' : 'text-[0.9375rem] leading-relaxed', !open && 'line-clamp-6')}>
        {text}
      </p>
      {long || open ? (
        <Button variant="link" size="sm" onClick={() => setOpen((o) => !o)} aria-expanded={open}>
          {open ? 'Show less' : 'Show more'}
        </Button>
      ) : null}
    </div>
  );
}

export function PostCard({
  author,
  time,
  dateTime,
  topic,
  text,
  removed,
  reactions,
  replyCount = 0,
  onReply,
  menu,
  children,
  className,
}: {
  author: PostAuthor;
  /** Already worded: "2 h", "Yesterday". */
  time: string;
  /** The exact moment, for <time> (ISO). */
  dateTime: string;
  topic?: string;
  text: string;
  /** rules: taken down by moderators. author: deleted by the writer. Either way replies under it stay. */
  removed?: 'rules' | 'author';
  reactions: PostReactions;
  replyCount?: number;
  /** Opens the reply box (or the post's page in a feed). */
  onReply?: () => void;
  menu?: MenuItem[];
  /** Replies and the reply box. */
  children?: ReactNode;
  className?: string;
}) {
  return (
    <Card as="article" className={className}>
      {removed ? (
        <p className="flex items-center gap-3 rounded-field border border-dashed border-line px-4 py-4 text-sm text-ash">
          <PiProhibit aria-hidden className="size-5 shrink-0 text-smoke" />
          {removed === 'rules' ? 'This post was removed for breaking the Dark World rules.' : 'The writer deleted this post.'}
        </p>
      ) : (
        <>
          <Header author={author} time={time} dateTime={dateTime} topic={topic} menu={menu} />
          <Body text={text} />
          <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
            <ReactionBar {...reactions} />
            <Button
              variant="quiet"
              size="sm"
              icon={PiChatCircle}
              onClick={onReply}
              aria-label={replyCount ? `Reply. ${replyCount} ${replyCount === 1 ? 'reply' : 'replies'}` : 'Reply'}
            >
              <span aria-hidden>{replyCount ? replyCount.toLocaleString('en-IN') : 'Reply'}</span>
            </Button>
          </div>
        </>
      )}
      {children ? <div className="mt-4 space-y-4 border-t border-line pt-4">{children}</div> : null}
    </Card>
  );
}

export function Reply({
  author,
  time,
  dateTime,
  text,
  reactions,
  menu,
}: {
  author: PostAuthor;
  time: string;
  dateTime: string;
  text: string;
  reactions: PostReactions;
  menu?: MenuItem[];
}) {
  return (
    <article className="pl-1">
      <Header author={author} time={time} dateTime={dateTime} menu={menu} small />
      <div className="pl-11">
        <Body text={text} small />
        <ReactionBar {...reactions} size="sm" className="mt-2" />
      </div>
    </article>
  );
}

/** Your ghost's avatar, a two-line box and Reply. Ctrl/⌘ + Enter sends. */
export function ReplyBox({
  avatarKey,
  onSend,
  sending = false,
  autoFocus,
}: {
  avatarKey: string;
  onSend: (text: string) => void;
  sending?: boolean;
  autoFocus?: boolean;
}) {
  const [text, setText] = useState('');
  const send = () => {
    const t = text.trim();
    if (!t || sending) return;
    onSend(t);
    setText('');
  };
  return (
    <form
      className="flex items-start gap-3"
      onSubmit={(e) => {
        e.preventDefault();
        send();
      }}
    >
      <GhostAvatar avatarKey={avatarKey} size="sm" className="mt-1.5" />
      <div className="min-w-0 flex-1">
        <TextArea
          label="Write a reply"
          hideLabel
          rows={2}
          maxLength={500}
          placeholder="Reply as your ghost…"
          value={text}
          autoFocus={autoFocus}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
              e.preventDefault();
              send();
            }
          }}
        />
        <div className="mt-2 flex justify-end">
          <Button type="submit" size="sm" disabled={!text.trim()} loading={sending}>
            Reply
          </Button>
        </div>
      </div>
    </form>
  );
}
