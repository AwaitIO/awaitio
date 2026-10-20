# Commit rules (AwaitIO)

Extends the global `commit-fast` skill.

## Format

`[scope] lowercase concrete description`, no trailing period, English, single line.

## Scopes

- `[sdk]` – `libs/sdk` server, runtime, shared schemas
- `[ui]` – `libs/sdk/src/ui`
- `[demo]` – `apps/demo`
- `[input-text]`, `[input-textarea]`, `[input-datetime]` – the component packages in `libs/input-*`
- `[claude]` – `CLAUDE.md`, `PROGRESS.md`, `.claude/`, `docs/`
- `[eslint]`, `[typescript]`, `[gitignore]` – tooling
- Several packages: `[sdk,demo]`

## Precommit checks

- `pnpm lint`
- `pnpm tsc` (needs `pnpm build` once, the demo typechecks against `libs/sdk/dist`)
- `pnpm test`

### Docs and site stay in line with the commit

Runs before every commit, whatever is staged.

- Read **every** docs page (`apps/docs/**/*.mdx`, `docs.json`, its images' captions) and the homepage and component mocks of the site (`apps/site/src/app`, `apps/site/src/components`, especially `componentMocks/`) against the staged change.
- Look for anything the change makes wrong, outdated or missing: a renamed or removed API, option, component or prop; a new component, option or behaviour the docs or the site do not show yet; examples that would no longer run; screenshots or mocks that no longer match.
- **Make the fixes yourself straight away** in the working tree — do not just list them. Do **not** stage them.
- Then stop before committing: list each file you changed with one line on what and why, and ask the user to look them over. If they agree, they stage them and run `/commit-fast` again, so the docs and site changes land in **the same commit** as the code.
- When nothing needs changing, say so in one line and commit.
