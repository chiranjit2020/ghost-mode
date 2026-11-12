import Image from 'next/image';
import type { ReactNode } from 'react';
import { PiGhost } from 'react-icons/pi';
import { ART, type ArtSlotId } from '@/world/art';

type Tone = 'void' | 'charcoal' | 'dusk' | 'ember' | 'halo' | 'hero' | 'finale';

const TONE: Record<Tone, string> = {
  void: 'bg-void',
  charcoal: 'bg-charcoal',
  dusk: 'atmo-dusk',
  ember: 'atmo-ember',
  halo: 'atmo-halo',
  hero: 'atmo-hero',
  finale: 'atmo-finale',
};

/** One landing-page section: background tone, a centred 1200px column, generous but not wasteful spacing. */
export function Section({
  id,
  tone = 'void',
  children,
  className = '',
}: {
  id?: string;
  tone?: Tone;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section id={id} className={`relative overflow-hidden ${TONE[tone]} ${className}`}>
      <div className="mx-auto w-full max-w-[1200px] px-4 py-20 sm:px-6 md:py-28">{children}</div>
    </section>
  );
}

export function Eyebrow({ children, tone = 'crimson' }: { children: ReactNode; tone?: 'crimson' | 'halo' | 'violet' }) {
  const color = tone === 'halo' ? 'text-halo' : tone === 'violet' ? 'text-violet' : 'text-crimson';
  return (
    <p className={`mb-4 flex items-center gap-2 text-xs font-semibold tracking-[0.22em] uppercase ${color}`}>
      <span aria-hidden className="h-px w-6 bg-current" />
      {children}
    </p>
  );
}

export function Heading({ children, as: Tag = 'h2', className = '' }: { children: ReactNode; as?: 'h1' | 'h2'; className?: string }) {
  const size = Tag === 'h1' ? 'text-[2.6rem] leading-[1.05] sm:text-6xl lg:text-7xl' : 'text-3xl leading-tight sm:text-5xl';
  return <Tag className={`font-display font-extrabold tracking-tight text-balance text-bone ${size} ${className}`}>{children}</Tag>;
}

/** A heading's keyword, set in Playfair Display italic. */
export function Accent({ children }: { children: ReactNode }) {
  return <em className="accent">{children}</em>;
}

export function Lead({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <p className={`max-w-xl text-base leading-relaxed text-pretty text-ash sm:text-lg ${className}`}>{children}</p>;
}

/** The one-line statement that closes a section. */
export function Highlight({ children }: { children: ReactNode }) {
  return (
    <p className="mt-10 border-l-2 border-crimson pl-4 font-display text-lg font-bold text-bone sm:text-xl">{children}</p>
  );
}

export function Card({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <div className={`rounded-card border border-line bg-surface/70 p-6 ${className}`}>{children}</div>;
}

/** Small "arrives later" tag, so the page never promises a feature as if it exists today. */
export function LaterTag() {
  return (
    <span className="rounded-full border border-line-strong px-2 py-0.5 text-[0.68rem] font-semibold tracking-wide text-smoke uppercase">
      Later
    </span>
  );
}

/**
 * Where a section's artwork goes. With no image yet it shows an atmosphere panel with the slot's name, so the layout
 * can be judged now and the art dropped in later (src/world/art.ts).
 */
export function ArtSlot({
  id,
  aspect = 'aspect-[4/3]',
  halo = false,
  priority = false,
  className = '',
}: {
  id: ArtSlotId;
  aspect?: string;
  halo?: boolean;
  priority?: boolean;
  className?: string;
}) {
  const art = ART[id];
  if (art.src) {
    return (
      <div className={`relative overflow-hidden rounded-card ${aspect} ${className}`}>
        <Image src={art.src} alt={art.brief} fill priority={priority} sizes="(min-width: 1024px) 560px, 100vw" className="object-cover" />
      </div>
    );
  }
  return (
    <div
      role="img"
      aria-label={`Artwork to come: ${art.label}`}
      className={`relative flex items-end overflow-hidden rounded-card border border-line ${halo ? 'art-panel--halo' : 'art-panel'} ${aspect} ${className}`}
    >
      <PiGhost aria-hidden className={`float absolute top-1/2 left-1/2 size-28 -translate-x-1/2 -translate-y-1/2 opacity-25 ${halo ? 'text-halo' : 'text-bone'}`} />
      <span className="m-4 rounded-full bg-void/70 px-3 py-1 text-xs text-ash">Art · {art.label}</span>
    </div>
  );
}
