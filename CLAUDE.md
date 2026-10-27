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
- `.claude/guidelines/changelog.md` – `apps/docs/changelog.mdx`: written at release time, grouped by scope, migration guides.
- `.claude/guidelines/demo.md` – `apps/demo`: the made-up data, no Czech names.
- `.claude/guidelines/site.md` – `apps/site`: static export build, marketing copy.
- `.claude/guidelines/tweets.md` – `.claude/tweets/`: posts for X, file names, text and media.
- `.claude/guidelines/license.md` – every place the license and prices are written, changed together.
- `.claude/guidelines/final-banner.md` – the shape of the closing banner a command ends its run with.
- `.claude/workbench.md` – how the review workbench groups changes.

## Repository map

- `libs/sdk/` – the framework, npm `awaitio` (+ `awaitio/client`, `awaitio/ui`, `awaitio/vite`). Never imports from `apps/`. See `sdk.md`.
- `libs/input-*/`, `libs/select-*/`, `libs/display-*/`, `libs/confirm/`, `libs/layout-basic/` – one io component per package, npm `@awaitio/*`. See `components.md`.
- `LICENSE` – the one license file. `pnpm build` (via `pnpm copy-license`, `scripts/copyLicense.mjs`) copies it into every package in `libs/` so npm ships it; the copies are gitignored, edit only the root one.
- `libs/theme-default/` – the default theme (`@awaitio/theme-default`), the look of the `awaitio/ui` blocks.
- `apps/docs/` – documentation in Mintlify, English. See `documentation.md`.
- `apps/site/` – awaitio.com in Next.js as a **static export** (`output: 'export'`; `pnpm --filter @awaitio/site build` writes `apps/site/out/`). The export lives in git and is always committed on its own as `[site] static export`, only by `/prepare-release` on `main`.
- `.claude/tweets/` – the posts for the AwaitIO account on X, queued and posted. See `tweets.md`.
- `roadmap/` – possible future improvements, one Markdown file per idea, listed in `roadmap/README.md`.
- `reference/` – read-only clones of related open-source projects, gitignored.
- `apps/demo/` – the public demo at demo.awaitio.com: the backoffice of a made-up store platform, built like a client project, with a Prisma-like `db` over made-up rows that saves nothing. Deployed from `.do/awaitio-demo.yaml`.

## Versions and releases

Every package in `libs/` has its own version, and Changesets manages them (`.changeset/`). Major and minor are the same for every package and follow `awaitio`, so `@awaitio/*@1.1.x` goes with `awaitio@1.1.x`:

- `awaitio` follows semver: `patch` for a fix, `minor` for a new feature, `major` for a breaking change.
- A component or theme raises only the last number for any change of its own, a fix or a new feature (`patch`).
- When `awaitio` goes up a minor or a major, every other package goes up with it in the same release; `/prepare-release` writes that changeset. A breaking change in a component is a `major` for every package.

How to release (steps 4 to 7 start with [`/prepare-release`](./.claude/commands/prepare-release.md) on a clean `main`: install, build, site export, missing changesets, the changelog entry, then the list of what to run next):

1. Change a published package and run `pnpm changeset`: pick the packages and the bump by the rules above, one English line for the changelog. It writes `.changeset/<name>.md`.
2. Commit the changeset together with the change (`/commit-fast` writes a missing one and stops for review).
3. Collect as many changesets as you like across packages.
4. When releasing, first add the release to `apps/docs/changelog.mdx` from the changesets and commits since the last release (see `changelog.md`), then run `pnpm version-packages`: it bumps only the packages with a changeset, writes their `CHANGELOG.md` and deletes the used changesets. Commit both as exactly `[release] version packages`.
5. Log in to npm once (`npm login`, check with `npm whoami`).
6. Run `pnpm release`: `pnpm build`, `changeset publish` (publishes only versions not yet on npm and tags each `<package>@<version>`), then `git push --follow-tags`.
7. Check the tags on https://github.com/awaitio/awaitio/tags. `changeset tag` and `changeset publish` create git tags only, not GitHub Releases.

Rules:

- A release is run by hand, never by Claude unasked. `commit-fast` never bumps versions, tags or publishes.
- No `release:all` any more: it published all packages every time. Do not use the per-package `release` scripts in `libs/*`, they skip tags and changelogs.
- Every release is listed in `apps/docs/changelog.mdx` with a collapsed migration guide, written when the release is cut, never in an ordinary commit. See `changelog.md`.
