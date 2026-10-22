# io Component Guidelines

Rules for the io component packages: `libs/input-*`, `libs/select-*`, `libs/display-*`, `libs/confirm`, `libs/layout-basic`. They win over the general React and TypeScript guidelines. `libs/theme-default` is a theme, not an io component, and has its own blocks and CSS.

## One package, one definition file

- One io component per package. Its definition is one `src/<name>.tsx` (`inputText.tsx`) with `defineComponent({ props, returns, initialValue, validate, component, wrap? })`. Displays use `defineDisplay`, layouts `defineLayout`.
- No `methodName`. A component is identified by the key it is registered under (see Registration).
- The `component` is written inline in the definition and typed by `defineComponent`: no separate `Props` type, no `FC` annotation, no extra component file.
- Helpers the definition imports may live next to it: `src/schemas/`, `src/utils/`, `src/types/`.

## Schemas

- `props` and `returns` schemas are written inline in the definition, never in a separate file or in `constants`.
- Exception: a schema the component uses more than once goes to `src/schemas/<name>Schema.ts` (`isoDatetimeSchema` in input-datetime, `isoDateSchema` in input-date).

## Drawing

- `component` draws only the control, built from the `awaitio/ui` blocks (`Input`, `Textarea`, `Select`, `Field`, `Hint`…). Label, help text and error come from the SDK (`Field`).
- No own CSS. The look comes from the active theme package.

## Browser and server halves

- `vite.config.mts` is `componentBuildConfig({ root, entry, exportName })` from `awaitio/vite`. It builds the browser half into `dist/ui/ui.js`; `defineComponent` finds that file from the folder of the definition.
- `initialValue` also runs in the browser and must be pure.
- `validate` is bundled into the browser script but only the server calls it, so the browser cannot skip the check of an answer.

## Registration

- Components are registered only as an object: `new AwaitIO({ components: { … } })`. The key is the name in `io` (`input.text`) and the `type` of the component on the wire.
- No chained `.register()` (types could only be inferred while chaining); the object is the API.

## New component

Copy `libs/input-text`, rename the package, the folder and the file, then change the one `.tsx`: schemas, `validate`, `component`. Add a `README.md` for its npm page; its version is set as below.

## A new component starts at the version of the SDK

A new package in `libs/` gets the current version of `libs/sdk/package.json` in its `package.json`, without a changeset of its own. When the release also raises the minor or major of `awaitio`, the changeset `/prepare-release` writes for every package moves the new one with it, so it comes out at the same major and minor as `awaitio`. Its line in `apps/docs/changelog.mdx` names the version it comes out at.

**Why**: a new component is released as a version that matches the SDK it was written for, so nobody wonders which `awaitio` a `0.1.0` component belongs to.

✅ DO: SDK `1.0.0`, new `@awaitio/select-single-native` with `"version": "1.0.0"` and no changeset.

❌ DON'T: start it at `0.0.0` and add a `minor` changeset that releases it as `0.1.0`.
