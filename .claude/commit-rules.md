# Commit rules (AwaitIO)

Extends the global `commit-fast` skill.

## Format

`[scope] lowercase concrete description`, no trailing period, English, single line.

## Scopes

- `[sdk]` – `libs/sdk` server, runtime, shared schemas
- `[ui]` – `libs/sdk/src/ui`
- `[docs]` – `apps/docs`
- `[site]` – `apps/site`; its static export `apps/site/out/` always as `[site] static export`
- `[input-text]`, `[input-textarea]`, `[input-datetime]` – the component packages in `libs/input-*`
- `[claude]` – `CLAUDE.md`, `.claude/`
- `[release]` – the commit `pnpm version-packages` makes (versions, `CHANGELOG.md`, used-up `.changeset/*.md`), always exactly `[release] version packages`
- `[eslint]`, `[typescript]`, `[gitignore]` – tooling
- Several packages: `[sdk,docs]`

## Site export (`apps/site/out/`)

The site is a static export that lives in git (see `CLAUDE.md`). The generated `out/` is committed on its own, never mixed with source changes.

- After a site change is committed, run `pnpm --filter @awaitio/site build` and commit `apps/site/out/` alone.
- That commit's message is always exactly `[site] static export`, whatever changed.
- A commit that mixes `out/` with other files is split: the source change with its own message, then `out/` as `[site] static export`.

## Changesets

Every published package in `libs/` has its own version, managed by Changesets (`.changeset/README.md`).

- When the staged change touches a published package's code or its public behaviour (not just tests, a README or comments), a `.changeset/*.md` naming that package must be staged too.
- A new package released at its first version, the version of the SDK, gets no changeset (`.claude/guidelines/components.md`).
- Missing one: write it yourself (`patch` for a fix, `minor` for a new compatible feature, `major` for a breaking change, one English line for the changelog), stage it together with the change and commit; name it in the report. This is the one file `/commit-fast` stages on its own.
- Only packages in `libs/` get changesets. `apps/site`, `apps/demo` and `apps/docs` are private, never published, and never named in a changeset; a commit that touches only them needs none.
- A changeset describes only what is staged (`git diff --cached`): its packages and its changelog line come from the staged diff, never from changes still only in the working tree. Unstaged work gets its own changeset when it is committed.
- File name: `YYYY-MM-DD-HHMM_<packages>_<what>.md`, e.g. `2026-10-21-1542_sdk_header-title-and-logout-button.md`. Packages by their folder in `libs/` (`sdk` for `awaitio`, `input-text` for `@awaitio/input-text`), comma-separated (`sdk,input-text`), or `all` when every package is in it; `<what>` in kebab-case. No brackets: the shell reads `[…]` as a pattern. Inside the file the packages keep their npm names (`'awaitio'`, `'@awaitio/input-text'`), or Changesets does not find them. Changesets reads any `.md` name, so files sort by the time they were written.
- Never edit `apps/docs/changelog.mdx` in an ordinary commit; it is written only in `[release] version packages` (`.claude/guidelines/changelog.md`).
- Never tag, bump versions or publish from this command. Releases are `pnpm version-packages` and `pnpm release`, run by the user.

## Precommit checks

- `pnpm lint`
- `pnpm tsc` (needs `pnpm build` once, the packages typecheck against `libs/sdk/dist`)
- `pnpm test`

### Nothing private leaks into the public repository

Runs before every commit, whatever is staged. The repository is public on GitHub and the packages on npm: whatever is committed is out for good, even when a later commit removes it.

- Go through **the whole** staged diff (`git diff --cached`, every file, every line, new files in full) and the commit message. Open staged images (screenshots, media) and look at them too.
- Look for:
  - **Secrets**: API keys, tokens, passwords, private keys, session secrets, cookies, connection strings, `.env` files with real values, `npm` or cloud credentials, secrets in deploy specs (`.do/*.yaml` names a secret, it never holds its value). Placeholders in example `.env` files are fine.
  - **Other projects**: names, links, code, paths or data from other projects, clients or employers; anything taken from `reference/` (it stays local, so a path into it or code copied from it does not belong in the repository).
  - **Competitors**: any product that does what AwaitIO does, named, linked, compared or used as a model ("like X", "unlike X", "inspired by X"), in code, comments, docs, site copy, roadmap, changesets, `CLAUDE.md`, `.claude/` or the commit message.
  - **Links** to anything but AwaitIO's own places (`awaitio.com`, `demo.awaitio.com`, `github.com/awaitio`, the npm packages) and the docs of a dependency the code really uses.
  - **Personal and local details**: private email addresses and phone numbers, absolute local paths (`/Users/…`), machine names, internal hostnames and IP addresses, real people's names and data (the demo uses only made-up data, see `demo.md`). In screenshots also browser tabs, bookmarks, notifications and other windows.
- When anything is found: **do not commit**. List each finding as `file:line` with what it is and a suggested fix, and wait for the user. A real secret that was ever committed or pushed is rotated, not just deleted.
- When nothing is found, say so in one line and go on.

### Docs, site and READMEs stay in line with the commit

Runs before every commit, whatever is staged.

- Read **every** docs page (`apps/docs/**/*.mdx`, `docs.json`, its images' captions), the homepage and component mocks of the site (`apps/site/src/app`, `apps/site/src/components`, especially `componentMocks/`), the root `README.md` and the `README.md` of every package the staged change touches (`libs/<package>/README.md`, the page npm shows) against the staged change.
- Look for anything the change makes wrong, outdated or missing: a renamed or removed API, option, component or prop; a new component, option or behaviour the docs, the site or a README do not show yet; examples that would no longer run; screenshots or mocks that no longer match.
- **Make the fixes yourself straight away** in the working tree — do not just list them. Do **not** stage them.
- Then stop before committing: list each file you changed with one line on what and why, and ask the user to look them over. If they agree, they stage them and run `/commit-fast` again, so the docs, site and README changes land in **the same commit** as the code.
- When nothing needs changing, say so in one line and commit.
