# Documentation Guidelines

`apps/docs` is a Mintlify app (`pnpm --filter @awaitio/docs dev`, port 8070; `mint broken-links`). The edicek rules for the image-sync pipeline and the **WHY** concept do not apply here.

## Page layout

- English. Top level: `index`, `quickstart`, `how-it-works`, `deployment`, and `license` (license and pricing, in the Other group).
- `core/` – one page per option of `new AwaitIO` and `listen`.
- `io/` – one page per io method.
- `ctx/` – one page per part of `ctx`.
- Screenshots live in `images/`, see **Screenshots** below.

## Screenshots

Every image in `apps/docs/images` is taken from the demo (`apps/demo`) in a browser at locale en-US and 2×. A component is shot from its action in the demo's Components tab, which uses the props of the example on its docs page. Screens of the app (introduction, pages, routing) come from the demo's own tabs.

- **A component or a part of a form** (`io-*.png`, `components/*.png` and the like) is shown as a card: the element at its own size in a white card with rounded corners and a soft shadow, with gray space around it. The cards in the component grids are 600×375 with the element scaled to fit; the shot on a component's own page keeps the element at full size.
- **A whole screen** (introduction, a page, routing) keeps its full size, cut off below the content, in a browser window like `AppScreenshot` on awaitio.com: traffic lights, an address bar with the page's URL (`demo.awaitio.com/…`), rounded corners, a shadow and gray space around it. Never an image that touches its own edge.
- The alt text describes what the image shows now; change it in the same change as the image.

**Why**: the card with space around it reads as one component and looks the same in the grid and on the component's page, and the demo is what readers can open themselves.

## Pages describe what the code does

Docs are written in English and describe the behaviour of the current code, not the plan. Every number, default and name on a page (cookie name, lockout limits, session length, CLI command) is checked against `libs/sdk/src` when the page is written, and the page is updated in the same change that alters that behaviour.

## Missing media — no paths to files that are not there

A page must never reference an image or video that does not exist. A missing local path fails `mint broken-links` and a missing video renders as a broken player. Until the asset exists, describe the intended shot in a `<Note>` or leave the media out.

**Rule**: A committed page never points `src` at a file that is not in `apps/docs/`.

## Delete orphaned assets — no unreferenced files left behind

When a page is deleted or a reference to an asset is removed or repointed, the asset may become orphaned. Delete it when nothing else uses it.

**What to Check**: grep every `apps/docs/**/*.{mdx,json}` for the asset's path or basename (`grep -rn 'login-page' apps/docs`). Only with zero references is it orphaned.

**Failure Action**: If staged changes remove the last reference to an asset but leave the file in the tree, **ABORT** the commit and list each orphaned asset.

## Redirects for moved, renamed, or deleted pages

Changing a file's path in `apps/docs` changes its public URL. Whenever you rename a slug, move a file, restructure a folder, or delete a page that has a replacement, keep the old URL working with a redirect in the top-level `redirects` array of `docs.json`:

```json docs.json
"redirects": [
  { "source": "/old/path", "destination": "/new/path" }
]
```

- Redirects are permanent (308) by default; set `"permanent": false` for a temporary (307) one.
- Sources cannot include `#anchors` or `?query` params (destinations may include `#anchors`).
- Use wildcards (`/old/:slug*` → `/new/:slug*`) when a whole folder moves, and never create circular redirects.

**Also repoint every inbound link**: search every `apps/docs/**/*.mdx` for the old path (`grep -rn '/old/path' apps/docs`) and fix each match. Never leave an internal link pointing at a redirected or dead path.

**Precommit**: When staged changes delete or rename any `apps/docs/**/*.mdx`, show the user each **original path → proposed destination** to confirm before committing. Never invent a destination silently.

**Failure Action**: If a staged deletion or rename has no matching `redirects` entry in `docs.json`, **ABORT** the commit and present each original path with a proposed destination.

## Redirect destinations must point to a live page

**Precommit**: Check that every `destination` in `docs.json` `redirects` resolves to an existing `.mdx` under `apps/docs/` (excluding `snippets/`, ignoring a trailing `#anchor`).

**Failure Action**: If a destination points to a missing page, **ABORT** the commit, list each broken redirect (`source`, dead `destination`, proposed fix) and wait for the user to confirm the fix.
