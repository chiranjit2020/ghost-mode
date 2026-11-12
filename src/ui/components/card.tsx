import Link from 'next/link';
import type { ReactNode } from 'react';
import { cn } from '../cn';

/**
 * Card: the one container for posts, panels, items and list rows. See /kit#card.
 *
 * Tones
 * - default: most cards. Surface fill, faint hairline.
 * - glow: small cards in a set (topics, features, ranks): faint theme edge from the top-right corner.
 * - feature: the one focal object of a section (a profile, an example post). Stronger edge + deep shadow.
 * - premium: paid items (violet edge). halo: anything from the Pure Souls (gold edge).
 *
 * Rules
 * - `on="dusk"` when the card sits on a purple (dusk) section, so its fill stays a step lighter than the section.
 * - shape "row" (14px corners) for list rows; "card" (20px) for everything else.
 * - Only cards with `href` lift on hover and show a pointer: a lift means "this goes somewhere".
 * - Inside a card: CardWell for stat boxes, CardFoot for secondary info under a dashed line.
 * - className is for layout (grid placement, height, margin), never colours, borders or padding.
 */
export type CardTone = 'default' | 'glow' | 'feature' | 'premium' | 'halo';
export type CardPadding = 'sm' | 'md';
export type CardShape = 'card' | 'row';

const FILL = { dark: 'bg-surface', dusk: 'bg-plum' } as const;

function toneClasses(tone: CardTone, on: 'dark' | 'dusk') {
  switch (tone) {
    case 'glow':
      return cn('card-glow', on === 'dusk' && 'card-glow--dusk');
    case 'feature':
      return cn('border border-line-strong shadow-2xl', FILL[on]);
    case 'premium':
      return cn('border border-violet/40', FILL[on]);
    case 'halo':
      return cn('border border-halo/30', FILL[on]);
    default:
      return cn('border border-line', FILL[on]);
  }
}

// Hover on a link card: the edge brightens (for edge-coloured tones) and the card lifts with a soft red glow.
const LINK_HOVER: Record<CardTone, string> = {
  default: 'hover:border-line-strong',
  glow: '',
  feature: 'hover:border-ash/40',
  premium: 'hover:border-violet/70',
  halo: 'hover:border-halo/60',
};

const PADDING: Record<CardPadding, string> = { sm: 'p-4', md: 'p-5 sm:p-6' };
const SHAPE: Record<CardShape, string> = { card: 'rounded-card', row: 'rounded-field' };

type CardProps = {
  tone?: CardTone;
  padding?: CardPadding;
  shape?: CardShape;
  /** The section background the card sits on. */
  on?: 'dark' | 'dusk';
  className?: string;
  children: ReactNode;
};

export function cardClasses({ tone = 'default', padding = 'md', shape = 'card', on = 'dark', className }: Omit<CardProps, 'children'>) {
  return cn(SHAPE[shape], PADDING[padding], toneClasses(tone, on), className);
}

export function Card({ as: Tag = 'div', ...props }: CardProps & { as?: 'div' | 'article' | 'section' | 'li' }) {
  return <Tag className={cardClasses(props)}>{props.children}</Tag>;
}

/** A whole card that goes somewhere. The card's text becomes the link's name, so keep it short and meaningful. */
export function CardLink({ href, ...props }: CardProps & { href: string }) {
  const tone = props.tone ?? 'default';
  return (
    <Link href={href} className={cn('block card-lift', cardClasses(props), LINK_HOVER[tone])}>
      {props.children}
    </Link>
  );
}

/** An inset box inside a card, for a stat or a small group (e.g. "Dark Reputation 92"). */
export function CardWell({ className, children }: { className?: string; children: ReactNode }) {
  return <div className={cn('rounded-field bg-void/60 p-3', className)}>{children}</div>;
}

/** Secondary info or small link actions at the bottom of a card, under a subtle dashed line. */
export function CardFoot({ className, children }: { className?: string; children: ReactNode }) {
  return <div className={cn('mt-4 border-t border-dashed border-line pt-3 text-xs text-smoke', className)}>{children}</div>;
}
