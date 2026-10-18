import type { LayoutDefinition } from './LayoutDefinition';

// Layouts besides the built-in basic one: { columns: layoutColumns } gives io.layout.columns({ …, children }).
export type LayoutTree = {
  [key: string]: LayoutDefinition;
};
