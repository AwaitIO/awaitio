# @awaitio/display-metadata

Label and value tiles for [AwaitIO](https://awaitio.com): `io.display.metadata()`.

![Three tiles: Users 3, Admins 1 and Activity this month 45 with a description](https://docs.awaitio.com/images/io-display-metadata.png)

## Install

```bash
npm install @awaitio/display-metadata
```

Needs `awaitio` and `zod` in the app, see the [quickstart](https://docs.awaitio.com/quickstart).

## Setup

Register it under the key you want in `io`, see [Display components](https://docs.awaitio.com/core/display-components):

```ts
import { displayMetadata } from '@awaitio/display-metadata';

export const app = new AwaitIO({
  // name, actionsDirectory, theme, secret, users…
  components: { display: { metadata: displayMetadata } },
});
```

## Usage

```ts
io.display.metadata(null, {
  items: [
    { label: 'Users', value: users.length },
    { label: 'Admins', value: admins.length },
    { label: 'Activity this month', value: 45, description: 'Logins, runs and messages' },
  ],
});
```

Props and how values look are on the [Display Metadata docs page](https://docs.awaitio.com/io/display-metadata).
