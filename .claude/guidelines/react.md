# React Code Guidelines

## AwaitIO Exceptions

These project decisions win over any rule below. The full rules for io components are in `components.md`:

- **io component definitions** (`libs/input-*`, `libs/select-*`, `libs/display-*`) are one `src/<name>.tsx` file with `defineComponent({ props, returns, initialValue, validate, component, wrap? })`. The `component` is written inline in the definition, typed by `defineComponent`: no separate `Props` type, no `FC` annotation, no extra component file.
- An io component's `component` draws only the control, built from `awaitio/ui` (`Input`, `Textarea`, `Field`, `Hint`). Label, help text and error come from the SDK (`Field`). No own CSS.
- zod schemas of an io component stay inline in `defineComponent`, never in `constants`; only a schema used more than once goes to `src/schemas/<name>Schema.ts`.
- **uikit components** (`libs/sdk/src/uikit`, published as `awaitio/ui`) are written as `export const X: FC<XProps> = (...) => { ... }` with an exported `XProps` right above.
- The UI has no i18n: texts are plain English strings in the components.

## Component Names Say Where the Component Is Used

Quick description: When a feature has a list page and a detail page, the name of each of its components says which of the two it belongs to — `Archive`, `Detail` — or `Common` when both of them use it.

A name like `ActionStatus` does not tell the reader whether it is safe to change for the detail alone. The middle word does.

✅ DO:

```tsx
// Only the action list
export const ActionArchiveItem = ({ action }: ActionArchiveItemProps) => {};

// Used by the action list and by the run page of an action
export const ActionCommonStatus = ({ status }: ActionCommonStatusProps) => {};
```

❌ DON'T:

```tsx
// Is this the row in the list, or the header of the run page?
export const ActionShowcase = ({ action }: ActionShowcaseProps) => {};

// Nothing says the detail depends on it too
export const ActionStatus = ({ status }: ActionStatusProps) => {};
```

### Key Points:

- `Archive` — only the list page; one entry of the list is `…ArchiveItem`
- `Detail` — only the detail page
- `Common` — the list page **and** the detail page of that feature both use it; the word goes right before what the component draws: `ActionCommonIcon`. Being used somewhere else as well does not change that
- **`Common` is only about the feature's own two pages.** A component the detail shares with another page, but the list does not use, is not `Common` — it keeps a plain name
- Generic building blocks (`Button`, `LoadingIndicator`, `RenderIOCall`) and page components (`ActionListPage`, `TransactionPage`) keep plain names
- The file and the `Props` type carry the same name
- A piece used in one place only is written into the component that uses it, not given a file of its own
- When a `Common` component stops being shared, or a one-page component becomes shared, rename it in the same change

## Props Types Declaration

Quick description: Always define component props as a separate, exported type declaration outside the component, named `XxxProps` (never a bare `Props`).

✅ DO:

```tsx
export type FieldProps = {
  label: string;
  helpText?: string;
  children: ReactNode;
};

export const Field: FC<FieldProps> = ({ label, helpText, children }) => {};
```

❌ DON'T:

```tsx
export const Field: FC<{
  label: string;
  helpText?: string;
  children: ReactNode;
}> = ({ label, helpText, children }) => {};
```

Exception: the inline `component` of `defineComponent` (see **AwaitIO Exceptions**).

## Always Export Props Types

Quick description: Make sure props types are always exported to allow for reuse.

✅ DO:

```tsx
export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'secondary';
};

export const Button: FC<ButtonProps> = (props) => {};
```

❌ DON'T:

```tsx
type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'secondary';
};

export const Button: FC<ButtonProps> = (props) => {};
```

## Group Props of One Inner Element into an Object

Quick description: When a component passes several props through to one of its inner elements — an icon, a label, a hint — take them as one object named after that element, not as a row of prefixed props (`hintText`, `hintTone`, `hintClassName`).

✅ DO:

```tsx
export type ActionArchiveItemProps = {
  hint?: { text: string; className?: string };
  title: string;
};

<ActionArchiveItem hint={{ text: 'Runs in the background', className: 'text-gray-400' }} title={action.name} />;
```

❌ DON'T:

```tsx
export type ActionArchiveItemProps = {
  hintText?: string;
  hintClassName?: string;
  title: string;
};

<ActionArchiveItem hintText="Runs in the background" hintClassName="text-gray-400" title={action.name} />;
```

- The prefix already says the props belong together — the object makes that explicit and keeps the call site readable
- Props of the component itself (`title`, `isActive`, `onClick`) stay flat
- Name the object after the element (`hint`, `icon`), and its keys after that element's own props (`text`, `className`)

## Hook Usage Guidelines

### No Destructuring of Hook Results Holding Many Values

Quick description: Never destructure a hook's result object. Keep it as one named value and read its fields from it, so the source stays visible at the use site.

✅ DO:

```tsx
const transactionState = useTransactionState({ runId });

// use as transactionState.status, transactionState.render
```

❌ DON'T:

```tsx
const { status, render } = useTransactionState({ runId });
```

Tuple hooks from React (`useState`, `useReducer`) keep their usual `[value, setValue]` destructuring.

### Routing

Quick description: The SDK UI has no router library. Read the path through `usePathname` and change it through `navigate`, with URLs from the path helpers (`actionPath`). Never read or write `window.location` / `history` in components.

✅ DO:

```tsx
import { usePathname } from '../hooks/usePathname';
import { navigate } from '../utils/navigate';

const pathname = usePathname();

navigate(actionPath({ slug, runId }));
```

❌ DON'T:

```tsx
const pathname = window.location.pathname;

window.history.pushState({}, '', `/actions/${slug}/${runId}`);
```

## Conditional Rendering

### Use ts-pattern Instead of Ternary Operators

Quick description: Never use ternary operators (or `switch`) for conditional rendering. Always use match from ts-pattern with explicit pattern matching.

✅ DO:

```tsx
import { match } from 'ts-pattern';

{
  match(transactionState.status)
    .with('RUNNING', () => <LoadingIndicator />)
    .with('SUCCESS', () => <ActionResult result={transactionState.result} />)
    .with('FAILURE', 'CANCELED', () => <p className="text-sm text-red-600">{transactionState.error}</p>)
    .exhaustive();
}
```

❌ DON'T:

```tsx
{
  transactionState.status === 'RUNNING' ? (
    <LoadingIndicator />
  ) : transactionState.status === 'SUCCESS' ? (
    <ActionResult result={transactionState.result} />
  ) : (
    <p className="text-sm text-red-600">{transactionState.error}</p>
  );
}
```

**Important**: All conditional rendering with more than one branch must use ts-pattern's match function with explicit pattern matching and `.exhaustive()` to ensure all cases are handled. Showing or hiding one element with `{condition && <X />}` is fine. The same applies outside JSX: `match` instead of `switch`.

## Conditional CSS Classes

### Use Array of Conditions for className

Quick description: For conditional CSS classes, always use an array with boolean conditions, joined into the `className` string. Never use template literals with embedded ternary operators or match functions.

✅ DO:

```tsx
<span
  className={[
    'rounded px-2 py-1 text-xs',
    status === 'RUNNING' && 'bg-blue-200 text-blue-700',
    status === 'SUCCESS' && 'bg-green-200 text-green-700',
    status === 'FAILURE' && 'bg-red-200 text-red-700',
    className,
  ]
    .filter(Boolean)
    .join(' ')}
>
```

❌ DON'T:

```tsx
// Never use template literals with ternary operators
<span
  className={`rounded px-2 py-1 text-xs ${
    status === 'RUNNING'
      ? 'bg-blue-200 text-blue-700'
      : status === 'SUCCESS'
      ? 'bg-green-200 text-green-700'
      : 'bg-red-200 text-red-700'
  }`}
>

// Never use match function inside className
<span
  className={`rounded px-2 py-1 text-xs ${match(status)
    .with('RUNNING', () => 'bg-blue-200 text-blue-700')
    .otherwise(() => 'bg-red-200 text-red-700')
  }`}
>
```

**Important**:

- Use `match` from ts-pattern for conditional rendering of components
- Use array of boolean conditions for conditional CSS classes
- A whole class string chosen by a variant prop may come from a `match(...)` computed above the JSX (as in `Button`), never inline in the template literal
- This separation makes the code more readable and maintainable

## Layout and Spacing

### Use gap / space-y for Spacing (Never Manual mb/mt Classes)

Quick description: Never use manual margin classes like `mb-4`, `mt-2`, etc. Lay out siblings with a flex/grid container and `gap-*`, then `space-y-*` for smaller spacing if needed.

**Priority order:**

1. **`flex flex-col gap-*`** (or grid) on the parent - for main layout spacing
2. **`space-y-*` classes** - for smaller, tight spacing within sections
3. **NEVER** - manual margin classes (`mb-*`, `mt-*`, `mx-*`, `my-*`)

✅ DO:

```tsx
<div className="flex flex-col gap-3">
  <h1 className="text-lg font-semibold">{action.name}</h1>

  <div className="space-y-2">
    {actions.map((action) => (
      <ActionArchiveItem key={action.slug} title={action.name} />
    ))}
  </div>
</div>
```

❌ DON'T:

```tsx
<div>
  <h1 className="mb-4 text-lg font-semibold">{action.name}</h1>

  <div className="mt-3">
    <ActionArchiveItem className="mb-2" title={action.name} />
  </div>
</div>
```

**Important**:

- **gap** on the parent for main sections
- **space-y-2/space-y-1** for tight spacing within a section
- **Never** use manual margin classes - they break consistency
- Centering with `mx-auto` on a page container is the only accepted margin

## Menus Show Only the Actions That Would Do Something

Quick description: a menu item that would change nothing right now is left out, not shown greyed out. "Select all" is gone when every row is already picked, "Clear all" when none is. A menu with no item left is not drawn at all, its "…" button included.

**Why**: a disabled item in a menu reads as broken or as an option the user lacks the rights for; leaving it out says plainly that there is nothing to do.

✅ DO: `{bulkItems.length > 0 && <RowMenu items={bulkItems} />}` with the items filtered to those that change something.

❌ DON'T: `{ label: 'Select all', disabled: everyRowPicked }` in the menu.

Buttons outside a menu (Prev and Next of a pager, Continue) stay in place and get `disabled`, so the layout does not jump.

## Long Values Wrap, Never Scroll Sideways

A value that comes from an action (a URL with a token, a list of emails, a JWT) wraps inside its card or table, breaking mid-word when it has to. Nothing on a screen scrolls sideways or runs out of its card.

**Why**: actions return values of any length, and a sideways scroll hides the end of the value, which is often the part that matters.

- The page (`main` in `App.tsx`) has `wrap-break-word`, so plain blocks break a long word only when it would overflow.
- Table cells and boxes with returned values use `wrap-anywhere`: a long token then no longer sets the table's minimum width, so the table fits the box instead of widening it.

✅ DO: `<td className="px-4 py-2.5 wrap-anywhere">`, `<pre className="whitespace-pre-wrap wrap-anywhere">`

❌ DON'T: let `overflow-x-auto` handle a long value (`<td className="px-4 py-2.5">` in a scrolling wrapper, `<pre className="overflow-x-auto">` for JSON). A scrolling wrapper stays only as a fallback for many columns, whose headers do not wrap.
