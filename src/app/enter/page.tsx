import type { Metadata } from 'next';
import Link from 'next/link';
import { PiArrowLeft, PiGhost } from 'react-icons/pi';
import { Accent } from '@/ui/landing/primitives';

export const metadata: Metadata = { title: 'The gate is closed' };

/** Placeholder until sign-up is built in Level 1. Says so plainly instead of pretending. */
export default function EnterPage() {
  return (
    <main className="atmo-finale flex min-h-dvh items-center justify-center px-4">
      <div className="max-w-md text-center">
        <PiGhost aria-hidden className="float mx-auto size-16 text-crimson" />
        <h1 className="mt-6 font-display text-4xl font-extrabold text-bone">The gate is still <Accent>sealed</Accent>.</h1>
        <p className="mt-4 text-ash">
          Creating a Ghost opens soon. This page is a preview of Howdy Ghost Mode, and sign-up is the next thing being
          built.
        </p>
        <Link
          href="/"
          className="mt-8 inline-flex min-h-12 items-center gap-2 rounded-full border border-line-strong px-6 font-semibold text-bone hover:bg-surface"
        >
          <PiArrowLeft aria-hidden className="size-5" />
          Back to the Dark World
        </Link>
      </div>
    </main>
  );
}
