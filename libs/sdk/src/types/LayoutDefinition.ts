import type { LayoutUiProps } from '../client/types/LayoutUiProps';
import type { ComponentType } from 'react';
import type { z } from 'zod';

// One layout, written in a single .tsx file with defineLayout(): the frame of a page, which places the display
// components the page puts in (children). It only displays; nothing is asked and there is no Continue button.
export type LayoutDefinition<TProps extends z.ZodTypeAny = z.ZodTypeAny> = {
  kind: 'awaitio-layout';
  // Its own options besides children (a title, a number of columns…), checked on the server before they go to the
  // browser.
  props: TProps;
  component: ComponentType<LayoutUiProps<z.output<TProps>>>;
  // Folder of the file that called defineLayout; `awaitio/vite` builds the browser script into <folder>/ui/ui.js.
  uiDirectory: string | null;
};
