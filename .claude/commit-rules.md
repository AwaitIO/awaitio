# Commit rules (AwaitIO)

Extends the global `commit-fast` skill.

## Format

`[scope] lowercase concrete description`, no trailing period, English, single line.

## Scopes

- `[sdk]` – `libs/sdk` server, runtime, shared schemas
- `[ui]` – `libs/sdk/src/ui`
- `[demo]` – `apps/demo`
- `[docs]` – `apps/docs`
- `[site]` – `apps/site`; its static export `apps/site/out/` always as `[site] static export`
- `[input-text]`, `[input-textarea]`, `[input-datetime]` – the component packages in `libs/input-*`
- `[claude]` – `CLAUDE.md`, `PROGRESS.md`, `.claude/`, `docs/`
- `[release]` – the commit `pnpm version-packages` makes (versions, `CHANGELOG.md`, used-up `.changeset/*.md`), always exactly `[release] version packages`
- `[eslint]`, `[typescript]`, `[gitignore]` – tooling
- Several packages: `[sdk,demo]`

## Site export (`apps/site/out/`)

The site is a static export that lives in git (see `CLAUDE.md`). The generated `out/` is committed on its own, never mixed with source changes.

- After a site change is committed, run `pnpm --filter @awaitio/site build` and commit `apps/site/out/` alone.
- That commit's message is always exactly `[site] static export`, whatever changed.
- A commit that mixes `out/` with other files is split: the source change with its own message, then `out/` as `[site] static export`.

## Changesets

Every published package in `libs/` has its own version, managed by Changesets (`.changeset/README.md`).

- When the staged change touches a published package's code or its public behaviour (not just tests, a README or comments), a `.changeset/*.md` naming that package must be staged too.
- Missing one: write it yourself in the working tree (`patch` for anything compatible, `minor` for a breaking change, one English line for the changelog), do **not** stage it, show it to the user and stop, the same way as the docs check below.
- Never tag, bump versions or publish from this command. Releases are `pnpm version-packages` and `pnpm release`, run by the user.

## Precommit checks

- `pnpm lint`
- `pnpm tsc` (needs `pnpm build` once, the demo typechecks against `libs/sdk/dist`)
- `pnpm test`

### Docs, site and READMEs stay in line with the commit

Runs before every commit, whatever is staged.

- Read **every** docs page (`apps/docs/**/*.mdx`, `docs.json`, its images' captions), the homepage and component mocks of the site (`apps/site/src/app`, `apps/site/src/components`, especially `componentMocks/`), the root `README.md` and the `README.md` of every package the staged change touches (`libs/<package>/README.md`, the page npm shows) against the staged change.
- Look for anything the change makes wrong, outdated or missing: a renamed or removed API, option, component or prop; a new component, option or behaviour the docs, the site or a README do not show yet; examples that would no longer run; screenshots or mocks that no longer match.
- **Make the fixes yourself straight away** in the working tree — do not just list them. Do **not** stage them.
- Then stop before committing: list each file you changed with one line on what and why, and ask the user to look them over. If they agree, they stage them and run `/commit-fast` again, so the docs, site and README changes land in **the same commit** as the code.
- When nothing needs changing, say so in one line and commit.
