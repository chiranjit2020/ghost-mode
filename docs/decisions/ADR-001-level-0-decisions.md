# ADR-001 — Level 0 decisions

Date: 2026-11-13 · Status: accepted · Context: `docs/PLAN.md` Part 5, `docs/draft.md`

| # | Question | Decision |
|---|---|---|
| D1 | Brand | **Same brand: "Howdy Ghost Mode".** The world inside it is called the Dark World. |
| D2 | Sign-in methods | **Same as Howdy:** email + password, passkeys, TOTP/recovery codes, Google sign-in. |
| D3 | Repository | **Separate repo** (`howdy-ghost`), seeded by copying Howdy's platform code. No runtime calls, shared rows, keys or infra accounts. |
| D4 | Heaven World | **The current Howdy is the Heaven World.** No third product. |
| D5 | Images | **None until Level 7.** Text and preset avatars only. |
| D6 | Existing Howdy users | **Separate account.** They sign up fresh; no link, no imported badges. |

## Consequences

- D1: the landing page and emails say "Howdy Ghost Mode". The worlds share a name, never identities. Copy must say
  "other players never know who you are", never "nobody can trace you".
- D2: Google sign-in tells Google that someone uses Ghost Mode, and gives us a verified email. The email lives only in
  the vault (encrypted + keyed hash with a Ghost-only key, PLAN §3.2), never on a profile.
- D4: the Pure Souls are the Dark World's own game force. They are not Howdy users, and nothing crosses from Howdy.
