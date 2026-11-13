'use client';

import Link from 'next/link';
import { useId, useRef, useState, type KeyboardEvent, type ReactNode } from 'react';
import { cn } from '../cn';
import { badgeLabel, CountBadge } from './count-badge';

/**
 * Tabs and TabNav: switch between views of the same thing. See /kit#tabs.
 *
 * Rules
 * - Tabs: views inside one page that don't need their own address (a profile's Posts / Replies). Arrow keys move
 *   between tabs, Home/End jump to the ends, and the view changes as you move (the screen-reader "tabs" pattern).
 * - TabNav: the same look, but each tab is a link with its own URL (a feed's For you / Following), so Back,
 *   sharing and refresh keep the tab. Use it whenever a tab should survive a reload.
 * - line: page sections, under the page title. Current = bone text on a crimson bar.
 * - pill: a small filter inside a card (Today / Week / All time). Current = solid bone with ink, the same "on"
 *   look as a pressed icon button.
 * - 2–6 tabs, one or two words each. More than fit on a phone scroll sideways inside the bar, never the page.
 * - `count` is a quiet total (Replies 12). `badge` is unread and red (CountBadge rules): use one or the other.
 * - A disabled tab is grey, for something that exists but isn't open yet (arrives in a later level).
 */
export type TabsVariant = 'line' | 'pill';

type TabBase = {
  label: string;
  count?: number;
  badge?: number | 'dot';
  disabled?: boolean;
};

const LIST: Record<TabsVariant, string> = {
  line: 'flex gap-1 overflow-x-auto border-b border-line [scrollbar-width:none]',
  pill: 'inline-flex max-w-full gap-1 overflow-x-auto rounded-full border border-line bg-surface p-1 [scrollbar-width:none]',
};

const TAB_BASE =
  'inline-flex min-h-11 shrink-0 items-center gap-2 text-sm font-semibold whitespace-nowrap transition-colors duration-150 select-none ' +
  'focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-ember';

function tabClasses(variant: TabsVariant, current: boolean, disabled: boolean) {
  if (variant === 'line') {
    return cn(
      TAB_BASE,
      'relative px-3',
      disabled
        ? 'cursor-not-allowed text-on-disabled'
        : current
          ? 'text-bone after:absolute after:inset-x-3 after:bottom-0 after:h-0.5 after:rounded-full after:bg-crimson'
          : 'cursor-pointer text-ash hover:text-bone',
    );
  }
  return cn(
    TAB_BASE,
    'rounded-full px-4',
    disabled
      ? 'cursor-not-allowed text-on-disabled'
      : current
        ? 'bg-bone text-ink'
        : 'cursor-pointer text-ash hover:bg-surface-2 hover:text-bone',
  );
}

function TabInner({ tab, variant, current }: { tab: TabBase; variant: TabsVariant; current: boolean }) {
  return (
    <>
      {tab.label}
      {tab.count !== undefined ? (
        <span aria-hidden className={cn('tabular-nums', variant === 'pill' && current ? 'text-ink/70' : 'text-smoke')}>
          {tab.count}
        </span>
      ) : null}
      {tab.badge !== undefined ? <CountBadge value={tab.badge} className="ring-0" /> : null}
    </>
  );
}

function srExtra(tab: TabBase) {
  return (tab.count !== undefined ? `, ${tab.count}` : '') + badgeLabel(tab.badge);
}

export function Tabs({
  label,
  variant = 'line',
  tabs,
  defaultValue,
  onChange,
  className,
}: {
  /** What the tabs switch between, for screen readers, e.g. "Profile sections". */
  label: string;
  variant?: TabsVariant;
  tabs: (TabBase & { value: string; content: ReactNode })[];
  defaultValue?: string;
  onChange?: (value: string) => void;
  className?: string;
}) {
  const id = useId();
  const firstOpen = tabs.find((t) => !t.disabled)?.value;
  const [active, setActive] = useState(defaultValue ?? firstOpen);
  const refs = useRef<(HTMLButtonElement | null)[]>([]);

  function select(i: number) {
    const t = tabs[i];
    setActive(t.value);
    onChange?.(t.value);
    refs.current[i]?.focus();
  }

  function onKeyDown(e: KeyboardEvent, i: number) {
    const open = tabs.map((t, j) => (t.disabled ? -1 : j)).filter((j) => j >= 0);
    const at = open.indexOf(i);
    let next: number | undefined;
    if (e.key === 'ArrowRight') next = open[(at + 1) % open.length];
    else if (e.key === 'ArrowLeft') next = open[(at - 1 + open.length) % open.length];
    else if (e.key === 'Home') next = open[0];
    else if (e.key === 'End') next = open[open.length - 1];
    if (next === undefined) return;
    e.preventDefault();
    select(next);
  }

  return (
    <div className={className}>
      <div role="tablist" aria-label={label} className={LIST[variant]}>
        {tabs.map((t, i) => {
          const current = t.value === active;
          return (
            <button
              key={t.value}
              ref={(el) => {
                refs.current[i] = el;
              }}
              type="button"
              role="tab"
              id={`${id}-tab-${t.value}`}
              aria-controls={`${id}-panel-${t.value}`}
              aria-selected={current}
              aria-label={srExtra(t) ? t.label + srExtra(t) : undefined}
              tabIndex={current ? 0 : -1}
              disabled={t.disabled}
              onClick={() => select(i)}
              onKeyDown={(e) => onKeyDown(e, i)}
              className={tabClasses(variant, current, !!t.disabled)}
            >
              <TabInner tab={t} variant={variant} current={current} />
            </button>
          );
        })}
      </div>
      {tabs.map((t) => (
        <div
          key={t.value}
          role="tabpanel"
          id={`${id}-panel-${t.value}`}
          aria-labelledby={`${id}-tab-${t.value}`}
          hidden={t.value !== active}
          tabIndex={0}
          className="pt-4 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ember"
        >
          {t.content}
        </div>
      ))}
    </div>
  );
}

export function TabNav({
  label,
  variant = 'line',
  tabs,
  className,
}: {
  /** What the links switch between, e.g. "Feed". */
  label: string;
  variant?: TabsVariant;
  /** Exactly one tab has `current` (the page you're on). */
  tabs: (TabBase & { href: string; current?: boolean })[];
  className?: string;
}) {
  return (
    <nav aria-label={label} className={className}>
      <ul className={LIST[variant]}>
        {tabs.map((t) => (
          <li key={t.href} className="flex shrink-0">
            {t.disabled ? (
              <span aria-disabled className={tabClasses(variant, false, true)}>
                <TabInner tab={t} variant={variant} current={false} />
              </span>
            ) : (
              <Link
                href={t.href}
                aria-current={t.current ? 'page' : undefined}
                aria-label={srExtra(t) ? t.label + srExtra(t) : undefined}
                className={tabClasses(variant, !!t.current, false)}
              >
                <TabInner tab={t} variant={variant} current={!!t.current} />
              </Link>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
}
