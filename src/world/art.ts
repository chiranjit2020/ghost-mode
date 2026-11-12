/**
 * Artwork slots for the landing page, with the brief for each (from docs/draft.md, Q12). Until an image exists the
 * page shows an atmosphere panel. To add art: put the file in public/art/ and set `src` (e.g. '/art/hero.webp').
 */
export type ArtSlotId = keyof typeof ART;

export const ART = {
  hero: {
    label: 'The entrance to the Dark World',
    src: null as string | null,
    brief:
      'A powerful devil character standing at the entrance of a mysterious dark fantasy universe. Glowing red eyes, purple and crimson atmosphere, floating islands, mysterious portals and tiny ghost characters in the background. Like entering a multiplayer fantasy game.',
  },
  identity: {
    label: 'Through the portal',
    src: null as string | null,
    brief:
      'A person stepping through a magical portal, leaving their ordinary human silhouette behind and emerging as a mysterious devil character. A transformation from ordinary life to fantasy identity.',
  },
  expression: {
    label: 'The gathering',
    src: null as string | null,
    brief:
      'Different fantasy devil characters around a mysterious gathering place, exchanging glowing chat bubbles holding abstract symbols for opinions, humour, questions, confessions and debates.',
  },
  social: {
    label: 'A feed in the underworld',
    src: null as string | null,
    brief:
      'A modern social interface floating inside a dark fantasy environment: a fictional post, devilish emoji reactions, replies, a debate thread. A working social platform, not just a game.',
  },
  points: {
    label: 'Collecting dark energy',
    src: null as string | null,
    brief:
      'A devil collecting glowing purple and crimson energy orbs. A floating DP counter, magical particles and a mysterious reward chest. A game progression system.',
  },
  ranks: {
    label: 'From Imp to Dark Lord',
    src: null as string | null,
    brief:
      'Eight devil characters in a progression from a small cute imp to a massive intimidating Dark Lord, each with more elaborate armour, horns, wings and energy effects.',
  },
  emoji: {
    label: 'The reaction collection',
    src: null as string | null,
    brief:
      'Custom 3D devil-themed emoji characters floating against a dark background, each with a distinctive expression. Collectible game assets.',
  },
  pureSoul: {
    label: 'A Pure Soul watching',
    src: null as string | null,
    brief:
      'A celestial white-gold spirit observing a dark devil from above. Beautiful but intimidating, glowing wings, almost divine. The devil looks suspicious and unaware.',
  },
  exposure: {
    label: 'Five stages of fading',
    src: null as string | null,
    brief:
      'A devil with a dark energy shield gradually fading. Five stages from powerful crimson-purple energy to a pale celestial aura.',
  },
  cloak: {
    label: 'The Shadow Cloak',
    src: null as string | null,
    brief:
      'A powerful devil wearing a black-purple cloak surrounded by protective energy. A floating timer and a premium item card.',
  },
  missions: {
    label: 'The mission board',
    src: null as string | null,
    brief:
      'A dark fantasy mission board with glowing quest cards, progress indicators, reward chests and a devil choosing a challenge.',
  },
  leaderboard: {
    label: 'The throne room',
    src: null as string | null,
    brief:
      'A grand dark fantasy throne room with a glowing purple leaderboard. Devils on podiums, one legendary Dark Lord on the highest.',
  },
  safety: {
    label: 'Behind the shield',
    src: null as string | null,
    brief:
      'A mysterious ghost behind a magical privacy shield. Floating icons: a mask, a lock, a shield and community protection.',
  },
  finale: {
    label: 'The Underworld gate',
    src: null as string | null,
    brief:
      'A massive Underworld entrance. A devil stands before it, looking toward a glowing dark universe of floating islands, other Ghosts and distant celestial figures.',
  },
};
