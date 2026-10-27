# Tweet Guidelines

`.claude/tweets/` holds the posts for the AwaitIO account on X (https://x.com/heyawaitio), queued and posted. One file per tweet, its media next to it. The rules for them live here, not in a `CLAUDE.md` inside that folder.

## Files

- A tweet in the queue is `🟠<number>-<slug>.md`. The number is the order to post in.
- Once posted it is renamed to `YYYY-MM-DD-HH-MM-<slug>.md`, the date and time it went out. Take the time from the post or from `date`, never guess it.
- Media that exists only for the tweet has the tweet's name: `<name>.mp4`, `<name>.png`. Media that already lives in the repo (the README images in `.github/readme/`) is referenced by its path, not copied.
- The 4K masters of videos stay outside the repo. Only the MP4 that was posted is kept here.
- The `.md` holds the text exactly as it is posted, ready to copy and paste. Media is a line `[video] <path>` or `[image] <path>` under the post it belongs to.
- A tweet with only media holds just that line.

## Text

- English, plain text, no Markdown.
- **AwaitIO** always written this way, never "Await IO" or "Awaitio".
- Each post fits in 280 characters (a URL counts as 23). The account has no Premium.
- Code goes into an image, not into the text: X breaks the formatting.
- No dotted API names in the text (`io.select.single`, `app.listen`): X reads them as web addresses and turns them into links, because `.select`, `.app` and many others are real domains. Name the feature in plain words, the exact name goes into the image.
- Single posts by default. A thread is the exception, for a launch or a release worth several posts; its posts are separated by `-----` in one file.
- A link goes into the last post of a thread or into a reply under a single post, never into the first post: X shows posts with links to fewer people.
- A link reply is a full sentence that says what is behind the link, ending with a period, then a blank line and the URL alone on its own line. The blank line keeps the URL apart from the sentence on X. No colon before the URL: ✅ `The full list of changes in 1.1 is in the docs.` + blank line + URL, ❌ `Everything in 1.1: <URL>`, ❌ the URL straight on the next line.
- Bullet lists use `•` and follow their lead-in line directly, with no blank line between.

## Voice

- Who reads it: developers who build admin screens and internal tools for their team.
- The position: just code. Write a TypeScript function, get an admin screen. No drag-and-drop, no low-code editor.
- AwaitIO runs on the user's own servers. Never write that it runs inside their product or their app.
- Plain words a newcomer understands. One line of what the team sees beats an adjective.
- No hype ("thrilled to announce", "game-changing"), no fake urgency, at most one emoji.

## A tweet with every release

Every release gets a tweet, written together with the changelog entry and `discord.md`, without being asked (`/prepare-release` does it). It is a thread of two posts, like the 1.0 and 1.1 ones: the first says `AwaitIO <major>.<minor> is out.` and lists what a user notices as `•` bullets, with the release image from the changelog under it; the second is the link reply to the docs changelog.

- The image is a copy of the changelog's `apps/docs/images/changelog/<version>.png`, saved next to the tweet under the tweet's name (`<name>.png`) and renamed with it when it is posted. It is the exception to referencing repo media by its path, so the tweet folder holds everything that went out.
- In the queue it is `🟠<number>-release-<major>-<minor>.md`; once the user posts it, it is renamed to `YYYY-MM-DD-HH-MM-release-<major>-<minor>.md`.

**Why**: the release is announced on X like on Discord; a tweet written from the same entry needs no second round of asking.

✅ DO: write the tweet in the same step as `discord.md`.

❌ DON'T: leave the release tweet out because nobody asked for it.
