import Link from 'next/link';
import type { ReactNode } from 'react';
import { PiArrowUpRight } from 'react-icons/pi';
import { cn } from '../cn';

/**
 * TextLink: a link inside text (a sentence, a caption, a footer). See /kit#text-link.
 *
 * Rules
 * - default: links in paragraphs. Always underlined, so a link is never told apart by colour alone.
 * - subtle: low-key links in footers, meta lines and legal text (grey, underlined).
 * - Addresses starting with http open in a new tab, with an arrow and "(opens in a new tab)" for screen readers.
 * - Links are never disabled. If there's nowhere to go, it's plain text.
 * - Actions (Reply, Remove) are not links: use Button variant="link".
 */
export type TextLinkTone = 'default' | 'subtle';

const TONE: Record<TextLinkTone, string> = {
  default: 'text-link decoration-link/40 hover:decoration-link',
  subtle: 'text-ash decoration-ash/40 hover:text-bone hover:decoration-bone',
};

const BASE = 'underline decoration-1 underline-offset-[0.2em] transition-colors duration-150 hover:decoration-2';

export function TextLink({
  href,
  tone = 'default',
  className,
  children,
}: {
  href: string;
  tone?: TextLinkTone;
  className?: string;
  children: ReactNode;
}) {
  const look = cn(BASE, TONE[tone], className);

  if (/^https?:\/\//.test(href)) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={cn(look, 'inline-flex items-baseline gap-0.5')}>
        {children}
        <PiArrowUpRight aria-hidden className="size-[0.85em] shrink-0 self-center" />
        <span className="sr-only"> (opens in a new tab)</span>
      </a>
    );
  }

  return (
    <Link href={href} className={look}>
      {children}
    </Link>
  );
}
