'use client';

import { useEffect, useId, useRef, type ReactNode } from 'react';
import { PiX } from 'react-icons/pi';
import { cn } from '../cn';
import { Button } from './button';
import { IconButton } from './icon-button';

/**
 * Dialog and Sheet: a panel over the page that needs an answer before you go back. See /kit#dialog.
 *
 * Rules
 * - Dialog (centred): a question or a short form. "Delete this post?", "Report MidnightMoth".
 * - Sheet (from the bottom on phones, centred from tablet up): a list to pick from or longer content, where a
 *   thumb reaches the bottom of the screen more easily (share options, choose your ghost).
 * - Always a title that says what it's for, and a close (×) in the corner. Esc, the × and a tap outside all
 *   close it, except `dismissible={false}` for unsaved typing (then only Cancel closes it, so nothing is lost).
 * - Buttons sit at the bottom right: the main action last (on the right), Cancel before it. On phones they stack,
 *   main action on top. One primary at most; a danger confirm uses the danger button instead.
 * - The page behind can't be scrolled or clicked while it's open, focus starts on the panel and stays inside it,
 *   and closing returns focus to whatever opened it. Built on the browser's own <dialog>, which does all of that.
 * - Don't open a dialog from a dialog. Don't use it for news or success messages: those are toasts.
 */
export type DialogSize = 'sm' | 'md';

const WIDTH: Record<DialogSize, string> = { sm: 'sm:max-w-md', md: 'sm:max-w-lg' };

function Panel({
  open,
  onClose,
  title,
  description,
  children,
  footer,
  size = 'sm',
  dismissible = true,
  sheet,
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  /** One or two quiet sentences under the title. */
  description?: ReactNode;
  children?: ReactNode;
  /** The buttons (Cancel, then the main action). */
  footer?: ReactNode;
  size?: DialogSize;
  /** false while there's unsaved typing: Esc, × and tapping outside are turned off. */
  dismissible?: boolean;
  sheet: boolean;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  const titleId = useId();
  const descId = useId();

  // Mirror `open` onto the native dialog, and stop the page behind from scrolling.
  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    if (open && !d.open) {
      d.showModal();
      document.documentElement.classList.add('overflow-hidden');
    } else if (!open && d.open) {
      d.close();
    }
    return () => {
      if (!open) document.documentElement.classList.remove('overflow-hidden');
    };
  }, [open]);

  useEffect(() => () => document.documentElement.classList.remove('overflow-hidden'), []);

  return (
    <dialog
      ref={ref}
      aria-labelledby={titleId}
      aria-describedby={description ? descId : undefined}
      // Esc: the browser fires `cancel`; keep the dialog open unless it may be dismissed, and let React decide.
      onCancel={(e) => {
        e.preventDefault();
        if (dismissible) onClose();
      }}
      onClose={() => {
        document.documentElement.classList.remove('overflow-hidden');
        if (open) onClose();
      }}
      // A click on the dialog element itself (not its content) is a click on the dark backdrop.
      onClick={(e) => {
        if (dismissible && e.target === e.currentTarget) onClose();
      }}
      className={cn(
        'm-auto max-h-[calc(100dvh-2rem)] w-[calc(100%-2rem)] overflow-visible bg-transparent p-0 text-bone',
        'backdrop:bg-void/75 backdrop:backdrop-blur-sm',
        WIDTH[size],
        sheet && 'max-sm:mb-0 max-sm:w-full max-sm:max-w-none max-sm:max-h-[85dvh]',
        'open:animate-[dialog-in_160ms_ease-out]',
        sheet && 'max-sm:open:animate-[sheet-in_220ms_cubic-bezier(0.2,0.8,0.2,1)]',
      )}
    >
      {/* Focus starts on the panel (the browser honours autoFocus inside a dialog), so no button lights up with a
          focus ring on open; screen readers still read the title, and Tab goes to × next. */}
      <div
        tabIndex={-1}
        autoFocus
        className={cn(
          'flex max-h-[inherit] flex-col rounded-card outline-none border border-line-strong bg-surface shadow-[0_24px_64px_rgb(0_0_0/0.6)]',
          sheet && 'max-sm:rounded-b-none max-sm:border-b-0 max-sm:pb-[env(safe-area-inset-bottom)]',
        )}
      >
        {sheet ? <div aria-hidden className="mx-auto mt-2.5 h-1 w-10 rounded-full bg-line-strong sm:hidden" /> : null}
        <div className="flex items-start gap-3 px-5 pt-4 sm:px-6 sm:pt-5">
          <div className="min-w-0 flex-1 pt-2">
            <h2 id={titleId} className="font-display text-xl font-bold text-bone">
              {title}
            </h2>
            {description ? (
              <div id={descId} className="mt-1.5 text-sm text-ash">
                {description}
              </div>
            ) : null}
          </div>
          {dismissible ? <IconButton icon={PiX} label="Close" variant="quiet" size="sm" onClick={onClose} className="-mr-2" /> : null}
        </div>
        {children ? <div className="min-h-0 flex-1 overflow-y-auto px-5 pt-4 sm:px-6">{children}</div> : null}
        {footer ? (
          <div className="flex flex-col-reverse gap-2 px-5 pt-5 pb-5 sm:flex-row sm:justify-end sm:px-6 sm:pb-6">{footer}</div>
        ) : (
          <div className="pb-5 sm:pb-6" />
        )}
      </div>
    </dialog>
  );
}

type DialogProps = Omit<Parameters<typeof Panel>[0], 'sheet'>;

export function Dialog(props: DialogProps) {
  return <Panel {...props} sheet={false} />;
}

export function Sheet(props: DialogProps) {
  return <Panel {...props} sheet />;
}

/**
 * The yes/no question before something that can't be undone. The question is the title ("Delete this post?"),
 * the description says what will be lost, and the button repeats the verb ("Delete", never "OK" or "Yes").
 */
export function ConfirmDialog({
  open,
  onClose,
  onConfirm,
  title,
  description,
  confirmLabel,
  cancelLabel = 'Cancel',
  danger = false,
  loading = false,
}: {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  description?: ReactNode;
  /** The verb from the title: Delete, Leave, Spend 50 DP. */
  confirmLabel: string;
  cancelLabel?: string;
  danger?: boolean;
  loading?: boolean;
}) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      title={title}
      description={description}
      dismissible={!loading}
      footer={
        <>
          <Button variant="secondary" size="sm" onClick={onClose} disabled={loading} className="max-sm:w-full">
            {cancelLabel}
          </Button>
          <Button variant={danger ? 'danger' : 'primary'} size="sm" onClick={onConfirm} loading={loading} className="max-sm:w-full">
            {confirmLabel}
          </Button>
        </>
      }
    />
  );
}
