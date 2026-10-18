import type { ReactNode } from 'react';

export type LayoutUiProps<TProps> = {
  // What the page passed to io.layout.<name>(…) besides children, already parsed by the layout's props schema.
  props: TProps;
  // The display components the page put in, already drawn, in order. The layout decides where each one goes.
  children: ReactNode[];
};
