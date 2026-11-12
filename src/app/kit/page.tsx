import type { Metadata } from 'next';
import {
  PiArrowLeft,
  PiArrowRight,
  PiBell,
  PiBookmarkSimple,
  PiChatsCircle,
  PiCrown,
  PiDiceFive,
  PiEye,
  PiLightning,
  PiSparkle,
  PiDotsThreeBold,
  PiGear,
  PiImage,
  PiList,
  PiMagnifyingGlass,
  PiPaperPlaneRight,
  PiPlus,
  PiShareNetwork,
  PiShieldCheck,
  PiSmiley,
  PiTrash,
  PiX,
} from 'react-icons/pi';
import { Brand } from '@/ui/landing/site-header';
import { Accent } from '@/ui/landing/primitives';
import type { IconType } from 'react-icons';
import { Button, ButtonLink, CountBadge, IconButton, IconButtonLink, Tag, TextLink, type TagTone } from '@/ui/components';
import { Spec, Specimen, StateGrid, StatusTag, type Status } from './kit-parts';
import { Swatch } from './swatch';

export const metadata: Metadata = { title: 'Component kit', robots: { index: false, follow: false } };

/**
 * The component kit: every component, all its states, before any page uses it. A component is built here first,
 * reviewed, marked Approved, and only then used in pages. See docs/decisions/ADR-002-component-kit.md.
 */

const ROADMAP: { id: string; name: string; status: Status; group: string }[] = [
  { id: 'foundations', name: 'Foundations', status: 'done', group: 'Base' },
  { id: 'button', name: 'Button', status: 'done', group: 'Base' },
  { id: 'icon-button', name: 'Icon button', status: 'done', group: 'Base' },
  { id: 'text-link', name: 'Text link', status: 'done', group: 'Base' },
  { id: 'tag', name: 'Tag & count badge', status: 'review', group: 'Base' },
  { id: 'card', name: 'Card', status: 'next', group: 'Base' },
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
      status="done"
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
      status="done"
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

function IconButtonSpec() {
  const variants = [
    { label: 'Secondary', variant: 'secondary' as const, icon: PiDotsThreeBold, name: 'More options' },
    { label: 'Quiet', variant: 'quiet' as const, icon: PiShareNetwork, name: 'Share' },
    { label: 'Primary', variant: 'primary' as const, icon: PiPaperPlaneRight, name: 'Send' },
  ];
  const common = [
    { icon: PiList, name: 'Menu' },
    { icon: PiX, name: 'Close' },
    { icon: PiArrowLeft, name: 'Back' },
    { icon: PiDotsThreeBold, name: 'More (Bold)' },
    { icon: PiMagnifyingGlass, name: 'Search' },
    { icon: PiBell, name: 'Notifications' },
    { icon: PiGear, name: 'Settings' },
    { icon: PiPaperPlaneRight, name: 'Send' },
  ];

  return (
    <Spec
      id="icon-button"
      title="Icon button"
      status="done"
      summary="A round button that is only an icon. It always carries a label for screen readers, because there's no visible text to read."
      use={[
        'Secondary (outlined): standalone icons in headers and cards: menu, more, close.',
        'Quiet: rows of icons, toolbars, the corner of a post.',
        'Primary: only when the icon is the main action, like Send in a composer.',
        'Pressed: toggles that stay on, like Save or Mute.',
      ]}
      avoid={[
        'Actions people won’t recognise from the icon alone: use a Button with text.',
        'Icons smaller than 20px: Phosphor Regular blurs on laptop screens.',
        'Regular-weight “more” dots: they vanish. More is the one Bold icon.',
      ]}
    >
      <Specimen title="Variants × states" note="Hover, press and Tab to them.">
        <StateGrid
          columns={['Default', 'Pressed (on)', 'Loading', 'Disabled']}
          rows={variants.map((v) => ({
            label: v.label,
            cells: [
              <IconButton key="d" icon={v.icon} label={v.name} variant={v.variant} />,
              <IconButton key="p" icon={PiBookmarkSimple} label="Save" variant={v.variant} pressed />,
              <IconButton key="l" icon={v.icon} label={v.name} variant={v.variant} loading />,
              <IconButton key="x" icon={v.icon} label={v.name} variant={v.variant} disabled />,
            ],
          }))}
        />
      </Specimen>

      <Specimen title="Sizes" note="44 · 48 · 56px boxes, with 20 · 24 · 28px icons.">
        <div className="flex flex-wrap items-center gap-4">
          <IconButton icon={PiBell} label="Notifications" size="sm" />
          <IconButton icon={PiBell} label="Notifications" size="md" />
          <IconButton icon={PiBell} label="Notifications" size="lg" />
          <span className="mx-2 h-8 w-px bg-line" aria-hidden />
          <IconButton icon={PiPaperPlaneRight} label="Send" size="sm" variant="primary" />
          <IconButton icon={PiPaperPlaneRight} label="Send" size="md" variant="primary" />
          <IconButton icon={PiPaperPlaneRight} label="Send" size="lg" variant="primary" />
        </div>
      </Specimen>

      <Specimen title="The common set" note="One icon per meaning, used the same way everywhere.">
        <ul className="grid grid-cols-4 gap-4 sm:grid-cols-8">
          {common.map((c) => (
            <li key={c.name} className="flex flex-col items-center gap-2 text-center">
              <IconButton icon={c.icon} label={c.name} variant="quiet" />
              <span className="text-xs text-smoke">{c.name}</span>
            </li>
          ))}
        </ul>
      </Specimen>

      <Specimen title="In context" note="A screen header, a post corner and a composer.">
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="space-y-4">
            <div className="flex items-center gap-3 rounded-card border border-line bg-surface px-3 py-2">
              <IconButtonLink href="/" icon={PiArrowLeft} label="Back" variant="quiet" />
              <p className="flex-1 font-display font-bold text-bone">Hell Chat</p>
              <IconButton icon={PiMagnifyingGlass} label="Search messages" variant="quiet" />
              <IconButton icon={PiDotsThreeBold} label="More options" variant="quiet" />
            </div>
            <div className="rounded-card border border-line bg-surface p-4">
              <div className="flex items-start gap-3">
                <span aria-hidden className="flex size-10 shrink-0 items-center justify-center rounded-full bg-plum text-xl">
                  🐼
                </span>
                <div className="min-w-0 flex-1">
                  <p className="font-semibold text-bone">MidnightPanda</p>
                  <p className="text-xs text-smoke">Trickster · 12 min</p>
                </div>
                <IconButton icon={PiBookmarkSimple} label="Save" variant="quiet" size="sm" pressed />
                <IconButton icon={PiDotsThreeBold} label="More options" variant="quiet" size="sm" />
              </div>
              <p className="mt-3 text-sm text-bone">Confession: I clap when the plane lands. Every time.</p>
            </div>
          </div>
          <div className="flex items-end">
            <div className="flex w-full items-center gap-2 rounded-card border border-line bg-surface p-2 pl-3">
              <IconButton icon={PiSmiley} label="Add a reaction" variant="quiet" size="sm" />
              <p className="flex-1 text-sm text-smoke">Say something devilish…</p>
              <IconButton icon={PiImage} label="Add a picture" variant="quiet" size="sm" disabled />
              <IconButton icon={PiPaperPlaneRight} label="Send" variant="primary" size="sm" />
            </div>
          </div>
        </div>
        <p className="mt-4 text-xs text-smoke">The disabled picture button: images arrive in Level 7.</p>
      </Specimen>
    </Spec>
  );
}

function TextLinkSpec() {
  const backgrounds = [
    { name: 'void', className: 'bg-void' },
    { name: 'charcoal', className: 'bg-charcoal' },
    { name: 'dusk', className: 'bg-dusk' },
    { name: 'surface', className: 'bg-surface' },
  ];

  return (
    <Spec
      id="text-link"
      title="Text link"
      status="done"
      summary="A link inside text. Always underlined, so it's never told apart by colour alone, which also helps people who don't see colour well."
      use={[
        'Default: links inside sentences and paragraphs.',
        'Subtle: footers, meta lines, legal text.',
        'External addresses: they get an arrow and open in a new tab automatically.',
      ]}
      avoid={[
        'Actions like Reply or Remove: those are Button variant="link".',
        'A link with nowhere to go: show plain text instead, never a “disabled” link.',
        'Bare “click here”: the link words should say where they go.',
      ]}
    >
      <Specimen title="Tones" note="Hover them: the underline thickens and brightens.">
        <div className="space-y-5 text-base">
          <p className="text-bone">
            Default: read the <TextLink href="/kit">community rules</TextLink> before your first post.
          </p>
          <p className="text-ash">
            Subtle: <TextLink href="/kit" tone="subtle">Terms</TextLink> · <TextLink href="/kit" tone="subtle">Privacy</TextLink> ·{' '}
            <TextLink href="/kit" tone="subtle">Help</TextLink>
          </p>
          <p className="text-bone">
            External: Shadow Cloak payments are handled by <TextLink href="https://razorpay.com">Razorpay</TextLink>.
          </p>
        </div>
      </Specimen>

      <Specimen title="On every background" note="The link colour stays readable on all four surfaces (8:1 or better).">
        <div className="grid gap-3 sm:grid-cols-2">
          {backgrounds.map((b) => (
            <div key={b.name} className={`rounded-field border border-line p-4 ${b.className}`}>
              <p className="text-xs text-smoke">{b.name}</p>
              <p className="mt-1 text-sm text-bone">
                See how <TextLink href="/kit">Devil Points</TextLink> are earned.
              </p>
            </div>
          ))}
        </div>
      </Specimen>

      <Specimen title="In context" note="A paragraph, a hint under a card, and a footer.">
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-card border border-line bg-surface p-6">
            <p className="font-display text-lg font-bold text-bone">Anonymous, not above the rules</p>
            <p className="mt-2 text-sm leading-relaxed text-ash">
              Other players never know who you are. Harassment, threats and sharing someone&apos;s private information get
              posts removed, and removed posts lose the points they earned. The full list is in the{' '}
              <TextLink href="/kit">community rules</TextLink>.
            </p>
            <p className="mt-4 border-t border-dashed border-line pt-3 text-xs text-smoke">
              Something wrong? <TextLink href="/kit" tone="subtle">Report a problem</TextLink>
            </p>
          </div>
          <div className="self-end rounded-card border border-line bg-void p-6">
            <div className="flex flex-wrap items-center justify-between gap-3 text-sm">
              <span className="text-smoke">18+ only · A Howdy world</span>
              <span className="flex gap-4">
                <TextLink href="/kit" tone="subtle">
                  Terms
                </TextLink>
                <TextLink href="/kit" tone="subtle">
                  Privacy
                </TextLink>
                <TextLink href="/kit" tone="subtle">
                  Rules
                </TextLink>
              </span>
            </div>
          </div>
        </div>
      </Specimen>
    </Spec>
  );
}

function TagSpec() {
  const tones: { tone: TagTone; meaning: string; sm: string; md: string; icon?: IconType }[] = [
    { tone: 'neutral', meaning: 'Status, category', sm: 'Later', md: 'Confessions' },
    { tone: 'crimson', meaning: 'Brand labels', sm: 'Ghost Mode', md: 'Dark World' },
    { tone: 'ember', meaning: 'Rewards, points', sm: 'Reward', md: '+5 DP', icon: PiLightning },
    { tone: 'violet', meaning: 'Paid, premium', sm: 'Premium', md: 'Shadow Cloak', icon: PiShieldCheck },
    { tone: 'halo', meaning: 'Pure Souls', sm: 'Purified', md: 'A Pure Soul visited', icon: PiEye },
    { tone: 'solid', meaning: 'One strong emphasis', sm: 'New', md: 'Season 1', icon: PiSparkle },
  ];

  return (
    <Spec
      id="tag"
      title="Tag & count badge"
      status="review"
      summary="Small labels that can't be clicked, and the red count that says something is waiting for you. Each tone means one thing, so people learn to read them at a glance."
      use={[
        'Tag: status (Later), category (a topic), a reward (+5 DP), a premium item, a Pure Soul effect.',
        'Count badge: unread messages, new notifications, friend requests.',
        'Count badge as a dot: “something new”, when the number doesn’t matter.',
      ]}
      avoid={[
        'Tags as buttons or filters: use a Button or (later) a chip.',
        'Red for anything but “waiting for you”: not errors, not decoration.',
        'More than one solid tag in a group.',
      ]}
    >
      <Specimen title="Tag tones" note="sm = uppercase status label · md = normal label, optional icon.">
        <StateGrid
          columns={['Means', 'Small', 'Medium', 'Medium + icon']}
          rows={tones.map((t) => ({
            label: t.tone[0].toUpperCase() + t.tone.slice(1),
            cells: [
              <span key="m" className="text-sm text-ash">
                {t.meaning}
              </span>,
              <Tag key="s" tone={t.tone} size="sm">
                {t.sm}
              </Tag>,
              <Tag key="d" tone={t.tone}>
                {t.md}
              </Tag>,
              <Tag key="i" tone={t.tone} icon={t.icon ?? PiCrown}>
                {t.md}
              </Tag>,
            ],
          }))}
        />
      </Specimen>

      <Specimen title="Count badge" note="0 shows nothing · over 99 shows 99+ · a dot when the number doesn't matter.">
        <div className="flex flex-wrap items-center gap-6">
          <div className="flex items-center gap-3">
            <CountBadge value={1} />
            <CountBadge value={9} />
            <CountBadge value={42} />
            <CountBadge value={120} />
            <CountBadge value="dot" />
          </div>
          <span className="h-8 w-px bg-line" aria-hidden />
          <div className="flex items-center gap-4">
            <IconButton icon={PiBell} label="Notifications" badge={3} />
            <IconButton icon={PiChatsCircle} label="Messages" badge={120} />
            <IconButton icon={PiBell} label="Notifications" variant="quiet" badge="dot" />
            <IconButton icon={PiBell} label="Notifications" variant="quiet" badge={0} />
          </div>
        </div>
        <p className="mt-4 text-xs text-smoke">
          Screen readers hear the count as part of the button: &ldquo;Notifications, 3 new&rdquo;.
        </p>
      </Specimen>

      <Specimen title="In context" note="A post's meta line, a mission row, and a header.">
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="space-y-4">
            <div className="rounded-card border border-line bg-surface p-4">
              <div className="flex items-center gap-3">
                <span aria-hidden className="flex size-10 shrink-0 items-center justify-center rounded-full bg-plum text-xl">
                  🐺
                </span>
                <div className="min-w-0 flex-1">
                  <p className="flex flex-wrap items-center gap-2 font-semibold text-bone">
                    ShadowWolf <Tag size="sm" tone="crimson">Archdevil</Tag>
                  </p>
                  <p className="text-xs text-smoke">2 h</p>
                </div>
                <Tag>Confessions</Tag>
              </div>
              <p className="mt-3 text-sm text-bone">I still have the receipt for a gift I never gave.</p>
            </div>
            <div className="flex items-center gap-4 rounded-field border border-line bg-surface p-4">
              <p className="min-w-0 flex-1 text-sm font-medium text-bone">Answer the Daily Devil Question</p>
              <Tag tone="ember" icon={PiLightning}>
                Mystery
              </Tag>
            </div>
          </div>
          <div className="space-y-4">
            <div className="flex items-center gap-3 rounded-card border border-line bg-surface px-4 py-2">
              <p className="flex-1 font-display font-bold text-bone">Dark World</p>
              <IconButton icon={PiChatsCircle} label="Messages" variant="quiet" badge={4} />
              <IconButton icon={PiBell} label="Notifications" variant="quiet" badge="dot" />
            </div>
            <div className="flex items-center gap-3 rounded-field border border-halo/30 bg-surface p-4">
              <PiEye aria-hidden className="size-5 shrink-0 text-halo" />
              <p className="min-w-0 flex-1 text-sm text-bone">Something has noticed you.</p>
              <Tag size="sm" tone="halo">
                20%
              </Tag>
            </div>
          </div>
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
          <IconButtonSpec />
          <TextLinkSpec />
          <TagSpec />
        </main>
      </div>
    </div>
  );
}
