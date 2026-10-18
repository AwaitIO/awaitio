import type { DisplayElement } from './DisplayElement';

// What io.layout.<name>({ …, children }) returns: the frame of a page and the display components in it.
export type LayoutElement = {
  kind: 'awaitio-layout-element';
  type: string;
  props: unknown;
  children: DisplayElement[];
};
