# TypeScript Code Guidelines

## AwaitIO Exceptions

These project decisions (see `CLAUDE.md`) win over any rule below:

- **Action and page handlers take one object, `({ io, ctx })`**, like every other function (Petr, 2026-10-20), so a handler can take just what it needs: `async ({ ctx }) => …`.
- **Component definitions** (`libs/input-*`, `apps/demo/components/*`) are one `.tsx` file each with `defineComponent({ props, returns, initialValue, validate, component, wrap? })`. The `component` is written inline in the definition; its props are typed by `defineComponent`, so it has no separate `Props` type and no `FC` annotation.
- **zod schemas stay inline in `defineComponent`**, never in a separate file or in `constants`. The "one type per file" rule does not pull them out.
- **uikit components** (`libs/sdk/src/uikit`) are written as `export const X: FC<XProps> = (...) => { ... }`.

## Exports and Files

Quick description: Only named exports, one exported symbol per file, and the file is named after that symbol. Enforced by `eslint.config.mjs`.

✅ DO:

```typescript
// libs/sdk/src/utils/slugToName.ts
export const slugToName = ({ slug }: SlugToNameArgs) => {
  // Implementation
};
```

❌ DON'T:

```typescript
// libs/sdk/src/utils/strings.ts
export default function slugToName(slug: string) {}
export const nameToSlug = (name: string) => {};
```

### Key Points:

- No `export default` (exception: `*.config.mts`)
- One exported symbol per file, named after it; `index.ts` barrels of a package are the only multi-export files

## One Function per File

Quick description: A file holds exactly one function — exported or not. A helper the main function needs goes into its own file next to it (usually `utils/<helperName>.ts`), named after the helper. Petr's rule.

✅ DO:

```typescript
// libs/sdk/src/io/createIONodes.ts
export type CreateIONodesArgs = { tree: ComponentTree; prefix: string; render: Render };

export const createIONodes = ({ tree, prefix, render }: CreateIONodesArgs): Record<string, IONode> => {
  // Implementation, may call itself
};

// libs/sdk/src/io/createIO.ts
import { createIONodes } from './createIONodes';

export const createIO = ({ registry, render }: CreateIOArgs) => {
  // Uses createIONodes
};
```

❌ DON'T:

```typescript
// libs/sdk/src/io/createIO.ts
const createIONodes = ({ tree, prefix, render }: CreateIONodesArgs) => {}; // a second function in the file

export const createIO = ({ registry, render }: CreateIOArgs) => {};
```

### Key Points:

- One function per file, top-level `const fn = () => {}` and `function fn() {}` alike, exported or not
- The function's own argument or props type (`XxxArgs`, `XxxProps`, `XxxOptions`) may stay in its file
- One class per file; its methods are fine
- Callbacks written inline inside the function (`.map((item) => ...)`, event handlers, `useEffect` bodies) are not separate functions
- Exceptions: a component definition stays one `.tsx` with `component`, `validate` and `initialValue` inline (helpers around it get their own files); test files may keep local test helpers; `vite/componentBuildConfig.mjs` keeps its Vite plugin hooks inline

## Variable Declarations

### Inline Usage for Single-Use Variables

Quick description: Do not declare constants that are only used once. Use their value directly inline instead.

✅ DO:

```typescript
const transaction = transactionManager.start({
  action,
  io: createIO({ components: registry }),
  ctx: { user: request.user },
});
```

❌ DON'T:

```typescript
const io = createIO({ components: registry });
const ctx = { user: request.user };

const transaction = transactionManager.start({
  action,
  io,
  ctx,
});
```

### Direct Reference to Static Data

Quick description: Always reference static data (like `constants`) directly without creating intermediate variables.

✅ DO:

```typescript
const user = mockedData.users.find((sampleUser) => sampleUser.id === userId);

await wait({ duration: constants.FAKE_LOADING_TIME });
```

❌ DON'T:

```typescript
const users = mockedData.users; // Unnecessary intermediate variable
const loadingTime = constants.FAKE_LOADING_TIME;

const user = users.find((sampleUser) => sampleUser.id === userId);

await wait({ duration: loadingTime });
```

### Exceptions

Variables may be declared separately if:

- They are used multiple times
- The expression is complex and would harm readability if used inline
- The variable name provides important semantic context that would be lost with inline usage
- Debugging purposes require a specific variable to be inspectable

## Types vs Interfaces

**IMPORTANT**: Never use `interface`, always use `type` for declaring types. This is enforced by ESLint.

Quick description: Always use `type` for declaring types, avoid interfaces.

✅ DO:

```tsx
export type FieldProps = {
  label: string;
  helpText?: string;
  children: ReactNode;
};
```

❌ DON'T:

```tsx
interface FieldProps {
  label: string;
  helpText?: string;
  children: ReactNode;
}
```

## One Type per File

Quick description: A standalone type gets its own file, named after the type. Never collect several types into one shared file.

The file name is the type name, so a type is always found by the name it is used under, and the import path says which type is coming in.

✅ DO:

```ts
// libs/sdk/src/shared/types/TransactionStatus.ts
import { z } from 'zod';
import { transactionStatusSchema } from '../schemas/transactionStatusSchema';

export type TransactionStatus = z.infer<typeof transactionStatusSchema>;

// libs/sdk/src/shared/types/TransactionState.ts
import { z } from 'zod';
import { transactionStateSchema } from '../schemas/transactionStateSchema';

export type TransactionState = z.infer<typeof transactionStateSchema>;
```

❌ DON'T:

```ts
// libs/sdk/src/shared/types.ts — several types crammed into one file
export type TransactionStatus = ...;
export type TransactionState = ...;
export type ActionResult = ...;
```

### Key Points:

- One exported type per file, and the file is named after it
- A union and the types it is built from are separate files, and so is a type derived from the union
- **Exception — component props**: a component's `Props` type stays in the component's own file, right above the component
- **Exception — function args**: a function's `XxxArgs` / `XxxOptions` type stays in the function's own file, right above the function
- **Exception — `defineComponent`**: zod schemas and the inferred props of an io component stay inline in the definition (see **AwaitIO Exceptions**)
- Do not introduce a shared `Base` type to save repeating two or three fields. Write the fields out in each type — the indirection costs more than the duplication saves. A base is worth it only when the shared part is genuinely large

## Function Definitions

Quick description: Use arrow functions with `export const` syntax instead of standard function declarations.

✅ DO:

```typescript
export const parseCookies = ({ header }: ParseCookiesArgs) => {
  // Implementation
};
```

❌ DON'T:

```typescript
export function parseCookies({ header }: ParseCookiesArgs): Record<string, string> {
  // Implementation
}
```

Classes in `libs/sdk/src/classes/` (`Action`, `IOPromise`, `Transaction`, `TransactionManager`) stay classes; this rule is about free functions.

## Always a Block Body with `return`

Quick description: A named function or component always has a block body and an explicit `return`. Never use the concise arrow body that returns an expression directly.

The body is then always in the same place, a `console.log` or an early return can be added without rewriting the signature, and a diff that adds one line stays one line.

✅ DO:

```tsx
export const Hint: FC<HintProps> = ({ children }) => {
  return <p className="text-xs text-gray-500">{children}</p>;
};

export const isPlainObject = (value: unknown) => {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
};
```

❌ DON'T:

```tsx
export const Hint: FC<HintProps> = ({ children }) => <p className="text-xs text-gray-500">{children}</p>;

export const isPlainObject = (value: unknown) => typeof value === 'object' && value !== null && !Array.isArray(value);
```

### Key Points:

- Applies to every named declaration — components, helpers, hooks — regardless of how short the body is
- Applies also to the named members of `defineComponent` (`initialValue`, `validate`, `component`) and to action `handler`s
- **Inline callbacks are exempt**: `.map()`, `.filter()`, `match(...).with(...)` and event handlers keep the concise form, where a block body would only add noise
- This is about the body, not the return type. Return types stay inferred — see **Return Types**

## Type Parameters

Quick description: Use descriptive names with `Args` suffix for function parameters (`Props` for components, `Options` for option bags) and prefer `Pick<>` over custom types when referencing existing types. Never a bare `Args` / `Props` / `Options`.

✅ DO:

```typescript
export type ToActionResultArgs = {
  transaction: Pick<Transaction, 'id' | 'status'>;
  value: unknown;
};
```

❌ DON'T:

```typescript
export type TransactionInfo = {
  id: string;
  status: TransactionStatus;
};

export type Args = {
  transaction: TransactionInfo;
  value: unknown;
};
```

## Return Types

Quick description: Prefer implicit return types when possible, let TypeScript infer the types.

✅ DO:

```typescript
export const walkRoutes = ({ routes }: WalkRoutesArgs) => {
  // TypeScript will infer the return type
};
```

❌ DON'T:

```typescript
export const walkRoutes = ({ routes }: WalkRoutesArgs): RegisteredAction[] => {
  // Explicitly specified return type
};
```

## Internal Links and Navigation

Quick description: Never use hardcoded strings for internal UI links or navigation URLs. Build them with the path helpers in `libs/sdk/src/ui/utils/` (e.g. `actionPath`), and add a helper when a new route appears.

✅ DO:

```tsx
import { actionPath } from '../utils/actionPath';
import { navigate } from '../utils/navigate';

<a href={actionPath({ slug })}>{action.name}</a>;

navigate(actionPath({ slug, runId }));
```

❌ DON'T:

```tsx
// Never hardcode internal URLs as strings
<a href={`/actions/${slug}`}>{action.name}</a>;

navigate(`/actions/${slug}/${runId}`);
```

This applies to:

- All `href` attributes in components
- All `navigate()` calls
- Any string that represents an internal UI URL
- API paths (`/api/...`) are built in one place per call in `libs/sdk/src/ui/api/`, never scattered across components

## Object Shorthand Properties

Quick description: Use object shorthand syntax when property name matches variable name.

✅ DO:

```typescript
const message = 'Hello';
const user = 'John';

const data = {
  message,
  user,
  timestamp: DateTime.now().toISO(),
};
```

❌ DON'T:

```typescript
const message = 'Hello';
const user = 'John';

const data = {
  message: message,
  user: user,
  timestamp: DateTime.now().toISO(),
};
```

## Date and Time Handling

Quick description: Never use native JavaScript Date objects. Always use Luxon for all date and time operations.

✅ DO:

```typescript
import { DateTime } from 'luxon';

// Creating dates
const now = DateTime.now();
const specificDate = DateTime.fromISO('2023-01-01');
const fromMillis = DateTime.fromMillis(timestamp);

// Date operations
const tomorrow = DateTime.now().plus({ days: 1 });
const lastWeek = DateTime.now().minus({ weeks: 1 });

// Formatting
const formatted = DateTime.now().toFormat('yyyy-MM-dd');
const iso = DateTime.now().toISO();

// Comparisons
const isAfter = date1 > date2;
const isBefore = date1 < date2;
```

❌ DON'T:

```typescript
// Never use native Date
const now = new Date();
const specificDate = new Date('2023-01-01');
const fromMillis = new Date(timestamp);

// Don't use Date methods
const tomorrow = new Date(Date.now() + 24 * 60 * 60 * 1000);
const formatted = new Date().toISOString();

// Don't use Date for comparisons
const isAfter = date1.getTime() > date2.getTime();
```

### Key Points:

- Always import DateTime from 'luxon'
- Use DateTime.now() instead of new Date()
- Use DateTime methods for all date operations (plus, minus, etc.)
- Use Luxon's formatting methods instead of Date formatting
- Values that cross the wire (IO responses, transaction state) are ISO strings; convert them to Luxon `DateTime` immediately after parsing
- A browser API that requires a native `Date` or a number (e.g. `<input type="datetime-local">`) is converted at that boundary only

## Time Duration Handling

Quick description: Never use hardcoded numeric values for time durations. Always use Luxon's Duration API to express time intervals in a readable way.

✅ DO:

```typescript
import { Duration } from 'luxon';

// In constants, keep the Duration itself
export const constants = {
  CANCEL_AFTER_DISCONNECT: Duration.fromObject({ seconds: 30 }),
  FINISHED_TRANSACTION_TTL: Duration.fromObject({ minutes: 15 }),
};

// Convert at the call site
setInterval(sweep, constants.SWEEP_INTERVAL.as('milliseconds'));

// For multiple units
const complexDuration = Duration.fromObject({
  years: 1,
  days: 12,
  minutes: 3,
}).as('seconds');
```

❌ DON'T:

```typescript
// Never use hardcoded numeric values for time durations
const maxAge = 2592000; // What does this mean? Hard to read!
setTimeout(cancel, 30000); // Is this 30 seconds? Hard to tell

// Never use manual calculations
const timeout = 60 * 60 * 2 + 60 * 30; // Hard to read and error-prone
const ttl = 15 * 60 * 1000; // What unit is this?
```

### Key Points:

- Use `Duration.fromObject()` for all time-based numeric values
- Available units: `years`, `months`, `weeks`, `days`, `hours`, `minutes`, `seconds`, `milliseconds`
- Use `.as('seconds')` or `.as('milliseconds')` to convert to the needed unit
- Makes code self-documenting and prevents calculation errors
- Luxon correctly handles edge cases like leap years

## Package Dependency Check

Quick description: When reviewing changes, verify that new packages added to package.json are actually used in the codebase.

When reviewing changes:

1. Check if new dependencies were added to package.json
2. Verify that these dependencies are actually imported and used in the code
3. Flag any unused dependencies that were added but not utilized
4. Ensure dependencies are properly categorized (dependencies vs devDependencies vs peerDependencies of the published `awaitio` / `@awaitio/input-*` packages)

This helps maintain a clean dependency tree and prevents package bloat.

## String Concatenation

Quick description: Always use template literals (`${}`) instead of string concatenation with `+` operator for combining strings.

✅ DO:

```typescript
const message = `${label} must be at least ${props.minLength} characters long.`;
const greeting = `Hello ${userName}, welcome to ${appName}!`;
const url = `${baseUrl}/api/actions/${slug}`;
```

❌ DON'T:

```typescript
const message = label + ' must be at least ' + props.minLength + ' characters long.';
const greeting = 'Hello ' + userName + ', welcome to ' + appName + '!';
const url = baseUrl + '/api/actions/' + slug;
```

### Key Points:

- Template literals are more readable and maintainable
- They prevent common spacing errors in concatenation
- They support multi-line strings and complex expressions
- They are the modern JavaScript/TypeScript standard

## Variable Naming in Callbacks and Functions

Quick description: Never use single-letter or abbreviated variable names in callbacks, event handlers, or any functions. Always use descriptive, full names.

✅ DO:

```typescript
// Event handlers
onChange={(event) => {
  onChange(event.target.value);
}}

// Array methods
actions.map((action) => ({ slug: action.slug, name: action.name }))
users.filter((user) => user.role === 'admin')
transactions.find((transaction) => transaction.id === runId)

// Try-catch blocks
try {
  await someAsyncOperation();
} catch (error) {
  console.error('Operation failed:', error);
}

// Promise chains
.catch((error) => handleError(error))
```

❌ DON'T:

```typescript
// Never use abbreviated variable names
onChange={(e) => {
  onChange(e.target.value);
}}

// Never use single letters in array methods
actions.map((a) => ({ slug: a.slug, name: a.name }))
users.filter((u) => u.role === 'admin')
transactions.find((t) => t.id === runId)

// Never use abbreviated names in try-catch
try {
  await someAsyncOperation();
} catch (e) {
  console.error('Operation failed:', e);
}

// Never use single letters in promise chains
.catch((e) => handleError(e))
```

### Key Points:

- Use descriptive names: `event`, `error`, `user`, `item`, `action`, `transaction`, etc.
- This applies to ALL callback functions: onClick, onChange, map, filter, find, catch, then, etc.
- Variable names should clearly indicate what they represent
- This improves code readability and makes debugging easier
- Consistent naming helps other developers understand the code quickly

## Function Parameter Destructuring

Quick description: Always use destructuring directly in function parameter lists instead of accessing properties from a single parameter object.

✅ DO:

```typescript
export const hashToken = ({ token }: HashTokenArgs) => {
  // Implementation using token directly
};
```

❌ DON'T:

```typescript
export const hashToken = (args: HashTokenArgs) => {
  const { token } = args;
  // Implementation
};
```

## Function Parameter Processing with Rest Spread

Quick description: When you need to reuse and transform a parameter that's already destructured in function arguments, use rest spread pattern to avoid variable shadowing and maintain clean code.

✅ DO:

```typescript
export const startTransaction = async ({ slug, ctx, ...args }: StartTransactionArgs) => {
  const { values } = parseResponseValues({ values: args.values });

  // Continue using the processed values...
};
```

❌ DON'T:

```typescript
export const startTransaction = async ({ slug, ctx, values }: StartTransactionArgs) => {
  // This creates variable shadowing and can be confusing
  const { values: parsedValues } = parseResponseValues({ values });

  // Now you have both `values` and `parsedValues` which is confusing
};
```

### Key Points:

- Use `...args` when you need to access the original parameter for transformation
- This pattern prevents variable shadowing where you have multiple variables representing the same concept
- Access the original value through `args.propertyName` in your transformation functions
- This approach makes it clear that you're working with the original input value
- Keeps the destructured parameters clean and focused on direct usage

## Type Safety - Never Use `any`

Quick description: Never use the `any` type. Use specific types, generics, `unknown`, or proper union types instead to maintain type safety.

✅ DO:

```typescript
// Use specific types
const parseJson = (jsonString: string): Record<string, unknown> => {
  return JSON.parse(jsonString);
};

// Use unknown for uncertain types
const processData = (data: unknown) => {
  if (typeof data === 'string') {
    return data.toUpperCase();
  }

  // Handle other cases
};

// Use generics for flexible typing
const createResponse = <T>(data: T): { success: boolean; data: T } => {
  return { success: true, data };
};

// Use union types for known possibilities
type ApiResponse = { success: true; data: object } | { success: false; error: string };

// Use object for general object types
const processObject = (obj: object) => {
  // Implementation
};
```

❌ DON'T:

```typescript
// Never use any
const parseJson = (jsonString: string): any => {
  return JSON.parse(jsonString);
};

// Never use any for uncertain types
const processData = (data: any) => {
  return data.someMethod();
};

// Never use any in generics
const createResponse = (data: any): any => {
  return { success: true, data };
};

// Never use any in function parameters
const handleApiResponse = (response: any) => {
  // Implementation
};
```

### Key Points:

- `any` disables TypeScript's type checking and can lead to runtime errors
- Use `unknown` when you don't know the type and need to check it at runtime; parse unknown input with zod
- Use specific types when the structure is known
- Use generics for reusable type-safe functions
- Use union types for known possibilities
- This rule is enforced by ESLint

## Environment Variables

Quick description: `process.env` is read only in `apps/demo/src/secrets.ts` (validated by `@homoky/znv`). Everything else imports `secrets`. The SDK never reads `process.env`; it gets configuration through `new AwaitIO(...)` and `app.listen(...)`.

✅ DO:

```typescript
import { secrets } from './secrets';

app.listen({ port: secrets.PORT, routes });
```

❌ DON'T:

```typescript
app.listen({ port: Number(process.env.PORT), routes });
```

## No 1:1 Re-export Files

Quick description: Never create files that only re-export a symbol 1:1 from another package. Import directly from the source package at the call site.

✅ DO:

```tsx
// In a component's .tsx
import { Input } from 'awaitio/ui';
```

❌ DON'T:

```tsx
// libs/input-text/src/Input.tsx
export { Input, type InputProps } from 'awaitio/ui';

// In inputText.tsx
import { Input } from './Input';
```

### Key Points:

- A wrapper file is only acceptable if it adds real logic, default props, styling, or composes with other components — i.e. the local component genuinely differs from the upstream one
- If the file would belong in a shared place (e.g. `awaitio/ui` in `libs/sdk/src/uikit`), move it there instead of keeping a local re-export
- A package's public `index.ts` entry (`awaitio`, `awaitio/client`, `awaitio/ui`, `@awaitio/input-*`) is the package API, not a 1:1 re-export file
- Pure 1:1 re-exports add indirection, hide the real source, and break "go to definition" navigation — delete them and import from the source

## Dead Data Cleanup Upstream

Quick description: When you stop reading a field, do not stop at the consumer. Follow the data upstream and remove the field from the type and the code that produces it — the computation, the mapping, the schema.

TypeScript never reports this. An unused field is still "used" because the producer keeps filling it in, so the work keeps running and nobody notices.

✅ DO:

```typescript
// The action list stopped showing the description,
// so the type loses the field AND the router stops computing it.

type ActionListItem = {
  slug: string;
  name: string;
};

// In the producing router — the mapping that fed the field is gone too
const actions = registeredActions.map((action) => ({ slug: action.slug, name: action.name }));
```

❌ DON'T:

```typescript
// The description was deleted from the UI, but everything upstream stayed

type ActionListItem = {
  slug: string;
  name: string;
  description: string; // ❌ Nobody reads this anymore
};

const actions = registeredActions.map((action) => ({ slug: action.slug, name: action.name, description: action.description ?? slugToName({ slug: action.slug }) }));
```

### Exception: External Contracts

Keep the field when the shape is a contract with the outside world, even if nothing currently reads it:

- The public SDK API (`awaitio`, `awaitio/client`, `awaitio/ui`) and the props of published `@awaitio/input-*` components
- Wire schemas in `libs/sdk/src/shared/` (the run and step messages between the server and the UI)

### Key Points:

- Removing a field from a type is only half the job — the producing code is the other half
- Follow the chain all the way up: consumer → type → producer → source
- The cost of skipping this is invisible: dead work that runs forever
- Applies to internal data shapes only, never to external contracts

## Constants

Quick description: Package-level constants live in a `constants.ts` file and are grouped under a single `constants` object export. Access them via `constants.NAME` — never destructure.

Whenever the user asks to "move this to constants" (or anything to that effect), they are referring to exactly this rule — extract the value into the package's `constants.ts` object and reference it via `constants.NAME`.

✅ DO:

```typescript
// constants.ts
export const constants = {
  SESSION_COOKIE_NAME: 'awaitio_session',
  MIN_TOKEN_LENGTH: 16,
};

// At the call site
import { constants } from './constants';

const isTooShort = token.length < constants.MIN_TOKEN_LENGTH;
```

❌ DON'T:

```typescript
// Never export standalone named constants
export const SESSION_COOKIE_NAME = 'awaitio_session';
export const MIN_TOKEN_LENGTH = 16;

// Never destructure the constants object
import { constants } from './constants';
const { MIN_TOKEN_LENGTH } = constants; // ❌ Wrong - access via constants.MIN_TOKEN_LENGTH
```

### Key Points:

- One `export const constants = { ... }` object per `constants.ts` file
- Constant keys use `SCREAMING_SNAKE_CASE`
- Always access through `constants.NAME` — keeps the source obvious and never destructure
- Existing examples: `libs/sdk/src/constants.ts`, `libs/sdk/src/ui/constants.ts`, `apps/demo/src/constants.ts`
- Exception: zod schemas of an io component never go to `constants`, they stay inline in `defineComponent`

## Blank Lines

Quick description: A blank line before every `return` (unless it is the only statement of the block) and around every `if` block. `if` always has curly braces. Enforced by ESLint and Prettier (single quotes, print width 200, trailing commas).

✅ DO:

```typescript
validate: ({ label, value }) => {
  if (value.trim().length === 0) {
    return `${label} is required.`;
  }

  return null;
},
```

❌ DON'T:

```typescript
validate: ({ label, value }) => {
  if (value.trim().length === 0) return `${label} is required.`;
  return null;
},
```

## Tests

Quick description: Vitest, `<name>.test.ts` next to the code, top-level `test('Should …')` without `describe`, and a blank line between assertions.

✅ DO:

```typescript
import { expect, test } from 'vitest';
import { inputText } from './inputText';

test('Should check the length limits', () => {
  expect(validate('ab', { minLength: 3 })).toBe('Name must be at least 3 characters long.');

  expect(validate('abcd', { maxLength: 3 })).toBe('Name must be at most 3 characters long.');
});
```

❌ DON'T:

```typescript
describe('inputText', () => {
  it('checks the length limits', () => {
    expect(validate('ab', { minLength: 3 })).toBe('Name must be at least 3 characters long.');
    expect(validate('abcd', { maxLength: 3 })).toBe('Name must be at most 3 characters long.');
  });
});
```

### Blank Line Between Assertions

Separate every `expect` from the next one with a blank line. Never stack assertions directly under each other.

Each assertion is then one visual block, which matters most with inline snapshots — a snapshot can run to dozens of lines, and without the gap the end of one assertion and the start of the next run together.

### Key Points:

- Applies to every assertion, with or without a snapshot, and whether the snapshot is still empty or already filled in
- The blank line before the first `expect` is the usual gap between the code under test and its assertions
- Test names start with `Should` and describe behavior
