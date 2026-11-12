# Dark World — Philosophy, Business Case & Architecture Plan

Status: draft for decision · 2026-11-13 · source: `darkworld/draft.md` (Q1–Q12)
Nothing here is built. This is the plan to agree on before writing any code.

---

## Part 1 — What the idea really is

### 1.1 The philosophy, in one line

> **People hold back their real thoughts because of who might be watching. Give them a world where nobody they
> know is watching, make it feel like a game, and they will play there.**

Following the conversation from Q1 to Q12, the idea grows in four steps:

| Step | Question | What it became |
|---|---|---|
| Q1–Q2 | "What if everyone is anonymous?" | Curiosity: nobody knows who's who, so people relax and speak freely |
| Q3–Q5 | "Why carry your real identity into a virtual world?" | A **character** you play as, like PUBG/Free Fire, not a profile |
| Q4–Q6 | "Heaven and Hell never meet" | Two **separate universes**, with nothing linking one identity to the other |
| Q9–Q11 | "Make it a survival game" | Points, ranks, a hunter (Pure Souls), a meter (Soul Exposure), a paid item (Cloak) |

So the product is **not** "anonymous Howdy". It is a **social game where your character is your identity**. The
anonymity is the setting; the game is what brings people back.

### 1.2 Why it could work (the business opportunity)

1. **There's a real gap.** People in India often have nowhere to say an unpopular opinion, a confession or a dark
   joke without family, colleagues or community seeing it. Instagram and WhatsApp are tied to your real self.
   Reddit is anonymous but feels foreign, written in English and impersonal.
2. **Game mechanics bring people back where feeds don't.** A rank to protect, a meter to watch and a rare
   reward give a reason to open the app tomorrow. Plain feeds have to rely on friends being there.
3. **The money comes from the game, not from ads.** Cosmetics and timed items (Cloak, frames, titles) are a proven
   model in India's mobile games (Free Fire diamonds, BGMI UC). Selling small items to many people suits a
   ₹99 price point.
4. **You already own most of the boring, hard parts.** Howdy's auth (passkeys, TOTP, Argon2), rate limits,
   reporting, moderation queue, anti-spam budgets, disposable-email block, CSP, backups and health alerts took months
   to get right. A new world can start from that instead of from zero.

### 1.3 Why it could fail (read this before the plan)

Anonymous social apps have a short and well-known history. Every one that died made the same mistakes. Your draft
contains three of them.

| App | What happened | The lesson for Dark World |
|---|---|---|
| **Yik Yak** (2013–2017) | Anonymous local feeds became a tool for bullying and threats; schools banned it; it shut down | Rewarding "devilish to each other" + anonymity = harassment engine, unless the rewards are wired to wit, not to hurting people |
| **Sarahah** (2017–2018) | Anonymous messages used for bullying; pulled from both app stores | App stores remove anonymous apps that can't show working moderation |
| **NGL** (2024) | Sent **fake anonymous messages from bots** to make users pay to "reveal" who sent them. US regulators (FTC) fined it $5M and banned it from serving teenagers | **This is almost exactly the Q9 idea**: secret bots + pay ₹99 to hide. It is the one design we must not copy |

So the draft keeps what is good about these apps (mystery, freedom, play) and fixes the three dangerous parts:

| Draft idea (your words) | The danger | What the plan does instead |
|---|---|---|
| "Let people's inner evil come out", "be more devilish to each other and earn points" | The reward system pays people to hurt each other | **Devilish = wit, mischief, contrarian takes, confessions, dark humour.** Points come from other devils' 😈🔥🃏 reactions. Content removed by moderation **takes back** the points it earned (§3.4). Cruelty earns nothing |
| "Pure souls (bots), nobody knows who they are" | Fake users deceive people (the NGL pattern) | Pure Souls are **openly a game force, not fake accounts**. They never post, chat or pretend to be a person. A "visit" is a game event. The rules page says they exist; nobody knows *when* or *whom* they visit |
| "If you don't give your real photo or name… deleted account" | Collecting real photos breaks the promise of anonymity and makes us hold the most dangerous data there is | **We never ask for a real photo, name, age, gender or location.** Purification resets your *character* (rank, aura). Your account and posts are never deleted by the game |
| "Devil can buy a ₹99 cloak to hide himself" | Selling relief from a threat we created is "monetising fear", and if the hunt targets spenders it's illegal in spirit (India's 2023 dark-pattern guidelines: false urgency) | The cloak protects only against the **game** meter, can also be **earned for free**, and the hunt engine **cannot see who has paid** (§3.5) |
| "Like = lose points", "lottery, desperation" | Random penalties for being appreciated feel rigged; engineered desperation is a dark pattern | Keep the surprise, lose the cruelty: rewards are random **within published ranges**, and the "lose points" twist becomes the **😇 Halo** reaction (§3.4) |

None of these changes weakens the fantasy. Players still get to be devils. **The theatre stays; the actual harm
goes.** The landing-page copy in Q12 already works with these rules.

### 1.4 Three contradictions in the draft that need a decision

1. **"Completely separate worlds" (Q4–Q5) vs "lose your visible-identity award when you go Ghost" (Q8).**
   The Q8 mechanic only works if the system *links* your Howdy account to your Ghost. That link is exactly what
   Q4 forbids. **Recommendation:** keep the worlds unlinked. Howdy already rewards visible identity (Verified and
   Trusted ticks), so Q8 is already done on the Howdy side. Inside Dark World, the thing you can lose is your
   *rank and aura*. That's the ego trigger, and it needs no link.
2. **"Nobody can trace you" (Q1) vs "Howdy can trace for abuse" (Q7, you chose #1).**
   Both can be true. Other players can never trace you, and Howdy can only through a sealed, logged
   "break-glass" process (a locked emergency procedure used only for legal orders or serious abuse) (§3.2). The
   marketing must say *"other players never know who you are"*, never *"nobody can trace you"*.
3. **"A/B test Ghost vs Divine, the winner survives" (Q2).**
   Two products with different brands, audiences and marketing are not an A/B test. An A/B test means *the same
   kind of users, randomly split*. **Recommendation:** judge each world against its own retention target (§4,
   exit gates). Run real A/B tests *inside* Dark World on mechanics (hunt on/off, reward odds) where random splitting
   is possible.

### 1.5 What about Heaven World?

Look at what Howdy is today: real-ish profiles, Friends, Marks (Gem/Pure/Chill…), Tributes, the Trusted tick and
kindness by design. **Howdy already is the bright world.** Building a third product (Howdy + Dark + Heaven) as a
solo developer splits your time three ways.

**Recommendation:** build Dark World first. Treat Howdy as the light side for now. Decide on a separate Heaven World
only after Dark World has passed Level 4 with real data. The architecture keeps the door open at almost no cost (world
vocabulary in one config file, §2.6).

---

## Part 2 — Architecture

### 2.1 The one principle

> **Shared code is fine. Shared identity, data, credentials or infrastructure accounts are not.**
> If Dark World is sold, shut down or rewritten one day, Howdy keeps running without noticing, and the reverse.

### 2.2 Shape

```text
            HOWDY (live, unchanged)                       DARK WORLD (new)
  ┌───────────────────────────────────┐      ┌───────────────────────────────────┐
  │ howdy.chiranjitkarmakar.com       │      │ its own domain (decision D1)      │
  │ Vercel project: howdy             │      │ Vercel project: darkworld         │
  │ Neon: still-violet (SG)           │      │ Neon: new project (SG)            │
  │ Upstash Redis: loved-seal         │      │ Upstash Redis: new database       │
  │ R2 bucket: howdy                  │      │ R2 bucket: darkworld (later)      │
  │ Resend domain: howdy.…            │      │ Resend: separate sending domain   │
  │ Secrets, cron, alerts, backups    │      │ Its own secrets, cron, alerts     │
  └───────────────────────────────────┘      └───────────────────────────────────┘
                 ▲                                          ▲
                 └──── same *code patterns* (copied) ───────┘
                       no runtime calls, no shared rows, no shared keys
```

No API calls run between the two. There is **no shared user ID, session, cookie, database, bucket, Redis, secret,
analytics ID or admin console.**

### 2.3 Repository: a separate repo, seeded from Howdy

| Option | Pros | Cons |
|---|---|---|
| **A. Separate repo `darkworld` (recommended)** | Truly independent (sell/shut down = hand over a repo); no risk to the live Howdy deploy; own CI | Security patches (e.g. Next.js CVEs) applied twice |
| B. Monorepo with `apps/howdy` + `apps/darkworld` + `packages/platform` | One place to patch shared code | Moving live Howdy into `apps/` touches Vercel root, CI, e2e, migrations: real risk to a working product, for a world that isn't proven yet |

At fork time we **copy** the proven parts in. A shared package can come later, once both codebases settle (the
rule of three: extract after the third copy, not the first):

| Copy from Howdy (code only) | Rewrite for Dark World | Don't bring |
|---|---|---|
| `src/platform/*`: db, redis, rate-limit, logger, errors, http/csrf, mailer, config/env, background | Identity (no names, no photos, generated handles) | Profiles, Friends, Groups, Stories, Capsules, Tracks, Tributes, Marks, Trust |
| `auth` module internals: Argon2, sessions, passkeys, TOTP, recovery codes, Turnstile, HIBP, disposable-email list | Feed, reactions, economy, hunt (all new domain) | Google sign-in (it shares a real identity with Google; decision D2) |
| `moderation`: reports, queue, roles, anti-spam budgets (ADR-024), audit log | Landing page (Q12 copy, own design system) | The Howdy design tokens (Dark World gets its own look) |
| Security headers/CSP, CI gate (audit + gitleaks), health report, backup workflow | | |
| Module boundary lint rules (ADR-009), test helpers, e2e helpers (axe, overflow, small targets) | | |

Same stack as Howdy: Next.js 16 App Router, React 19, TypeScript, Tailwind 4, Drizzle, Postgres (Neon), Redis,
Vercel. You know it, and the copied code assumes it.

### 2.4 Modules (same modular-monolith rules as Howdy's ADR-009)

```text
src/
  app/                    routes only (thin)
  modules/
    identity/      sign-up, sign-in, passkeys, sessions, recovery; generated handle + preset avatar
    vault/         sealed accountability record (encrypted email, sign-up IP/time); break-glass only
    feed/          posts (text), replies, reactions (8 dark emojis + 😇 Halo)
    safety/        block, mute, report, moderation queue, word filter, new-account budgets
    economy/       DP ledger, reward rules, caps, anti-farming, ranks, Dark Reputation
    hunt/          Pure Soul events, Soul Integrity, purification, cloak effect
    store/         products, orders, payments (Razorpay), entitlements (Level 5)
    underworld/    communities, missions, Daily Devil Question, leaderboards, seasons (Level 6)
    chat/          Hell Chat, realtime (Level 7, highest risk)
  platform/        copied from Howdy
  world/           world.config.ts: names, ranks, emojis, copy, colours (§2.6)
```

Dependency direction (one way, enforced by lint):
`identity → safety → feed → economy → hunt`, with `store` feeding entitlements to `hunt`/`economy` only through
an `entitlements` interface. `vault` is imported by **nothing** except the break-glass admin script.

### 2.5 Data ownership (concept level, not a schema)

| Area | Main records | Notes |
|---|---|---|
| identity | `ghosts` (id, handle, avatar_key, rank cache, created_at, status), `sessions`, `passkeys`, `totp`, `recovery_codes` | **No** name, gender, age, location or photo columns. Ever |
| vault | `ghost_vault` (ghost_id, email_ciphertext, email_lookup_hash, signup_ip_hash, signup_at) | Encrypted with a key held only in Vercel env; separate DB role (§3.2) |
| feed | `posts`, `replies`, `reactions` (one per ghost per post, kind enum) | Text only until Level 7 (§3.6) |
| safety | `reports`, `blocks`, `mutes`, `moderation_actions`, `audit_log` (append-only) | Copied pattern |
| economy | `dp_ledger` (append-only), `rule_versions`, `ghost_stats` (derived) | Balances are *computed* from the ledger, never edited |
| hunt | `hunt_events`, `soul_integrity` | Engine never reads `store` (§3.5) |
| store | `orders`, `payments`, `entitlements` (ghost_id, item, starts_at, expires_at) | Webhook-driven, idempotent |

Plain-words glossary:
- **Ledger:** a list of entries that's only ever added to (+5 DP, −2 DP…), like a bank statement. Your balance is the
  sum. Nothing is ever overwritten, so every point can be explained and reversed.
- **Idempotent:** doing the same thing twice has the same effect as doing it once, so a retried payment webhook can't
  give two cloaks.
- **Keyed hash:** a one-way fingerprint of a value (e.g. an email) made with a secret key. It can't be turned back
  into the email, and without the key nobody can even test a guess.

### 2.6 World vocabulary in one file

All world-specific words live in `src/world/world.config.ts`: world name, rank names (Lost Soul → Dark Lord), reaction
set, hunter name, currency name and colour tokens. The same pattern as Howdy's `glossary.ts`.

This is cheap, and it means a future Heaven World is mostly a fork with a different config, not a rewrite. Don't
build a "multi-world engine" beyond that. Keep it simple, not simpler.

---

## Part 3 — Key design decisions explained

### 3.1 Sign-up: as anonymous as safely possible

- **Email + password, or a passkey.** Email is needed for account recovery and to stop banned people from coming
  straight back.
- Turnstile, the disposable-email block, HIBP and new-account budgets are copied as they are.
- The handle is **generated** (`MidnightPanda`, `ChaiDemon`). You can re-roll it, but you can't type a free-text real
  name. Avatars are **presets only** at launch.
- 18+ confirmation and rules acceptance at sign-up (as in Howdy's ADR-019).
- **Not phone OTP** (decision D2). In India every SIM is tied to ID documents, so a phone number is effectively a real
  identity. Holding that would undermine the whole promise and make the database a target.

### 3.2 The accountability vault ("Howdy can trace, players can't")

- The email is stored **encrypted** (to send recovery mail) plus as a **keyed hash** (so we can check "already
  registered / banned" without reading it).
- **Dark World uses a different hash key than Howdy.** Even someone with both databases can't tell that
  `ShadowWolf` and a Howdy user share an email. Linking them needs both keys plus a deliberate act. That is what
  "the worlds never meet" means technically.
- Reading the vault = a separate script, a separate DB role, admin + two-step, and an `audit_log` entry every time.
  It's used only for lawful orders or serious abuse.
- Keep sign-in IP/time logs for the period Indian law requires (CERT-In 2022 directions say 180 days; **confirm with a
  lawyer**). Store them as hashes where the law allows.

### 3.3 What "devilish" means in the system

The system can't judge tone, but it can decide **what pays**:

| Action | Pays DP? |
|---|---|
| Posting, replying, getting replies | Yes, randomly, within a published range, under a daily cap |
| Receiving 😈 🔥 🃏 💀 👻 🖤 from **distinct, established** ghosts | Yes, randomly ("100 reactions might be 10 DP, might be 3") |
| Reactions from brand-new accounts, the same pair again and again, or suspected rings | No (anti-farming) |
| Post removed by moderation | **All DP it earned is reversed** in the ledger |
| Being reported and actioned | DP penalty + Soul Integrity hit (in-game consequence for real-world rule-breaking) |

This is how the architecture makes "be devilish" mean *mischief, not abuse*. Hurting someone gets your post removed,
and removal costs you the points.

### 3.4 The reward "lottery", done fairly

- Every activity has a **published** range and chance (e.g. "a reply has a 1-in-3 chance of 1–5 DP"). Individual
  outcomes stay a surprise. Google Play's policy requires published odds for random rewards anyway.
- The randomness is calculated **on the server**, recorded in the ledger with the rule version used, and capped
  per day.
- A **reward history** page shows every +/−, with mysterious wording ("Something dark stirred… +4 DP") and the real
  reason one tap away.
- **😇 Halo reaction** (your "like = lose points" twist, kept): someone can throw a Halo at a post that's "too nice for
  hell"; it drains a little darkness. **Giving a Halo costs the giver DP**, so people can't gang up to drain someone
  for free. It's playful and it turns your reverse psychology into a mechanic. Test it behind a switch in Level 3.
- Never: paid random rewards (loot boxes), DP bought for money, or DP turned into money. The last one would move us
  toward India's Online Gaming Act 2025 (real-money games are banned).

### 3.5 Pure Souls and the Cloak: built so they can't become a scam

- A Pure Soul is a **scheduled game event**, not an account. A job picks targets by **published** rules (e.g.
  "devils who gained the most DP this week draw attention"), writes a `hunt_event`, and lowers Soul Integrity.
- **The hunt engine has no access to payment data.** In code: the `hunt` module can't import `store`; it only sees a
  yes/no "is cloaked until X" from the `entitlements` interface. So it's impossible to "hunt the spenders" or "hunt
  people who just let their cloak expire". This protects players, and it protects you legally.
- **Purification** = rank reset to Lost Soul, aura gone, a "Purified" mark for a few days. Account, posts, handle and
  purchases are kept. The game never deletes an account.
- **Cloak**: ₹99 for 3 days (price to test), or earned through missions/streaks. It only pauses the meter and adds a
  look. It never affects moderation, reports or blocks.
- Every hunt is logged with the rule version, so any complaint ("I was targeted unfairly") can be checked.

### 3.6 No images until the safety work exists

At launch everything is **text plus preset avatars**. That one decision removes the worst risk of an anonymous app,
illegal images (CSAM, non-consensual intimate images, sextortion), until Level 7.

Before any image upload is added, we need the photo check (copied from Howdy) **plus** CSAM hash matching. That is
still open on Howdy's own security backlog.

### 3.7 Payments (Level 5)

- Sell on the **web/PWA** (an installable website) through Razorpay with UPI. A Play Store app would have to use Google
  Play Billing for digital items and give Google 15–30 %.
- Flow: create order → Razorpay checkout → **signed webhook** → write `entitlement`. Idempotent, with GST on the invoice
  (18 % on digital services) and a refund path.
- The purchase records the ghost ID only, never a name. Razorpay itself will hold the payer's details; the privacy
  page must say so honestly.

### 3.8 Legal checklist (needs a lawyer before public launch)

| Law / rule | Why it matters here |
|---|---|
| IT Rules 2021 (intermediary rules) | Grievance officer, takedown timelines, cooperation with lawful orders; "safe harbour" (not being liable for users' posts) depends on doing this |
| DPDP Act 2023 + Rules | Consent, minimal data, deletion; 18+ keeps children's-data rules out |
| CERT-In directions 2022 | Log retention (180 days) |
| Consumer Protection dark-pattern guidelines 2023 | No false urgency ("Pure Souls are coming, buy now!") tied to purchases |
| Online Gaming Act 2025 | Never let DP or items be bought for winnings or cashed out |
| App stores (later) | Apple 1.2 / Google UGC rules: anonymous apps need visible report/block/moderation |

---

## Part 4 — The levels, one by one

Every level ends with an **exit gate**: conditions that must be true before the next level starts. If a gate fails,
fix it or stop. Don't push through.

### Level 0 — Decide (no code)

| | |
|---|---|
| Goal | Agree on this plan; settle decisions D1–D6 (Part 5) |
| Work | Write ADRs (decision records) in the new repo for each decision; legal consult on §3.8; choose the domain; set the kill criteria (e.g. "if D30 retention < 10 % after 2 beta cohorts, stop") |
| Exit gate | All D-decisions answered; a lawyer has seen §3.8; written moderation capacity plan (who reviews reports, and how fast) |

### Level 1 — The Gate (foundation, no social features)

| | |
|---|---|
| Goal | A secure, empty world you can sign up to |
| Scope | New repo/infra (§2.2); copy platform + auth + CI + health + backups; sign-up/in with generated handle + preset avatar; vault; 18+ + rules; account deletion; landing page from Q12 (text and placeholder art) |
| Out of scope | Posts, points, hunt, payments |
| Isolation tests | CI test fails if any Howdy env var, hostname, DB name or bucket name appears in the Dark World config; e2e checks that the session cookie is host-only; ESLint forbids importing `vault` |
| Exit gate | Security checklist from Howdy's scorecard passes; a restore drill passes; zero shared credentials (checked by listing env vars on both Vercel projects) |

### Level 2 — The Awakening (the social core)

| | |
|---|---|
| Goal | Prove people *want to talk* here, before any game layer |
| Scope | Dark Feed (text posts, replies), 8 dark reactions, block/mute/report, moderation queue, word filter, rate limits, new-account budgets; **Daily Devil Question** (one prompt a day, which solves the empty-feed problem); a disclosed house account "The Gatekeeper" that posts the question |
| Launch | Closed beta with **unlinked invite codes** (a code is just a password to enter; it records nothing about who handed it out). Announce to Howdy users, who sign up fresh |
| Measure | D1/D7 retention, posts per active ghost, report rate, time-to-action on reports |
| Exit gate | D7 ≥ target set in L0; reports handled within target time; no unresolved serious-harm incident |

### Level 3 — Dark Energy (the economy)

| | |
|---|---|
| Goal | Points and ranks make people return more, without farming |
| Scope | DP ledger, versioned reward rules with published odds, daily caps, anti-farming, clawback on removal, 8 ranks with cosmetic unlocks, reward history, Dark Reputation (not buyable), profile card (Q10 mock-up), 😇 Halo behind a switch |
| A/B test | Real random split *inside* Dark World: fixed rewards vs random rewards. Does randomness actually lift retention? |
| Exit gate | Retention lift vs Level 2 baseline; no farming ring above a threshold; nobody can explain a balance change the history page doesn't show |

### Level 4 — The Hunt

| | |
|---|---|
| Goal | Find out whether threat-and-survival adds fun or drives people away |
| Scope | Pure Soul events, Soul Integrity meter, the 5 exposure stages, purification (reset, never delete), **earnable cloak only (no payments yet)**, hunt audit log |
| A/B test | Hunt on vs off, random cohorts |
| Exit gate | Hunt cohort retains ≥ no-hunt cohort; complaints of unfairness below threshold. If the hunt hurts retention, it stays off. That's a valid result |
| Then | **Heaven World decision point** (§1.5) |

### Level 5 — The Dark Economy (money)

| | |
|---|---|
| Goal | People pay, and the free game still feels fair |
| Scope | Razorpay + UPI, Cloak ₹99/3 days (test ₹49/₹99/₹149 and durations), cosmetic frames/titles/avatars, GST invoices, refunds, entitlement expiry; privacy/terms updates |
| Exit gate | Conversion and repeat rate measured; "pay-to-win" complaints low; legal sign-off on purchase copy |

### Level 6 — The Underworld

| | |
|---|---|
| Scope | Communities (topic rooms: Inferno, Confessions, Debates, Dark Humour, Chaos), Dark Missions, leaderboards (Hall of Legends), seasons |
| Exit gate | Communities hold conversation without heavier moderation load per user |

### Level 7 — Hell Chat and images (highest risk, last)

| | |
|---|---|
| Scope | DMs and groups (Ably realtime, as in Howdy), only between ghosts above a rank, request-then-accept, rate-limited; image upload only after the photo check + CSAM hash matching are live |
| Why last | Private anonymous messaging is where grooming, sextortion and threats happen. It needs everything from L1–L6 working first, plus more moderation people |

```text
L0 Decide → L1 Gate → L2 Awakening → L3 Dark Energy → L4 Hunt ─┬→ L5 Money → L6 Underworld → L7 Chat+Images
                                                                └→ Heaven World decision
```

---

## Part 5 — Decisions needed from you

| # | Decision | My recommendation |
|---|---|---|
| D1 | Does Dark World say "by Howdy" publicly, or is it a standalone brand? | **Standalone domain and brand**, with "made by the Howdy team" only on the legal pages. Keeps Howdy's family-friendly name clean and makes selling it easy |
| D2 | Sign-in methods | **Email + password, passkey.** No phone OTP, no Google |
| D3 | Repo | **Separate repo**, seeded by copying Howdy's platform code |
| D4 | Heaven World | **Defer** until after Level 4; Howdy is the light world meanwhile |
| D5 | Images | **None until Level 7** |
| D6 | Existing Howdy users | **Invite them, but they sign up fresh.** No account link, no imported badges (resolves the Q8 conflict) |

Once these are answered, Level 0 becomes ADRs and Level 1 can be broken into tasks.
