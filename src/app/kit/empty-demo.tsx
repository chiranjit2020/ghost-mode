'use client';

import { useEffect, useState } from 'react';
import { PiArrowClockwise, PiCloudSlash, PiPencilSimple, PiScroll } from 'react-icons/pi';
import { Button, Card, EmptyState, GhostAvatar, PostSkeleton, SkeletonGroup, Tabs } from '@/ui/components';

const POSTS = [
  { name: 'ShadowSkull', key: 'skull', time: '2 h', text: 'I reply “haha” to texts with a completely straight face.' },
  { name: 'MidnightMoth', key: 'moth', time: '3 h', text: 'My plants are thriving because I threaten them weekly.' },
];

function Feed({ state, onRetry }: { state: 'loading' | 'loaded' | 'empty' | 'error'; onRetry: () => void }) {
  if (state === 'loading')
    return (
      <SkeletonGroup label="Loading posts" className="space-y-3">
        <PostSkeleton />
        <PostSkeleton />
      </SkeletonGroup>
    );
  if (state === 'empty')
    return (
      <Card>
        <EmptyState
          icon={PiScroll}
          title="No confessions yet"
          action={
            <Button size="sm" variant="secondary" icon={PiPencilSimple}>
              Write the first one
            </Button>
          }
        >
          Be the first devil to confess. Nobody will know it was you.
        </EmptyState>
      </Card>
    );
  if (state === 'error')
    return (
      <Card>
        <EmptyState
          icon={PiCloudSlash}
          title="Couldn’t load posts"
          action={
            <Button size="sm" variant="secondary" icon={PiArrowClockwise} onClick={onRetry}>
              Try again
            </Button>
          }
        >
          The connection dropped. Your posts are safe.
        </EmptyState>
      </Card>
    );
  return (
    <div className="space-y-3">
      {POSTS.map((p) => (
        <Card key={p.name}>
          <div className="flex items-center gap-3">
            <GhostAvatar avatarKey={p.key} />
            <div className="min-w-0 flex-1">
              <p className="font-semibold text-bone">{p.name}</p>
              <p className="text-xs text-smoke">{p.time}</p>
            </div>
          </div>
          <p className="mt-3 text-sm text-bone">{p.text}</p>
        </Card>
      ))}
    </div>
  );
}

/** Switch between the four states of one feed. Loaded and Try again go through loading first, like the real thing. */
export function FeedStatesDemo() {
  const [view, setView] = useState<'loaded' | 'loading' | 'empty' | 'error'>('loading');
  const [loading, setLoading] = useState(true);
  // Try again moves the switcher to Loaded too: Tabs keeps its own state, so it's re-created on that tab.
  const [reset, setReset] = useState(0);

  useEffect(() => {
    if (!loading) return;
    const t = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(t);
  }, [loading]);

  const state = view === 'loading' || loading ? 'loading' : view;
  const retry = () => {
    setView('loaded');
    setLoading(true);
    setReset((n) => n + 1);
  };
  const panel = <Feed state={state} onRetry={retry} />;

  return (
    <Tabs
      key={reset}
      label="Feed state"
      variant="pill"
      defaultValue={reset ? 'loaded' : 'loading'}
      onChange={(v) => {
        setView(v as typeof view);
        setLoading(v === 'loaded');
      }}
      tabs={[
        { value: 'loading', label: 'Loading', content: panel },
        { value: 'loaded', label: 'Loaded', content: panel },
        { value: 'empty', label: 'Empty', content: panel },
        { value: 'error', label: 'Couldn’t load', content: panel },
      ]}
    />
  );
}
