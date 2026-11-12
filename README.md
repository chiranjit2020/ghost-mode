# Howdy Ghost Mode

The Dark World: a pseudonymous social game, separate from Howdy (no shared accounts, data, keys or infrastructure).

- Plan and levels: `docs/PLAN.md` · Decisions: `docs/decisions/` · Source conversation: `docs/draft.md`
- Status: Level 0 decided (ADR-001); landing-page preview only.

## Run

```
pnpm install
pnpm dev -p 3100
```

## Where things live

- `src/world/world.config.ts`: every world word (ranks, reactions, exposure stages, topics, demo odds).
- `src/world/art.ts`: the 14 artwork slots with their image briefs. Drop a file in `public/art/` and set `src`.
- `src/ui/landing/`: the landing-page sections (Q12 of the draft, in order).
