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
  // Folder of the file that called defineDisplay; `awaitio/vite` builds the browser script into <folder>/ui/ui.js.
  uiDirectory: string | null;
};
