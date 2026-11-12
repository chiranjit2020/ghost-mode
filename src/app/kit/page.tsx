import type { Metadata } from 'next';
import { PiArrowRight, PiDiceFive, PiPlus, PiShieldCheck, PiTrash } from 'react-icons/pi';
import { Brand } from '@/ui/landing/site-header';
import { Accent } from '@/ui/landing/primitives';
import { Button, ButtonLink } from '@/ui/components';
import { Spec, Specimen, StateGrid, StatusTag, type Status } from './kit-parts';
import { Swatch } from './swatch';

export const metadata: Metadata = { title: 'Component kit', robots: { index: false, follow: false } };

/**
 * The component kit: every component, all its states, before any page uses it. A component is built here first,
 * reviewed, marked Approved, and only then used in pages. See docs/decisions/ADR-002-component-kit.md.
 */

const ROADMAP: { id: string; name: string; status: Status; group: string }[] = [
  { id: 'foundations', name: 'Foundations', status: 'review', group: 'Base' },
  { id: 'button', name: 'Button', status: 'review', group: 'Base' },
  { id: 'icon-button', name: 'Icon button', status: 'next', group: 'Base' },
  { id: 'text-link', name: 'Text link', status: 'planned', group: 'Base' },
  { id: 'tag', name: 'Tag & count badge', status: 'planned', group: 'Base' },
  { id: 'card', name: 'Card', status: 'planned', group: 'Base' },
  { id: 'field', name: 'Text field', status: 'planned', group: 'Forms' },
  { id: 'choice', name: 'Checkbox, radio, switch', status: 'planned', group: 'Forms' },
  { id: 'avatar', name: 'Ghost avatar', status: 'planned', group: 'Identity' },
  { id: 'tabs', name: 'Tabs', status: 'planned', group: 'Navigation' },
  { id: 'menu', name: 'Menu', status: 'planned', group: 'Navigation' },
  { id: 'dialog', name: 'Dialog & sheet', status: 'planned', group: 'Overlays' },
  { id: 'toast', name: 'Toast', status: 'planned', group: 'Overlays' },
  { id: 'tooltip', name: 'Tooltip', status: 'planned', group: 'Overlays' },
  { id: 'empty', name: 'Skeleton & empty state', status: 'planned', group: 'Feedback' },
  { id: 'rank', name: 'Rank badge', status: 'planned', group: 'Game' },
  { id: 'dp', name: 'DP counter & reward toast', status: 'planned', group: 'Game' },
  { id: 'reactions', name: 'Reaction bar', status: 'planned', group: 'Game' },
  { id: 'exposure', name: 'Exposure meter', status: 'planned', group: 'Game' },
  { id: 'post', name: 'Post card & reply', status: 'planned', group: 'Game' },
];

const COLOURS = {
  Backgrounds: [
    { className: 'bg-void', name: 'void', role: 'Page background' },
    { className: 'bg-charcoal', name: 'charcoal', role: 'Alternate section' },
    { className: 'bg-dusk', name: 'dusk', role: 'Purple section' },
    { className: 'bg-surface', name: 'surface', role: 'Cards, inputs, secondary buttons' },
    { className: 'bg-surface-2', name: 'surface-2', role: 'Surface on hover' },
    { className: 'bg-plum', name: 'plum', role: 'Surface on a dusk section' },
  ],
  Brand: [
    { className: 'bg-crimson', name: 'crimson', role: 'Primary accent, eyebrows, icons' },
    { className: 'bg-ember', name: 'ember', role: 'Fire highlight, focus ring, rewards' },
    { className: 'bg-violet', name: 'violet', role: 'Secondary accent, premium items' },
    { className: 'bg-halo', name: 'halo', role: 'Pure Souls only' },
  ],
  Text: [
    { className: 'bg-bone', name: 'bone', role: 'Main text' },
    { className: 'bg-ash', name: 'ash', role: 'Secondary text' },
    { className: 'bg-smoke', name: 'smoke', role: 'Hints, meta, captions' },
    { className: 'bg-link', name: 'link', role: 'Text links' },
  ],
  Roles: [
    { className: 'bg-danger', name: 'danger', role: 'Irreversible actions only' },
    { className: 'bg-disabled', name: 'disabled', role: 'Disabled fill (never faded brand)' },
    { className: 'bg-on-disabled', name: 'on-disabled', role: 'Disabled text and icons' },
    { className: 'bg-line-strong', name: 'line-strong', role: 'Borders that must be seen' },
  ],
};

function Foundations() {
  return (
    <Spec
      id="foundations"
      title="Foundations"
      status="review"
      summary="The tokens every component is built from: one name per design decision. Change a token, and every component follows. Components never use a raw colour or pixel value."
    >
      {Object.entries(COLOURS).map(([group, list]) => (
        <Specimen key={group} title={`Colour · ${group}`} className="bg-void">
          <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
            {list.map((c) => (
              <Swatch key={c.name} {...c} />
            ))}
          </ul>
        </Specimen>
      ))}

      <Specimen title="Type" note="Three families, each with one job.">
        <div className="space-y-6">
          <div>
            <p className="text-xs text-smoke">Manrope 800 · headings</p>
            <p className="mt-1 font-display text-4xl font-extrabold text-bone sm:text-5xl">
              The longer they <Accent>watch</Accent>
            </p>
            <p className="mt-1 text-xs text-smoke">Playfair Display italic · one keyword per heading, never body text</p>
          </div>
          <div>
            <p className="text-xs text-smoke">Manrope 700 · card titles, labels that lead</p>
            <p className="mt-1 font-display text-xl font-bold text-bone">Shadow Cloak</p>
          </div>
          <div>
            <p className="text-xs text-smoke">Google Sans · body, lead 18px / body 16px / small 14px / meta 12px</p>
            <p className="mt-1 text-lg text-ash">Leave your everyday self behind and become someone entirely different.</p>
            <p className="mt-1 text-base text-bone">Every reward shows up in your history.</p>
            <p className="mt-1 text-sm text-ash">Trickster · Unfiltered · 12 min</p>
            <p className="mt-1 text-xs text-smoke">Example figures for the preview.</p>
          </div>
          <div>
            <p className="text-xs text-smoke">Eyebrow · 12px, 0.22em tracking, uppercase</p>
            <p className="mt-1 text-xs font-semibold tracking-[0.22em] text-crimson uppercase">The hunt has begun</p>
          </div>
        </div>
      </Specimen>

      <Specimen title="Shape" note="Three radii. Nothing in between.">
        <div className="flex flex-wrap items-end gap-6">
          <div className="text-center">
            <div className="size-28 rounded-card border border-line-strong bg-surface" />
            <p className="mt-2 text-sm text-bone">card · 20px</p>
            <p className="text-xs text-smoke">Cards, panels, art</p>
          </div>
          <div className="text-center">
            <div className="h-14 w-40 rounded-field border border-line-strong bg-surface" />
            <p className="mt-2 text-sm text-bone">field · 14px</p>
            <p className="text-xs text-smoke">Inputs, list rows</p>
          </div>
          <div className="text-center">
            <div className="h-12 w-32 rounded-full border border-line-strong bg-surface" />
            <p className="mt-2 text-sm text-bone">full</p>
            <p className="text-xs text-smoke">Buttons, tags, chips</p>
          </div>
        </div>
      </Specimen>

      <Specimen title="Focus" note="Every interactive element shows this ring when reached by keyboard. Press Tab on this page.">
        <div className="flex flex-wrap gap-3">
          <Button variant="secondary">Tab to me</Button>
          <Button>Then me</Button>
        </div>
      </Specimen>
    </Spec>
  );
}

function ButtonSpec() {
  const variants = [
    { label: 'Primary', variant: 'primary' as const, text: 'Post', icon: undefined },
    { label: 'Secondary', variant: 'secondary' as const, text: 'Learn more', icon: undefined },
    { label: 'Quiet', variant: 'quiet' as const, text: 'Skip for now', icon: undefined },
    { label: 'Link', variant: 'link' as const, text: 'See all', icon: undefined },
    { label: 'Danger', variant: 'danger' as const, text: 'Delete', icon: PiTrash },
  ];

  return (
    <Spec
      id="button"
      title="Button"
      status="review"
      summary="The only way to make an action look like a button. Five variants, three sizes, and every state built in, so no page ever invents its own."
      use={[
        'Primary: the one main action of a screen or card. At most one per view.',
        'Secondary: other real actions beside it.',
        'Quiet: toolbars and low-weight actions.',
        'Link: small actions next to content (Reply, Remove, See all).',
        'Danger: irreversible actions only, after a confirmation.',
      ]}
      avoid={[
        'Two primary buttons side by side.',
        'A filled button for a small action under a post: use Link.',
        'Danger red for anything that can be undone.',
        'Custom colours via className: className is for spacing and width only.',
      ]}
    >
      <Specimen title="Variants × states" note="Hover and press the buttons to see their hover and pressed looks.">
        <StateGrid
          columns={['Default', 'With icon', 'Loading', 'Disabled']}
          rows={variants.map((v) => ({
            label: v.label,
            cells: [
              <Button key="d" variant={v.variant}>
                {v.text}
              </Button>,
              <Button key="i" variant={v.variant} icon={v.icon ?? (v.variant === 'link' ? undefined : PiPlus)} iconEnd={v.variant === 'link' ? PiArrowRight : undefined}>
                {v.text}
              </Button>,
              <Button key="l" variant={v.variant} loading>
                {v.variant === 'primary' ? 'Posting…' : v.text}
              </Button>,
              <Button key="x" variant={v.variant} disabled>
                {v.text}
              </Button>,
            ],
          }))}
        />
      </Specimen>

      <Specimen title="Sizes" note="All at least 44px tall, so they're comfortable to tap on a phone.">
        <div className="flex flex-wrap items-center gap-3">
          <Button size="sm">Small · 44</Button>
          <Button size="md">Medium · 48</Button>
          <Button size="lg">Large · 56</Button>
        </div>
        <div className="mt-4 flex flex-wrap items-center gap-3">
          <Button size="sm" variant="secondary">
            Small
          </Button>
          <Button size="md" variant="secondary">
            Medium
          </Button>
          <Button size="lg" variant="secondary">
            Large
          </Button>
        </div>
      </Specimen>

      <Specimen title="In context" note="How they combine: one primary, its secondary, link actions on content.">
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-card border border-line bg-surface p-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="font-display text-xl font-bold text-bone">Shadow Cloak</p>
                <p className="mt-1 text-sm text-ash">Pauses Soul Exposure for 3 days.</p>
              </div>
              <PiShieldCheck aria-hidden className="size-8 text-violet" />
            </div>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Button fullWidth>Get it for ₹99</Button>
              <Button variant="secondary" fullWidth>
                Earn it free
              </Button>
            </div>
          </div>
          <div className="rounded-card border border-line bg-surface p-6">
            <p className="text-sm text-bone">
              Unpopular opinion: &ldquo;Let&apos;s stay in touch&rdquo; is the politest way to say goodbye forever.
            </p>
            <div className="mt-4 flex items-center gap-5">
              <Button variant="link" size="sm">
                Reply
              </Button>
              <Button variant="link" size="sm">
                Report
              </Button>
              <span className="ml-auto">
                <Button variant="quiet" size="sm" icon={PiDiceFive}>
                  Reveal reward
                </Button>
              </span>
            </div>
          </div>
        </div>
      </Specimen>

      <Specimen title="Button or link?" note="Goes somewhere → ButtonLink. Does something → Button. Links never look disabled.">
        <div className="flex flex-wrap items-center gap-3">
          <ButtonLink href="/" iconEnd={PiArrowRight}>
            Go to the landing page
          </ButtonLink>
          <ButtonLink href="/enter" variant="secondary">
            Open the gate page
          </ButtonLink>
        </div>
      </Specimen>
    </Spec>
  );
}

export default function KitPage() {
  const groups = [...new Set(ROADMAP.map((r) => r.group))];
  return (
    <div className="min-h-dvh bg-void">
      <header className="sticky top-0 z-40 border-b border-line bg-void/85 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-[1200px] items-center justify-between gap-4 px-4 sm:px-6">
          <Brand />
          <p className="text-sm font-semibold text-ash">Component kit</p>
        </div>
      </header>

      <div className="mx-auto grid max-w-[1200px] gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[13rem_1fr]">
        <aside className="lg:sticky lg:top-24 lg:self-start">
          <nav aria-label="Components">
            {groups.map((g) => (
              <div key={g} className="mb-5">
                <p className="mb-1.5 text-xs font-semibold tracking-[0.16em] text-smoke uppercase">{g}</p>
                <ul className="grid grid-cols-2 gap-x-3 lg:grid-cols-1">
                  {ROADMAP.filter((r) => r.group === g).map((r) => {
                    const built = r.status === 'done' || r.status === 'review';
                    return (
                      <li key={r.id} className="flex items-center justify-between gap-2 py-1">
                        {built ? (
                          <a href={`#${r.id}`} className="text-sm text-bone hover:text-link">
                            {r.name}
                          </a>
                        ) : (
                          <span className="text-sm text-smoke">{r.name}</span>
                        )}
                        {r.status !== 'planned' ? <StatusTag status={r.status} /> : null}
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </nav>
        </aside>

        <main className="min-w-0">
          <div className="mb-12">
            <h1 className="font-display text-4xl font-extrabold text-bone sm:text-5xl">
              Built <Accent>once</Accent>, used everywhere.
            </h1>
            <p className="mt-4 max-w-2xl text-ash">
              Every Ghost Mode component lives here with all its states before any page uses it. A component moves from
              In review to Approved when you&apos;ve seen it here and said yes. Pages only use approved components.
            </p>
          </div>
          <Foundations />
          <ButtonSpec />
        </main>
      </div>
    </div>
  );
}
