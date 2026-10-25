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
- Single posts by default. A thread is the exception, for a launch or a release worth several posts; its posts are separated by `-----` in one file.
- A link goes into the last post of a thread or into a reply under a single post, never into the first post: X shows posts with links to fewer people.
- Bullet lists use `•` and follow their lead-in line directly, with no blank line between.

## Voice

- Who reads it: developers who build admin screens and internal tools for their team.
- The position: just code. Write a TypeScript function, get an admin screen. No drag-and-drop, no low-code editor.
- AwaitIO runs on the user's own servers. Never write that it runs inside their product or their app.
- Plain words a newcomer understands. One line of what the team sees beats an adjective.
- No hype ("thrilled to announce", "game-changing"), no fake urgency, at most one emoji.
