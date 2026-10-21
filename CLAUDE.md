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

## Worktrees

Several conversations work on the repository at once, each in its own git worktree next to the repo: `/Users/homoky/Developer/awaitio.worktrees/<name>`. Worktrees are created and removed only through the commands below, never by hand and **never with the built-in `EnterWorktree` tool**, which puts the worktree in `.claude/worktrees/` (gitignored, so VS Code does not see it as a repository) and pins the session to a path that stops existing once it is moved.

- **Create**: [`/create-worktree`](./.claude/commands/create-worktree.md). Names the worktree after the conversation, copies `.env`, installs and builds `libs/` in the background, switches the VS Code workspace to it and puts the `[worktree]` prefix on the chat name.
- **Status**: `/worktree-status` (global skill, `~/.claude/skills/worktree-status`). What this conversation did, how the branch stands against `main`, whether it can be deleted. `/commit-fast` prints it after every commit.
- **Rebase**: [`/rebase-main`](./.claude/commands/rebase-main.md). Puts the branch on top of the current `main` and resolves the conflicts.
- **Merge**: [`/merge-worktree-to-main`](./.claude/commands/merge-worktree-to-main.md). Rebases, merges into `main` with all commits and verifies; the worktree stays. Run only when the user asks for it, like every commit.
- **Delete**: [`/delete-worktree`](./.claude/commands/delete-worktree.md). Only when nothing is uncommitted and everything is on `main`; removes the worktree, its branch and its workspace entry together and switches its chats back to `[main]`.
- **Editor view**: [`/switch-workspace`](./.claude/commands/switch-workspace.md) `[<name> | main | all]`. Points `/Users/homoky/Developer/awaitio.code-workspace` at one checkout or all of them.
- **Close a chat**: `/archive-chat` (global command). Removes the conversation from the job list and keeps its transcript (`claude --resume <sessionId>`).

### Where do I work: create the worktree, don't ask

**Writing to the main checkout is forbidden by default.** Before a conversation's first change to any file (code, docs, config, `CLAUDE.md`, `.claude/`), run `/create-worktree` silently, say the worktree path and branch in one line and go straight on with the work through **absolute paths** into the worktree. The session itself stays in the main checkout; that is a technical detail, not a licence to write there.

- Read-only work (questions, search, analysis, reviews) never gets a worktree.
- Already in a worktree and the subject has not moved on: keep working there.
- Writing on `main` needs the user's explicit words in the current conversation ("do it on main"). It covers that conversation's work and never carries over to the next one. Naming a file is not that permission.
- **The subject moved on inside an existing worktree**: ask, in the language of the conversation:

  ```
  I'm working in /Users/homoky/Developer/awaitio.worktrees/<name> (branch <name>).

  1. Rename the worktree, branch and chat to <new topic> and continue here
  2. Create a new worktree for <new topic> and make the changes there
  3. Continue here under the current name
  ```

  Option 1 moves worktree, branch, VS Code workspace entry and chat name together, never one of them alone. Option 2 is `/create-worktree` with the current worktree left untouched.

## Chat naming

Every chat is named `[worktree] what it is about`: the worktree's directory name, `[main]` without one, then a short lowercase English description of the goal. The full rules are in [`/rename-chat`](./.claude/commands/rename-chat.md).

- **Never change a name the user set.** Only its `[worktree]` prefix is kept current.
- A wrong `[worktree]` prefix is always fixed straight away (new worktree, renamed or deleted worktree).
- Rename the description only when the subject has actually moved on, silently, at most once per conversation, mentioned in one line at the end of a reply.

## Guidelines

Read the guideline before working in its area:

- `.claude/guidelines/common.md` – security review and typo checks, for every change.
- `.claude/guidelines/typescript.md` – TypeScript: exports, one symbol per file, naming, constants, env.
- `.claude/guidelines/react.md` – React: SPA, uikit blocks, component names.
- `.claude/guidelines/validations.md` – zod schemas: where they live, string rules.
- `.claude/guidelines/sdk.md` – layout of `libs/sdk`, wire names (`run`, `step`), in-memory state.
- `.claude/guidelines/components.md` – io component packages: one definition file, inline schemas, drawing with `awaitio/ui`, registration, new component.
- `.claude/guidelines/documentation.md` – `apps/docs`: page layout, screenshots, media.
- `.claude/guidelines/demo.md` – `apps/demo`: the made-up data, no Czech names.
- `.claude/guidelines/site.md` – `apps/site`: static export build, marketing copy.
- `.claude/guidelines/license.md` – every place the license and prices are written, changed together.
- `.claude/guidelines/final-banner.md` – the closing banner of `/delete-worktree`.
- `.claude/workbench.md` – how the review workbench groups changes.

## Repository map

- `libs/sdk/` – the framework, npm `awaitio` (+ `awaitio/client`, `awaitio/ui`, `awaitio/vite`). Never imports from `apps/`. See `sdk.md`.
- `libs/input-*/`, `libs/select-*/`, `libs/display-*/`, `libs/confirm/`, `libs/layout-basic/` – one io component per package, npm `@awaitio/*`. See `components.md`.
- `LICENSE` – the one license file. `pnpm build` (via `pnpm copy-license`, `scripts/copyLicense.mjs`) copies it into every package in `libs/` so npm ships it; the copies are gitignored, edit only the root one.
- `libs/theme-default/` – the default theme (`@awaitio/theme-default`), the look of the `awaitio/ui` blocks.
- `apps/docs/` – documentation in Mintlify, English. See `documentation.md`.
- `apps/site/` – awaitio.com in Next.js as a **static export** (`output: 'export'`; `pnpm --filter @awaitio/site build` writes `apps/site/out/`). The export lives in git and is always committed on its own as `[site] static export`.
- `roadmap/` – possible future improvements, one Markdown file per idea, listed in `roadmap/README.md`.
- `reference/` – read-only clones of related open-source projects, gitignored.
- `apps/demo/` – the public demo at demo.awaitio.com: the backoffice of a made-up store platform, built like a client project, with a Prisma-like `db` over made-up rows that saves nothing. Deployed from `.do/awaitio-demo.yaml`.

## Versions and releases

Every package in `libs/` has its own version. Changesets manages them (`.changeset/`).

How to release:

1. Change a published package and run `pnpm changeset`: pick the packages, `patch` or `minor`, one English line for the changelog. It writes `.changeset/<name>.md`.
2. Commit the changeset together with the change (`/commit-fast` writes a missing one and stops for review).
3. Collect as many changesets as you like across packages.
4. When releasing, run `pnpm version-packages`: it bumps only the packages with a changeset, writes their `CHANGELOG.md` and deletes the used changesets. Commit it as exactly `[release] version packages`.
5. Log in to npm once (`npm login`, check with `npm whoami`).
6. Run `pnpm release`: `pnpm build`, `changeset publish` (publishes only versions not yet on npm and tags each `<package>@<version>`), then `git push --follow-tags`.
7. Check the tags on https://github.com/awaitio/awaitio/tags. `changeset tag` and `changeset publish` create git tags only, not GitHub Releases.

Rules:

- A release is run by hand, never by Claude unasked. `commit-fast` never bumps versions, tags or publishes.
- No `release:all` any more: it published all packages every time. Do not use the per-package `release` scripts in `libs/*`, they skip tags and changelogs.
- Open question: the first breaking `minor` of the sdk makes Changesets bump the components to major, from 0.x straight to `1.0.0`. Recommended: accept it as the move to 1.0.
