'use client';

import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from 'react';
import type { IconType } from 'react-icons';
import { PiCheckCircle, PiWarningCircle, PiX } from 'react-icons/pi';
import { cn } from '../cn';

/**
 * Toast: a short message that says something happened, then goes away by itself. See /kit#toast.
 *
 * Rules
 * - After an action, to confirm it worked when the screen doesn't already show it ("Link copied", "Post deleted").
 *   If the screen visibly changes, no toast is needed.
 * - One short sentence, no full stop needed, no "Success!". Say what happened: "Muted MidnightMoth".
 * - At most one action, and only Undo or Retry. Undo must also be possible somewhere else on a page, because
 *   a toast disappears (people who read slowly or use a screen reader may miss it).
 * - tone `error` is for something that failed and wasn't saved ("Couldn't post. Check your connection"). It stays
 *   until closed. Form mistakes are shown on the field, never in a toast.
 * - Stays 5 s (8 s with an action). Pauses while the pointer is on it or keyboard focus is inside it.
 * - Bottom centre on phones, bottom right from tablet up. At most 3 at once; older ones leave first.
 * - Screen readers hear it without moving focus (a "live region"). Errors are read out straight away.
 * - Rewards (+5 DP) get their own game toast later; this one is for plain news.
 */
export type ToastTone = 'neutral' | 'success' | 'error';

export type ToastOptions = {
  tone?: ToastTone;
  /** "Undo" or "Retry" and what it does. */
  action?: { label: string; onClick: () => void };
};

type ToastItem = ToastOptions & { id: number; message: string };

type Api = { toast: (message: string, options?: ToastOptions) => void };

const ToastContext = createContext<Api | null>(null);

/** Shows a toast. Must be used inside <ToastProvider> (the root layout has one). */
export function useToast() {
  const api = useContext(ToastContext);
  if (!api) throw new Error('useToast needs <ToastProvider> above it');
  return api.toast;
}

const MAX = 3;

const ICON: Record<ToastTone, IconType | null> = {
  neutral: null,
  success: PiCheckCircle,
  error: PiWarningCircle,
};

export function ToastProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<ToastItem[]>([]);
  const nextId = useRef(1);

  const dismiss = useCallback((id: number) => setItems((all) => all.filter((t) => t.id !== id)), []);

  const toast = useCallback((message: string, options: ToastOptions = {}) => {
    const id = nextId.current++;
    setItems((all) => [...all, { id, message, ...options }].slice(-MAX));
  }, []);

  const api = useMemo(() => ({ toast }), [toast]);
  const polite = items.filter((t) => t.tone !== 'error');
  const urgent = items.filter((t) => t.tone === 'error');

  return (
    <ToastContext.Provider value={api}>
      {children}
      {/* Both regions are always on the page, so screen readers already watch them before a toast arrives. */}
      <div
        className={cn(
          'pointer-events-none fixed inset-x-0 bottom-0 z-[60] flex flex-col items-center gap-2 px-4',
          'pb-[calc(1rem+env(safe-area-inset-bottom))] sm:items-end sm:px-6 sm:pb-6',
        )}
      >
        <div role="alert" aria-live="assertive" className="flex w-full flex-col items-center gap-2 sm:items-end">
          {urgent.map((t) => (
            <Toast key={t.id} item={t} onDismiss={dismiss} />
          ))}
        </div>
        <div role="status" aria-live="polite" className="flex w-full flex-col items-center gap-2 sm:items-end">
          {polite.map((t) => (
            <Toast key={t.id} item={t} onDismiss={dismiss} />
          ))}
        </div>
      </div>
    </ToastContext.Provider>
  );
}

function Toast({ item, onDismiss }: { item: ToastItem; onDismiss: (id: number) => void }) {
  const tone = item.tone ?? 'neutral';
  const Icon = ICON[tone];
  const [paused, setPaused] = useState(false);
  const remaining = useRef(item.action ? 8000 : 5000);

  // Count down only while not paused; errors wait for the person to close them.
  useEffect(() => {
    if (tone === 'error' || paused) return;
    const started = Date.now();
    const timer = setTimeout(() => onDismiss(item.id), remaining.current);
    return () => {
      clearTimeout(timer);
      remaining.current -= Date.now() - started;
    };
  }, [paused, tone, item.id, onDismiss]);

  return (
    <div
      onPointerEnter={() => setPaused(true)}
      onPointerLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node)) setPaused(false);
      }}
      className={cn(
        'pointer-events-auto flex w-full max-w-sm items-center gap-3 rounded-field border bg-surface-2 py-2 pr-2 pl-4',
        'shadow-[0_16px_40px_rgb(0_0_0/0.55)] animate-[toast-in_200ms_ease-out]',
        tone === 'error' ? 'border-error/40' : 'border-line-strong',
      )}
    >
      {Icon ? <Icon aria-hidden className={cn('size-5 shrink-0', tone === 'error' ? 'text-error' : 'text-bone')} /> : null}
      <p className="min-w-0 flex-1 py-2 text-sm text-bone">{item.message}</p>
      {item.action ? (
        <button
          type="button"
          onClick={() => {
            item.action?.onClick();
            onDismiss(item.id);
          }}
          className="min-h-11 shrink-0 cursor-pointer rounded-full px-3 text-sm font-semibold text-link hover:bg-surface"
        >
          {item.action.label}
        </button>
      ) : null}
      <button
        type="button"
        aria-label="Dismiss"
        onClick={() => onDismiss(item.id)}
        className="inline-flex size-11 shrink-0 cursor-pointer items-center justify-center rounded-full text-ash hover:bg-surface hover:text-bone"
      >
        <PiX aria-hidden className="size-5" />
      </button>
    </div>
  );
}
