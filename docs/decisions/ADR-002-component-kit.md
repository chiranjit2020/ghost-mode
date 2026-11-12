# ADR-002 — Component kit first, pages second

Date: 2026-11-13 · Status: accepted

## Context

Howdy's look was decided page by page and then re-decided everywhere: the card radius, shadow and top bar changed
several times; icons were swapped twice (hand-drawn → Octicons → Phosphor); disabled and focus states were fixed only
after they were noticed; one-off pixel and colour values crept into pages. Each change meant hunting through many files.

## Decision

1. **Tokens** (`src/ui/tokens.css`): one name per design decision (colour roles, fonts, radii). Components never use
   raw hex or arbitrary values; Tailwind's palette is switched off.
2. **Components** (`src/ui/components/`, imported from its `index.ts` only) ship **all states at once**: default,
   hover, pressed, keyboard focus, disabled (neutral grey, never a faded brand colour), loading, error where relevant.
3. **Fixed variants**, chosen by props. `className` is for layout (margin, width) only, never colour or size.
4. **The kit page** (`/kit`, not indexed) shows every component in every state. Flow: build on /kit → In review →
   the user approves → Approved → only then used in pages.
5. **Icons**: Phosphor Regular (`react-icons/pi`) only, never hand-drawn SVG.
6. Every control is at least 44px tall; no inline `style=` (the Level 1 CSP forbids it).

## Order

Foundations → Button → Icon button → Text link → Tag & count badge → Card → Text field → Checkbox/radio/switch →
Ghost avatar → Tabs → Menu → Dialog & sheet → Toast → Tooltip → Skeleton & empty state → game components (Rank badge,
DP counter, Reaction bar, Exposure meter, Post card & reply).

The landing page's own pieces (`src/ui/landing/`) are rebuilt on the kit once the matching components are approved.
