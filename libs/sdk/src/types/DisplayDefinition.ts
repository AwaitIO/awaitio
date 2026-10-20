import type { DisplayUiProps } from '../client/types/DisplayUiProps';
import type { ComponentType } from 'react';
import type { z } from 'zod';

// One display component, written in a single .tsx file with defineDisplay(): it shows something (a table, tiles…) and
// returns nothing. It is registered in the same component tree as inputs, e.g. { display: { table: displayTable } }.
export type DisplayDefinition<TProps extends z.ZodTypeAny = z.ZodTypeAny> = {
  kind: 'awaitio-display';
  // Checked on the server before the props go to the browser.
  props: TProps;
  component: ComponentType<DisplayUiProps<z.output<TProps>>>;
  // False when the component draws its label itself; otherwise the SDK shows the label as a heading above it.
  wrap?: boolean;
  // Folder of the file that called defineDisplay; `awaitio/vite` builds the browser script into <folder>/ui/ui.js.
  uiDirectory: string | null;
  // Type only, set by withSignature(): { action, page } methods for props a schema cannot type, e.g. a table whose row
  // type comes from its `data`. Without them the methods are typed from `props`.
  signature?: unknown;
};
