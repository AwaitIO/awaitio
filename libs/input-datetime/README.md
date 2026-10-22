# @awaitio/input-datetime

Date and time input for [AwaitIO](https://awaitio.com) – `io.input.datetime()`, returns a luxon DateTime.

![A Trial ends at field with a date and time, and the hint Time zone: Europe/Prague under it](https://docs.awaitio.com/images/io-input-datetime.png)

## Install

```bash
npm install @awaitio/input-datetime
```

Needs `awaitio` and `zod` in the app, see the [quickstart](https://docs.awaitio.com/quickstart).

## Setup

Register it under the key you want in `io`, see [Input components](https://docs.awaitio.com/core/input-components):

```ts
import { inputDatetime } from '@awaitio/input-datetime';

export const app = new AwaitIO({
  // name, actionsDirectory, theme, secret, users…
  components: { input: { datetime: inputDatetime } },
});
```

## Usage

```ts
import { DateTime } from 'luxon';

const endsAt = await io.input.datetime('Trial ends at', {
  defaultValue: DateTime.now().plus({ days: 14 }).startOf('day'),
  min: DateTime.now(),
});
```

Props, optional, returns, built-in validation and custom validation are on the [Input Datetime docs page](https://docs.awaitio.com/io/input-datetime).
