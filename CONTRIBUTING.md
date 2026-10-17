# Contributing to AwaitIt

Thanks for helping. Bug reports, ideas and pull requests are all welcome.

## Bug fixes

Found a bug and know how to fix it? Open a pull request with the fix and a test that fails without it. For a bug you cannot fix yourself, open an issue with the exact error message, the steps to reproduce it, and your AwaitIt, Node and browser versions.

## New features and extensions: describe them first

For a new feature, a new component or any change to how AwaitIt works, please do not start with code. Open an issue and describe **what** you want and **why**, in as much detail as you can. A clear description is easier to fit into the design of AwaitIt than a finished pull request, and it never goes to waste.

A good feature issue says:

- **What you want to do**, from your point of view: the tool you are building and where AwaitIt gets in the way.
- **The code you would like to write**: the action as you imagine it, even if that API does not exist yet.
- **What the person in the browser should see** and do, step by step. A sketch or a screenshot helps.
- **Why it matters**: how often you need it and what you do in the meantime.

Long is fine. The more concrete the issue, the sooner it gets done.

## Contributor License Agreement

The first time you open a pull request, a bot asks you to sign the [CLA](CLA.md) with one comment. It lets AwaitIt stay under its [license](LICENSE) and be offered commercially, including your part; you keep the copyright.

## Setup

Requires Node 22.14 and pnpm.

```bash
pnpm install
cp .env.example .env   # SESSION_SECRET, DEMO_USER_EMAIL, DEMO_USER_PASSWORD_HASH
pnpm hash-password     # hash for DEMO_USER_PASSWORD_HASH
pnpm dev               # demo server at http://localhost:3000
```

The documentation runs with `pnpm --filter @awaitit/docs dev` on http://localhost:8070.

## Repository

- `libs/sdk` – the `awaitit` package: server, action runtime, UI, `defineComponent`, the CLI
- `libs/input-*` – one `io` component per package, each in a single `.tsx` file
- `apps/demo` – an example server with demo actions and a custom component
- `apps/docs` – the documentation (Mintlify)

## Before you push

- Keep each pull request to one change, with a test when it changes behaviour.
- Run `pnpm test`, `pnpm lint` and `pnpm tsc` before pushing.
- Code style: named exports, `type` rather than `interface`, one exported symbol per file, Prettier with single quotes. ESLint enforces most of it.
- Update the documentation in `apps/docs` when you change what users see or configure.
- Commit messages: `[scope] lowercase concrete description`, e.g. `[sdk] reject empty project names`.
