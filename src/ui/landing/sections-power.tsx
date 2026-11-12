import { PiCrown, PiLightning } from 'react-icons/pi';
import { HALO, RANKS, REACTIONS } from '@/world/world.config';
import { Accent, ArtSlot, Eyebrow, Heading, Highlight, Lead, Section } from './primitives';
import { ButtonLink, Card, CardWell } from '@/ui/components';
import { ReactionMystery } from './reaction-mystery';

/* 05 — Devil Points */
const EARN = [
  'Publish interesting posts',
  'Join discussions and debates',
  'React to other spirits',
  'Receive engagement from established devils',
  'Complete Dark Missions',
  'Take part in special events',
];

export function PointsSection() {
  return (
    <Section id="devil-powers" tone="ember">
      <div className="grid items-start gap-12 lg:grid-cols-[1fr_0.85fr]">
        <div>
          <Eyebrow tone="violet">Power is earned</Eyebrow>
          <Heading>
            Every Devil wants more <Accent>power</Accent>.
            <span className="block text-ash">
              But nobody knows <Accent>when</Accent> it comes.
            </span>
          </Heading>
          <Lead className="mt-6">
            Welcome to the mysterious economy of the Underworld. Your activity can earn Devil Points (DP), the currency of
            your dark existence. The twist: not every interaction pays. Some rewards are rare. Some arrive when you least
            expect them. And popularity doesn&apos;t automatically make you powerful.
          </Lead>

          <ul className="mt-8 grid gap-2 sm:grid-cols-2">
            {EARN.map((e) => (
              <li key={e} className="flex items-start gap-2.5 text-sm text-bone">
                <PiLightning aria-hidden className="mt-0.5 size-4 shrink-0 text-ember" />
                {e}
              </li>
            ))}
          </ul>

          <ArtSlot id="points" aspect="aspect-[16/9]" className="mt-10" />
        </div>

        <div className="lg:sticky lg:top-24">
          <ReactionMystery />
          <p className="mt-4 text-sm text-ash">
            Every reward shows up in your history, with the reason one tap away. The surprise is the outcome, never the
            rules.
          </p>
        </div>
      </div>
      <Highlight>Likes are temporary. Power is earned.</Highlight>
    </Section>
  );
}

/* 06 — Ranks */
function PowerProfile() {
  return (
    <div role="figure" aria-label="Example Devil profile">
      <Card tone="feature" className="text-center">
      <span aria-hidden className="mx-auto flex size-20 items-center justify-center rounded-full bg-plum text-4xl ring-2 ring-crimson/60">
        🐺
      </span>
      <p className="mt-4 font-display text-2xl font-extrabold tracking-wide text-bone">SHADOWWOLF</p>
      <p className="mt-1 inline-flex items-center gap-1.5 text-sm font-semibold tracking-[0.18em] text-crimson uppercase">
        <PiCrown aria-hidden className="size-4" /> Archdevil
      </p>
      <p className="mt-4 font-display text-4xl font-extrabold gradient-ink tabular-nums">8,450 DP</p>
      <dl className="mt-5 grid grid-cols-2 gap-2 text-left">
        <CardWell>
          <dt className="text-xs text-smoke">🔥 Dark Reputation</dt>
          <dd className="font-display text-xl font-bold text-bone tabular-nums">92</dd>
        </CardWell>
        <CardWell>
          <dt className="text-xs text-smoke">💀 Soul Integrity</dt>
          <dd className="font-display text-xl font-bold text-bone tabular-nums">76</dd>
        </CardWell>
      </dl>
      <p className="mt-5 text-sm text-ash italic">&ldquo;Even the shadows fear me.&rdquo;</p>
      </Card>
    </div>
  );
}

export function RanksSection() {
  return (
    <Section tone="void">
      <div className="grid items-start gap-12 lg:grid-cols-[1fr_0.6fr]">
        <div>
          <Eyebrow>Rise through the darkness</Eyebrow>
          <Heading>
            From a <Accent>Lost Soul</Accent> to the <Accent>Dark Lord</Accent>.
          </Heading>
          <Lead className="mt-6">
            Every Devil begins somewhere. Collect points and unlock achievements to rise through the ranks, and earn the
            avatars, frames, animations and titles that come with them.
          </Lead>

          <ol className="mt-10 grid grid-cols-2 gap-3 md:grid-cols-4">
            {RANKS.map((r, i) => (
              <li key={r.title} data-tier={i + 1} className="rank-card rounded-2xl border border-line bg-surface p-4">
                <p className="text-xs font-semibold text-crimson tabular-nums">{String(i + 1).padStart(2, '0')}</p>
                <p className="mt-2 font-display font-bold text-bone">{r.title}</p>
                <p className="mt-1 text-xs leading-snug text-ash">{r.line}</p>
              </li>
            ))}
          </ol>

          <div className="mt-8">
            <ButtonLink href="/enter">Discover your rank</ButtonLink>
          </div>
        </div>
        <div className="lg:sticky lg:top-24">
          <PowerProfile />
          <p className="mt-4 text-center text-xs text-smoke">
            Devil Points you can spend. Reputation you can&apos;t buy. Soul Integrity keeps you alive.
          </p>
        </div>
      </div>
    </Section>
  );
}

/* 07 — Reactions */
export function EmojiSection() {
  return (
    <Section tone="dusk">
      <div className="mx-auto max-w-2xl text-center">
        <div className="flex justify-center">
          <Eyebrow tone="violet">React differently</Eyebrow>
        </div>
        <Heading>
          Ordinary reactions are <Accent>boring</Accent>.
        </Heading>
        <Lead className="mx-auto mt-6">
          Why settle for likes and hearts? Express your personality with a collection of devilish reactions.
        </Lead>
      </div>

      <ul className="mx-auto mt-12 grid max-w-3xl grid-cols-4 gap-3 sm:gap-4">
        {REACTIONS.map((r) => (
          <li
            key={r.name}
            className="group flex flex-col items-center gap-2 rounded-2xl border border-line bg-plum/50 px-2 py-5"
          >
            <span aria-hidden className="text-4xl transition group-hover:scale-110 sm:text-5xl">
              {r.emoji}
            </span>
            <span className="text-center text-xs font-semibold text-ash sm:text-sm">{r.name}</span>
          </li>
        ))}
      </ul>

      <Card tone="halo" on="dusk" className="mx-auto mt-6 flex max-w-3xl flex-col items-center gap-4 text-center sm:flex-row sm:text-left">
        <span aria-hidden className="text-5xl">
          {HALO.emoji}
        </span>
        <div>
          <p className="font-display font-bold text-halo">And the one every devil fears: {HALO.name}</p>
          <p className="mt-1 text-sm text-ash">
            {HALO.line} Throwing one costs the thrower too, so nobody can drain you for free.
          </p>
        </div>
      </Card>

      <div className="mx-auto max-w-3xl">
        <Highlight>Don&apos;t just react. Make a statement.</Highlight>
      </div>
    </Section>
  );
}
