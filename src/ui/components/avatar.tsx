import type { IconType } from 'react-icons';
import {
  PiAlien,
  PiBird,
  PiButterfly,
  PiCat,
  PiCoffee,
  PiDetective,
  PiDog,
  PiFlame,
  PiGhost,
  PiLightning,
  PiMaskHappy,
  PiMoonStars,
  PiPlanet,
  PiRabbit,
  PiSkull,
  PiSunglasses,
} from 'react-icons/pi';
import { cn } from '../cn';

/**
 * GhostAvatar: a Ghost's face. See /kit#avatar.
 *
 * Rules
 * - Presets only until Level 7 (ADR-001 D5): a Phosphor icon on a tinted circle. Nobody can upload a photo, so an
 *   avatar can never give away a real face.
 * - The key is what the database stores (`ghosts.avatar_key`). Keys never change or get reused: rename the label,
 *   not the key. An unknown key (old data, a removed preset) shows the ghost, never an error.
 * - Four tints, four presets each, so a feed looks varied without any colour meaning anything. Halo gold is Pure
 *   Souls only, and Pure Souls aren't accounts, so no avatar uses it.
 * - Next to a visible name the avatar is decoration (hidden from screen readers). Alone, pass `label`.
 * - `gone`: a deleted or removed account. Grey and dashed, so it can't be mistaken for a real Ghost.
 */
export type AvatarTint = 'crimson' | 'ember' | 'violet' | 'ash';
export type AvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export const AVATAR_PRESETS = {
  ghost: { label: 'Ghost', icon: PiGhost, tint: 'crimson' },
  skull: { label: 'Skull', icon: PiSkull, tint: 'crimson' },
  flame: { label: 'Flame', icon: PiFlame, tint: 'crimson' },
  mask: { label: 'Mask', icon: PiMaskHappy, tint: 'crimson' },
  chai: { label: 'Chai', icon: PiCoffee, tint: 'ember' },
  bolt: { label: 'Bolt', icon: PiLightning, tint: 'ember' },
  shades: { label: 'Shades', icon: PiSunglasses, tint: 'ember' },
  cat: { label: 'Cat', icon: PiCat, tint: 'ember' },
  moon: { label: 'Moon', icon: PiMoonStars, tint: 'violet' },
  alien: { label: 'Alien', icon: PiAlien, tint: 'violet' },
  planet: { label: 'Planet', icon: PiPlanet, tint: 'violet' },
  moth: { label: 'Moth', icon: PiButterfly, tint: 'violet' },
  dog: { label: 'Dog', icon: PiDog, tint: 'ash' },
  rabbit: { label: 'Rabbit', icon: PiRabbit, tint: 'ash' },
  crow: { label: 'Crow', icon: PiBird, tint: 'ash' },
  sleuth: { label: 'Sleuth', icon: PiDetective, tint: 'ash' },
} as const satisfies Record<string, { label: string; icon: IconType; tint: AvatarTint }>;

export type AvatarKey = keyof typeof AVATAR_PRESETS;
export const AVATAR_KEYS = Object.keys(AVATAR_PRESETS) as AvatarKey[];
const FALLBACK: AvatarKey = 'ghost';

export function avatarPreset(key: string | null | undefined) {
  return AVATAR_PRESETS[(key && key in AVATAR_PRESETS ? key : FALLBACK) as AvatarKey];
}

export const AVATAR_TINT: Record<AvatarTint, string> = {
  crimson: 'bg-crimson/15 text-crimson-soft',
  ember: 'bg-ember/15 text-ember',
  violet: 'bg-violet/20 text-link',
  ash: 'bg-surface-2 text-ash',
};

const SIZE: Record<AvatarSize, { box: string; icon: string }> = {
  xs: { box: 'size-6', icon: 'size-3.5' }, // inline, beside a name in running text
  sm: { box: 'size-8', icon: 'size-4.5' }, // replies, lists
  md: { box: 'size-10', icon: 'size-5.5' }, // posts, chat
  lg: { box: 'size-16', icon: 'size-8' }, // profile cards
  xl: { box: 'size-24', icon: 'size-12' }, // your own profile
};

export function GhostAvatar({
  avatarKey,
  size = 'md',
  gone = false,
  label,
  className,
}: {
  avatarKey: string | null | undefined;
  size?: AvatarSize;
  gone?: boolean;
  /** Only when no name is shown next to it, e.g. "ShadowWolf". */
  label?: string;
  className?: string;
}) {
  const preset = avatarPreset(avatarKey);
  const Icon = gone ? PiGhost : preset.icon;
  const a11y = label ? { role: 'img' as const, 'aria-label': label } : { 'aria-hidden': true as const };
  return (
    <span
      {...a11y}
      className={cn(
        'inline-flex shrink-0 items-center justify-center rounded-full',
        SIZE[size].box,
        gone ? 'border border-dashed border-line-strong bg-disabled text-on-disabled' : cn('ring-1 ring-line ring-inset', AVATAR_TINT[preset.tint]),
        className,
      )}
    >
      <Icon aria-hidden className={SIZE[size].icon} />
    </span>
  );
}
