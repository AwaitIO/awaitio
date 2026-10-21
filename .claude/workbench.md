# Code Review Workbench rules for awaitio

Builds on the rule in `CLAUDE.md`: each component gets its own section (`component-<package>`), and a feature's documentation belongs to its group.

## Steps of each group

A group (task) with more than a few files always has its steps in this order, and each file belongs to exactly one of them. A step with no files is left out:

1. **SDK: <feature>** — changes in `libs/sdk/` split by the feature they touch (e.g. "SDK: login", "SDK: environment", "SDK: actions from a folder"), not by layer. Each SDK feature is its own step. Inside a step, files go from types through the core and http to the client, UI and CLI, with tests last.
2. **<component>** — one step per component, named after the package: `libs/<component>/` (input-text, select-table, theme-default…) and `apps/demo/components/<component>/`
3. **Documentation** — `apps/docs/` and `docs/`, README and other .md files
4. **Site** — `apps/site/`, always its own step
5. **Other** — demos (`apps/demo*`), root config, lockfile, `.claude/`

A feature's documentation is the Documentation step in its group, not a separate "Docs: …" group. A separate docs group is only for documentation changes without code.
