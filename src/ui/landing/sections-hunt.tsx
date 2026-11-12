import { PiCheck, PiClockCountdown, PiEye, PiShieldCheck } from 'react-icons/pi';
import { ArtSlot, ButtonLink, Eyebrow, Heading, Lead, Section } from './primitives';
import { ExposureMeter } from './exposure-meter';

/* 08 — Pure Souls */
export function PureSoulsSection() {
  return (
    <Section id="the-hunt" tone="halo" className="border-t border-line">
      <div className="grid items-center gap-12 lg:grid-cols-2">
        <div>
          <Eyebrow tone="halo">The hunt has begun</Eyebrow>
          <Heading>You are not alone in the Underworld.</Heading>
          <Lead className="mt-6">
            Deep inside the Dark World, mysterious beings known as Pure Souls are watching. Nobody knows when one will
            appear, or which Devil will draw its attention. They don&apos;t compete for Devil Points. They have a
            different mission.
          </Lead>
          <p className="mt-6 font-display text-2xl font-extrabold text-halo">They want to purify the Underworld.</p>
          <p className="mt-4 text-ash">
            When a Pure Soul visits you, your Soul Exposure rises. Your abilities weaken, your aura fades, and in the
            end your Devil may be purified. Will you survive the hunt?
          </p>

          <div className="mt-8 flex items-start gap-3 rounded-2xl border border-line bg-surface/60 p-4">
            <PiEye aria-hidden className="mt-0.5 size-5 shrink-0 text-halo" />
            <p className="text-sm text-ash">
              Pure Souls are part of the game, run by Howdy. They never post, chat or pretend to be a person. The loudest,
              most powerful devils tend to draw their eye.
            </p>
          </div>
        </div>
        <ArtSlot id="pureSoul" aspect="aspect-[4/5] sm:aspect-[5/4] lg:aspect-[4/5]" halo />
      </div>
    </Section>
  );
}

/* 09 — Soul Exposure */
export function ExposureSection() {
  return (
    <Section tone="charcoal">
      <div className="grid items-center gap-12 lg:grid-cols-2">
        <div>
          <Eyebrow tone="halo">Your soul is at risk</Eyebrow>
          <Heading>The longer they watch, the weaker you become.</Heading>
          <Lead className="mt-6">
            As your Soul Exposure climbs, your Devil changes. Keep an eye on your Soul Integrity, protect what you&apos;ve
            built and be ready for the visit you didn&apos;t see coming.
          </Lead>
        </div>
        <ExposureMeter />
      </div>
    </Section>
  );
}

/* 10 — Shadow Cloak */
const CLOAK_BENEFITS = [
  'Pauses Soul Exposure while it lasts',
  'Shields you from Pure Soul visits',
  'A mysterious cloaked look for your avatar',
  'The Shadow Guardian effect',
];

export function CloakSection() {
  return (
    <Section id="shadow-cloak" tone="dusk">
      <div className="grid items-center gap-12 lg:grid-cols-[1fr_0.9fr]">
        <div>
          <Eyebrow tone="violet">A little dark magic</Eyebrow>
          <Heading>Not ready to lose your powers?</Heading>
          <Lead className="mt-6">
            Even the most powerful Devils need cover sometimes. The Shadow Cloak wraps your Devil in darkness and hides
            it from the hunters for a while.
          </Lead>
          <ArtSlot id="cloak" aspect="aspect-[16/9]" className="mt-10" />
        </div>

        <div className="rounded-card border border-violet/40 bg-surface p-6 shadow-2xl sm:p-8">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-xs font-semibold tracking-[0.2em] text-violet uppercase">Item</p>
              <p className="mt-1 font-display text-2xl font-extrabold text-bone">Shadow Cloak</p>
            </div>
            <PiShieldCheck aria-hidden className="size-10 text-violet" />
          </div>
          <p className="mt-5 flex items-baseline gap-2">
            <span className="font-display text-5xl font-extrabold text-bone">₹99</span>
            <span className="text-ash">for 3 days</span>
          </p>
          <ul className="mt-6 space-y-2.5">
            {CLOAK_BENEFITS.map((b) => (
              <li key={b} className="flex items-start gap-2.5 text-sm text-bone">
                <PiCheck aria-hidden className="mt-0.5 size-4 shrink-0 text-violet" />
                {b}
              </li>
            ))}
          </ul>
          <div className="mt-6 flex items-center gap-2 rounded-xl bg-void/60 px-4 py-3 text-sm text-ash">
            <PiClockCountdown aria-hidden className="size-5 text-ember" />
            <span>
              Or earn one free through <span className="text-bone">Dark Missions</span>.
            </span>
          </div>
          <div className="mt-6">
            <ButtonLink href="/enter">Get your Shadow Cloak</ButtonLink>
          </div>
          <p className="mt-5 text-xs leading-relaxed text-smoke">
            The Shadow Cloak protects your in-game Devil, not your account or identity, which are never at risk. It never
            overrides safety or moderation. Who the Pure Souls visit never depends on whether you&apos;ve bought anything.
          </p>
        </div>
      </div>
    </Section>
  );
}
