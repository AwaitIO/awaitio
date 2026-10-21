# Changesets

Every package in `libs/` has its own version. A change to a published package comes with a changeset: `pnpm changeset`, pick the packages, the bump and one line for the changelog, commit the file with the change.

- `patch` – anything compatible: fixes, new options, new components. Most changes.
- `minor` – a breaking change (we are below 1.0).

Release: `pnpm version-packages` (bumps the versions, writes `CHANGELOG.md`, commit it as `[release] version packages`), then `pnpm release` (build, publish what is new, tag `<package>@<version>`, push the tags).
