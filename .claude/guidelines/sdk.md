# SDK Guidelines

How `libs/sdk` (npm `awaitio`) is laid out. The SDK never imports from `apps/`.

## Folders in `libs/sdk/src/`

- `AwaitIO.ts` – the `AwaitIO` class; `defineComponent.ts`, `defineDisplay.ts`, `defineLayout.ts`, `defineTheme.ts` next to it.
- `shared/` – zod schemas (`shared/schemas/<name>Schema.ts`) and their inferred types (`shared/types/<Name>.ts`), used by both the server and the UI.
- `classes/` – `Action`, `Page`, `IOPromise` (lazy thenable), `IOGroupPromise`, `Run` (one run: `execute`, `respond`, `cancel`), `RunManager` (in memory, cancels on disconnect, cleans up), `Sessions`, `LoginLimiter`, `IOError`.
- `io/`, `http/`, `utils/`, `types/` – one thing per file.
- `ui/` – the React SPA, built into `dist/ui` and served by the server. It loads component, display, layout and theme scripts at runtime (`componentUiRegistry` and the other registries) and exposes React and the registries to them on `window.__AWAITIO__` (`client/hostGlobalName.ts`).
- `client/` – `awaitio/client` (`registerComponentUi`, `registerDisplayUi`, `registerLayoutUi`, `registerThemeUi`, `ComponentUiProps`), called by the built component scripts. Built separately as ESM into `dist/esm` (`tsconfig.client.json`).
- `uikit/` – `awaitio/ui`: only the **contract** of the blocks (prop types of `Field`, `Label`, `Input`, `Button`, `Card`, `Table`…) and proxies that draw the block from the active theme (`window.__AWAITIO__.ui`) at runtime, plus core helpers (`FieldContext`/`useFieldId`, `navigateTo`, `formatCellValue`). The theme package supplies the look.
- `libs/sdk/vite/componentBuildConfig.mjs` – `awaitio/vite`: the Vite config that builds a component's UI script.

## Wire names

- A run is `run`: `runId`, `RunState`, `/api/runs/:id`.
- A step is `step`: `stepId`, `index` from 1, `components`, `errors[]` per field, `message` for the whole step.
- A component in a step carries `type`, the path of its key in the registry (`input.textarea`).

## State

All state is in memory. A restart kills running actions, on purpose.
