# Common Code Guidelines

## Security Risk Assessment

- **MANDATORY**: Always review code for security vulnerabilities and data leaks
- **MANDATORY**: Alert the developer immediately if any security risks are identified
- Watch for these common security issues:
  - Data leaks between transactions or users outside their scope (one run must never see another run's state)
  - Hardcoded passwords, API keys, or tokens in code (EXCEPTION: root `.env` example files are allowed to contain placeholder values)
  - Passwords, password hashes, the session secret or session cookies leaking into logs, URLs, error messages or the UI bundle
  - Missing authentication checks on `/api` routes and component scripts (`createAuthMiddleware`) or missing cross-site request checks (`rejectCrossSiteRequests`)
  - Cross-site scripting (XSS) vulnerabilities, e.g. rendering action output as HTML
  - Insecure direct object references (a run id accepted without checking it exists and belongs to the session)
  - Improper error handling that exposes sensitive information (stack traces sent to the browser)
- When a security risk is found, stop the current task and immediately notify the developer
- Provide specific details about the vulnerability and suggested remediation

## Typo Checking

- Always check for typos in code, comments, and documentation
- Use spellchecking tools when available
- Pay special attention to variable names, function names, and API endpoints
- Ensure consistent spelling across the codebase
- For technical terms that might be flagged as typos, add them to the project's dictionary

## Critical Code Review

- **MANDATORY**: Be critically observant of all code changes and logic
- **MANDATORY**: Immediately alert the developer when spotting errors, inconsistencies, or potential bugs
- Watch for these common coding mistakes:
  - Wrong ID usage (e.g., using the action `slug` where a run id is expected)
  - Incorrect constant values or mismatched data types
  - Flawed logic or incorrect business rules implementation
  - Variable naming inconsistencies or typos
  - Missing error handling or edge cases (canceled run, disconnected page, invalid response)
  - Incorrect function parameters or return types
  - Data flow issues or scope violations (`libs/sdk` importing from `apps/`, server-only code pulled into the UI bundle, impure `validate` / `initialValue` that also run in the browser)
- When an error is found, stop the current task and immediately notify the developer
- Provide specific details about the mistake and suggest corrections
- Don't assume the developer intended the error - always point it out

## Code Comments

- Do not use `// TODO` comments in the codebase
- Instead of adding TODOs, record open work in `PROGRESS.md`
- If temporary notes are needed during development, remove them before committing
- Comments are in English
- Use meaningful and explanatory comments where necessary
- Comments should explain "why" rather than "what" the code is doing

## Roadmap

- Possible future improvements go to `roadmap/` in the repository root, one Markdown file per idea, in English, listed with one line in `roadmap/README.md`.
- A file says what the situation is today, the idea, how it could work, its trade-offs and the work it takes, so it can be picked up later without the conversation it came from.
- When an idea ships or is dropped, delete its file and its line in `roadmap/README.md`.
- Open work on something already being built stays in `PROGRESS.md`, not in `roadmap/`.

## Dependency Management

- **MANDATORY**: Always verify package usage when modifying dependencies
- When removing a dependency from package.json, check if the package is still used anywhere in the codebase
- When adding a dependency to package.json, verify that it's actually needed and used
- Alert the developer if:
  - A dependency is removed but still being used in code (will cause runtime errors)
  - A dependency is added but not actually used (creates unnecessary bloat)
  - A dependency version conflicts with existing packages
  - A published package (`awaitio`, `@awaitio/input-*`) imports something it does not declare (dependency or peerDependency)
- Use search tools (Grep, Glob) to scan the codebase for import statements and usage patterns
- Check both direct imports and transitive dependencies that might be affected

## Test Snapshots

- When test snapshots are updated, always verify that the changes are correct
- Don't blindly accept snapshot updates - review them to ensure they reflect intended behavior changes
- If a snapshot change reveals an unintended bug, fix the code rather than updating the snapshot
- Check that snapshot updates are consistent with the changes made to the code

## Function Parameters and Types

- **MANDATORY**: Always load and verify function signatures before using any function
- For functions from node_modules: Read the corresponding TypeScript types to understand all available parameters
- For functions from the project codebase: Always read the function implementation to understand its parameters and behavior
- If any required parameter is missing when calling a function, propose adding it before proceeding
- Never assume function parameters or behavior - always verify by reading the actual implementation or types
- Use Read tool to examine function definitions and their parameter requirements
- Pay special attention to optional vs required parameters and their correct types

## Package Manager

- **MANDATORY**: Use `pnpm` as the package manager for this project (Node 22.14.0)
- **FORBIDDEN**: Do not use `npm`, `yarn`, or any other package managers
- All package installations, updates, and removals must be done through `pnpm`
- Use `pnpm install` instead of `npm install`
- Use `pnpm add` instead of `npm install <package>`
- Use `pnpm remove` instead of `npm uninstall`
- Always respect the `pnpm-lock.yaml` file and never create `package-lock.json` or `yarn.lock`

## No Interval in the project rules

- `CLAUDE.md` and everything in `.claude/` describe AwaitIO on its own terms. They never mention Interval: not as the product AwaitIO replaces, not as a model to copy ("as in Interval"), not as a source of a rule.
- State the rule or the behaviour itself instead.

## Changesets only from staged changes

- A `.changeset/*.md` is written only by `/commit-fast` (or on an explicit request), from what is staged. Never write one while the work is still in progress in the working tree.
- Why: a changeset describes a commit; written ahead of time it goes stale, names the wrong packages or ends up committed with unrelated work.
- ✅ DO: finish the change, leave it unstaged, and let `/commit-fast` write the changeset for the staged diff.
- ❌ DON'T: run `pnpm changeset` or create `.changeset/*.md` by hand as part of a change, even when a guideline lists a changeset among the places to update.
