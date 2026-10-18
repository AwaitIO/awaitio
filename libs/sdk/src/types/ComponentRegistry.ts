import type { ComponentDefinition } from './ComponentDefinition';
import type { ComponentTree } from './ComponentTree';
import type { DisplayDefinition } from './DisplayDefinition';

export type ComponentRegistry = {
  tree: ComponentTree;
  // Key path in the tree ('input.textarea') → definition.
  byType: Map<string, ComponentDefinition>;
  // Display components by their key path ('display.table').
  displayByType: Map<string, DisplayDefinition>;
};
