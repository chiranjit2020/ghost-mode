import type { ReactNode } from 'react';
import { cn } from '../cn';
import { Card } from './card';

/**
 * Skeleton: grey shapes in the place of content that's still loading, so the page keeps its layout and doesn't
 * jump when the content arrives. See /kit#empty.
 *
 * Rules
 * - Only for content that takes more than a moment (a feed, a profile). Buttons and short actions use a spinner.
 * - Copy the real layout: same avatar size, line count roughly the same, same card. A skeleton that looks
 *   nothing like the result is worse than none.
 * - Wrap the shapes in <SkeletonGroup label="Loading posts">: screen readers hear that once, instead of
 *   nothing or a list of empty boxes.
 * - A soft pulse, which stops for people who ask for less motion. No shimmer sweep: it's busier for no gain.
 * - Three items is enough for a list; don't fill the whole screen.
 */
export type SkeletonShape = 'line' | 'circle' | 'block';

const SHAPE: Record<SkeletonShape, string> = {
  line: 'rounded-full',
  circle: 'rounded-full',
  block: 'rounded-field',
};

/**
 * One grey shape. Give it a width (and a size for circles/blocks) with className: layout only.
 * Lines come in two heights: md for body text and names, sm for small text like times.
 */
export function Skeleton({
  shape = 'line',
  line = 'md',
  className,
}: {
  shape?: SkeletonShape;
  line?: 'sm' | 'md';
  className?: string;
}) {
  return (
    <span
      aria-hidden
      className={cn('skeleton block bg-surface-2', SHAPE[shape], shape === 'line' && (line === 'sm' ? 'h-2.5' : 'h-3'), className)}
    />
  );
}

export function SkeletonGroup({ label, children, className }: { label: string; children: ReactNode; className?: string }) {
  return (
    <div role="status" aria-busy="true" className={className}>
      <span className="sr-only">{label}</span>
      {children}
    </div>
  );
}

/** The loading look of a post card (same Card and avatar size as the real one): avatar, name and time, then two lines of text. */
export function PostSkeleton() {
  return (
    <Card>
      <div className="flex items-center gap-3">
        <Skeleton shape="circle" className="size-10" />
        <div className="flex-1 space-y-2">
          <Skeleton className="w-32" />
          <Skeleton line="sm" className="w-16" />
        </div>
      </div>
      {/* Each line sits in a 20px row, the height of a line of post text, so a two-line post lands exactly. */}
      <div className="mt-3">
        <span className="block py-1">
          <Skeleton className="w-full" />
        </span>
        <span className="block py-1">
          <Skeleton className="w-3/4" />
        </span>
      </div>
    </Card>
  );
}

/** The loading look of a list row: small avatar, a name, a value on the right. */
export function RowSkeleton() {
  return (
    <div className="flex items-center gap-3 py-2.5">
      <Skeleton shape="circle" className="size-8" />
      <Skeleton className="w-28" />
      <Skeleton className="ml-auto w-12" />
    </div>
  );
}
