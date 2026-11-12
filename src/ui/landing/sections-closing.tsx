import type { IconType } from 'react-icons';
import {
  PiFlag,
  PiHandPalm,
  PiLock,
  PiMaskHappy,
  PiProhibit,
  PiScroll,
  PiShieldCheck,
  PiTrophy,
  PiUserCircleDashed,
} from 'react-icons/pi';
import { WORLD } from '@/world/world.config';
import { Brand } from './site-header';
import { Accent, ArtSlot, Eyebrow, Heading, Highlight, LaterTag, Lead, Section } from './primitives';
import { ButtonLink } from '@/ui/components';

/* 11 — Missions */
const MISSIONS = [
  { title: 'Start an interesting discussion', reward: '+5 DP' },
  { title: 'Join a debate', reward: '+3 DP' },
  { title: 'Share an unpopular opinion', reward: '+4 DP' },
  { title: 'React to five different posts', reward: '+2 DP' },
  { title: 'Answer the Daily Devil Question', reward: 'Mystery' },
  { title: 'Discover a new corner of the Underworld', reward: 'Cloak shard' },
];

export function MissionsSection() {
  return (
    <Section tone="void">
      <div className="grid items-start gap-12 lg:grid-cols-2">
        <div>
          <div className="flex items-center gap-3">
            <Eyebrow>The Dark World never sleeps</Eyebrow>
            <span className="-mt-4">
              <LaterTag />
            </span>
          </div>
          <Heading>
            What kind of <Accent>Devil</Accent> will you be today?
          </Heading>
          <Lead className="mt-6">
            Every day brings new missions. Complete them for rewards, achievements and exclusive items, including the
            pieces of a free Shadow Cloak.
          </Lead>
          <ArtSlot id="missions" aspect="aspect-[16/9]" className="mt-10" />
        </div>
        <ul className="grid gap-3">
          {MISSIONS.map((m) => (
            <li key={m.title} className="flex items-center gap-4 rounded-2xl border border-line bg-surface p-4">
              <PiScroll aria-hidden className="size-6 shrink-0 text-ember" />
              <p className="min-w-0 flex-1 text-sm font-medium text-bone">{m.title}</p>
              <span className="shrink-0 rounded-full bg-ember/15 px-2.5 py-1 text-xs font-semibold text-ember">{m.reward}</span>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}

/* 12 — Leaderboard */
const BOARDS = [
  'Most powerful Devils',
  'Most creative spirits',
  'Legendary debaters',
  'Dark Humour champions',
  'Most active members',
  'Seasonal champions',
];

export function LeaderboardSection() {
  return (
    <Section tone="ember">
      <div className="grid items-center gap-12 lg:grid-cols-2">
        <ArtSlot id="leaderboard" className="order-last lg:order-first" />
        <div>
          <div className="flex items-center gap-3">
            <Eyebrow tone="violet">Only the powerful get remembered</Eyebrow>
            <span className="-mt-4">
              <LaterTag />
            </span>
          </div>
          <Heading>
            Who <Accent>rules</Accent> the Underworld?
          </Heading>
          <Lead className="mt-6">Every Devil wants recognition. Compete with other spirits and climb the rankings.</Lead>
          <ul className="mt-8 grid gap-2 sm:grid-cols-2">
            {BOARDS.map((b) => (
              <li key={b} className="flex items-center gap-2.5 text-sm text-bone">
                <PiTrophy aria-hidden className="size-4 shrink-0 text-ember" />
                {b}
              </li>
            ))}
          </ul>
          <Highlight>Your real-world identity may be unknown. Your reputation in the Underworld doesn&apos;t have to be.</Highlight>
        </div>
      </div>
    </Section>
  );
}

/* 13 — Safety & privacy */
const PROMISES: { icon: IconType; title: string; text: string }[] = [
  { icon: PiUserCircleDashed, title: 'Other players never know who you are', text: 'No real name, photo, age, gender or location on your Ghost. Ever.' },
  { icon: PiMaskHappy, title: 'Separate from your Howdy account', text: 'A Ghost is its own account. Nothing links it to a Howdy profile.' },
  { icon: PiProhibit, title: 'The game never exposes you', text: 'Pure Souls and purification touch your Devil, never your identity or account.' },
  { icon: PiHandPalm, title: 'Block and report, always', text: 'Any Ghost, any post. No item or rank overrides it.' },
  { icon: PiFlag, title: 'Harassment and threats are out', text: 'So is sharing anyone’s private information. Removed posts lose the points they earned.' },
  { icon: PiLock, title: 'Howdy keeps the lights on', text: 'Your account is secured and moderated. Serious abuse can be acted on.' },
];

export function SafetySection() {
  return (
    <Section id="privacy" tone="charcoal" className="border-t border-line">
      <div className="grid items-start gap-12 lg:grid-cols-[0.8fr_1fr]">
        <div>
          <Eyebrow tone="halo">Your identity stays yours</Eyebrow>
          <Heading>
            Hide your <Accent>identity</Accent>. Not your responsibility.
          </Heading>
          <Lead className="mt-6">
            The Dark World gives you the freedom to express yourself without showing who you are. That freedom comes with
            a few rules that protect every spirit, including you.
          </Lead>
          <ArtSlot id="safety" aspect="aspect-[16/10]" className="mt-10" />
        </div>
        <ul className="grid gap-3 sm:grid-cols-2">
          {PROMISES.map(({ icon: Icon, title, text }) => (
            <li key={title} className="rounded-2xl border border-line bg-surface p-5">
              <Icon aria-hidden className="size-6 text-halo" />
              <p className="mt-3 font-display font-bold text-bone">{title}</p>
              <p className="mt-1 text-sm text-ash">{text}</p>
            </li>
          ))}
        </ul>
      </div>
      <Highlight>Be mysterious. Be bold. But respect the other spirits.</Highlight>
    </Section>
  );
}

/* 14 — Final call */
export function FinaleSection() {
  return (
    <Section tone="finale">
      <div className="mx-auto max-w-3xl text-center">
        <div className="flex justify-center">
          <Eyebrow>Your dark journey starts here</Eyebrow>
        </div>
        <Heading>
          The world doesn&apos;t know your <Accent>name</Accent>.
          <span className="block gradient-ink">That&apos;s exactly the point.</span>
        </Heading>
        <Lead className="mx-auto mt-6">
          Leave your ordinary identity behind. Create your Ghost. Discover the Underworld. Earn your Devil Points. Build
          your dark reputation.
        </Lead>
        <p className="mt-6 font-display text-xl font-bold text-crimson text-glow">The Pure Souls are watching. Are you ready?</p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <ButtonLink href="/enter">Become a Devil 😈</ButtonLink>
          <ButtonLink href="#dark-world" variant="secondary">
            Explore the Dark World
          </ButtonLink>
        </div>
      </div>
      <ArtSlot id="finale" aspect="aspect-[4/3] sm:aspect-[21/9]" className="mt-16" />
    </Section>
  );
}

export function SiteFooter() {
  return (
    <footer className="border-t border-line bg-void">
      <div className="mx-auto flex w-full max-w-[1200px] flex-col gap-6 px-4 py-10 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <div>
          <Brand />
          <p className="mt-3 text-sm text-ash">{WORLD.footerLine}</p>
        </div>
        <div className="flex items-center gap-2 text-sm text-smoke">
          <PiShieldCheck aria-hidden className="size-4" />
          <span>18+ only · A Howdy world</span>
        </div>
      </div>
    </footer>
  );
}
