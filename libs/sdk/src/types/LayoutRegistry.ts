import type { LayoutDefinition } from './LayoutDefinition';

export type LayoutRegistry = {
  // Wire type → what the server needs of a layout.
  byType: Map<string, Pick<LayoutDefinition, 'props' | 'uiDirectory'>>;
  // io.layout key → wire type.
  typeByKey: Map<string, string>;
};
