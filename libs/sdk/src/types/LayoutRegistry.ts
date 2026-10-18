import type { LayoutDefinition } from './LayoutDefinition';

export type LayoutRegistry = {
  // Wire type → what the server needs of a layout. The built-in basic layout has no script of its own.
  byType: Map<string, Pick<LayoutDefinition, 'props' | 'uiDirectory'>>;
  // io.layout key → wire type: basic → 'awaitio:basic' unless a registered layout replaces it.
  typeByKey: Map<string, string>;
};
