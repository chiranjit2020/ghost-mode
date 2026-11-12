/**
 * Every world-specific word lives here (PLAN §2.6): the brand, ranks, reactions, exposure stages, topics.
 * A different world would be a different copy of this file, not a rewrite.
 */

export const WORLD = {
  brand: 'Howdy Ghost Mode',
  shortBrand: 'Ghost Mode',
  world: 'the Dark World',
  currency: 'Devil Points',
  currencyShort: 'DP',
  hunters: 'Pure Souls',
  tagline: 'Your halo is safe outside. Unleash your devil inside.',
  footerLine: "Your identity is hidden. Your personality isn't.",
} as const;

export const RANKS = [
  { title: 'Lost Soul', line: 'Your journey begins.' },
  { title: 'Imp', line: 'A little mischief never hurts.' },
  { title: 'Trickster', line: "You're learning the dark arts." },
  { title: 'Shadow Demon', line: 'Your presence is growing.' },
  { title: 'Dark Knight', line: "You're becoming a force." },
  { title: 'Hell Commander', line: 'Other spirits recognise your power.' },
  { title: 'Archdevil', line: 'Only the powerful reach this level.' },
  { title: 'Dark Lord', line: 'A legend of the Underworld.' },
] as const;

export const REACTIONS = [
  { emoji: '😈', name: 'Devilish' },
  { emoji: '👿', name: 'Furious' },
  { emoji: '💀', name: 'Deadly' },
  { emoji: '🔥', name: 'Inferno' },
  { emoji: '🩸', name: 'Bloodlust' },
  { emoji: '🖤', name: 'Dark Heart' },
  { emoji: '🃏', name: 'Joker' },
  { emoji: '👻', name: 'Phantom' },
] as const;

/** The reverse-psychology reaction (PLAN §3.4): it drains darkness, and throwing one costs the thrower. */
export const HALO = { emoji: '😇', name: 'Halo', line: 'Too nice for hell. It drains your darkness.' } as const;

export const EXPOSURE_STAGES = [
  { percent: 20, effect: 'Something has noticed you.' },
  { percent: 40, effect: 'Some abilities become unavailable.' },
  { percent: 60, effect: 'Your dark aura begins fading.' },
  { percent: 80, effect: 'Your powers are weakening.' },
  { percent: 100, effect: 'Your Devil is purified. Back to Lost Soul.' },
] as const;

export const TOPICS = [
  { name: 'Unfiltered Opinions', line: 'Say what you really think.' },
  { name: 'Confession Chamber', line: 'Share secrets and untold stories.' },
  { name: "Devil's Debate", line: 'Challenge opinions and defend your arguments.' },
  { name: 'Dark Humour', line: 'Sarcasm, satire, memes and savage comedy.' },
  { name: 'Forbidden Thoughts', line: 'Explore uncomfortable questions.' },
  { name: 'Desire & Relationships', line: 'Attraction, dating and everything after.' },
  { name: 'Hypothetical Hell', line: 'Impossible situations and wild ideas.' },
  { name: 'Random Chaos', line: "Anything that's on your mind." },
] as const;

/**
 * The published reward range for the 100-reaction example (PLAN §3.4: individual outcomes are a surprise, the odds
 * are not). The landing-page demo draws from exactly this table.
 */
export const REACTION_MYSTERY_ODDS = [
  { dp: 0, chance: 0.2, line: 'Nothing stirred. The darkness is unimpressed.' },
  { dp: 3, chance: 0.35, line: 'A faint shadow gathers around you.' },
  { dp: 6, chance: 0.3, line: 'Your shadow has grown stronger.' },
  { dp: 10, chance: 0.12, line: 'Something dark just happened.' },
  { dp: 15, chance: 0.03, line: 'A forbidden reward has been unlocked.' },
] as const;
