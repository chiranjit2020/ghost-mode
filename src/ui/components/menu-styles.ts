import { cn } from '../cn';

// Kept out of menu.tsx (a client file) so server components, like the landing header, can use the same look.

/** The floating panel look, shared with disclosure lists such as the landing's phone nav. */
export const menuPanelClasses =
  'min-w-56 max-w-[min(20rem,calc(100vw-2rem))] rounded-field border border-line-strong bg-surface p-1.5 shadow-[0_16px_40px_rgb(0_0_0/0.55)]';

/** The row look for one item in that panel. */
export function menuItemClasses({ danger = false, disabled = false }: { danger?: boolean; disabled?: boolean } = {}) {
  return cn(
    'flex min-h-11 w-full items-center gap-3 rounded-[10px] px-3 py-2 text-left text-sm outline-none select-none',
    disabled
      ? 'cursor-not-allowed text-on-disabled'
      : danger
        ? 'cursor-pointer text-error hover:bg-danger/15 focus-visible:bg-danger/15 data-[active]:bg-danger/15'
        : 'cursor-pointer text-bone hover:bg-surface-2 focus-visible:bg-surface-2 data-[active]:bg-surface-2',
  );
}

