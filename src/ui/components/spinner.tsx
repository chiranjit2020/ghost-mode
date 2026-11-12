import { cn } from '../cn';

/** A small spinning ring in the current text colour. Decorative: the control around it says "busy" (aria-busy). */
export function Spinner({ className }: { className?: string }) {
  return (
    <span
      aria-hidden
      className={cn('inline-block size-4 shrink-0 animate-spin rounded-full border-2 border-current border-r-transparent', className)}
    />
  );
}
