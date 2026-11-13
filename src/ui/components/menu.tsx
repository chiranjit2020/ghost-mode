'use client';

import Link from 'next/link';
import { useEffect, useId, useLayoutEffect, useRef, useState, type KeyboardEvent, type ReactNode } from 'react';
import type { IconType } from 'react-icons';
import { PiCaretDown, PiCheck } from 'react-icons/pi';
import { cn } from '../cn';
import { buttonClasses } from './button';
import { iconButtonClasses, iconButtonIconClass } from './icon-button';
import { menuItemClasses, menuPanelClasses } from './menu-styles';

/**
 * Menu: a short list of actions that opens from a button (the "…" on a post, a Sort by button). See /kit#menu.
 *
 * Rules
 * - For actions on one thing (Copy link, Mute, Report, Delete) or picking one option (Sort by). Not for site
 *   navigation: page links belong in the header or a tab bar, where they're always visible.
 * - 2–7 items. Put the most used first. Group with a separator; a separator is never first or last.
 * - Danger items (Delete, Leave) go last, after a separator, in red. They still ask for confirmation afterwards.
 * - Icons are optional, but all or none in one menu so the labels line up.
 * - A disabled item stays visible (so people learn it exists) and says why in its hint.
 * - Keyboard (the screen-reader "menu button" pattern): Enter, Space or ↓ opens on the first item, ↑ on the last;
 *   ↑ ↓ move, Home/End jump, typing a letter jumps to the item starting with it, Esc closes and returns to the button,
 *   Tab closes and moves on. A click outside closes it.
 * - It opens below the button and flips above when there isn't room. `align="end"` lines its right edge up with the
 *   button, for buttons at the right of a card.
 */
export type MenuItem =
  | {
      kind?: 'action';
      label: string;
      icon?: IconType;
      /** One quiet line under the label, e.g. why it's disabled. */
      hint?: string;
      danger?: boolean;
      disabled?: boolean;
      /** Set on every item of a pick-one menu (SelectMenu): the chosen one shows a tick. */
      checked?: boolean;
      onSelect?: () => void;
    }
  | { kind: 'link'; label: string; icon?: IconType; hint?: string; href: string }
  | { kind: 'separator' }
  | { kind: 'heading'; label: string };

export type MenuTrigger =
  | { icon: IconType; label: string; size?: 'sm' | 'md'; variant?: 'secondary' | 'quiet' }
  | { text: string; icon?: IconType; size?: 'sm' | 'md' };

type Focusable = HTMLButtonElement | HTMLAnchorElement;

export function Menu({
  label,
  trigger,
  items,
  align = 'start',
  className,
}: {
  /** What the menu is, for screen readers, e.g. "Post options". */
  label: string;
  trigger: MenuTrigger;
  items: MenuItem[];
  align?: 'start' | 'end';
  className?: string;
}) {
  const id = useId();
  const [open, setOpen] = useState(false);
  const [above, setAbove] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(Focusable | null)[]>([]);
  const firstFocus = useRef<'first' | 'last'>('first');

  // Indexes of items that can take focus, in order.
  const focusable = items
    .map((it, i) => ((it.kind === 'action' || it.kind === undefined) && !it.disabled) || it.kind === 'link' ? i : -1)
    .filter((i) => i >= 0);

  function focusAt(i: number | undefined) {
    if (i !== undefined) itemRefs.current[i]?.focus();
  }

  function close(returnFocus: boolean) {
    setOpen(false);
    if (returnFocus) buttonRef.current?.focus();
  }

  function openWith(where: 'first' | 'last') {
    firstFocus.current = where;
    setOpen(true);
  }

  // Flip above when there's no room below, then move focus into the menu.
  useLayoutEffect(() => {
    if (!open) return;
    const btn = buttonRef.current?.getBoundingClientRect();
    const panel = panelRef.current?.getBoundingClientRect();
    if (btn && panel) {
      const below = window.innerHeight - btn.bottom;
      setAbove(below < panel.height + 16 && btn.top > below);
    }
    focusAt(firstFocus.current === 'first' ? focusable[0] : focusable[focusable.length - 1]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  // A click or tap anywhere outside closes it.
  useEffect(() => {
    if (!open) return;
    function onPointer(e: PointerEvent) {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener('pointerdown', onPointer);
    return () => document.removeEventListener('pointerdown', onPointer);
  }, [open]);

  function onButtonKey(e: KeyboardEvent) {
    if (e.key === 'ArrowDown' || e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      openWith('first');
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      openWith('last');
    }
  }

  function onMenuKey(e: KeyboardEvent) {
    const at = focusable.indexOf(itemRefs.current.findIndex((el) => el === document.activeElement));
    const n = focusable.length;
    if (e.key === 'ArrowDown') focusAt(focusable[(at + 1) % n]);
    else if (e.key === 'ArrowUp') focusAt(focusable[(at - 1 + n) % n]);
    else if (e.key === 'Home') focusAt(focusable[0]);
    else if (e.key === 'End') focusAt(focusable[n - 1]);
    else if (e.key === 'Escape') close(true);
    else if (e.key === 'Tab') {
      setOpen(false);
      return; // let Tab move on normally
    } else if (e.key.length === 1 && /\S/.test(e.key)) {
      // Type-ahead: the next item whose label starts with that letter.
      const ch = e.key.toLowerCase();
      const order = [...focusable.slice(at + 1), ...focusable.slice(0, at + 1)];
      const hit = order.find((i) => {
        const it = items[i];
        return 'label' in it && it.label.toLowerCase().startsWith(ch);
      });
      if (hit === undefined) return;
      focusAt(hit);
    } else return;
    e.preventDefault();
  }

  const isIcon = 'icon' in trigger && 'label' in trigger;
  const size = trigger.size ?? 'sm';
  const buttonId = `${id}-button`;
  const menuId = `${id}-menu`;

  return (
    <div ref={rootRef} className={cn('relative inline-flex', className)}>
      <button
        ref={buttonRef}
        id={buttonId}
        type="button"
        aria-haspopup="menu"
        aria-expanded={open}
        aria-controls={open ? menuId : undefined}
        aria-label={isIcon ? trigger.label : undefined}
        onClick={() => (open ? close(false) : openWith('first'))}
        onKeyDown={onButtonKey}
        className={
          isIcon
            ? iconButtonClasses({
                variant: trigger.variant ?? 'quiet',
                size,
                className: open ? 'bg-surface-2 text-bone' : undefined,
              })
            : buttonClasses({ variant: 'secondary', size, className: open ? 'border-ash bg-surface-2' : undefined })
        }
      >
        {isIcon ? (
          <trigger.icon aria-hidden className={iconButtonIconClass(size)} />
        ) : (
          <>
            {trigger.icon ? <trigger.icon aria-hidden className="size-4" /> : null}
            {trigger.text}
            <PiCaretDown aria-hidden className={cn('size-4 text-ash transition-transform duration-150', open && 'rotate-180')} />
          </>
        )}
      </button>

      {open ? (
        <div
          ref={panelRef}
          id={menuId}
          role="menu"
          aria-label={label}
          aria-labelledby={isIcon ? undefined : buttonId}
          onKeyDown={onMenuKey}
          className={cn(
            menuPanelClasses,
            'absolute z-50',
            above ? 'bottom-full mb-2 origin-bottom' : 'top-full mt-2 origin-top',
            align === 'end' ? 'right-0' : 'left-0',
            'animate-[menu-in_120ms_ease-out]',
          )}
        >
          {items.map((it, i) => {
            if (it.kind === 'separator') return <div key={`sep-${i}`} role="separator" className="mx-2 my-1.5 h-px bg-line" />;
            if (it.kind === 'heading')
              return (
                <p key={`h-${i}`} role="presentation" className="px-3 pt-2 pb-1 text-xs font-semibold tracking-[0.16em] text-smoke uppercase">
                  {it.label}
                </p>
              );
            const ref = (el: Focusable | null) => {
              itemRefs.current[i] = el;
            };
            const checked = it.kind === 'link' ? undefined : it.checked;
            const body = <ItemBody label={it.label} icon={checked === undefined ? it.icon : checked ? PiCheck : Blank} hint={it.hint} />;
            if (it.kind === 'link')
              return (
                <Link key={i} ref={ref} href={it.href} role="menuitem" tabIndex={-1} onClick={() => close(false)} className={menuItemClasses()}>
                  {body}
                </Link>
              );
            return (
              <button
                key={i}
                ref={ref}
                type="button"
                role={checked === undefined ? 'menuitem' : 'menuitemradio'}
                aria-checked={checked}
                tabIndex={-1}
                aria-disabled={it.disabled || undefined}
                onClick={() => {
                  if (it.disabled) return;
                  close(true);
                  it.onSelect?.();
                }}
                className={menuItemClasses({ danger: it.danger, disabled: it.disabled })}
              >
                {body}
              </button>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}

/**
 * A menu for picking one option (Sort by, Show). The button shows the current choice, and the chosen row has a tick.
 * Same keyboard and placement as Menu.
 */
export function SelectMenu<T extends string>({
  label,
  value,
  options,
  onChange,
  align = 'start',
  className,
}: {
  /** What is being picked, e.g. "Sort by". Shown before the choice on the button. */
  label: string;
  value: T;
  options: { value: T; label: string; hint?: string }[];
  onChange: (value: T) => void;
  align?: 'start' | 'end';
  className?: string;
}) {
  const current = options.find((o) => o.value === value);
  return (
    <Menu
      label={label}
      align={align}
      className={className}
      trigger={{ text: `${label}: ${current?.label ?? ''}` }}
      items={options.map((o) => ({
        label: o.label,
        hint: o.hint,
        checked: o.value === value,
        onSelect: () => onChange(o.value),
      }))}
    />
  );
}

// Keeps unticked rows lined up with the ticked one.
const Blank: IconType = ({ className }) => <span aria-hidden className={className} />;

function ItemBody({ label, icon: Icon, hint }: { label: string; icon?: IconType; hint?: string }): ReactNode {
  return (
    <>
      {Icon ? <Icon aria-hidden className="size-5 shrink-0" /> : null}
      <span className="min-w-0 flex-1">
        <span className="block font-medium">{label}</span>
        {hint ? <span className="block text-xs text-smoke">{hint}</span> : null}
      </span>
    </>
  );
}
