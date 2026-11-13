import {
  PiArrowDown,
  PiChatsCircle,
  PiChatTeardropDots,
  PiMapPin,
  PiFire,
  PiIdentificationCard,
  PiMaskHappy,
  PiSword,
  PiUserCircleDashed,
  PiUsersThree,
} from 'react-icons/pi';
import type { IconType } from 'react-icons';
import { TOPICS, WORLD } from '@/world/world.config';
import { Accent, ArtSlot, Eyebrow, Heading, Highlight, LaterTag, Lead, Section } from './primitives';
import { ButtonLink, Card, GhostAvatar } from '@/ui/components';

/* 01 — Hero */
export function HeroSection() {
  return (
    <Section tone="hero" className="border-b border-line">
      <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
        <div>
          <Eyebrow>Welcome to {WORLD.brand}</Eyebrow>
          <Heading as="h1">
            Your <Accent>halo</Accent> is safe outside.
            <span className="mt-1 block gradient-ink">
              Unleash your <Accent>devil</Accent> inside.
            </span>
          </Heading>
          <Lead className="mt-6">
            You don&apos;t need your real name. You don&apos;t need your photograph. Nobody here needs to know who you
            are. Create your devilish identity, share your unfiltered thoughts, challenge other spirits and build your
            dark reputation.
          </Lead>
          <p className="mt-4 font-display text-lg font-bold text-crimson text-glow">But remember… the Pure Souls are watching.</p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href="/enter">Enter the Dark World 😈</ButtonLink>
            <ButtonLink href="#how-it-works" variant="secondary" iconEnd={PiArrowDown}>
              Discover how it works
            </ButtonLink>
          </div>
          <p className="mt-4 text-sm text-smoke">No real-world identity required. Just create your Ghost and enter.</p>
        </div>

        <ArtSlot id="hero" aspect="aspect-[4/5] sm:aspect-[5/4] lg:aspect-[4/5]" priority />
      </div>
    </Section>
  );
}

/* 02 — Identity */
const NOT_REQUIRED: { icon: IconType; text: string }[] = [
  { icon: PiIdentificationCard, text: 'No real name required' },
  { icon: PiUserCircleDashed, text: 'No profile photograph required' },
  { icon: PiMaskHappy, text: 'No gender or age disclosure' },
  { icon: PiMapPin, text: 'No location sharing' },
];

export function IdentitySection() {
  return (
    <Section id="how-it-works" tone="charcoal">
      <div className="grid items-center gap-12 lg:grid-cols-2">
        <ArtSlot id="identity" className="order-last lg:order-first" />
        <div>
          <Eyebrow>Your identity, your choice</Eyebrow>
          <Heading>
            Who you are <Accent>outside</Accent> doesn&apos;t matter here.
          </Heading>
          <Lead className="mt-6">
            Why should your real-world identity define your virtual personality? Leave your everyday self behind and
            become someone entirely different.
          </Lead>
          <ul className="mt-8 grid gap-3 sm:grid-cols-2">
            {NOT_REQUIRED.map(({ icon: Icon, text }) => (
              <Card as="li" key={text} shape="row" padding="sm" className="flex items-center gap-3 text-sm text-bone">
                <Icon aria-hidden className="size-5 shrink-0 text-crimson" />
                {text}
              </Card>
            ))}
          </ul>
          <p className="mt-6 text-ash">
            Your Ghost gets a fantasy name and avatar. Be mysterious. Be mischievous. Be unpredictable.
          </p>
          <Highlight>Your real identity belongs to the real world. Your Ghost belongs to you.</Highlight>
          <div className="mt-8">
            <ButtonLink href="/enter">Create your Ghost</ButtonLink>
          </div>
        </div>
      </div>
    </Section>
  );
}

/* 03 — Expression */
export function ExpressionSection() {
  return (
    <Section id="dark-world" tone="dusk">
      <div className="grid items-end gap-10 lg:grid-cols-[1fr_0.9fr]">
        <div>
          <Eyebrow tone="violet">No more holding back</Eyebrow>
          <Heading>
            What would you say if <Accent>nobody</Accent> knew it was you?
          </Heading>
          <Lead className="mt-6">
            Your unpopular opinions. Your embarrassing confessions. Your controversial thoughts. Your darkest humour.
            Speak your mind, question everything and laugh at the absurdities of life.
          </Lead>
        </div>
        <ArtSlot id="expression" aspect="aspect-[16/10]" />
      </div>

      <ul className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {TOPICS.map((t, i) => (
          <Card as="li" key={t.name} tone="glow" on="dusk">
            <p className="text-xs font-semibold text-smoke tabular-nums">{String(i + 1).padStart(2, '0')}</p>
            <p className="mt-2 font-display text-base font-bold text-bone">{t.name}</p>
            <p className="mt-1 text-sm text-ash">{t.line}</p>
          </Card>
        ))}
      </ul>
      <p className="mt-4 text-sm text-smoke">Topics are moods, not rules. Post without picking one.</p>

      <Highlight>No predefined personality. No pressure to impress. Just express yourself.</Highlight>
    </Section>
  );
}

/* 04 — Social interaction */
const FEATURES: { icon: IconType; title: string; text: string; later?: boolean }[] = [
  { icon: PiFire, title: 'The Dark Feed', text: 'Discover what other spirits are thinking, discussing and sharing.' },
  { icon: PiMaskHappy, title: "Devil's Reactions", text: 'React with devilish emojis and express your personality.' },
  { icon: PiSword, title: 'The Debate Arena', text: 'Challenge opinions, defend your arguments, find the sharper mind.' },
  { icon: PiChatTeardropDots, title: 'Confession Chamber', text: 'Share the thoughts and stories you usually keep to yourself.' },
  { icon: PiChatsCircle, title: 'Hell Chat', text: 'Private and group conversations with other Ghosts.', later: true },
  { icon: PiUsersThree, title: 'The Underworld', text: 'Communities where spirits gather around shared interests.', later: true },
];

function FeedMock() {
  return (
    <div aria-label="Example post in the Dark Feed" role="figure">
      <Card tone="feature">
      <div className="flex items-center gap-3">
        <GhostAvatar avatarKey="moon" />
        <div className="min-w-0">
          <p className="font-semibold text-bone">MidnightPanda</p>
          <p className="text-xs text-smoke">Trickster · Unfiltered · 12 min</p>
        </div>
      </div>
      <p className="mt-4 text-[0.95rem] leading-relaxed text-bone">
        Unpopular opinion: &ldquo;Let&apos;s stay in touch&rdquo; is the politest way humans have invented to say goodbye
        forever.
      </p>
      <div className="mt-4 flex flex-wrap gap-2 text-sm">
        {[
          ['😈', 128],
          ['🔥', 64],
          ['🃏', 21],
          ['💀', 9],
        ].map(([e, n]) => (
          <span key={String(e)} className="rounded-full border border-line bg-void/60 px-2.5 py-1 text-ash">
            {e} <span className="tabular-nums">{n}</span>
          </span>
        ))}
      </div>
      <div className="mt-4 border-t border-line pt-4">
        <div className="flex gap-3">
          <GhostAvatar avatarKey="chai" size="sm" />
          <div>
            <p className="text-sm">
              <span className="font-semibold text-bone">ChaiDemon</span> <span className="text-xs text-smoke">Imp</span>
            </p>
            <p className="mt-0.5 text-sm text-ash">Said it to 40 people at my farewell. Have spoken to none of them since.</p>
          </div>
        </div>
      </div>
      </Card>
    </div>
  );
}

export function SocialSection() {
  return (
    <Section tone="void">
      <div className="grid items-start gap-12 lg:grid-cols-[1fr_0.85fr]">
        <div>
          <Eyebrow>The Underworld is alive</Eyebrow>
          <Heading>
            Don&apos;t just watch. <Accent>Stir</Accent> things up.
          </Heading>
          <Lead className="mt-6">
            The Dark World isn&apos;t a place to sit silently and scroll. Publish your thoughts, react to other spirits,
            challenge their opinions. Every interaction builds your presence.
          </Lead>
          <ul className="mt-10 grid gap-3 sm:grid-cols-2">
            {FEATURES.map(({ icon: Icon, title, text, later }) => (
              <Card as="li" key={title} tone="glow">
                <div className="flex items-center justify-between gap-2">
                  <Icon aria-hidden className="size-6 text-crimson" />
                  {later ? <LaterTag /> : null}
                </div>
                <p className="mt-3 font-display font-bold text-bone">{title}</p>
                <p className="mt-1 text-sm text-ash">{text}</p>
              </Card>
            ))}
          </ul>
        </div>
        <div className="lg:sticky lg:top-24">
          <FeedMock />
        </div>
      </div>
    </Section>
  );
}
