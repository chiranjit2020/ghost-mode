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
  PiScroll,
  PiShareNetwork,
  PiShieldCheck,
  PiSmiley,
  PiTrash,
  PiX,
} from 'react-icons/pi';
import { Brand } from '@/ui/landing/site-header';
import { Accent } from '@/ui/landing/primitives';
import type { IconType } from 'react-icons';
import {
  AVATAR_KEYS,
  AvatarPicker,
  avatarPreset,
  GhostAvatar,
  Button,
  ButtonLink,
  Card,
  CardFoot,
  CardLink,
  CardWell,
  Checkbox,
  CountBadge,
  IconButton,
  IconButtonLink,
  RadioGroup,
  Switch,
  TabNav,
  Tabs,
  Tag,
  TextArea,
  TextField,
  TextLink,
  type CardTone,
  type TagTone,
} from '@/ui/components';
import { Spec, Specimen, StateGrid, StatusTag, type Status } from './kit-parts';
import { AvatarSheetDemo, ConfirmDemo, ReportDemo, ShareSheetDemo } from './dialog-demo';
import { FlipMenuDemo, PostMenuDemo, SortMenuDemo } from './menu-demo';
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
  { id: 'tag', name: 'Tag & count badge', status: 'done', group: 'Base' },
  { id: 'card', name: 'Card', status: 'done', group: 'Base' },
  { id: 'field', name: 'Text field', status: 'done', group: 'Forms' },
  { id: 'choice', name: 'Checkbox, radio, switch', status: 'done', group: 'Forms' },
  { id: 'avatar', name: 'Ghost avatar', status: 'done', group: 'Identity' },
  { id: 'tabs', name: 'Tabs', status: 'done', group: 'Navigation' },
  { id: 'menu', name: 'Menu', status: 'done', group: 'Navigation' },
  { id: 'dialog', name: 'Dialog & sheet', status: 'review', group: 'Overlays' },
  { id: 'toast', name: 'Toast', status: 'next', group: 'Overlays' },
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
                <GhostAvatar avatarKey="moon" />
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
      status="done"
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
                <GhostAvatar avatarKey="skull" />
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

function CardSpec() {
  const tones: { tone: CardTone; title: string; text: string }[] = [
    { tone: 'default', title: 'Default', text: 'Most cards: lists, panels, settings.' },
    { tone: 'glow', title: 'Glow', text: 'Small cards in a set: topics, features, ranks.' },
    { tone: 'feature', title: 'Feature', text: 'The one focal object of a section.' },
    { tone: 'premium', title: 'Premium', text: 'Paid items, like the Shadow Cloak.' },
    { tone: 'halo', title: 'Halo', text: 'Anything caused by the Pure Souls.' },
  ];

  return (
    <Spec
      id="card"
      title="Card"
      status="done"
      summary="The one container for posts, panels, items and list rows. Five tones, two paddings, two shapes. Only cards that go somewhere lift when you hover them."
      use={[
        'Default for almost everything.',
        'Glow for a set of small, equal cards.',
        'Feature for the single object a section is about.',
        'Premium and Halo only for paid items and Pure Soul effects.',
        'CardWell for stats inside a card, CardFoot for extra info under a dashed line.',
      ]}
      avoid={[
        'Cards inside cards: use a CardWell instead.',
        'Lift or pointer on a card that can’t be clicked.',
        'More than one Feature card in a section.',
        'Custom borders, shadows or padding via className.',
      ]}
    >
      <Specimen title="Tones" note="On the page background. Static: they don't move when you hover.">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {tones.map((t) => (
            <Card key={t.tone} tone={t.tone} padding="sm">
              <p className="font-display font-bold text-bone">{t.title}</p>
              <p className="mt-1 text-sm text-ash">{t.text}</p>
            </Card>
          ))}
        </div>
      </Specimen>

      <Specimen title="On a dusk section" note={'on="dusk": the fill steps up to plum so the card still reads as raised.'} className="atmo-dusk">
        <div className="grid gap-4 sm:grid-cols-3">
          <Card on="dusk" padding="sm">
            <p className="font-display font-bold text-bone">Default</p>
            <p className="mt-1 text-sm text-ash">Plum fill on dusk.</p>
          </Card>
          <Card on="dusk" tone="glow" padding="sm">
            <p className="font-display font-bold text-bone">Glow</p>
            <p className="mt-1 text-sm text-ash">Same edge, plum fill.</p>
          </Card>
          <Card on="dusk" tone="premium" padding="sm">
            <p className="font-display font-bold text-bone">Premium</p>
            <p className="mt-1 text-sm text-ash">Violet edge on dusk.</p>
          </Card>
        </div>
      </Specimen>

      <Specimen title="Clickable cards" note="Hover them: they lift, the edge brightens, and the pointer appears. Tab to see the focus ring.">
        <div className="grid gap-4 sm:grid-cols-3">
          <CardLink href="#card" padding="sm">
            <p className="font-display font-bold text-bone">Confession Chamber</p>
            <p className="mt-1 text-sm text-ash">Secrets and untold stories.</p>
          </CardLink>
          <CardLink href="#card" tone="glow" padding="sm">
            <p className="font-display font-bold text-bone">Devil&apos;s Debate</p>
            <p className="mt-1 text-sm text-ash">Defend your argument.</p>
          </CardLink>
          <CardLink href="#card" tone="premium" padding="sm">
            <p className="font-display font-bold text-bone">Shadow Cloak</p>
            <p className="mt-1 text-sm text-ash">₹99 · 3 days</p>
          </CardLink>
        </div>
      </Specimen>

      <Specimen title="Padding & shape" note="sm = 16px (dense lists, small cards) · md = 20–24px (panels) · row = 14px corners for list rows.">
        <div className="grid items-start gap-4 lg:grid-cols-[1fr_1fr_1.2fr]">
          <Card padding="sm">
            <p className="text-sm text-bone">padding sm · 16px</p>
          </Card>
          <Card padding="md">
            <p className="text-sm text-bone">padding md · 20px, 24px from tablet up</p>
          </Card>
          <div className="space-y-2">
            {['Start an interesting discussion', 'Join a debate'].map((m) => (
              <Card key={m} shape="row" padding="sm" className="flex items-center gap-3">
                <PiScroll aria-hidden className="size-5 shrink-0 text-ember" />
                <p className="min-w-0 flex-1 text-sm font-medium text-bone">{m}</p>
                <Tag tone="ember">+3 DP</Tag>
              </Card>
            ))}
          </div>
        </div>
      </Specimen>

      <Specimen title="In context" note="A post (default + foot), a profile (feature + wells), and an item (premium).">
        <div className="grid gap-6 lg:grid-cols-3">
          <Card as="article" padding="sm">
            <div className="flex items-center gap-3">
              <GhostAvatar avatarKey="moon" />
              <div className="min-w-0 flex-1">
                <p className="font-semibold text-bone">MidnightPanda</p>
                <p className="text-xs text-smoke">Trickster · 12 min</p>
              </div>
              <IconButton icon={PiDotsThreeBold} label="More options" variant="quiet" size="sm" />
            </div>
            <p className="mt-3 text-sm leading-relaxed text-bone">
              Unpopular opinion: &ldquo;Let&apos;s stay in touch&rdquo; is the politest way to say goodbye forever.
            </p>
            <CardFoot className="flex items-center gap-4">
              <span>😈 128 · 🔥 64</span>
              <span className="ml-auto flex gap-4">
                <Button variant="link" size="sm">
                  Reply
                </Button>
              </span>
            </CardFoot>
          </Card>

          <Card tone="feature" className="text-center">
            <GhostAvatar avatarKey="skull" size="lg" />
            <p className="mt-3 font-display text-xl font-extrabold text-bone">SHADOWWOLF</p>
            <div className="mt-1">
              <Tag size="sm" tone="crimson" icon={PiCrown}>
                Archdevil
              </Tag>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-2 text-left">
              <CardWell>
                <p className="text-xs text-smoke">Dark Reputation</p>
                <p className="font-display text-xl font-bold text-bone tabular-nums">92</p>
              </CardWell>
              <CardWell>
                <p className="text-xs text-smoke">Soul Integrity</p>
                <p className="font-display text-xl font-bold text-bone tabular-nums">76</p>
              </CardWell>
            </div>
          </Card>

          <Card tone="premium">
            <div className="flex items-start justify-between gap-3">
              <div>
                <Tag size="sm" tone="violet">
                  Item
                </Tag>
                <p className="mt-2 font-display text-xl font-extrabold text-bone">Shadow Cloak</p>
              </div>
              <PiShieldCheck aria-hidden className="size-8 text-violet" />
            </div>
            <p className="mt-3 text-sm text-ash">Pauses Soul Exposure for 3 days.</p>
            <Button fullWidth className="mt-5">
              Get it for ₹99
            </Button>
            <CardFoot>Or earn one free through Dark Missions.</CardFoot>
          </Card>
        </div>
      </Specimen>
    </Spec>
  );
}

function FieldSpec() {
  return (
    <Spec
      id="field"
      title="Text field"
      status="done"
      summary="A labelled box for typing, with one message line underneath for the hint, the error or a confirmation. Built so a form never jumps or guesses."
      use={[
        'TextField for one line: names, email, password, search.',
        'TextArea for posts, replies and longer answers.',
        'A hint when people need to know a rule before they type.',
        'An error that says what to do, right under the field.',
      ]}
      avoid={[
        'A placeholder instead of a label: it vanishes as soon as you type.',
        'Errors only at the top of the form.',
        'Red for anything but a real problem with what was typed.',
        'Text under 16px inside fields: phones zoom in.',
      ]}
    >
      <Specimen title="States" note="Click into a field to see the focus look. The message line is always reserved, so an error never pushes the form down.">
        <div className="grid gap-x-6 gap-y-2 md:grid-cols-2 lg:grid-cols-3">
          <TextField label="Default" placeholder="e.g. MidnightPanda" />
          <TextField label="Filled" defaultValue="MidnightPanda" />
          <TextField label="With a hint" hint="3–20 letters or numbers. You can change it later." />
          <TextField label="Error" defaultValue="mp" error="Too short. Use 3–20 letters or numbers." />
          <TextField label="Success" defaultValue="ShadowWolf" success="Available" />
          <TextField label="Disabled" defaultValue="Locked until Level 2" disabled />
        </div>
      </Specimen>

      <Specimen title="Kinds" note="Search with an icon (label hidden, since the icon says it), password with show/hide, optional fields marked.">
        <div className="grid gap-x-6 gap-y-2 md:grid-cols-3">
          <TextField label="Search the Dark World" hideLabel icon="search" placeholder="Search posts and Ghosts" type="search" />
          <TextField label="Password" type="password" defaultValue="sunflower porch lantern" hint="At least 12 characters." />
          <TextField label="Recovery email" type="email" optional placeholder="you@example.com" hint="Only used to get your account back." />
        </div>
      </Specimen>

      <Specimen title="Text area" note="The counter only appears in the last fifth of the limit, so it doesn't nag. Type in the second one.">
        <div className="grid gap-x-6 gap-y-2 md:grid-cols-2">
          <TextArea label="Your confession" placeholder="Something you've never told anyone…" maxLength={500} />
          <TextArea
            label="Near the limit"
            maxLength={120}
            defaultValue="I tell everyone I'm a morning person. I have never once, in my entire life, seen a sunrise on purpose."
          />
        </div>
      </Specimen>

      <Specimen title="In context" note="Creating a Ghost (Level 1), with only approved components.">
        <div className="mx-auto max-w-md">
          <Card tone="feature">
            <p className="font-display text-2xl font-extrabold text-bone">
              Create your <Accent>Ghost</Accent>
            </p>
            <p className="mt-1 text-sm text-ash">No real name. No photo. Nobody here will know it&apos;s you.</p>
            <div className="mt-6 space-y-2">
              <TextField label="Ghost name" icon="at" defaultValue="ShadowWolf" success="Available" autoComplete="off" />
              <TextField label="Email" type="email" placeholder="you@example.com" hint="Never shown to anyone. Only for signing in." />
              <TextField label="Password" type="password" hint="At least 12 characters." />
            </div>
            <Button fullWidth className="mt-4">
              Create my Ghost
            </Button>
            <CardFoot>
              By continuing you agree to the <TextLink href="/kit" tone="subtle">rules</TextLink>. 18+ only.
            </CardFoot>
          </Card>
        </div>
      </Specimen>
    </Spec>
  );
}

function ChoiceSpec() {
  return (
    <Spec
      id="choice"
      title="Checkbox, radio, switch"
      status="done"
      summary="Three ways to choose. Each has one job, and the whole row, label included, is the thing you tap."
      use={[
        'Checkbox: choose any number, or agree to something. Applies when the form is sent.',
        'Radio: choose exactly one of 2–5 options, all visible at once.',
        'Switch: turn a setting on or off right away, no Save button.',
      ]}
      avoid={[
        'A switch inside a form that still needs a Save button: use a checkbox.',
        'Radios for more than 5 options: use a menu (coming later).',
        'A single radio button on its own.',
      ]}
    >
      <Specimen title="Checkbox" note="Click the labels too: the whole row toggles. Tab and press Space.">
        <div className="grid gap-x-8 sm:grid-cols-2 lg:grid-cols-3">
          <Checkbox label="Unchecked" />
          <Checkbox label="Checked" defaultChecked />
          <Checkbox label="Some selected" description="For a “select all” box." indeterminate />
          <Checkbox label="Disabled" disabled />
          <Checkbox label="Disabled, checked" disabled defaultChecked />
          <Checkbox label="I'm 18 or older" error="You must be 18 or older to enter the Dark World." />
        </div>
      </Specimen>

      <Specimen title="Radio group" note="A question (the legend) and 2–5 answers. Arrow keys move between them.">
        <div className="grid gap-8 md:grid-cols-2">
          <RadioGroup
            legend="Who can send you Hell Chat messages?"
            name="kit-dm"
            defaultValue="following"
            options={[
              { value: 'everyone', label: 'Every Ghost' },
              { value: 'following', label: 'Ghosts you follow', description: 'Recommended while you’re new.' },
              { value: 'nobody', label: 'Nobody' },
            ]}
          />
          <RadioGroup
            legend="Show your rank on posts?"
            name="kit-rank"
            error="Choose one to continue."
            options={[
              { value: 'yes', label: 'Yes, show it' },
              { value: 'no', label: 'No, keep it hidden' },
              { value: 'later', label: 'From Archdevil up', description: 'Arrives with ranks in Level 3.', disabled: true },
            ]}
          />
        </div>
      </Specimen>

      <Specimen title="Switch" note="Off is grey, on is fire: “this is live now”. Disabled is grey either way.">
        <div className="grid gap-x-8 sm:grid-cols-2">
          <Switch label="Off" />
          <Switch label="On" defaultChecked />
          <Switch label="Disabled, off" disabled />
          <Switch label="Disabled, on" disabled defaultChecked />
        </div>
      </Specimen>

      <Specimen title="In context" note="A settings card (switches take effect at once) and the end of sign-up (checkboxes sent with the form).">
        <div className="grid gap-6 lg:grid-cols-2">
          <Card>
            <p className="font-display text-lg font-bold text-bone">Notifications</p>
            <div className="mt-2 divide-y divide-line">
              <Switch label="Replies to my posts" description="When another Ghost replies to you." defaultChecked />
              <Switch label="Rewards" description="When the darkness grants you Devil Points." defaultChecked />
              <Switch label="Pure Soul visits" description="Know the moment something notices you." />
            </div>
          </Card>
          <Card>
            <p className="font-display text-lg font-bold text-bone">Almost there</p>
            <div className="mt-2">
              <Checkbox label="I'm 18 or older" defaultChecked />
              <Checkbox
                label="I agree to the rules"
                description="No threats, no harassment, no sharing anyone's private information."
              />
            </div>
            <Button fullWidth className="mt-4">
              Enter the Dark World
            </Button>
          </Card>
        </div>
      </Specimen>
    </Spec>
  );
}

function AvatarSpec() {
  const sizes = ['xs', 'sm', 'md', 'lg', 'xl'] as const;
  return (
    <Spec
      id="avatar"
      title="Ghost avatar"
      status="done"
      summary="A Ghost's face: one of 16 preset icons on a tinted circle. No photos until Level 7, so an avatar can never give away a real face."
      use={[
        'Next to a handle: posts, replies, chat, lists, profiles.',
        'The picker: choosing a face at sign-up (and later on your profile).',
      ]}
      avoid={[
        'Pure Souls: they are a game event, not an account, so they never get a face.',
        'Ranks, Cloak or frames on the avatar: those arrive with their own levels.',
        'An avatar on its own without a label: pass one, or put the handle beside it.',
      ]}
    >
      <Specimen title="Sizes" note="xs inline · sm replies and lists · md posts and chat · lg profile cards · xl your own profile.">
        <div className="flex flex-wrap items-end gap-6">
          {sizes.map((s) => (
            <div key={s} className="flex flex-col items-center gap-2">
              <GhostAvatar avatarKey="ghost" size={s} />
              <span className="text-xs text-smoke">{s}</span>
            </div>
          ))}
        </div>
      </Specimen>

      <Specimen title="All 16 presets" note="Four tints, four faces each. The tint means nothing; it only keeps a feed from looking the same.">
        <div className="grid grid-cols-4 gap-4 sm:grid-cols-8">
          {AVATAR_KEYS.map((k) => (
            <div key={k} className="flex flex-col items-center gap-2">
              <GhostAvatar avatarKey={k} size="lg" />
              <span className="text-xs text-ash">{avatarPreset(k).label}</span>
            </div>
          ))}
        </div>
      </Specimen>

      <Specimen title="Special cases" note="A deleted account is grey and dashed. A key we don't know (old data) shows the ghost instead of breaking.">
        <div className="flex flex-wrap items-center gap-8">
          <div className="flex items-center gap-3">
            <GhostAvatar avatarKey="cat" gone />
            <div>
              <p className="font-semibold text-ash">Deleted Ghost</p>
              <p className="text-xs text-smoke">Account removed</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <GhostAvatar avatarKey="no-such-key" />
            <div>
              <p className="font-semibold text-bone">OldSpecter</p>
              <p className="text-xs text-smoke">Unknown key: falls back to Ghost</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <GhostAvatar avatarKey="moon" label="NightOwl" />
            <p className="text-xs text-smoke">Alone, with a label for screen readers</p>
          </div>
        </div>
      </Specimen>

      <Specimen title="Picker" note="A radio group underneath: click a face, or Tab in and use the arrow keys. The name is written out below.">
        <AvatarPicker />
      </Specimen>

      <Specimen title="In context" note="A post, a reply, and a profile card.">
        <div className="grid gap-6 lg:grid-cols-2">
          <Card as="article" padding="sm">
            <div className="flex items-center gap-3">
              <GhostAvatar avatarKey="chai" />
              <div className="min-w-0 flex-1">
                <p className="font-semibold text-bone">ChaiDemon</p>
                <p className="text-xs text-smoke">Trickster · 12 min</p>
              </div>
              <IconButton icon={PiDotsThreeBold} label="More options" variant="quiet" size="sm" />
            </div>
            <p className="mt-3 text-sm leading-relaxed text-bone">Confession: I clap when the plane lands. Every time.</p>
            <div className="mt-4 flex items-start gap-2.5 border-t border-line pt-3">
              <GhostAvatar avatarKey="moon" size="sm" />
              <div className="min-w-0">
                <p className="text-sm">
                  <span className="font-semibold text-bone">MidnightMoth</span> <span className="text-xs text-smoke">3 min</span>
                </p>
                <p className="text-sm text-bone">The pilot deserves it. I respect this.</p>
              </div>
            </div>
          </Card>
          <Card tone="feature" className="text-center">
            <GhostAvatar avatarKey="skull" size="xl" className="mx-auto" />
            <p className="mt-3 font-display text-xl font-extrabold text-bone">ShadowSkull</p>
            <p className="mt-1 text-sm text-ash">Joined this week</p>
          </Card>
        </div>
      </Specimen>
    </Spec>
  );
}

function TabsSpec() {
  const posts = (
    <div className="space-y-3">
      <Card as="article" padding="sm">
        <div className="flex items-center gap-3">
          <GhostAvatar avatarKey="skull" />
          <div className="min-w-0 flex-1">
            <p className="font-semibold text-bone">ShadowSkull</p>
            <p className="text-xs text-smoke">2 h</p>
          </div>
        </div>
        <p className="mt-3 text-sm text-bone">I reply &ldquo;haha&rdquo; to texts with a completely straight face.</p>
      </Card>
    </div>
  );
  const empty = (text: string) => <p className="rounded-field border border-dashed border-line px-4 py-8 text-center text-sm text-ash">{text}</p>;
  return (
    <Spec
      id="tabs"
      title="Tabs"
      status="done"
      summary="Switch between views of the same thing. Two looks: a line under the page title for sections, and pills inside a card for a small filter."
      use={[
        'Line: sections of one page (a profile’s Posts / Replies / Saved).',
        'Pill: a small filter inside a card (Today / Week / All time).',
        'TabNav (links) when the tab should survive Back, refresh and sharing (For you / Following).',
      ]}
      avoid={[
        'Steps in a process (sign-up): those go one after another, not side by side.',
        'More than 6 tabs, or long labels: use a menu.',
        'Actions (Post, Delete): tabs only change what you see.',
      ]}
    >
      <Specimen title="Line" note="Click, or Tab in and use ← → Home End. The view changes as you move. Saved is disabled (arrives later).">
        <Tabs
          label="Profile sections"
          tabs={[
            { value: 'posts', label: 'Posts', count: 24, content: posts },
            { value: 'replies', label: 'Replies', count: 112, content: empty('Replies you’ve written show here.') },
            { value: 'rewards', label: 'Rewards', badge: 3, content: empty('3 new rewards from the darkness.') },
            { value: 'saved', label: 'Saved', disabled: true, content: null },
          ]}
        />
      </Specimen>

      <Specimen title="Pill" note="A filter inside a card. On = solid bone with ink, like a pressed icon button.">
        <Card>
          <div className="flex flex-wrap items-center justify-between gap-3">
            <p className="font-display text-lg font-bold text-bone">Top devils</p>
          </div>
          <Tabs
            label="Leaderboard period"
            variant="pill"
            className="mt-3"
            defaultValue="week"
            tabs={[
              { value: 'today', label: 'Today', content: empty('Nobody has earned anything yet today.') },
              {
                value: 'week',
                label: 'This week',
                content: (
                  <ol className="divide-y divide-line">
                    {[
                      ['ShadowSkull', 'skull', 920],
                      ['ChaiDemon', 'chai', 780],
                      ['MidnightMoth', 'moth', 655],
                    ].map(([n, k, dp], i) => (
                      <li key={n} className="flex items-center gap-3 py-2.5">
                        <span className="w-4 text-sm text-smoke tabular-nums">{i + 1}</span>
                        <GhostAvatar avatarKey={String(k)} size="sm" />
                        <span className="flex-1 text-sm font-semibold text-bone">{n}</span>
                        <span className="text-sm text-ash tabular-nums">{dp} DP</span>
                      </li>
                    ))}
                  </ol>
                ),
              },
              { value: 'all', label: 'All time', content: empty('Arrives with ranks in Level 3.') },
            ]}
          />
        </Card>
      </Specimen>

      <Specimen title="TabNav (links)" note="Same looks, but each tab is a link to its own URL, so Back and refresh keep it. These point at #tabs.">
        <div className="space-y-6">
          <TabNav
            label="Feed"
            tabs={[
              { href: '#tabs', label: 'For you', current: true },
              { href: '#tabs-following', label: 'Following', badge: 'dot' },
              { href: '#tabs-confessions', label: 'Confessions' },
              { href: '#tabs-hunts', label: 'Hunts', disabled: true },
            ]}
          />
          <TabNav
            label="Messages"
            variant="pill"
            tabs={[
              { href: '#tabs', label: 'Chats', current: true, badge: 2 },
              { href: '#tabs-requests', label: 'Requests', count: 5 },
            ]}
          />
        </div>
      </Specimen>

      <Specimen title="On a phone" note="Too many tabs for the width scroll sideways inside the bar; the page itself never scrolls sideways.">
        <div className="max-w-80">
          <TabNav
            label="Phone example"
            tabs={[
              { href: '#tabs', label: 'For you', current: true },
              { href: '#tabs-a', label: 'Following' },
              { href: '#tabs-b', label: 'Confessions' },
              { href: '#tabs-c', label: 'Hot takes' },
              { href: '#tabs-d', label: 'Roasts' },
            ]}
          />
        </div>
      </Specimen>
    </Spec>
  );
}

function MenuSpec() {
  return (
    <Spec
      id="menu"
      title="Menu"
      status="done"
      summary="A short list of actions that opens from a button: the … on a post, or a Sort by button. It closes as soon as you pick something."
      use={[
        'Actions on one thing: Copy link, Mute, Report, Delete.',
        'Picking one option where the choice isn’t worth a row of tabs (Sort by).',
        'Rarely used actions, so the main ones can stay as visible buttons.',
      ]}
      avoid={[
        'Site navigation: page links stay visible in the header or tab bar.',
        'The main action of a screen: that’s a primary button, never hidden.',
        'More than 7 items, or anything that needs typing: that’s a dialog.',
      ]}
    >
      <Specimen
        title="Post menu (…)"
        note="Quiet icon button, lined up to the right edge. Danger last, after a line. Edit is disabled and says why. Try the keyboard: Tab to …, Enter, then ↑ ↓, a letter, Esc."
      >
        <PostMenuDemo />
      </Specimen>

      <Specimen title="Pick one (SelectMenu)" note="The button names the current choice; the chosen row has a tick. Screen readers hear it as checked.">
        <SortMenuDemo />
      </Specimen>

      <Specimen
        title="Text button, heading and link item"
        note="A small heading groups items. A link item goes to another page. Scroll so this button sits near the bottom of the screen: the menu opens upward."
      >
        <FlipMenuDemo />
      </Specimen>
    </Spec>
  );
}

function DialogSpec() {
  return (
    <Spec
      id="dialog"
      title="Dialog & sheet"
      status="review"
      summary="A panel over the page that needs an answer before you go back. Dialogs sit in the middle; sheets rise from the bottom on phones, where thumbs reach."
      use={[
        'Confirming something that can’t be undone (Delete, Leave).',
        'A short form that belongs to one thing (Report, Change face).',
        'Sheet: a list to pick from, or longer content on a phone (Share).',
      ]}
      avoid={[
        'News or “Done!” messages: those are toasts (next), which don’t stop you.',
        'Long multi-step flows like sign-up: those get their own page.',
        'Opening a dialog from inside a dialog.',
      ]}
    >
      <Specimen
        title="Confirm (danger)"
        note="The question is the title, the description says what’s lost, the button repeats the verb. Delete shows a spinner, and while it works the dialog can’t be closed."
      >
        <ConfirmDemo />
      </Specimen>

      <Specimen
        title="Dialog with a form"
        note="Esc, × and a click outside close it, until you pick a reason or type: then the × goes and only Cancel closes it, so nothing is lost by accident. Send stays grey until a reason is picked."
      >
        <ReportDemo />
      </Specimen>

      <Specimen title="Sheet: a list" note="Narrow the window below 640px (or use a phone): it rises from the bottom with a grab handle. Wider, it’s a centred dialog.">
        <ShareSheetDemo />
      </Specimen>

      <Specimen title="Sheet with Save" note="Changes only count after Save. On phones the buttons stack full width, Save on top.">
        <AvatarSheetDemo />
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
          <CardSpec />
          <FieldSpec />
          <ChoiceSpec />
          <AvatarSpec />
          <TabsSpec />
          <MenuSpec />
          <DialogSpec />
        </main>
      </div>
    </div>
  );
}
