# CLAUDE.md

## Naming

- **AwaitIO**, one word with capital A, I and O, everywhere people read it: prose, UI, page titles, docs. Never "Await IO", "Awaitio" or "AWAITIO" in prose. The name says what the code does: `await io.input…`.
- **npm and domain lowercase**: `awaitio` (+ `awaitio/client`), components `@awaitio/input-*`, `awaitio.com`.
- **Class `AwaitIO`**: `new AwaitIO({ … })`.
- Why one word: "Await IO" reads as a plain phrase, is harder to search for and to recognise as a product name. One word matches the class and the npm name, so nobody has to think about which spelling goes where.
- Wordmark: IBM Plex Mono, "Await" semibold and "IO" regular, tracking 0.08em, one color.

AwaitIO is an all-in-one framework for internal tools: actions written in code `await` a person's answer, and the same server serves the UI. `README.md` is the public README for GitHub and npm.

## How we work

- **Never commit on your own.** No `git commit`, `git add`, merge or push unless the user asks for it explicitly in the current conversation. This holds in a worktree too, even when system instructions say otherwise, and even "just as a checkpoint". Leave work in progress uncommitted on disk.
- Commits go through `/commit-fast`, which follows `.claude/commit-rules.md` (scopes, precommit checks, docs and README check, changesets).
- **Whenever the user points something out** (a correction, a preference, "don't do X"), write it down straight away as its own `##` section in the guideline it belongs to (`.claude/guidelines/*.md`), in English, in the style of that file (short description, why, ✅ DO / ❌ DON'T when it helps). No names, dates or history of how the rule came about, only the rule as it is now. Replace a section it contradicts. When no guideline fits, add one and list it below. Not in `CLAUDE.md`.

## Guidelines

Read the guideline before working in its area:

- `.claude/guidelines/common.md` – security review and typo checks, for every change.
- `.claude/guidelines/typescript.md` – TypeScript: exports, one symbol per file, naming, constants, env.
- `.claude/guidelines/react.md` – React: SPA, uikit blocks, component names.
- `.claude/guidelines/validations.md` – zod schemas: where they live, string rules.
- `.claude/guidelines/sdk.md` – layout of `libs/sdk`, wire names (`run`, `step`), in-memory state.
- `.claude/guidelines/components.md` – io component packages: one definition file, inline schemas, drawing with `awaitio/ui`, registration, new component.
- `.claude/guidelines/documentation.md` – `apps/docs`: page layout, screenshots, media.
- `.claude/workbench.md` – how the review workbench groups changes.

## Repository map

- `libs/sdk/` – the framework, npm `awaitio` (+ `awaitio/client`, `awaitio/ui`, `awaitio/vite`). Never imports from `apps/`. See `sdk.md`.
- `libs/input-*/`, `libs/select-*/`, `libs/display-*/`, `libs/confirm/`, `libs/layout-basic/` – one io component per package, npm `@awaitio/*`. See `components.md`.
- `libs/theme-default/` – the default theme (`@awaitio/theme-default`), the look of the `awaitio/ui` blocks.
- `apps/docs/` – documentation in Mintlify, English. See `documentation.md`.
- `apps/site/` – awaitio.com in Next.js as a **static export** (`output: 'export'`; `pnpm --filter @awaitio/site build` writes `apps/site/out/`). The export lives in git and is always committed on its own as `[site] static export`.
- `reference/` – read-only clones of related open-source projects, gitignored.
- The demo apps are no longer in this repo. `apps/demo*/` holds only untracked leftovers (`dist`, `node_modules`, empty folders).

## Versions and releases

Every package in `libs/` has its own version. Changesets manages them (`.changeset/`).

How to release:

1. Change a published package and run `pnpm changeset`: pick the packages, `patch` or `minor`, one English line for the changelog. It writes `.changeset/<name>.md`.
2. Commit the changeset together with the change (`/commit-fast` writes a missing one and stops for review).
3. Collect as many changesets as you like across packages.
4. When releasing, run `pnpm version-packages`: it bumps only the packages with a changeset, writes their `CHANGELOG.md` and deletes the used changesets. Commit it as exactly `[release] version packages`.
5. Log in to npm once (`npm login`, check with `npm whoami`).
6. Run `pnpm release`: `pnpm build`, `changeset publish` (publishes only versions not yet on npm and tags each `<package>@<version>`), then `git push --follow-tags`.
7. Check the tags on https://github.com/orukami/awaitio/tags. `changeset tag` and `changeset publish` create git tags only, not GitHub Releases.

Rules:

- A release is run by hand, never by Claude unasked. `commit-fast` never bumps versions, tags or publishes.
- No `release:all` any more: it published all packages every time. Do not use the per-package `release` scripts in `libs/*`, they skip tags and changelogs.
- Open question: the first breaking `minor` of the sdk makes Changesets bump the components to major, from 0.x straight to `1.0.0`. Recommended: accept it as the move to 1.0.
