# @awaitio/input-date

Date input for [AwaitIO](https://awaitio.com): `io.input.date()`, returns a luxon DateTime.

![A Due date field with a date two weeks ahead](https://docs.awaitio.com/images/io-input-date.png)

## Install

```bash
npm install @awaitio/input-date
```

Needs `awaitio` and `zod` in the app, see the [quickstart](https://docs.awaitio.com/quickstart).

## Setup

Register it under the key you want in `io`, see [Input components](https://docs.awaitio.com/core/input-components):

```ts
import { inputDate } from '@awaitio/input-date';

export const app = new AwaitIO({
  // name, actionsDirectory, theme, secret, users…
  components: { input: { date: inputDate } },
});
```

## Usage

```ts
import { DateTime } from 'luxon';

const dueOn = await io.input.date('Due date', {
  defaultValue: DateTime.now().plus({ days: 14 }),
  min: DateTime.now(),
});

dueOn.toISODate(); // '2026-11-02'
```

Props, optional, returns, built-in validation and custom validation are on the [Input Date docs page](https://docs.awaitio.com/io/input-date).
