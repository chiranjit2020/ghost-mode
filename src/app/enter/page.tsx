import type { Metadata } from 'next';
import { PiArrowLeft, PiGhost } from 'react-icons/pi';
import { ButtonLink } from '@/ui/components';
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
        <ButtonLink href="/" variant="secondary" icon={PiArrowLeft} className="mt-8">
          Back to the Dark World
        </ButtonLink>
      </div>
    </main>
  );
}
